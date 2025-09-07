const mongoose = require('mongoose');

// ----- Schemas -----
const ProductSchema = new mongoose.Schema({
  
  name: String,
  brand: String,
  category: String,
  price: Number,
  originalPrice: Number,
  image: String,
  discount: Number,
  stock: Number,
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
});
const Product = mongoose.model('Product', ProductSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
const User = mongoose.model('User', UserSchema);

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  description: String,
  isLimitedTime: { type: Boolean, default: false },
});
const Membership = mongoose.model('Membership', MembershipSchema);

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    priceAtTime: Number,
  }],
  createdAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model('Cart', CartSchema);

// ----- Helper Functions -----
const mapProduct = (p) => ({
  id: p._id.toString(),
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.image,
  discount: p.discount,
  stock: p.stock,
  isFeatured: p.isFeatured,
  isNewArrival: p.isNewArrival,
});

const mapUser = (u) => ({
  id: u._id.toString(),
  name: u.name,
  email: u.email,
  password: u.password,
  wishlist: u.wishlist ? u.wishlist.map(mapProduct) : [],
});

const mapOrder = (o) => ({
  id: o._id.toString(),
  user: o.user,
  products: o.products ? o.products.map(mapProduct) : [],
  total: o.total,
  status: o.status,
  createdAt: o.createdAt.toISOString(),
});

const mapMembership = (m) => ({
  id: m._id.toString(),
  name: m.name,
  duration: m.duration,
  price: m.price,
  originalPrice: m.originalPrice,
  description: m.description,
  isLimitedTime: m.isLimitedTime,
});

// ----- Resolvers -----
const resolvers = {
  Query: {
    me: async (_, __, { userId }) => {
      if (!userId) return null;
      const user = await User.findById(userId).populate('wishlist');
      return user ? mapUser(user) : null;
    },

    products: async (_, { page = 1, limit = 10, filter }) => {
      try {
        const query = {};
        
        // Apply filters
        if (filter?.category) query.category = filter.category;
        if (filter?.brand) query.brand = filter.brand;
        if (filter?.isFeatured !== undefined) query.isFeatured = filter.isFeatured;
        if (filter?.isNewArrival !== undefined) query.isNewArrival = filter.isNewArrival;

        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(limit);

        return {
          products: products.map(mapProduct),
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: page,
          totalProducts,
          hasNextPage: page * limit < totalProducts,
          hasPrevPage: page > 1,
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
    },

    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        return product ? mapProduct(product) : null;
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    },

    featuredProducts: async () => {
      try {
        const products = await Product.find({ isFeatured: true });
        return products.map(mapProduct);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
      }
    },

    myCart: async (_, __, { userId }) => {
      if (!userId) return null;
      try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) return null;

        const totalAmount = cart.items.reduce((sum, item) => {
          return sum + (item.priceAtTime || item.product.price) * item.quantity;
        }, 0);

        return {
          id: cart._id.toString(),
          user: userId,
          items: cart.items.map(item => ({
            product: mapProduct(item.product),
            quantity: item.quantity,
            priceAtTime: item.priceAtTime || item.product.price,
          })),
          totalAmount,
          totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
          createdAt: cart.createdAt.toISOString(),
        };
      } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
      }
    },

    myOrders: async (_, __, { userId }) => {
      if (!userId) return [];
      try {
        const orders = await Order.find({ user: userId }).populate('products');
        return orders.map(mapOrder);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    },

    myWishlist: async (_, __, { userId }) => {
      if (!userId) return [];
      try {
        const user = await User.findById(userId).populate('wishlist');
        return user ? user.wishlist.map(mapProduct) : [];
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        return [];
      }
    },

    memberships: async (_, { type }) => {
      try {
        const query = type ? { duration: type } : {};
        const memberships = await Membership.find(query);
        return memberships.map(mapMembership);
      } catch (error) {
        console.error('Error fetching memberships:', error);
        return [];
      }
    },

    membership: async (_, { id }) => {
      try {
        const membership = await Membership.findById(id);
        return membership ? mapMembership(membership) : null;
      } catch (error) {
        console.error('Error fetching membership:', error);
        return null;
      }
    },

    users: async () => {
      try {
        const users = await User.find().populate('wishlist');
        return users.map(mapUser);
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    },

    user: async (_, { id }) => {
      try {
        const user = await User.findById(id).populate('wishlist');
        return user ? mapUser(user) : null;
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },

    orders: async () => {
      try {
        const orders = await Order.find().populate('products').populate('user');
        return orders.map(mapOrder);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    },

    order: async (_, { id }) => {
      try {
        const order = await Order.findById(id).populate('products').populate('user');
        return order ? mapOrder(order) : null;
      } catch (error) {
        console.error('Error fetching order:', error);
        return null;
      }
    },

    allOrders: async () => {
      try {
        const orders = await Order.find().populate('products').populate('user');
        return orders.map(mapOrder);
      } catch (error) {
        console.error('Error fetching all orders:', error);
        return [];
      }
    },

    orderStats: async () => {
      try {
        const totalOrders = await Order.countDocuments();
        const completedOrders = await Order.countDocuments({ status: 'completed' });
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        
        const revenueResult = await Order.aggregate([
          { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        return {
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders,
        };
      } catch (error) {
        console.error('Error fetching order stats:', error);
        return {
          totalOrders: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          completedOrders: 0,
        };
      }
    },

    searchSuggestions: async (_, { keyword }) => {
      try {
        const products = await Product.find({
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } }
          ]
        }).limit(5);
        
        return products.map(p => p.name);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        return [];
      }
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }
        
        const user = await User.create(input);
        return mapUser(user);
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          throw new Error('Invalid credentials');
        }
        
        // In production, use proper JWT token generation
        const token = 'fake-jwt-token-' + user._id;
        
        return {
          token,
          user: mapUser(user)
        };
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error(error.message);
      }
    },

    addToWishlist: async (_, { productId }, { userId }) => {
      if (!userId) throw new Error('Authentication required');
      
      try {
        const user = await User.findById(userId);
        if (!user.wishlist.includes(productId)) {
          user.wishlist.push(productId);
          await user.save();
        }
        
        await user.populate('wishlist');
        return {
          id: user._id.toString(),
          user: mapUser(user),
          products: user.wishlist.map(mapProduct),
        };
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw new Error('Failed to add to wishlist');
      }
    },

    removeFromWishlist: async (_, { productId }, { userId }) => {
      if (!userId) throw new Error('Authentication required');
      
      try {
        const user = await User.findById(userId);
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();
        
        await user.populate('wishlist');
        return {
          id: user._id.toString(),
          user: mapUser(user),
          products: user.wishlist.map(mapProduct),
        };
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw new Error('Failed to remove from wishlist');
      }
    },

    createOrder: async (_, { input }, { userId }) => {
      if (!userId) throw new Error('Authentication required');
      
      try {
        const products = await Product.find({ _id: { $in: input.productIds } });
        const total = products.reduce((sum, p) => sum + p.price, 0);

        const order = await Order.create({ 
          user: userId, 
          products: input.productIds, 
          total 
        });
        
        await order.populate(['products', 'user']);
        return mapOrder(order);
      } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
      }
    },

    addProduct: async (_, { input }) => {
      try {
        const product = await Product.create(input);
        return mapProduct(product);
      } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
      }
    },

    updateProduct: async (_, { id, input }) => {
      try {
        const product = await Product.findByIdAndUpdate(id, input, { new: true });
        return product ? mapProduct(product) : null;
      } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        await Product.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error('Error deleting product:', error);
        return false;
      }
    },

    addMembership: async (_, { input }) => {
      try {
        const membership = await Membership.create(input);
        return mapMembership(membership);
      } catch (error) {
        console.error('Error adding membership:', error);
        throw new Error('Failed to add membership');
      }
    },

    updateMembership: async (_, { id, input }) => {
      try {
        const membership = await Membership.findByIdAndUpdate(id, input, { new: true });
        return membership ? mapMembership(membership) : null;
      } catch (error) {
        console.error('Error updating membership:', error);
        throw new Error('Failed to update membership');
      }
    },

    deleteMembership: async (_, { id }) => {
      try {
        await Membership.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.error('Error deleting membership:', error);
        return false;
      }
    },
  },
};

module.exports = resolvers;