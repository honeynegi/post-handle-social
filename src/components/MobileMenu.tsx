"use client";

import React from 'react';
import Button from './Button';
import { RxCross1 } from "react-icons/rx";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side Menu */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 py-4">
            <h2 className="text-xl font-semibold text-custom-primary">Post Handle</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:cursor-pointer transition"
              aria-label="Close menu"
            >
              <RxCross1 size={24} />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <div className="flex flex-col space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                <Button
                  variant="link"
                  href="#features"
                  className="w-full justify-start text-base py-2"
                  onClick={onClose}
                >
                  Features
                </Button>
                <Button
                  variant="link"
                  href="#how-it-works"
                  className="w-full justify-start text-base py-2"
                  onClick={onClose}
                >
                  How it Works
                </Button>
                <Button
                  variant="link"
                  href="#pricing"
                  className="w-full justify-start text-base py-2"
                  onClick={onClose}
                >
                  Pricing
                </Button>
                <Button
                  variant="link"
                  href="#blog"
                  className="w-full justify-start text-base py-2"
                  onClick={onClose}
                >
                  Blog
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200 px-4">
                <Button variant="outline" size='ml' href="/login" className="w-full justify-center hover:cursor-pointer" pill>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;