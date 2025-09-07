import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductCard } from "@/components/ProductCard"; 
import { Product } from "@/models/Product"; 

export default function Products() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 12 },
    fetchPolicy: "network-only",
  });

  // Handle loading and error states first
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products: Product[] = data?.products?.data?.items || [];
  
  
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
