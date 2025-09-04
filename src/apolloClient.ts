import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/graphql";

export const client = new ApolloClient({
  link: new HttpLink({ 
    uri: apiUrl,
    credentials: 'include',
    headers: {},
   }),
  cache: new InMemoryCache(),
});

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int!, $limit: Int!) {
    products(page: $page, limit: $limit) {
      products {
        id
        name
        brand
        category
        price
        image
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

export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
      variables: { page, limit },
      fetchPolicy: "no-cache", // optional, fresh data each time
    });
    return data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return null;
  }
};