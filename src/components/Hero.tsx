import React, { useState, useEffect } from 'react';
import { CORE_CONFIG } from '../config/constants';

const taglines = [
  'Your Home Away from Home',
  'Comfort Meets Affordability',
  'Book Direct & Save ₹500',
];


// Carefully chosen placeholders to match Vadodara guest house style
const images = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', // cozy room interior
  '/images/room.webp',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80', // hotel dining area
  '/images/double bed room.webp',
  '/images/interior.webp',
  '/images/double bed room 2.jpg',
  '/images/spa area.webp',
];

const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    preloadImages(images);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {/* Background slideshow */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url("${image}")` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Overlay content */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl px-4 min-h-[300px] flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            {CORE_CONFIG.business.basic.name}
          </h1>
          <p className="text-xl md:text-2xl text-orange-300 mb-8 h-8 transition-all duration-1000 ease-in-out opacity-100">
            {taglines[currentIndex % taglines.length]}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#rooms"
              className="min-w-[160px] text-center bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
            >
              View Rooms
            </a>
            <a
              href="#reservations"
              className="min-w-[160px] text-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Book a Room
            </a>
          </div>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★★★★☆</span>
                <span>{CORE_CONFIG.reviews.platforms.google.rating}/5 (127 Reviews)</span>
              </div>
              <div>Best Price Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
