import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import Button from '../components/Button';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="font-sans text-gray-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-pattern py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Manage All Your Social Media From <span className="gradient-text">One Place</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Save time and grow your business. Schedule posts, analyze performance, and engage with your audience across all social platforms.
                </p>
                <div className="flex space-x-4">
                  <Button variant="primary" size="lg" href="#" pill>
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg" href="#" pill>
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0 md:pl-12">
                {/* Placeholder for Hero Image */}
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Social Media Dashboard" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Platforms Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">All Your Social Media, Simplified</h2>
            <p className="text-gray-600 mb-12">Connect and manage all your favorite platforms in one dashboard.</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <FaFacebook className="text-4xl text-blue-600 hover:scale-110 transition-transform cursor-pointer" />
              <FaTwitter className="text-4xl text-sky-500 hover:scale-110 transition-transform cursor-pointer" />
              <FaInstagram className="text-4xl text-pink-600 hover:scale-110 transition-transform cursor-pointer" />
              <FaLinkedin className="text-4xl text-blue-700 hover:scale-110 transition-transform cursor-pointer" />
              <FaPinterest className="text-4xl text-red-600 hover:scale-110 transition-transform cursor-pointer" />
              <FaYoutube className="text-4xl text-red-600 hover:scale-110 transition-transform cursor-pointer" />
              <FaTiktok className="text-4xl text-gray-900 hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </div>
        </section>

        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-gray-100/70 via-custom-primary/5 to-gray-100/70 rounded-3xl p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get <span className="text-custom-secondary">Started</span>?</h2>
                <p className="text-xl text-gray-600 mb-8">Join thousands of businesses saving time with Post-Handle.</p>
                <Button variant="primary" size="lg" href="#" pill>
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
