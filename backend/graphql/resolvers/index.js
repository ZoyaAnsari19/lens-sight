const { DateResolver } = require('graphql-scalars');
const userResolvers = require('./userResolvers');
const productResolvers = require('./productResolvers');
const cartResolvers = require('./cartResolvers');
const orderResolvers = require('./orderResolvers');
const wishlistResolvers = require('./wishlistResolvers');

const resolvers = {
  Date: DateResolver,

  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
    ...cartResolvers.Query,
    ...orderResolvers.Query,
    ...wishlistResolvers.Query
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...wishlistResolvers.Mutation
  }
};

module.exports = resolvers;