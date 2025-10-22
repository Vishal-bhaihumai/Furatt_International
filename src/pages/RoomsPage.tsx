import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CORE_CONFIG } from '../config/constants';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Coffee, Wifi, Car, Clock, Users, Bed, Star } from 'lucide-react';

// Room images mapping (using placeholder images for now)
const roomImages = {
  classic: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  ],
  premium: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
  ],
  executive: [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
  ],
  suite: [
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80",
  ],
};

const RoomCard = ({ room, index, isExpanded, onToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const images = roomImages[room.id] || roomImages.classic;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setTouchStart(null);
  };

  const whatsappMessage = CORE_CONFIG.accommodation.messages.whatsapp.roomInquiry.replace("{roomType}", room.name);
  const whatsappNumber = CORE_CONFIG.contact.primary.whatsapp.replace(/\D/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      id={room.id}
    >
      <div
        className="relative aspect-video overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImageIndex]}
          alt={`${room.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        {room.highlight && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {room.highlight}
          </div>
        )}

        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
          <Coffee size={14} />
          <span>Free Breakfast</span>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImageIndex ? "bg-white w-4" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{room.name}</h3>
            <p className="text-amber-600 text-sm font-medium">{room.tagline}</p>
          </div>
          <button
            onClick={() => onToggle(room.id)}
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            {isExpanded ? 'Show Less' : 'View Details'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {room.features.slice(0, 4).map((feature, idx) => (
            <span key={idx} className="text-sm text-gray-600 flex items-center gap-1">
              <span className="text-amber-600">•</span>
              {feature}
            </span>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">{room.description}</p>
            
            {room.features.length > 4 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">All Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {room.features.map((feature, idx) => (
                    <span key={idx} className="text-sm text-gray-600 flex items-center gap-1">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Room Amenities</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-amber-600" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>Free Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>24/7 Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>Free Breakfast</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Check-in Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Check-in: {CORE_CONFIG.accommodation.policies.checkIn}</p>
                <p>Check-out: {CORE_CONFIG.accommodation.policies.checkOut}</p>
                <p>Breakfast: {CORE_CONFIG.accommodation.policies.complimentaryBreakfast}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Get Best Rate
          </a>
          <a
            href={`tel:${CORE_CONFIG.contact.primary.phone}`}
            className="flex-1 border border-amber-600 text-amber-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const RoomsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const { propertyStats } = CORE_CONFIG.accommodation;
  const roomTypes = CORE_CONFIG.accommodation.roomTypes;

  // Handle deep linking to specific room sections
  useEffect(() => {
    if (location.hash) {
      const roomId = location.hash.slice(1);
      const element = document.getElementById(roomId);
      if (element) {
        // Expand the room details
        setExpandedRoom(roomId);
        // Scroll to the element with offset for fixed header
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location.hash]);

  const handleToggleRoom = (roomId: string) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover comfort and luxury in every room. Each space is thoughtfully designed 
            to provide you with the perfect home away from home experience.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-amber-600 mb-1">{propertyStats.yearsOfService}+</div>
            <div className="text-sm text-gray-600">Years of Service</div>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-amber-600 mb-1">{propertyStats.totalRooms}</div>
            <div className="text-sm text-gray-600">Total Rooms</div>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-amber-600 mb-1">{propertyStats.happyGuests}</div>
            <div className="text-sm text-gray-600">Happy Guests</div>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-amber-600 mb-1">{propertyStats.roomService}</div>
            <div className="text-sm text-gray-600">Room Service</div>
          </div>
        </div>

        {/* Rooms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {roomTypes.map((room, index) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              index={index} 
              isExpanded={expandedRoom === room.id}
              onToggle={handleToggleRoom}
            />
          ))}
        </motion.div>

        {/* Common Amenities Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CORE_CONFIG.accommodation.amenities.common.map((amenity, index) => (
              <div key={index} className="text-center p-3 bg-amber-50 rounded-lg">
                <div className="text-amber-600 mb-2">
                  {amenity.includes('Wi-Fi') && <Wifi className="w-6 h-6 mx-auto" />}
                  {amenity.includes('Breakfast') && <Coffee className="w-6 h-6 mx-auto" />}
                  {amenity.includes('Parking') && <Car className="w-6 h-6 mx-auto" />}
                  {amenity.includes('Service') && <Clock className="w-6 h-6 mx-auto" />}
                  {!amenity.includes('Wi-Fi') && !amenity.includes('Breakfast') && !amenity.includes('Parking') && !amenity.includes('Service') && <Star className="w-6 h-6 mx-auto" />}
                </div>
                <span className="text-sm text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-gray-600 mb-6">
            Experience comfort and hospitality at its finest. All rooms include complimentary breakfast 
            and access to our pure vegetarian restaurant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CORE_CONFIG.contact.primary.phone}`}
              className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call for Best Rates
            </a>
            <button
              onClick={() => navigate("/#reservations")}
              className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
            >
              <Bed size={20} />
              Book Online
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              {CORE_CONFIG.accommodation.highlights.map((highlight, index) => (
                <span key={index} className="flex items-center gap-1">
                  <span className="text-green-600">✓</span>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;