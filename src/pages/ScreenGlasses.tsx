import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "../models/Product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ScreenGlasses() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 24, filter: { category: "ScreenGlasses" } },
    fetchPolicy: "network-only",
  });

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.brand} added to cart! ✅`);
  };

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Screen Glasses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((p: Product) => (
          <div
            key={p.id}
            className="border rounded-lg shadow p-3 flex flex-col"
          >
            <img
              src={
                p.image && p.image.trim() !== ""
                  ? p.image
                  : "https://via.placeholder.com/300x200.png?text=No+Image"
              }
              alt={p.brand}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-2 font-semibold">{p.brand}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="text-blue-600 font-bold">₹{p.price}</p>

            <button
              onClick={() => handleAddToCart(p)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
