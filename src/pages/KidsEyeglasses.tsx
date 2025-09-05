import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { Product } from "../models/Product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function KidsEyeglasses() {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { page, limit: 24, filter: { category: "kids-eyeglasses" } },
    fetchPolicy: "network-only",
  });

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.brand} added to cart! ✅`);
  };

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">Error: {error.message}</div>;
  if (!data?.products?.products.length) return <div className="p-10">No products found.</div>;

  const { products, currentPage, totalPages } = data.products;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    fetchMore({
      variables: { page: newPage, limit: 24, filter: { category: "kids-eyeglasses" } },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kids Eyeglasses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: Product) => (
          <div key={p.id} className="border rounded-lg shadow p-2">
            <img
              src={p.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.brand}</p>
            <p className="text-blue-600 font-bold">₹{p.price}</p>
            <button
              onClick={() => handleAddToCart(p)}
              className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
