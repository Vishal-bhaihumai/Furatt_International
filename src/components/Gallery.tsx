import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const images = [
    // Hotel Images (3)
    { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80", category: "Hotel", caption: "Luxury Hotel Lobby" },
    { url: '/images/lavish-guest-suite-with-plush-king-sized-bed-elegant-decor-relaxation_975188-273474.webp', category: "Hotel", caption: "Elegant Hotel Suite" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", category: "Hotel", caption: "Hotel Exterior View" },
    // Restaurant Image (1)
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80", category: "Ambience", caption: "Restaurant Dining Area" },
    // Banquet Image (1)
    { url: '/images/Banquet hall.webp', category: "Ambience", caption: "Banquet Hall" }
  ];
  
  const navigate = useNavigate();

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-lg font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/gallery')}
          className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg"
        >
          View Gallery
        </button>
      </div>
    </section>
  );
};

export default Gallery;