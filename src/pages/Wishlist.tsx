import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../models/Product";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0)
    return <p className="p-6 text-gray-500">Your wishlist is empty.</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((p: Product) => (
        <div key={p.id} className="border rounded-md p-4 shadow-md">
          <img
            src={p.image || "/placeholder.jpg"}
            alt={p.name}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-gray-500">{p.brand}</p>
          <p className="font-bold">₹{p.price}</p>
          <button
            onClick={() => removeFromWishlist(p.id)}
            className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
