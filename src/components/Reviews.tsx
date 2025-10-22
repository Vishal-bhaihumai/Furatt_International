import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { CORE_CONFIG } from '../config/constants';

const Reviews = () => {
  const reviews = CORE_CONFIG.reviews.featured;
  const googleRating = CORE_CONFIG.reviews.platforms.google.rating;

  const [activeReview, setActiveReview] = useState(0);

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : words[0].slice(0, 2).toUpperCase();
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        {/* Google Rating Only - Centered */}
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6 w-48 text-center">
            <img
              src={CORE_CONFIG.reviews.platforms.google.logo}
              alt="Google"
              className="h-8 mx-auto mb-2"
            />
            <div className="flex justify-center items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(googleRating)
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-900">{googleRating}</p>
          </div>
        </div>

        {/* Review Carousel */}
        <div className="relative max-w-3xl mx-auto px-12">
          {/* Left Scroll Button */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition hidden sm:block z-10"
            style={{ marginLeft: '0.5rem' }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Review Content */}
          <div className="mx-auto">
            <div key={activeReview} className="bg-white rounded-lg shadow-md p-6">
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(reviews[activeReview].author)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">
                      {reviews[activeReview].author}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < reviews[activeReview].rating
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div className="text-gray-700 mb-4">
                {reviews[activeReview].text}
              </div>
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition hidden sm:block z-10"
            style={{ marginRight: '0.5rem' }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-between mt-4 sm:hidden px-4">
          <button
            onClick={prevReview}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextReview}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveReview(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeReview ? 'bg-amber-600 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
