import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const item = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const item = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const item = await Wishlist.findOne({ userId }).populate("products");
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
