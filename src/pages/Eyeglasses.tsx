import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { Product } from "../models/Product";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";

export default function Eyeglasses() {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 12, filter: { category: "Eyeglasses" } },
    fetchPolicy: "network-only",
  });

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.brand} added to cart! ✅`);
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    toast.success(`${product.brand} added to wishlist! 💖`);
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );

  // ✅ Safely get products array from paginated response
  const productsArray: Product[] = Array.isArray(data?.products?.products)
    ? data.products.products
    : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Eyeglasses</h2>

      {productsArray.length === 0 && (
        <p>No Eyeglasses found. Please check back later.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {productsArray.map((p: Product) => (
          <div key={p.id} className="border rounded-md p-4 shadow-md">
            <img
              src={p.image || "/placeholder.jpg"}
              alt={p.name}
              className="w-full h-48 object-cover mb-2 rounded"
              loading="lazy"
            />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-gray-500">{p.brand}</p>
            <p className="font-bold">₹{p.price}</p>
            {p.discount && (
              <p className="text-red-500 text-sm">{p.discount}% OFF</p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleAddToCart(p)}
                className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToWishlist(p)}
                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
