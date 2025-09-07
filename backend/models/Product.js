const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxLength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'eyeglasses',
        'sunglasses',
        'contact-lenses',
        'kids-eyeglasses',
        'computer-glasses',
        'reading-glasses',
        'screen-glasses',
      ],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    frameType: {
      type: String,
      enum: [
        'full-rim',
        'half-rim',
        'rimless',
        'cat-eye',
        'round',
        'square',
        'rectangle',
        'aviator',
        'wayfarer',
      ],
    },
    frameColor: {
      type: String,
      required: [true, 'Frame color is required'],
    },
    lensColor: {
      type: String,
      default: 'clear',
    },
    material: {
      type: String,
      enum: ['plastic', 'metal', 'titanium', 'acetate', 'wood', 'carbon-fiber'],
    },
    size: {
      width: Number,
      height: Number,
      bridgeWidth: Number,
      templeLength: Number,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    features: [String],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5'],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Indexes for performance
productSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });

// ✅ Response me _id hatake sirf "id" rakho
productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('Product', productSchema);
