import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { TRACK_ORDER } from "../graphql/queries";
import  { Product }  from "../models/Product";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [getOrder, { data, loading, error }] = useLazyQuery(TRACK_ORDER, {
    variables: { orderId },
    fetchPolicy: "network-only",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim() !== "") {
      getOrder();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Track
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      {data?.trackOrder && (
        <div className="border p-4 rounded shadow">
          <h3 className="font-bold mb-2">Order ID: {data.trackOrder.orderId}</h3>
          <p>Status: {data.trackOrder.status}</p>
          <p>Total Amount: ₹{data.trackOrder.totalAmount}</p>
          <p>Expected Delivery: {data.trackOrder.expectedDelivery}</p>

          <h4 className="mt-4 font-semibold">Items:</h4>
          <ul className="list-disc ml-6">
            {data.trackOrder.map((item: any, idx: number) => (
              <li key={idx}>
                {item.name} - {item.qty} x ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
