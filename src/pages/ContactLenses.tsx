import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/models/Product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ContactLenses() {
  const [page, setPage] = useState(1);

  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { page, limit: 24, filter: { category: "contact-lenses" } },
    fetchPolicy: "network-only",
  });

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.brand} added to cart! ✅`);
  };

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading products</div>;
  if (!data?.products?.products.length) return <div className="p-10 text-lg">No products found.</div>;

  const { products, currentPage, totalPages } = data.products;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    fetchMore({
      variables: { page: newPage, limit: 24, filter: { category: "contact-lenses" } },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Lenses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p: Product) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => handleAddToCart(p)}
          />
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
        <span className="self-center">Page {currentPage} of {totalPages}</span>
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
