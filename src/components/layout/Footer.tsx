import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LensSight</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium eyewear. Discover the perfect frames that match your style and vision needs.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Eyeglasses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sunglasses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Lenses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Reading Glasses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blue Light Glasses</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Eye Test</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home Trial</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Frame Fitting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Repairs</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 LensSight. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;