import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '@/models/Product';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { showToast } from "@/utils/toast";

interface ProductCardProps {
  product: Product;
  price?: string;
  stars?: {
    full: number;
    half: number;
    empty: number;
  };
  discountedPrice?: string;
  isWishlisted?: boolean;
  toggleWishlist?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 group">
    <div className="relative">
      {product.isNewArrival && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
          <Sparkles className="w-3 h-3" /> NEW
        </div>
      )}
      {product.discount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
          -{product.discount}%
        </div>
      )}
      <img
        src={product.image}
        alt={product.name || product.brand || product.category || "Product"}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />

      {/* Wishlist Button - top right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const productName = product.name || product.brand || product.category || "Product";
          if (inWishlist) {
            removeFromWishlist(product.id);
            showToast(`${productName} removed from wishlist`, "info");
          } else {
            addToWishlist(product);
            showToast(`${productName} added to wishlist`, "success");
          }
        }}
        className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
          inWishlist
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-md'
        }`}
        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
      </button>
    </div>

    {/* Product Info */}
    <div className="p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name || product.brand || product.category || "Unnamed Product"}
        </h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
      </div>
      <div className="mb-4">
        {product.discount ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Add to Cart Button - bottom full width */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const productName = product.name || product.brand || product.category || "Product";
          addToCart(product);
          showToast(`${productName} added to cart!`, "success");
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart className="w-4 h-4" /> Add to Cart
      </button>
    </div>
  </div>
);
}
