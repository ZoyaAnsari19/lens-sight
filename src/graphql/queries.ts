import { gql } from "@apollo/client";

// ---------- Types ----------
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  discount?: number;
  stock?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist?: Product[];
}

export interface Order {
  id: string;
  user: User;
  products: Product[];
  total: number;
  status?: string;
  createdAt?: string;
}

export interface PaginatedProducts {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Membership {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description?: string;
  isLimitedTime?: boolean;
}

export interface AuthPayload {
  token: string;
  user: User;
}

// Optional filter type
export interface ProductFilter {
  category?: string;
  brand?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

// ---------- Queries ----------
export const GET_PRODUCTS = gql`
  query GetAllProducts($page: Int, $limit: Int, $filter: ProductFilter) {
    products(page: $page, limit: $limit, filter: $filter) {
      products {
        id
        name
        brand
        category
        price
        originalPrice
        image
        stock
        isFeatured
        isNewArrival
        discount
      }
      totalPages
      currentPage
      totalProducts
      hasNextPage
      hasPrevPage
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    featuredProducts {
      id
      name
      brand
      category
      price
      originalPrice
      image
      stock
      isFeatured
      discount
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      brand
      category
      price
      originalPrice
      image
      stock
      discount
      isFeatured
      isNewArrival
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      wishlist {
        id
        name
        brand
        category
        price
        originalPrice
        image
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      name
      email
      wishlist {
        id
        name
        brand
        price
        originalPrice
        category
        image
      }
    }
  }
`;

// Updated BLU Products Query - Fixed to match backend response structure
export const GET_BLU_PRODUCTS = gql`
  query GetAllBluProducts($page: Int, $limit: Int) {
    products(page: $page, limit: $limit, filter: { category: "Blu" }) {
      products {
        id
        name
        brand
        category
        price
        originalPrice
        image
        stock
        isFeatured
        isNewArrival
        discount
      }
      totalPages
      currentPage
      totalProducts
      hasNextPage
      hasPrevPage
    }
  }
`;

export const GET_NEW_ARRIVALS = gql`
  query GetNewArrivals($page: Int, $limit: Int) {
    products(page: $page, limit: $limit, filter: { isNewArrival: true }) {
      products {
        id
        name
        brand
        category
        price
        originalPrice
        image
        isNewArrival
        discount
        stock
      }
      totalPages
      currentPage
      totalProducts
      hasNextPage
      hasPrevPage
    }
  }
`;

export const GET_MEMBERSHIPS = gql`
  query GetMemberships($type: String) {
    memberships(type: $type) {
      id
      name
      duration
      price
      originalPrice
      description
      isLimitedTime
    }
  }
`;

// ---------- Mutations ----------
export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($productId: ID!) {
    addToWishlist(productId: $productId) {
      id
      user {
        id
        name
        email
      }
      products {
        id
        name
        brand
        price
        originalPrice
        image
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($productId: ID!) {
    removeFromWishlist(productId: $productId) {
      id
      user {
        id
        name
        email
      }
      products {
        id
        name
        brand
        price
        originalPrice
        image
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      total
      status
      products {
        id
        name
        price
        originalPrice
        brand
      }
      user {
        id
        name
        email
      }
      createdAt
    }
  }
`;

export const TRACK_ORDER = gql`
  query TrackOrder($id: ID!) {
    order(id: $id) {
      id
      total
      status
      products {
        id
        name
        price
        originalPrice
        brand
      }
      user {
        id
        name
        email
      }
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      id
      name
      email
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInput!) {
    addProduct(input: $input) {
      id
      name
      brand
      category
      price
      originalPrice
      image
      stock
      isFeatured
      isNewArrival
      discount
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      brand
      category
      price
      originalPrice
      image
      stock
      isFeatured
      isNewArrival
      discount
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;