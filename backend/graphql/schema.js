const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # ----- Product -----
  type Product {
    id: ID!
    name: String
    brand: String!
    category: String!
    price: Float!
    originalPrice: Float
    image: String
    discount: Float
    stock: Int
    isFeatured: Boolean
    isNewArrival: Boolean
  }

  input ProductInput {
    name: String
    brand: String!
    category: String!
    price: Float!
    originalPrice: Float
    image: String
    discount: Float
    stock: Int
    isFeatured: Boolean
    isNewArrival: Boolean
  }

  input ProductFilter {
    category: String
    brand: String
    isFeatured: Boolean
    isNewArrival: Boolean
  }

  type PaginatedProducts {
    products: [Product!]!
    totalPages: Int!
    currentPage: Int!
    totalProducts: Int!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
  }

  # ----- User -----
  type User {
    id: ID!
    name: String
    email: String!
    password: String!
    wishlist: [Product]
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  # ----- Auth -----
  type AuthPayload {
    token: String!
    user: User!
  }

  # ----- Order -----
  type Order {
    id: ID!
    user: User!
    products: [Product]!
    total: Float!
    status: String
    createdAt: String
  }

  input OrderInput {
    productIds: [ID]!
  }

  # ----- Cart -----
  type Cart {
    id: ID!
    user: User!
    items: [CartItem]!
    totalAmount: Float
    totalItems: Int
    createdAt: String
  }

  type CartItem {
    product: Product!
    quantity: Int!
    priceAtTime: Float
  }

  type Membership {
    id: ID!
    name: String!
    duration: String!
    price: Float!
    originalPrice: Float
    description: String
    isLimitedTime: Boolean
  }

  input MembershipInput {
    name: String!
    duration: String!
    price: Float!
    originalPrice: Float
    description: String
    isLimitedTime: Boolean
  }

  type Suggestion {
    type: String!
    value: String!
  }

  type OrderStats {
    totalOrders: Int!
    totalRevenue: Float!
    pendingOrders: Int!
    completedOrders: Int!
  }

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String
    postalCode: String!
    country: String!
  }

  type Wishlist {
    id: ID!
    user: User!
    products: [Product!]!
  }

  # ----- Queries -----
  type Query {
    me: User
    products(page: Int, limit: Int, filter: ProductFilter): PaginatedProducts!
    product(id: ID!): Product
    featuredProducts: [Product!]!
    myCart: Cart
    myOrders: [Order!]!
    myWishlist: [Product!]!

    memberships(type: String): [Membership!]!
    membership(id: ID!): Membership

    users: [User!]!
    user(id: ID!): User

    orders: [Order!]!
    order(id: ID!): Order   
    allOrders: [Order!]!
    orderStats: OrderStats!
    
    searchSuggestions(keyword: String!): [String!]!
  }

  # ----- Mutations -----
  type Mutation {
    addProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Boolean

    createProduct(input: ProductInput!): Product 

    addUser(input: UserInput!): User

    register(input: UserInput!): User
    login(email: String!, password: String!): AuthPayload
    createOrder(input: OrderInput!): Order

    updateOrderStatus(orderId: ID!, status: String!): Order 
    cancelOrder(orderId: ID!): Order 

    updateProfile(input: UserInput!): User

    addAddress(input: AddressInput!): Address
    updateAddress(id: ID!, input: AddressInput!): Address  
    deleteAddress(id: ID!): Boolean

    addToWishlist(productId: ID!): Wishlist
    removeFromWishlist(productId: ID!): Wishlist
    clearWishlist: Wishlist

    addToCart(productId: ID!, quantity: Int!): Cart
    removeFromCart(productId: ID!): Cart
    updateCartItem(productId: ID!, quantity: Int!): Cart
    clearCart: Cart

    addMembership(input: MembershipInput!): Membership   
    updateMembership(id: ID!, input: MembershipInput!): Membership
    deleteMembership(id: ID!): Boolean
  }
`;

module.exports = typeDefs;