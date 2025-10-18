import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Teams Worldwide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"Post-Bridge has transformed our social media workflow. It's a lifesaver!"</p>
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Marketing Head, Innovate Co.</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"The analytics are incredible. We finally understand what our audience wants."</p>
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-bold">David Lee</p>
                <p className="text-sm text-gray-500">Content Creator, VlogLife</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">"Scheduling posts has never been easier. Highly recommended!"</p>
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-bold">Emily Chen</p>
                <p className="text-sm text-gray-500">Social Media Manager, Growth Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;