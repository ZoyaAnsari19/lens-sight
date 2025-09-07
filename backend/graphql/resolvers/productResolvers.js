// graphql/resolvers/productResolvers.js
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const { requireAdmin } = require("../../middleware/auth");

function escapeRegex(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildCategoryRegexes(cat) {
  if (!cat) return null;
  const candidates = [];
  candidates.push(new RegExp(`^${escapeRegex(cat)}$`, "i"));

  const kebab = cat
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
  if (kebab && kebab !== cat.toLowerCase()) {
    candidates.push(new RegExp(`^${escapeRegex(kebab)}$`, "i"));
  }

  candidates.push(new RegExp(`^${escapeRegex(cat.toLowerCase())}$`, "i"));

  const unique = [];
  const seen = new Set();
  for (const r of candidates) {
    const s = r.toString();
    if (!seen.has(s)) {
      seen.add(s);
      unique.push(r);
    }
  }
  return unique;
}

function normalizeImages(p) {
  if (!p) return [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    return p.images.map((img) => ({
      url: img?.url || "",
      alt: img?.alt || "",
      isPrimary: !!img?.isPrimary,
    }));
  }
  if (p.image && typeof p.image === "string") {
    return [{ url: p.image, alt: "", isPrimary: true }];
  }
  return [];
}

function mapProduct(p) {
  if (!p) return null;
  const images = normalizeImages(p);
  return {
    id: (p.id && String(p.id)) || (p._id ? String(p._id) : undefined),
    name: p.name || "",
    description: p.description || "",
    brand: p.brand || "",
    category: p.category || "",
    price: typeof p.price === "number" ? p.price : p.price ? Number(p.price) : 0,
    originalPrice: p.originalPrice || null,
    discount: typeof p.discount === "number" ? p.discount : 0,
    frameType: p.frameType || "",
    frameColor: p.frameColor || "",
    material: p.material || "",
    size: p.size || {},
    images,
    image: images[0]?.url || "",
    stock: typeof p.stock === "number" ? p.stock : Number(p.stock || 0),
    features: Array.isArray(p.features) ? p.features : [],
    rating: p.rating || { average: 0, count: 0 },
    tags: Array.isArray(p.tags) ? p.tags : [],
    isActive: !!p.isActive,
    isFeatured: !!p.isFeatured,
    isNewArrival: !!p.isNewArrival,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

const productResolvers = {
  Query: {
    products: async (
      parent,
      { page = 1, limit = 10, filter = {}, search, sortBy, sortOrder = "desc" }
    ) => {
      try {
        const skip = Math.max(0, page - 1) * limit;
        const query = { isActive: true };

        if (filter) {
          if (filter.category) {
            const regs = buildCategoryRegexes(String(filter.category));
            if (regs && regs.length > 0) {
              query.category = { $in: regs };
            }
          }
          if (filter.brand) {
            query.brand = new RegExp(escapeRegex(String(filter.brand)), "i");
          }
          if (filter.frameType) query.frameType = String(filter.frameType);
          if (filter.material) query.material = String(filter.material);

          if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
            query.price = {};
            if (filter.minPrice !== undefined)
              query.price.$gte = Number(filter.minPrice);
            if (filter.maxPrice !== undefined)
              query.price.$lte = Number(filter.maxPrice);
          }

          if (
            filter.inStock !== undefined &&
            (filter.inStock === true || filter.inStock === "true")
          ) {
            query.stock = { $gt: 0 };
          }

          if (filter.isFeatured !== undefined) {
            query.isFeatured = Boolean(filter.isFeatured);
          }

          if (filter.isNewArrival !== undefined) {
            query.isNewArrival = Boolean(filter.isNewArrival);
            if (Boolean(filter.isNewArrival)) {
              query.stock = { $gt: 0 };
            }
          }
        }

        if (search) {
          query.$text = { $search: search };
        }

        const sortOptions = {};
        if (sortBy) {
          sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        } else if (filter && filter.isNewArrival) {
          sortOptions.createdAt = -1;
        } else {
          sortOptions.createdAt = -1;
        }

        const [productsDB, totalProducts] = await Promise.all([
          Product.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
          Product.countDocuments(query),
        ]);

        const mapped = (productsDB || []).map(mapProduct);
        const totalPages = Math.ceil(totalProducts / limit) || 1;

        return {
          products: mapped,
          totalPages,
          currentPage: page,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        };
      } catch (err) {
        console.error("products query error:", err);
        throw new Error("Failed to fetch products");
      }
    },

    product: async (parent, { id }) => {
      try {
        if (!id) throw new Error("Product id required");
        let product = await Product.findOne({ id, isActive: true }).lean();
        if (!product && mongoose.Types.ObjectId.isValid(id)) {
          product = await Product.findById(id).lean();
        }
        if (!product) throw new Error("Product not found");
        return mapProduct(product);
      } catch (err) {
        console.error("product query error:", err);
        throw new Error("Failed to fetch product");
      }
    },

    featuredProducts: async () => {
      try {
        const prods = await Product.find({
          isActive: true,
          isFeatured: true,
        })
          .limit(12)
          .lean();
        return prods.map(mapProduct);
      } catch (err) {
        console.error("featuredProducts error:", err);
        return [];
      }
    },

    newArrivalsProducts: async (parent, args) => {
      try {
        const limit = args && args.limit ? args.limit : 20;
        const prods = await Product.find({
          isActive: true,
          isNewArrival: true,
          stock: { $gt: 0 },
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();
        return prods.map(mapProduct);
      } catch (err) {
        console.error("newArrivalsProducts error:", err);
        return [];
      }
    },
  },

  Mutation: {
    createProduct: async (parent, { input }, { user }) => {
      requireAdmin(user);
      if (!input.id) input.id = new mongoose.Types.ObjectId().toString();
      const created = await Product.create(input);
      return mapProduct(created.toObject ? created.toObject() : created);
    },

    updateProduct: async (parent, { id, input }, { user }) => {
      requireAdmin(user);
      let product = await Product.findOneAndUpdate({ id }, input, {
        new: true,
        runValidators: true,
      }).lean();
      if (!product && mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
        }).lean();
      }
      if (!product) throw new Error("Product not found");
      return mapProduct(product);
    },

    deleteProduct: async (parent, { id }, { user }) => {
      requireAdmin(user);
      let product = await Product.findOneAndUpdate(
        { id },
        { isActive: false },
        { new: true }
      ).lean();
      if (!product && mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findByIdAndUpdate(
          id,
          { isActive: false },
          { new: true }
        ).lean();
      }
      return !!product;
    },
  },
};

module.exports = productResolvers;
