import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';
import CTACards from '../components/CTACards';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSlider />
        <div className="container mx-auto px-6 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSlider />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <p className="text-red-500 text-lg">Error loading products: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Products Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Our Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collection of premium products designed for your lifestyle.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg transition-colors"
              />
            </div>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <Button
                variant={selectedCategory === null ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-6 py-2 transition-all ${selectedCategory === null
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'ghost'}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 transition-all capitalize ${selectedCategory === category
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Cards */}
      <CTACards />
    </div>
  );
};

export default Home;