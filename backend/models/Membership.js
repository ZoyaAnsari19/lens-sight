const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "1 Year"
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // optional
  description: { type: String, required: true },
  isLimitedTime: { type: Boolean, default: false }
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
