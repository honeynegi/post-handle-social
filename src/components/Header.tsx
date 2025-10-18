import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-indigo-600">Post-Bridge</a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
            <a href="#blog" className="text-gray-600 hover:text-indigo-600 transition">Blog</a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:block text-gray-600 hover:text-indigo-600 font-medium transition">Sign In</a>
            <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">Get Started</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;