import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Discover',
    subtitle: 'Curated products for modern living',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Shop Now'
  },
  {
    id: 2,
    title: 'Premium Quality',
    subtitle: 'Handpicked items that last',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'Explore'
  },
  {
    id: 3,
    title: 'Minimalist Design',
    subtitle: 'Clean aesthetics for your space',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    cta: 'View Collection'
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-[70vh] bg-gray-50 overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Content */}
              <div className="flex items-center justify-center p-12 lg:p-16">
                <div className="text-center lg:text-left max-w-md">
                  <h1 className="text-4xl lg:text-6xl font-light mb-6 text-gray-900">
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl mb-8 text-gray-600 font-light">
                    {slide.subtitle}
                  </p>
                  <Button 
                    className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 font-light"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-black w-8' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;