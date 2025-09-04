const Wishlist = require('../../models/Wishlist');
const Product = require('../../models/Product');
const { requireAuth } = require('../../middleware/auth');

const wishlistResolvers = {
  Query: {
    myWishlist: async (parent, args, { user }) => {
      const authUser = requireAuth(user);
      
      let wishlist = await Wishlist.findOne({ user: authUser.userId })
        .populate('products.product')
        .populate('user');

      if (!wishlist) {
        wishlist = new Wishlist({ user: authUser.userId, products: [] });
        await wishlist.save();
        wishlist = await Wishlist.findById(wishlist._id)
          .populate('products.product')
          .populate('user');
      }

      return wishlist;
    }
  },

  Mutation: {
    addToWishlist: async (parent, { productId }, { user }) => {
      const authUser = requireAuth(user);

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        throw new Error('Product not found');
      }

      // Find or create wishlist
      let wishlist = await Wishlist.findOne({ user: authUser.userId });
      if (!wishlist) {
        wishlist = new Wishlist({ user: authUser.userId, products: [] });
      }

      // Check if product already in wishlist
      const existingProduct = wishlist.products.find(
        item => item.product.toString() === productId
      );

      if (existingProduct) {
        throw new Error('Product already in wishlist');
      }

      wishlist.products.push({ product: productId });
      await wishlist.save();

      return await Wishlist.findById(wishlist._id)
        .populate('products.product')
        .populate('user');
    },

    removeFromWishlist: async (parent, { productId }, { user }) => {
      const authUser = requireAuth(user);

      const wishlist = await Wishlist.findOne({ user: authUser.userId });
      if (!wishlist) {
        throw new Error('Wishlist not found');
      }

      wishlist.products = wishlist.products.filter(
        item => item.product.toString() !== productId
      );

      await wishlist.save();

      return await Wishlist.findById(wishlist._id)
        .populate('products.product')
        .populate('user');
    },

    clearWishlist: async (parent, args, { user }) => {
      const authUser = requireAuth(user);

      await Wishlist.findOneAndUpdate(
        { user: authUser.userId },
        { products: [] }
      );

      return true;
    }
  }
};

module.exports = wishlistResolvers;