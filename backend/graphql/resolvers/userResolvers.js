const User = require('../../models/User');
const { generateToken, requireAuth } = require('../../middleware/auth');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const userResolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      const authUser = requireAuth(user);
      const foundUser = await User.findById(authUser.userId);
      if (!foundUser) {
        throw new AuthenticationError('User not found');
      }
      return foundUser;
    }
  },

  Mutation: {
    register: async (parent, { input }) => {
      const { name, email, password, phone } = input;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('User with this email already exists');
      }

      // Create new user
      const user = new User({ name, email, password, phone });
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      return {
        token,
        user
      };
    },

    login: async (parent, { input }) => {
      const { email, password } = input;

      // Find user with password field
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Generate token
      const token = generateToken(user._id);

      return {
        token,
        user
      };
    },

    updateProfile: async (parent, { input }, { user }) => {
      const authUser = requireAuth(user);
      
      const updatedUser = await User.findByIdAndUpdate(
        authUser.userId,
        input,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },

    addAddress: async (parent, { input }, { user }) => {
      const authUser = requireAuth(user);
      
      const foundUser = await User.findById(authUser.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }

      // If this is set as default, unset other defaults
      if (input.isDefault) {
        foundUser.address.forEach(addr => {
          addr.isDefault = false;
        });
      }

      foundUser.address.push(input);
      await foundUser.save();

      return foundUser;
    },

    updateAddress: async (parent, { id, input }, { user }) => {
      const authUser = requireAuth(user);
      
      const foundUser = await User.findById(authUser.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }

      const address = foundUser.address.id(id);
      if (!address) {
        throw new Error('Address not found');
      }

      // If this is set as default, unset other defaults
      if (input.isDefault) {
        foundUser.address.forEach(addr => {
          if (addr._id.toString() !== id) {
            addr.isDefault = false;
          }
        });
      }

      Object.assign(address, input);
      await foundUser.save();

      return foundUser;
    },

    deleteAddress: async (parent, { id }, { user }) => {
      const authUser = requireAuth(user);
      
      const foundUser = await User.findById(authUser.userId);
      if (!foundUser) {
        throw new Error('User not found');
      }

      foundUser.address.pull(id);
      await foundUser.save();

      return foundUser;
    }
  }
};

module.exports = userResolvers;