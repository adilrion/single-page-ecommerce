import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 border-gray-200 focus:border-gray-400 rounded-full"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full font-light ${
                    selectedCategory === null 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  All
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full font-light ${
                      selectedCategory === category 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 font-light">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;