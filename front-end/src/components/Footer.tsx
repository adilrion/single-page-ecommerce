import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="text-xl font-light text-gray-900">Shop</span>
            </div>
            <p className="text-sm text-gray-600 font-light">
              Curated products for modern living
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-black font-light">All Products</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-black font-light">Electronics</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-black font-light">Fashion</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-black font-light">Home & Garden</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Shipping Info</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Returns</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Size Guide</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">About</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black font-light">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 font-light">
              © 2024 Shop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-black font-light">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-black font-light">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-black font-light">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;