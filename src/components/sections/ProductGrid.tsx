import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  brand: string;
  category: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Classic Aviator",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop",
    rating: 4.5,
    brand: "Ray-Ban",
    category: "Sunglasses"
  },
  {
    id: 2,
    name: "Modern Rectangle",
    price: 1999,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
    rating: 4.3,
    brand: "Oakley",
    category: "Eyeglasses"
  },
  {
    id: 3,
    name: "Retro Round",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1556306510-9282f4974ed3?w=400&h=400&fit=crop",
    rating: 4.7,
    brand: "Persol",
    category: "Eyeglasses"
  },
  {
    id: 4,
    name: "Sport Wrap",
    price: 3499,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    rating: 4.4,
    brand: "Nike",
    category: "Sunglasses"
  },
  {
    id: 5,
    name: "Designer Cat-eye",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop",
    rating: 4.8,
    brand: "Gucci",
    category: "Sunglasses"
  },
  {
    id: 6,
    name: "Minimalist Square",
    price: 1799,
    image: "https://images.unsplash.com/photo-1582003618-0e2ba448a7dd?w=400&h=400&fit=crop",
    rating: 4.2,
    brand: "Warby Parker",
    category: "Eyeglasses"
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trending Eyewear
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most popular frames loved by customers worldwide
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-all"
              onClick={() => alert('Showing all products!')}
            >
              All
            </button>
            <button 
              className="px-6 py-2 rounded-md text-gray-600 hover:text-primary text-sm font-medium transition-all"
              onClick={() => alert('Filtering eyeglasses!')}
            >
              Eyeglasses
            </button>
            <button 
              className="px-6 py-2 rounded-md text-gray-600 hover:text-primary text-sm font-medium transition-all"
              onClick={() => alert('Filtering sunglasses!')}
            >
              Sunglasses
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-product transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => alert(`Added ${product.name} to wishlist!`)}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => alert(`Quick view for ${product.name}!`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary font-medium">{product.brand}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant="cta" 
                    size="sm" 
                    className="group/btn"
                    onClick={() => alert(`Added ${product.name} to cart!`)}
                  >
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => alert('Redirecting to full product catalog!')}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;