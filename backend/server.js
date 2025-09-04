require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// Import all resolvers
const membershipResolvers = require('./graphql/resolvers/membershipResolvers');
const productResolvers = require('./graphql/resolvers/productResolvers');
const orderResolvers = require('./graphql/resolvers/orderResolvers');
const userResolvers = require('./graphql/resolvers/userResolvers');
const wishlistResolvers = require('./graphql/resolvers/wishlistResolvers');
const cartResolvers = require('./graphql/resolvers/cartResolvers');

// Import schema
const typeDefs = require('./graphql/schema');

const startServer = async () => {
  const app = express();

  // Security middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
  app.use(express.json());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  });
  app.use(limiter);

  // Merge all resolvers
  const resolvers = {
    Query: {
      ...membershipResolvers.Query,
      ...productResolvers.Query,
      ...orderResolvers.Query,
      ...userResolvers.Query,
      ...wishlistResolvers.Query,
      ...cartResolvers.Query,
    },
    Mutation: {
      ...membershipResolvers.Mutation,
      ...productResolvers.Mutation,
      ...orderResolvers.Mutation,
      ...userResolvers.Mutation,
      ...wishlistResolvers.Mutation,
      ...cartResolvers.Mutation,
    },
  };

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => { { user: req.user || null };
    },
  });

  await server.start();

  // Attach GraphQL endpoint
  server.applyMiddleware({ app, path: '/graphql', cors: true });

  // MongoDB connection
  mongoose
    .connect(
      process.env.MONGO_URI ||
        'mongodb+srv://Zoya:zoya123@cluster0.sktolrf.mongodb.net/lenskart?retryWrites=true&w=majority&appName=Cluster0',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
