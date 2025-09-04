import React from "react";
import { ShoppingCart, User, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const cls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium ${isActive ? "text-teal-600" : "text-gray-700 hover:text-teal-600"}`;

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
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary-foreground rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold text-primary">lens-sight</h1>
              </Link>
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
                <Link to="/track-order" className="text-gray-600 hover:text-primary">
                  Track Order
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary">
                  Sign In & Sign Up
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </Link>
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
              <Link to="/new-arrivals" className="text-sm font-medium text-gray-700 hover:text-primary">
                NEW ARRIVALS
              </Link>
              <Link to="/eyeglasses" className="text-sm font-medium text-gray-700 hover:text-primary">
                EYEGLASSES
              </Link>
              <Link to="/screen-glasses" className="text-sm font-medium text-gray-700 hover:text-primary">
                SCREEN EYEGLASSES
              </Link>
              <Link to="/sunglasses" className="text-sm font-medium text-gray-700 hover:text-primary">
                SUNGLASSES
              </Link>
              <Link to="/contact-lenses" className="text-sm font-medium text-gray-700 hover:text-primary">
                CONTACT LENSES
              </Link>
              <Link to="/kids-eyeglasses" className="text-sm font-medium text-gray-700 hover:text-primary">
                KIDS EYEGLASSES
              </Link>
            </div>
      
            <div className="flex items-center gap-3">
              <Link to="/TryOn">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm">
                  3D TRY ON
                </Button>
              </Link>
              <Link to="/Blu">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  BLU
                </Button>
              </Link>
              <Link to="/Gold">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm">
                  GOLD
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
