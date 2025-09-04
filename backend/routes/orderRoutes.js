import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Track Order by orderId
router.get("/track-order/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Track order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

