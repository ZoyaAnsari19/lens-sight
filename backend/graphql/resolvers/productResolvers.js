const Product = require('../../models/Product');
const { requireAdmin } = require('../../middleware/auth');

const productResolvers = {
  Query: {
    products: async (parent, { page = 1, limit = 10, filter, search, sortBy, sortOrder }) => {
      const skip = (page - 1) * limit;
      let query = { isActive: true };

      if (filter) {
        if (filter.category) query.category = filter.category;
        if (filter.brand) query.brand = new RegExp(filter.brand, 'i');
        if (filter.frameType) query.frameType = filter.frameType;
        if (filter.material) query.material = filter.material;
        if (filter.minPrice || filter.maxPrice) {
          query.price = {};
          if (filter.minPrice) query.price.$gte = filter.minPrice;
          if (filter.maxPrice) query.price.$lte = filter.maxPrice;
        }
        if (filter.inStock) query.stock = { $gt: 0 };
      }

      if (search) {
        query.$text = { $search: search };
      }

      const sortOptions = {};
      if (sortBy) sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

      const products = await Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const totalProducts = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / limit);

      const mapped = products.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        image: p.image,
        discount: p.discount,
        stock: p.stock,
        isActive: p.isActive,
        isFeatured: p.isFeatured
      }));

      return {
        products: products.map(p => ({ ...p, id: p.id.toString() })),
        totalPages,
        currentPage: page,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      };
    },

    product: async (parent, { id }) => {
      const product = await Product.findById(id);
      if (!product || !product.isActive) throw new Error('Product not found');
      return product;
    },

    featuredProducts: async () => {
      return await Product.find({ isActive: true, isFeatured: true }).limit(12);
    },

    searchSuggestions: async (parent, { query }) => {
      if (!query || query.length < 2) return [];

      const suggestions = [];

      const brands = await Product.distinct('brand', {
        brand: new RegExp(query, 'i'),
        isActive: true
      });
      brands.slice(0, 3).forEach(b => suggestions.push(b));

      const categories = await Product.distinct('category', {
        category: new RegExp(query, 'i'),
        isActive: true
      });
      categories.slice(0, 3).forEach(c => suggestions.push(c));

      const products = await Product.find({
        name: new RegExp(query, 'i'),
        isActive: true
      }).select('name').limit(5);

      products.forEach(p => suggestions.push(p.name));

      return suggestions.slice(0, 8);
    }
  },

  Mutation: {
    createProduct: async (parent, { input }, { user }) => {
      requireAdmin(user);
      const product = new Product(input);
      await product.save();
      return product;
    },

    updateProduct: async (parent, { id, input }, { user }) => {
      requireAdmin(user);
      const product = await Product.findByIdAndUpdate(id, input, { new: true, runValidators: true });
      if (!product) throw new Error('Product not found');
      return product;
    },

    deleteProduct: async (parent, { id }, { user }) => {
      requireAdmin(user);
      const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
      return !!product;
    }
  }
};

module.exports = productResolvers;
