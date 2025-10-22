import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CORE_CONFIG } from '../config/constants';

// TypeScript interface for type safety
interface BanquetSlide {
  image: string;
  title: string;
  description: string;
}

const BanquetSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Get slides from config
  const banquetSlides: BanquetSlide[] = CORE_CONFIG.facilities.banquet.gallery;

  // Validate config
  if (!banquetSlides || banquetSlides.length === 0) {
    console.warn('No banquet slides found in configuration');
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banquetSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banquetSlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const xDiff = touchStart - e.touches[0].clientX;

    if (Math.abs(xDiff) > 50) {
      if (xDiff > 0) {
        // Swipe left
        setCurrentSlide((prev) => (prev + 1) % banquetSlides.length);
      } else {
        // Swipe right
        setCurrentSlide((prev) => (prev - 1 + banquetSlides.length) % banquetSlides.length);
      }
      setTouchStart(null);
    }
  };

  return (
    <section className="relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Banquet Hall</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        {/* Slider */}
        <div 
          className="relative h-[600px] overflow-hidden rounded-lg shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setTouchStart(null)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={banquetSlides[currentSlide].image}
                alt={banquetSlides[currentSlide].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-banquet.jpg'; // Add a fallback image
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-8">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-4 text-center"
                >
                  {banquetSlides[currentSlide].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-center max-w-2xl"
                >
                  {banquetSlides[currentSlide].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + banquetSlides.length) % banquetSlides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % banquetSlides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banquetSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Capacity</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Up to {CORE_CONFIG.facilities.banquet.seating.standing} guests</li>
              <li>• Flexible seating arrangements</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <ul className="space-y-2 text-gray-600">
              {CORE_CONFIG.facilities.banquet.features.amenities.slice(0, 3).map((amenity, index) => (
                <li key={index}>• {amenity}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-600">
              {CORE_CONFIG.facilities.banquet.features.services.slice(0, 3).map((service, index) => (
                <li key={index}>• {service}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/banquet')}
            className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg"
          >
            Explore Our Banquet Hall
          </button>
        </div>
      </div>
    </section>
  );
};

export default BanquetSection;