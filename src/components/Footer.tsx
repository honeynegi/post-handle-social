import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom-footer text-gray-900 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold">Post Handle</h2>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              One-stop platform for cross-social media content publishing. Schedule and manage your posts across multiple social platforms from a single dashboard.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2023 Post Handle. All rights reserved.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Affiliates</a></li>
            </ul>
          </div>

          {/* Platforms Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">PLATFORMS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Twitter/X</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">TikTok</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pinterest</a></li>
            </ul>
          </div>

          {/* Free Tools Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FREE TOOLS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Growth Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram Grid Maker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Hashtag Generator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Content Calendar</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy Policy</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaGlobe className="text-gray-600" />
            <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;