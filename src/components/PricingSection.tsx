import React from 'react';
import { FaCheck } from 'react-icons/fa';
import Button from './Button';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that's right for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover-lift">
            <h3 className="text-xl font-bold mb-4">Free</h3>
            <p className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-500">/month</span></p>
            <ul className="text-gray-600 space-y-3 mb-8">
              <li><FaCheck className="text-green-500 mr-2 inline" />1 Social Profile</li>
              <li><FaCheck className="text-green-500 mr-2 inline" />10 Scheduled Posts/month</li>
              <li><FaCheck className="text-green-500 mr-2 inline" />Basic Analytics</li>
            </ul>
            <Button variant="outline" fullWidth href="#">
              Get Started
            </Button>
          </div>
          {/* Pro Plan */}
          <div className="bg-custom-secondary p-8 rounded-xl shadow-xl text-white hover-lift transform scale-105">
            <span className="bg-white text-custom-secondary text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
            <h3 className="text-xl font-bold mb-4 mt-4">Pro</h3>
            <p className="text-4xl font-bold mb-6">$29<span className="text-base font-normal opacity-75">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li><FaCheck className="text-white mr-2 inline" />10 Social Profiles</li>
              <li><FaCheck className="text-white mr-2 inline" />Unlimited Scheduled Posts</li>
              <li><FaCheck className="text-white mr-2 inline" />Advanced Analytics</li>
              <li><FaCheck className="text-white mr-2 inline" />Team Collaboration</li>
            </ul>
            <Button variant="outline" fullWidth href="#" className="hover:bg-custom-secondary/90">
              Start Free Trial
            </Button>
          </div>
          {/* Business Plan */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover-lift">
            <h3 className="text-xl font-bold mb-4">Business</h3>
            <p className="text-4xl font-bold mb-6">$99<span className="text-base font-normal text-gray-500">/month</span></p>
            <ul className="text-gray-600 space-y-3 mb-8">
              <li><FaCheck className="text-green-500 mr-2 inline" />Unlimited Profiles</li>
              <li><FaCheck className="text-green-500 mr-2 inline" />Unlimited Scheduled Posts</li>
              <li><FaCheck className="text-green-500 mr-2 inline" />White Label Reports</li>
              <li><FaCheck className="text-green-500 mr-2 inline" />Dedicated Support</li>
            </ul>
            <Button variant="outline" fullWidth href="#">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;