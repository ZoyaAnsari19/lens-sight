import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/models/Product";

interface ProductGridProps {
  category?: string;
  products: Product[];
  addToCart: (p: Product) => void;
  addToWishlist: (p: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      page: 1,
      limit: 24,
      filter: category ? { category } : {},
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>;

  const products: Product[] = data?.products?.items || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {category ? `${category} Collection` : "All Products"}
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
