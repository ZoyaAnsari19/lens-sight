import React from "react";
import { useQuery } from "@apollo/client";
import { GET_NEW_ARRIVALS } from "../graphql/queries";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// ✅ Import utility functions
import { formatPrice, calculateDiscountPrice, getPagination, getStars } from "../lib/utils";

// --- Product type ---
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  isNewArrival: boolean;
  discount?: number | null;
  stock: number;
  rating?: number;
}

interface ProductsQueryData {
  products: {
    products: Product[];
    totalPages: number;
    currentPage: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface ProductsQueryVars {
  page?: number;
  limit?: number;
}

const NewArrivals: React.FC = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Fetch page 1, 12 items per page
  const { data, loading, error } = useQuery<ProductsQueryData, ProductsQueryVars>(
    GET_NEW_ARRIVALS,
    {
      variables: { page: 1, limit: 12 },
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        ❌ Failed to load new arrivals. Please try again later.
      </p>
    );
  }

  const products = data?.products?.products || [];
  const { totalProducts } = data?.products || {};

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No new arrivals found. Check back soon! 👀
      </p>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        ✨ New Arrivals {typeof totalProducts === "number" && `(${totalProducts} found)`}
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const discountedPrice = calculateDiscountPrice(product.price, product.discount || 0);
          const stars = getStars(product.rating || 0);

          return (
            <ProductCard
              key={product.id}
              product={product}
              price={formatPrice(product.price)}
              discountedPrice={formatPrice(discountedPrice)}
              stars={stars}
              onAddToCart={() => addToCart(product)}
              onAddToWishlist={() => addToWishlist(product)}
            />
          );
        })}
      </div>

      {/* Pagination controls can be added here if needed */}
    </div>
  );
};

export default NewArrivals;
