import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Shield, Eye } from "lucide-react";
import { GET_BLU_PRODUCTS } from "../graphql/queries";

// ---------------- Interfaces ----------------
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image?: string;
  discount?: number;
  stock?: number;
  category: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

interface PaginatedProducts {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ProductsResponse {
  products: PaginatedProducts;
}

interface ProductsVariables {
  page?: number;
  limit?: number;
}

// ---------------- Mock Contexts ----------------
const CartContext = React.createContext({
  addToCart: (product: Product) => {},
  removeFromCart: (productId: string) => {},
  updateQuantity: (productId: string, quantity: number) => {},
});

const WishlistContext = React.createContext({
  addToWishlist: (product: Product) => {},
  removeFromWishlist: (productId: string) => {},
  isInWishlist: (productId: string) => false,
});

const ToastContext = React.createContext({
  showToast: (message: string, type: "success" | "error" | "info") => {},
});

// ---------------- Product Card ----------------
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = React.useContext(CartContext);
  const { addToWishlist, isInWishlist } = React.useContext(WishlistContext);
  const { showToast } = React.useContext(ToastContext);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist!`, "success");
    }
  };

  const isWishlisted = isInWishlist(product.id);

  // Generate rating and review count for display
  const rating = 4.0 + Math.random();
  const reviewCount = Math.floor(Math.random() * 100) + 1;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/300x200.png?text=Blu+Product"}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200.png?text=Blu+Product";
          }}
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {product.discount}% OFF
            </span>
          )}
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <Shield size={12} />
            BLU
          </span>
        </div>

        <button
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          ❤️
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1">
          {product.name || "Unnamed Product"}
        </h3>
        <p className="text-gray-500 text-xs mb-2">{product.brand}</p>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-xs text-gray-600">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">
            ({reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {product.stock !== undefined && (
          <div className="mb-2">
            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          🛒 {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ---------------- Loading & Error ----------------
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="text-center py-12">
    <div className="mb-4">
      <Eye size={48} className="mx-auto text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
    >
      Retry
    </button>
  </div>
);

// ---------------- Pagination ----------------
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, hasNextPage, hasPrevPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          hasPrevPage
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          hasNextPage
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

// ---------------- Main Blu Component ----------------
const Blu: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 20;

  const { loading, error, data, refetch } = useQuery<ProductsResponse, ProductsVariables>(
    GET_BLU_PRODUCTS,
    {
      variables: {
        page: currentPage,
        limit: PRODUCTS_PER_PAGE,
      },
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const products = data?.products?.products || [];
  const totalPages = data?.products?.totalPages || 0;
  const totalProducts = data?.products?.totalProducts || 0;
  const hasNextPage = data?.products?.hasNextPage || false;
  const hasPrevPage = data?.products?.hasPrevPage || false;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Blu Light Blocking Glasses
            </h1>
          </div>
          <p className="text-gray-600">
            Protect your eyes from digital eye strain with our premium blue
            light blocking eyewear
          </p>
          {!loading && totalProducts > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {products.length} of {totalProducts} products
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage
            message={`Failed to load products: ${error.message}. Please check your connection and try again.`}
            onRetry={() => refetch()}
          />
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Blu Products Found
            </h3>
            <p className="text-gray-600 mb-4">
              We're working on adding more blue light blocking glasses.
            </p>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Refresh
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blu;