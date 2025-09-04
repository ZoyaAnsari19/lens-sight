import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// Add to wishlist
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = new Wishlist({ productId });
    await wishlist.save();
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from wishlist
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    await Wishlist.findOneAndDelete({ productId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all wishlist items
router.get("/", async (req, res) => {
  try {
    const items = await Wishlist.find().populate("productId");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
