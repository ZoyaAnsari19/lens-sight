const Order = require('../../models/Order.js');
const Cart = require('../../models/Cart.js');
const Product = require('../../models/Product.js');
const User = require('../../models/User.js');
const { requireAuth, requireAdmin } = require('../../middleware/auth');

const orderResolvers = {
  Query: {
    myOrders: async (parent, args, { user }) => {
      const authUser = requireAuth(user);
      
      return await Order.find({ user: authUser.userId })
        .populate('items.product')
        .populate('user')
        .sort({ createdAt: -1 });
    },

    order: async (parent, { id }, { user }) => {
      const authUser = requireAuth(user);
      
      const order = await Order.findById(id)
        .populate('items.product')
        .populate('user');

      if (!order) {
        throw new Error('Order not found');
      }

      // Users can only view their own orders, admins can view any
      const userData = await User.findById(authUser.userId);
      if (userData.role !== 'admin' && order.user._id.toString() !== authUser.userId) {
        throw new Error('Access denied');
      }

      return order;
    },

    allOrders: async (parent, args, { user }) => {
      requireAdmin(user);
      
      return await Order.find()
        .populate('items.product')
        .populate('user')
        .sort({ createdAt: -1 });
    },

    orderStats: async (parent, args, { user }) => {
      requireAdmin(user);
      
      const totalOrders = await Order.countDocuments();
      const completedOrders = await Order.countDocuments({ orderStatus: 'delivered' });
      const pendingOrders = await Order.countDocuments({ 
        orderStatus: { $in: ['pending', 'confirmed', 'processing', 'shipped'] } 
      });

      const revenueResult = await Order.aggregate([
        { $match: { orderStatus: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);

      const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

      return {
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders
      };
    }
  },

  Mutation: {
    createOrder: async (parent, { input }, { user }) => {
      const authUser = requireAuth(user);
      const { shippingAddress, paymentMethod } = input;

      // Get user's cart
      const cart = await Cart.findOne({ user: authUser.userId })
        .populate('items.product');

      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Verify stock availability and prepare order items
      const orderItems = [];
      let subtotal = 0;

      for (const cartItem of cart.items) {
        const product = cartItem.product;
        
        if (!product.isActive) {
          throw new Error(`Product ${product.name} is no longer available`);
        }

        if (product.stock < cartItem.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        orderItems.push({
          product: product._id,
          name: product.name,
          price: cartItem.priceAtTime,
          quantity: cartItem.quantity,
          image: product.images[0]?.url || ''
        });

        subtotal += cartItem.priceAtTime * cartItem.quantity;
      }

      // Calculate totals
      const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
      const tax = subtotal * 0.18; // 18% GST
      const totalAmount = subtotal + shippingCost + tax;

      // Create order
      const order = new Order({
        user: authUser.userId,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        shippingCost,
        tax,
        totalAmount,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      await order.save();

      // Update product stock
      for (const cartItem of cart.items) {
        await Product.findByIdAndUpdate(
          cartItem.product._id,
          { $inc: { stock: -cartItem.quantity } }
        );
      }

      // Clear cart
      cart.items = [];
      await cart.save();

      return await Order.findById(order._id)
        .populate('items.product')
        .populate('user');
    },

    updateOrderStatus: async (parent, { orderId, status }, { user }) => {
      requireAdmin(user);

      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      order.orderStatus = status;

      if (status === 'delivered') {
        order.deliveredAt = new Date();
        order.paymentStatus = 'paid';
      } else if (status === 'cancelled') {
        order.cancelledAt = new Date();
        
        // Restore product stock
        for (const item of order.items) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: item.quantity } }
          );
        }
      }

      await order.save();

      return await Order.findById(order._id)
        .populate('items.product')
        .populate('user');
    },

    cancelOrder: async (parent, { orderId }, { user }) => {
      const authUser = requireAuth(user);

      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      if (order.user.toString() !== authUser.userId) {
        throw new Error('Access denied');
      }

      if (!['pending', 'confirmed'].includes(order.orderStatus)) {
        throw new Error('Order cannot be cancelled at this stage');
      }

      order.orderStatus = 'cancelled';
      order.cancelledAt = new Date();

      // Restore product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } }
        );
      }

      await order.save();

      return await Order.findById(order._id)
        .populate('items.product')
        .populate('user');
    }
  }
};

module.exports = orderResolvers;