const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const { requireAuth } = require('../../middleware/auth');

const cartResolvers = {
  Query: {
    myCart: async (parent, args, { user }) => {
      const authUser = requireAuth(user);
      
      let cart = await Cart.findOne({ user: authUser.userId })
        .populate('items.product')
        .populate('user');

      if (!cart) {
        cart = new Cart({ user: authUser.userId, items: [] });
        await cart.save();
        cart = await Cart.findById(cart._id)
          .populate('items.product')
          .populate('user');
      }

      return cart;
    }
  },

  Mutation: {
    addToCart: async (parent, { input }, { user }) => {
      const authUser = requireAuth(user);
      const { productId, quantity } = input;

      // Check if product exists and is in stock
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        throw new Error('Product not found');
      }

      if (product.stock < quantity) {
        throw new Error('Insufficient stock');
      }

      // Find or create cart
      let cart = await Cart.findOne({ user: authUser.userId });
      if (!cart) {
        cart = new Cart({ user: authUser.userId, items: [] });
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newQuantity = cart.items[existingItemIndex].quantity + quantity;
        if (product.stock < newQuantity) {
          throw new Error('Insufficient stock');
        }
        cart.items[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          priceAtTime: product.price
        });
      }

      await cart.save();
      return await Cart.findById(cart._id)
        .populate('items.product')
        .populate('user');
    },

    updateCartItem: async (parent, { input }, { user }) => {
      const authUser = requireAuth(user);
      const { productId, quantity } = input;

      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      const cart = await Cart.findOne({ user: authUser.userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      // Check stock
      const product = await Product.findById(productId);
      if (product.stock < quantity) {
        throw new Error('Insufficient stock');
      }

      cart.items[itemIndex].quantity = quantity;
      await cart.save();

      return await Cart.findById(cart._id)
        .populate('items.product')
        .populate('user');
    },

    removeFromCart: async (parent, { productId }, { user }) => {
      const authUser = requireAuth(user);

      const cart = await Cart.findOne({ user: authUser.userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );

      await cart.save();
      return await Cart.findById(cart._id)
        .populate('items.product')
        .populate('user');
    },

    clearCart: async (parent, args, { user }) => {
      const authUser = requireAuth(user);

      await Cart.findOneAndUpdate(
        { user: authUser.userId },
        { items: [] }
      );

      return true;
    }
  }
};

module.exports = cartResolvers;