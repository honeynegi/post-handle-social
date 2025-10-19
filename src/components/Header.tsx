"use client";

import React, { useState } from 'react';
import Button from './Button';
import MobileMenu from './MobileMenu';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="text-xl font-semibold text-custom-primary">Post Handle</a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-sm text-custom-primary/80 hover:text-custom-primary transition">Features</a>
              <a href="#how-it-works" className="text-sm text-custom-primary/80 hover:text-custom-primary transition">How it Works</a>
              <a href="#pricing" className="text-sm text-custom-primary/80 hover:text-custom-primary transition">Pricing</a>
              <a href="#blog" className="text-sm text-custom-primary/80 hover:text-custom-primary transition">Blog</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" size="ml" href="/login" pill className='hover:cursor-pointer'>
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 hover:cursor-pointer transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;