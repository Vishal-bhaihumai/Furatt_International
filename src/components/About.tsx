import React, { useState, useEffect } from 'react';
import { Bed, Coffee, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { CORE_CONFIG } from '../config/constants';
import { motion, AnimatePresence } from 'framer-motion';

// Carefully chosen indoor guest house images (no pools or lawns)
const storyImages = [
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80', // cozy bedroom
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', // cozy room interior
  '/images/room.webp',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80', // hotel dining area
  '/images/double bed room.webp',
  '/images/interior.webp',
  '/images/double bed room 2.jpg',
  '/images/spa area.webp',
];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
        setCurrentImage(1);
      }, 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % storyImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isFirstLoad]);

  return (
    <section id="about" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Slideshow */}
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={storyImages[currentImage]}
                alt="Guest house interiors"
                className="w-full h-full object-cover rounded-lg shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={() =>
                  setCurrentImage(
                    (prev) => (prev - 1 + storyImages.length) % storyImages.length
                  )
                }
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentImage((prev) => (prev + 1) % storyImages.length)
                }
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {storyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'bg-amber-600 w-4' : 'bg-amber-300'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              Established in {CORE_CONFIG.business.basic.foundedYear}, {CORE_CONFIG.business.basic.name} has been welcoming travelers to the heart of {CORE_CONFIG.location.primary.city} with warmth and sincerity.  
              What began as a modest, family-run stay has grown into a well-loved guest house — known for its spotless rooms, homely comfort, and the kind of hospitality that feels personal.
            </p>

            <p className="text-gray-700 text-lg">
              Whether you’re visiting for business, attending family functions, or simply pausing on your journey, we aim to make your stay calm, convenient, and genuinely memorable — a place where you can rest as comfortably as you would at home.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bed className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold">Comfortable Rooms</h3>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold">Warm Hospitality</h3>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold">Family Friendly</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
        </div>

        <div className="text-center mt-8 italic text-gray-600">
          “To give you the warmth of home away from home.”
        </div>
      </div>
    </section>
  );
};

export default About;