import React, { useState, createContext, useContext, ReactNode } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ShoppingCart, Heart, Loader2, AlertCircle } from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getTotalItems: () => number;
}

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

// GraphQL Query
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      brand
      category
      price
      image
    }
  }
`;

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Wishlist Context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setItems(prevItems => {
      if (!prevItems.find(item => item.id === product.id)) {
        showToast(`${product.name} added to wishlist!`, 'success');
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    showToast('Removed from wishlist', 'info');
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hooks
const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Toast System
let toastId = 0;
const toasts: Array<{ id: number; message: string; type: string }> = [];
const toastListeners: Array<() => void> = [];

const showToast = (message: string, type: 'success' | 'error' | 'info') => {
  const id = toastId++;
  toasts.push({ id, message, type });
  toastListeners.forEach(listener => listener());
  setTimeout(() => {
    const index = toasts.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      toastListeners.forEach(listener => listener());
    }
  }, 3000);
};

const ToastContainer: React.FC = () => {
  const [, setUpdate] = useState({});
  
  React.useEffect(() => {
    const listener = () => setUpdate({});
    toastListeners.push(listener);
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) toastListeners.splice(index, 1);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-lg shadow-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

// ProductCard Component
interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// TryOn Section Component
interface TryOnSectionProps {
  selectedProduct: Product | null;
}

const TryOnSection: React.FC<TryOnSectionProps> = ({ selectedProduct }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Virtual Try-On</h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Face Mockup */}
        <div className="relative">
          <div className="w-64 h-80 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full relative">
            {/* Simple face illustration */}
            <div className="absolute top-16 left-16 w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="absolute top-16 right-16 w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-pink-400 rounded-full"></div>
            
            {/* Glasses overlay */}
            {selectedProduct && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-32 h-16 object-contain opacity-90"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="text-center lg:text-left">
          {selectedProduct ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{selectedProduct.brand}</p>
              <p className="text-2xl font-bold text-blue-600">${selectedProduct.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-4">Click on other products to try them on!</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <p className="text-lg mb-2">Select a product to try it on</p>
              <p className="text-sm">Choose from our collection below</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading Component
const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
    <p className="text-gray-600">Loading eyewear collection...</p>
  </div>
);

// Error Component
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
    <p className="text-gray-600 text-center">{message}</p>
  </div>
);

// Main TryOn Component
const TryOn: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Mock data for demonstration (replace with actual GraphQL query)
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Aviator',
      brand: 'RayBan',
      category: 'sunglasses',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'Round Vintage',
      brand: 'Oakley',
      category: 'eyeglasses',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Modern Square',
      brand: 'Persol',
      category: 'eyeglasses',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      name: 'Sport Wrap',
      brand: 'Nike',
      category: 'sunglasses',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=200&fit=crop'
    },
    {
      id: '5',
      name: 'Cat Eye Classic',
      brand: 'Gucci',
      category: 'sunglasses',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=300&h=200&fit=crop'
    },
    {
      id: '6',
      name: 'Minimalist Frame',
      brand: 'Warby Parker',
      category: 'eyeglasses',
      price: 95.99,
      image: 'https://images.unsplash.com/photo-1592702431958-cc43dd2db291?w=300&h=200&fit=crop'
    }
  ];

  // Simulate GraphQL query with mock data
  const { loading, error, data } = {
    loading: false,
    error: null,
    data: { products: mockProducts }
  };

  // Filter for eyeglasses and sunglasses only
  const eyewearProducts = data?.products?.filter(
    (product: Product) => 
      product.category === 'eyeglasses' || product.category === 'sunglasses'
  ) || [];

  if (loading) return <Loading />;
  if (error) return <ErrorDisplay message="Failed to load products. Please try again later." />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Try-On</h1>
          <p className="text-lg text-gray-600">See how you look in our latest eyewear collection</p>
        </div>

        {/* Try-On Section */}
        <TryOnSection selectedProduct={selectedProduct} />

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Collection</h2>
          
          {eyewearProducts.length === 0 ? (
            <ErrorDisplay message="No eyewear products available at the moment." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eyewearProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct?.id === product.id}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="text-center text-gray-500">
          <p>Showing {eyewearProducts.length} eyewear products</p>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

// Main App Component with Providers
const TryOnApp: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <TryOn />
      </WishlistProvider>
    </CartProvider>
  );
};

export default TryOnApp;