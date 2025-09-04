// import React from "react";
// import { useQuery } from "@apollo/client";
// import { GET_PRODUCTS } from "@/graphql/queries";

// export default function KidsGlasses() {
//   const { data, loading, error } = useQuery(GET_PRODUCTS, {
//     variables: { page: 1, limit: 24, filter: { category: "Kids Glasses" } },
//   });

//   if (loading) return <div className="p-10 text-lg">Loading...</div>;
//   if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
//       {data?.products.items.map((p: any) => (
//         <div key={p.id} className="border rounded-lg shadow-sm p-4 hover:shadow-md">
//           <img
//             src={p.image || "https://via.placeholder.com/300x200.png?text=No+Image"}
//             alt={p.brand}
//             className="w-full h-40 object-cover mb-2 rounded"
//           />
//           <h3 className="text-md font-semibold">{p.brand}</h3>
//           <p className="text-sm text-gray-600">{p.category}</p>
//           <p className="text-lg font-bold">₹{p.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { Product } from "../models/Product";
import ProductCard from "@/components/ProductCard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function KidsEyeglasses() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { page: 1, limit: 24, filter: { category: "KidsEyeglasses" } },
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
      <h2 className="text-2xl font-semibold mb-4">Kids Eyeglasses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {data?.products?.map((p: Product) => (
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
            </div>
          );
        }