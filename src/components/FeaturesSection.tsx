import React from 'react';
import { FaCalendarAlt, FaChartLine, FaUsers } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Post-Bridge?</h2>
          <p className="text-lg text-gray-600">Powerful features to supercharge your social media strategy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendarAlt className="text-2xl text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Schedule Posts</h3>
            <p className="text-gray-600">Plan your content weeks or months in advance. Set it and forget it.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaChartLine className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">In-depth Analytics</h3>
            <p className="text-gray-600">Track your performance with detailed reports and actionable insights.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover-lift text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Team Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly. Assign tasks, approve content, and manage roles.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;