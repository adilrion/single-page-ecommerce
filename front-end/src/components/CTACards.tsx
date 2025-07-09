import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, RotateCcw, Shield, Star, Truck, Users } from 'lucide-react';
import React from 'react';

const CTACards: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Main CTA Hero */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-16 text-white mb-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Premium Quality Products</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Amazing Products Made for You
            </h2>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed max-w-2xl">
              Shop from our carefully curated collection of premium products.
              From cutting-edge electronics to lifestyle essentials, find everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl group"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-medium transition-all"
              >
                View Categories
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Shipping</h3>
            <p className="text-gray-600 leading-relaxed">
              Free shipping on all orders over $50. Fast and reliable delivery to your door.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payment</h3>
            <p className="text-gray-600 leading-relaxed">
              Your payment information is encrypted and secure with industry-standard protection.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <RotateCcw className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Returns</h3>
            <p className="text-gray-600 leading-relaxed">
              30-day return policy. Shop with confidence and complete peace of mind.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our community of satisfied customers who trust us for quality products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-200">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay in the Loop
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Get notified about new products, exclusive offers, and special discounts.
            Join our newsletter and never miss out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-900 focus:ring-0 transition-all text-base"
            />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTACards;
