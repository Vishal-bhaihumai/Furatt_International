import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface GalleryImage {
  url: string;
  category: string;
  caption: string;
  alt: string; // Added for accessibility
}

interface RoomDetails {
  description: string;
  features: string[];
  images: GalleryImage[];
}

// Room data with actual image URLs instead of random unsplash images
const roomsData: { [room: string]: RoomDetails } = {
  Classic: {
    description: 'Cozy and comfortable AC room with all essential amenities, ideal for solo or business travelers.',
    features: ['Air Conditioning', 'Queen Bed', 'Complimentary Breakfast', 'Free Wi‑Fi', 'Locker'],
    images: [
      {
        url: '/images/classic-room-1.jpg', // Replace with actual image paths
        category: 'Classic',
        caption: 'Classic Room - Bedroom View',
        alt: 'A cozy classic room with a queen-sized bed and modern decor'
      },
      {
        url: '/images/classic-room-2.jpg',
        category: 'Classic',
        caption: 'Classic Room - Bathroom',
        alt: 'Clean and modern bathroom in the classic room'
      },
      {
        url: '/images/classic-room-3.jpg',
        category: 'Classic',
        caption: 'Classic Room - Work Area',
        alt: 'Comfortable work desk and chair in the classic room'
      }
    ]
  },
  Premium: {
    description: 'Spacious AC room featuring elegant interiors and modern comforts for a relaxed stay.',
    features: ['Air Conditioning', 'King Bed', 'Smart TV & OTT', 'Complimentary Breakfast', 'Locker'],
    images: [
      {
        url: '/images/premium-room-1.jpg',
        category: 'Premium',
        caption: 'Premium Room - King Bed',
        alt: 'Luxurious premium room with king-sized bed and upscale furnishings'
      },
      {
        url: '/images/premium-room-2.jpg',
        category: 'Premium',
        caption: 'Premium Room - Sitting Area',
        alt: 'Comfortable seating area in the premium room with stylish furniture'
      },
      {
        url: '/images/premium-room-3.jpg',
        category: 'Premium',
        caption: 'Premium Room - Entertainment',
        alt: 'Smart TV and entertainment system in the premium room'
      }
    ]
  },
  Executive: {
    description: 'Designed for extended stays or work trips, with dedicated workspace and extra amenities.',
    features: ['Air Conditioning', 'King Bed', 'Work Station', 'Mini Fridge', 'Complimentary Breakfast', 'Locker'],
    images: [
      {
        url: '/images/executive-room-1.jpg',
        category: 'Executive',
        caption: 'Executive Room - Overview',
        alt: 'Spacious executive room with premium furnishings and workspace'
      },
      {
        url: '/images/executive-room-2.jpg',
        category: 'Executive',
        caption: 'Executive Room - Workspace',
        alt: 'Dedicated workspace with ergonomic chair in the executive room'
      },
      {
        url: '/images/executive-room-3.jpg',
        category: 'Executive',
        caption: 'Executive Room - Refreshments',
        alt: 'Mini fridge and refreshment area in the executive room'
      }
    ]
  },
  Suite: {
    description: 'Luxury two-room suite ideal for families or groups, offering privacy and extra space.',
    features: ['Air Conditioning', '2 Bedrooms', 'Living Room', 'Kitchenette', 'All Meals Included', 'Locker'],
    images: [
      {
        url: '/images/suite-room-1.jpg',
        category: 'Suite',
        caption: 'Suite - Master Bedroom',
        alt: 'Elegant master bedroom in the luxury suite'
      },
      {
        url: '/images/suite-room-2.jpg',
        category: 'Suite',
        caption: 'Suite - Living Area',
        alt: 'Spacious living area with comfortable seating in the suite'
      },
      {
        url: '/images/suite-room-3.jpg',
        category: 'Suite',
        caption: 'Suite - Kitchenette',
        alt: 'Modern kitchenette with appliances in the suite'
      }
    ]
  }
};

// For development and testing, you can use these placeholder images
// (Replace these with actual image URLs in production)
const placeholderImages = {
  'classic-room-1': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop',
  'classic-room-2': 'https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?w=800&auto=format&fit=crop',
  'classic-room-3': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop',
  'premium-room-1': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
  'premium-room-2': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&auto=format&fit=crop',
  'premium-room-3': 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&auto=format&fit=crop',
  'executive-room-1': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop',
  'executive-room-2': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop',
  'executive-room-3': 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&auto=format&fit=crop',
  'suite-room-1': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop',
  'suite-room-2': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop',
  'suite-room-3': 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&auto=format&fit=crop',
};

// Update the image URLs with placeholders for development
// (Remove this in production with actual image paths)
Object.keys(roomsData).forEach((roomType, roomIndex) => {
  roomsData[roomType].images.forEach((image, index) => {
    const key = `${roomType.toLowerCase()}-room-${index + 1}`;
    image.url = placeholderImages[key] || placeholderImages['classic-room-1'];
  });
});

const roomTypes = ['Classic', 'Premium', 'Executive', 'Suite'];

// Updated Street Views with provided iframes
const streetViews = [
  'https://www.google.com/maps/embed?pb=!4v1754462931605!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzRnWnZ3ZGc.!2m2!1d22.30844826904055!2d73.18301105167171!3f1.8953314915470685!4f-17.86023950353679!5f0.7820865974627469', // Room View
  'https://www.google.com/maps/embed?pb=!4v1754463025665!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzRnZFBXVHc.!2m2!1d22.30842523078789!2d73.18298746629861!3f98.5695792267073!4f-27.48221676726891!5f0.7820865974627469', // Restaurant
  'https://www.google.com/maps/embed?pb=!4v1754463082832!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRnYmJKbGdF!2m2!1d22.30842676857074!2d73.18291310934282!3f182.44901961214174!4f-35.05788165514543!5f0.7820865974627469', // Room 2
  'https://www.google.com/maps/embed?pb=!4v1754463105225!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzRnYUNtRHc.!2m2!1d22.30842407888074!2d73.18309369047863!3f256.7165532260733!4f-0.8294260948363643!5f0.7820865974627469', // Reception and Entrance
  'https://www.google.com/maps/embed?pb=!4v1754463124293!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzRfcGZvNlFF!2m2!1d22.30844277134651!2d73.18304228878421!3f271.14002328287233!4f-20.16673534270157!5f0.7820865974627469' // Suite
];

const streetViewTitles = ['Room View', 'Restaurant View', 'Room View 2', 'Reception and Entrance', 'Suite View'];

// Image component with loading state
interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className: string;
  onClick?: () => void;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-red-500">Failed to load image</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading || error ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        onClick={onClick}
      />
    </div>
  );
};

interface RoomSectionProps {
  roomName: string;
  details: RoomDetails;
  onImageClick: (img: GalleryImage) => void;
}

const RoomSection: React.FC<RoomSectionProps> = ({ roomName, details, onImageClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Check scroll position
  const checkScrollPosition = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setIsAtStart(scrollLeft <= 10);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  const scrollBy = (offset: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      const ref = carouselRef.current;
      if (ref) {
        if (isAtEnd) {
          ref.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollBy(ref.clientWidth);
        }
      }
    }, 5000);

    // Add scroll event listener
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }

    return () => {
      clearInterval(interval);
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [isAtEnd]);

  return (
    <section className="mb-16" aria-labelledby={`room-${roomName.toLowerCase()}`}>
      <h2 
        id={`room-${roomName.toLowerCase()}`} 
        className="text-3xl font-bold text-center text-amber-800 mb-4"
      >
        {roomName} Room
      </h2>
      <p className="text-center max-w-3xl mx-auto text-gray-700 mb-6">{details.description}</p>
      
      <ul className="flex flex-wrap justify-center gap-4 mb-8" aria-label={`${roomName} Room Features`}>
        {details.features.map(feature => (
          <li key={feature} className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 transition-transform hover:scale-105">
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative">
        <div 
          ref={carouselRef} 
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-4"
          aria-label={`${roomName} Room Gallery`}
          onScroll={checkScrollPosition}
        >
          {details.images.map((img, i) => (
            <div 
              key={i} 
              className="min-w-[300px] md:min-w-[350px] flex-shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => onImageClick(img)}
            >
              <ImageWithLoader
                src={img.url}
                alt={img.alt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium text-gray-800">{img.caption}</h3>
                <p className="text-sm text-gray-600 mt-1">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <button
          onClick={() => scrollBy(-350)}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition-all duration-300 ${
            isAtStart ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110'
          }`}
          disabled={isAtStart}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-amber-800" />
        </button>
        <button
          onClick={() => scrollBy(350)}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition-all duration-300 ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110'
          }`}
          disabled={isAtEnd}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-amber-800" />
        </button>
      </div>
    </section>
  );
};

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedView, setSelectedView] = useState(0);

  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedImage]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen pt-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <header>
          <h1 className="text-5xl font-bold text-center text-amber-900 mb-8">Our Room Gallery</h1>
          <p className="text-center text-lg text-amber-800 max-w-3xl mx-auto">
            Explore our beautifully designed rooms, each created to provide the utmost comfort during your stay with us.
          </p>
        </header>

        <main>
          {/* Room Sections */}
          {roomTypes.map((room) => (
            <RoomSection
              key={room}
              roomName={room}
              details={roomsData[room]}
              onImageClick={setSelectedImage}
            />
          ))}

          {/* Virtual Tour Section - Renamed to 3D Virtual Tour */}
          <section className="mt-24" aria-labelledby="virtual-tour">
            <h2 id="virtual-tour" className="text-4xl font-bold text-center mb-12">
              3D Virtual Tour
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {streetViews.map((url, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-amber-800 text-center">
                    {streetViewTitles[index]}
                  </h3>
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <iframe
                      src={url}
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`3D Virtual Tour - ${streetViewTitles[index]}`}
                      aria-label={`3D Virtual Tour of ${streetViewTitles[index]}`}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center mb-8">Full 3D Experience</h3>
              <div className="flex flex-wrap justify-center gap-4 mb-8" role="tablist">
                {streetViewTitles.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedView(index)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedView === index
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                    role="tab"
                    aria-selected={selectedView === index}
                    aria-controls={`panel-${index}`}
                    id={`tab-${index}`}
                  >
                    {title}
                  </button>
                ))}
              </div>

              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden shadow-xl">
                {streetViews.map((url, index) => (
                  <div 
                    key={index} 
                    role="tabpanel"
                    id={`panel-${index}`}
                    aria-labelledby={`tab-${index}`}
                    className={selectedView === index ? 'block h-full' : 'hidden'}
                  >
                    <iframe
                      src={url}
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Full 3D Virtual Tour - ${streetViewTitles[index]}`}
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => {
              // Close modal when clicking outside
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 id="modal-title" className="text-2xl font-bold">{selectedImage.caption}</h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="relative">
                  <ImageWithLoader
                    src={selectedImage.url}
                    alt={selectedImage.alt || selectedImage.caption}
                    className="w-full h-[60vh] object-contain rounded-lg"
                  />
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    {selectedImage.category}
                  </span>
                  <p className="text-gray-600 mt-2 w-full">{selectedImage.alt}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-24 text-center text-gray-600 py-8 border-t border-amber-200">
          <p className="mt-2">Images are for illustration purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default GalleryPage;