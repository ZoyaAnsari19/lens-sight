import React from 'react';
import { ShoppingCart, User, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50">
      {/* Top notification bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        <span>FREE DELIVERY | 30-DAY RETURNS | AR TRY-ON | 3D TRY-ON</span>
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary-foreground rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold text-primary">lenskart</h1>
              </div>
            </div>

            {/* Search bar */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-3 w-96">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent border-none outline-none flex-1 text-sm"
              />
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <button className="text-gray-600 hover:text-primary">Track Order</button>
                <button className="text-gray-600 hover:text-primary">Sign In & Sign Up</button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => alert('Wishlist opened!')}>
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => alert('Shopping cart opened!')}>
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8">
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('New Arrivals clicked!')}>
                NEW ARRIVALS
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('Eyeglasses clicked!')}>
                EYEGLASSES
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('Computer Eyeglasses clicked!')}>
                COMPUTER EYEGLASSES
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('Sunglasses clicked!')}>
                SUNGLASSES
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('Prescription Sunglasses clicked!')}>
                PRESCRIPTION SUNGLASSES
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => alert('Kids Eyeglasses clicked!')}>
                KIDS EYEGLASSES
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm"
                onClick={() => alert('3D Try On activated!')}
              >
                3D TRY ON
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                onClick={() => alert('BLU activated!')}
              >
                BLU
              </Button>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
                onClick={() => alert('GOLD activated!')}
              >
                GOLD
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;