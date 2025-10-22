import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/constants';

// Restaurant images for hero slider
const restaurantImages = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    alt: "Elegant dining area with ambient lighting"
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    alt: "Chef preparing gourmet dishes in the kitchen"
  },
  {
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80",
    alt: "Outdoor dining terrace with garden views"
  }
];

// Sample menu highlights - would come from your config
const menuHighlights = [
  {
    name: "Soups & Starters",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80",
    signature: "Tomato Basil Bisque",
  },
  {
    name: "Tandoori Specialties",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
    signature: "Paneer Tikka Masala",
  },
  {
    name: "Punjabi Delights",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    signature: "Butter Paneer",
  },
  {
    name: "Indo-Chinese Fusion",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    signature: "Veg Manchurian",
  },
  {
    name: "Chef's Specials",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
    signature: "Royal Thali",
  },
  {
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80",
    signature: "Gulab Jamun with Ice Cream",
  },
];

const RestaurantSection = () => {
  const navigate = useNavigate();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState(4); // Default to desktop
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: true, margin: "-100px" });

  // Update visible items based on window size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(4);
    };
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Auto-scroll hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % restaurantImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll Menu Highlights Carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const itemWidth = carouselRef.current.scrollWidth / menuHighlights.length;
        carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });

        const scrollPosition = carouselRef.current.scrollLeft + itemWidth;
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        if (scrollPosition >= maxScroll) {
          setTimeout(() => {
            carouselRef.current!.scrollTo({ left: 0, behavior: 'smooth' });
          }, 500);
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Menu Highlights scroll functions
  const nextSlide = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / menuHighlights.length;
    carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  const prevSlide = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / menuHighlights.length;
    carouselRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  // Hero slider navigation
  const prevHeroSlide = () => setCurrentHeroSlide(prev => (prev - 1 + restaurantImages.length) % restaurantImages.length);
  const nextHeroSlide = () => setCurrentHeroSlide(prev => (prev + 1) % restaurantImages.length);

  // Touch handlers for hero slider
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const xDiff = touchStart - e.touches[0].clientX;
    if (Math.abs(xDiff) > 50) {
      xDiff > 0 ? nextHeroSlide() : prevHeroSlide();
      setTouchStart(null);
    }
  };

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };

  // Map category to section ID for navigation
  const handleNavigate = (category: string) => {
    const sectionMapping: Record<string, string> = {
      "Soups & Starters": "soups",
      "Tandoori Specialties": "tandoori",
      "Punjabi Delights": "paneer",
      "Indo-Chinese Fusion": "chinese",
      "Chef's Specials": "specials",
      "Desserts": "desserts"
    };
    const sectionId = sectionMapping[category] || category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/menu#${sectionId}`);
  };

  return (
    <section id="restaurant" className="bg-gray-50 relative overflow-hidden">
      {/* Hero Slider */}
      <div
        className="relative h-[400px] md:h-[500px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setTouchStart(null)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={restaurantImages[currentHeroSlide].url}
              alt={restaurantImages[currentHeroSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-8">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-center"
              >
                Our Restaurant
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-24 h-1 bg-amber-600 mb-6"
              ></motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-center max-w-2xl"
              >
                Exquisite dining experience with authentic flavors
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Slider Arrows */}
        <button onClick={prevHeroSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextHeroSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Slider Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {restaurantImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentHeroSlide ? 'bg-white w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-[400px] md:top-[500px] left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      <div className="absolute -left-20 top-[600px] w-40 h-40 rounded-full bg-amber-100 opacity-50"></div>
      <div className="absolute -right-20 bottom-40 w-40 h-40 rounded-full bg-amber-100 opacity-50"></div>

      {/* Restaurant Info & Hours */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Culinary Excellence</h3>
            <div className="w-24 h-1 bg-amber-600 mb-4"></div>
            <p className="text-gray-600 leading-relaxed">
              Our restaurant combines traditional techniques with innovative approaches to
              create unforgettable dining experiences. Led by our executive chef, our team
              crafts each dish with precision and passion.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-3/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-1">Breakfast</h4>
                <p>7:00 AM - 10:30 AM</p>
                <p className="mt-1 text-sm">Buffet & À la carte</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-1">Lunch</h4>
                <p>12:30 PM - 3:00 PM</p>
                <p className="mt-1 text-sm">À la carte & Executive Menu</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-1">Dinner</h4>
                <p>7:00 PM - 11:00 PM</p>
                <p className="mt-1 text-sm">Fine Dining Experience</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-1">Reservations</h4>
                <p>Recommended for dinner</p>
                <a href="tel:+123456789" className="text-amber-600 text-sm hover:text-amber-700">
                  Call: +1 (234) 567-89
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Highlights */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-12">Menu Highlights</h3>

        {/* Carousel Navigation */}
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          className="relative overflow-x-auto scrollbar-hide"
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-4 py-2"
            style={{ display: 'flex', flexDirection: 'row', scrollSnapType: 'x mandatory' }}
          >
            {menuHighlights.map(item => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 scroll-snap-align-start"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-2">Signature Dish</p>
                    <p className="text-amber-700 font-medium">{item.signature}</p>
                    <div className="mt-auto pt-3">
                      <button
                        onClick={() => handleNavigate(item.name)}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
                      >
                        Explore Menu
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View Full Menu Button */}
        <div className="sticky bottom-4 text-center mt-8 z-10">
          <button
            onClick={() => navigate('/menu')}
            className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors shadow-lg"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;