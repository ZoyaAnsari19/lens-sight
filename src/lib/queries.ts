import { gql } from "@apollo/client";

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