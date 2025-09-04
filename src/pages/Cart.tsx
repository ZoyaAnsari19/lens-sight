import React from "react";
import { useCart, CartItem } from "../context/CartContext";

export default function Cart() {   
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) return <p className="p-6">Cart is empty.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      <div className="grid gap-4">
        {cart.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
