import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: 1,
    brand: 'JOHN JACOBS',
    title: 'COASTLINE',
    subtitle: 'The New Look',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=600&fit=crop&crop=face',
    bgColor: 'from-orange-200 to-orange-300'
  },
  {
    id: 2,
    brand: 'VINCENT CHASE',
    title: 'PREMIUM',
    subtitle: 'Titanium Collection',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1200&h=600&fit=crop&crop=face',
    bgColor: 'from-blue-200 to-blue-300'
  },
  {
    id: 3,
    brand: 'LENSKART AIR',
    title: 'FEATHERLIGHT',
    subtitle: 'Ultra Comfortable',
    image: 'https://images.unsplash.com/photo-1556306510-9282f4974ed3?w=1200&h=600&fit=crop&crop=face',
    bgColor: 'from-green-200 to-green-300'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Hero Slider */}
      <div className={`w-full h-full bg-gradient-to-r ${currentSlideData.bgColor} relative`}>
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            {/* Text content */}
            <div className="space-y-6 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">JJ</span>
                </div>
                <span className="text-sm font-bold tracking-wider text-gray-800">
                  {currentSlideData.brand}
                </span>
              </div>
              
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl text-gray-700 mt-2">
                  {currentSlideData.subtitle}
                </p>
              </div>

              <Button 
                className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800"
                onClick={() => alert('Shop Now clicked!')}
              >
                Shop Now
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full max-w-lg mx-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-20"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-20"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-gray-800' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;