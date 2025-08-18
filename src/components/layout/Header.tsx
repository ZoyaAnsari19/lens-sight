import React from 'react';
import { ShoppingCart, User, Search, Menu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-gray-100">
          <div className="flex items-center gap-4">
            <span>FREE SHIPPING on orders above ₹2000</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Track Order</span>
            <span>Store Locator</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">LensSight</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Eyeglasses
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Sunglasses
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact Lenses
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Eye Test
            </a>
          </nav>

          {/* Search bar */}
          <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2 w-80">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for eyeglasses, sunglasses..."
              className="bg-transparent border-none outline-none flex-1 text-sm"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;