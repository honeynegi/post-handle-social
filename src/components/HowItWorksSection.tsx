import React from 'react';
import { FaLink, FaEdit, FaRocket } from 'react-icons/fa';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get started in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-indigo-200 mb-4">1</div>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLink className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Connect Accounts</h3>
            <p className="text-gray-600">Securely link all your social media profiles.</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-indigo-200 mb-4">2</div>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEdit className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create & Schedule</h3>
            <p className="text-gray-600">Craft your posts and schedule them for the perfect time.</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-indigo-200 mb-4">3</div>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRocket className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Grow & Analyze</h3>
            <p className="text-gray-600">Watch your engagement soar and analyze your results.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;