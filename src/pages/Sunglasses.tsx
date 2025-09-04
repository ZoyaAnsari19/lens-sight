import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { Product } from "../models/Product";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; 
import toast from "react-hot-toast";

export default function Sunglasses() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 24, filter: { category: "Sunglasses" } },
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

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sunglasses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((p: Product) => (
          <ProductCard key={p.id} product={p} />

      ))}
      </div>
    </div>
  );
}
