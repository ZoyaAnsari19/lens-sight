const Membership = require('../../models/Membership');

const membershipResolvers = {
  Query: {
    // Get all memberships
    memberships: async () => {
      try {
        return await Membership.find();
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch memberships');
      }
    },

    // Get membership by ID
    membership: async (_, { id }) => {
      try {
        return await Membership.findById(id);
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch membership');
      }
    }
  },

  searchSuggestions: async (_, { keyword }) => {
      try {
        // Example: dummy array of suggestions
        const suggestions = ["Glasses", "Sunglasses", "Contact Lenses", "Frames"];
        return suggestions.filter(s => s.toLowerCase().includes(keyword.toLowerCase()));
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch search suggestions');
      }
    },


  Mutation: {
    addMembership: async (_, { input }) => {
      try {
        const newMembership = new Membership(input);
        await newMembership.save();
        return newMembership;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to add membership');
      }
    },

    updateMembership: async (_, { id, input }) => {
      try {
        const updated = await Membership.findByIdAndUpdate(id, input, { new: true });
        return updated;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to update membership');
      }
    },

    deleteMembership: async (_, { id }) => {
      try {
        await Membership.findByIdAndDelete(id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
};

module.exports = membershipResolvers;
