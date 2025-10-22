import React, { useState } from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { CORE_CONFIG } from '../config/constants';

// ============= Component Styles =============
const styles = `
  @keyframes fadeOut {
    0% { opacity: 1; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .animate-fade-out {
    animation: fadeOut 1.5s ease-out forwards;
  }

  .email-address {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  .icon-size {
    width: 1em;
    height: 1em;
  }
`;

// ============= Utility Components =============

/**
 * CopyFeedback Component
 * Displays a subtle animation when content is copied
 */
const CopyFeedback = ({ text }) => (
  <span className="absolute left-full ml-2 text-xs text-amber-500 animate-fade-out">
    {text}
  </span>
);

/**
 * WhatsApp Icon Component
 * Custom SVG icon for WhatsApp
 */
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ============= Main Footer Component =============
const Footer = () => {
  // ============= Constants & State =============
  const whatsappUrl = `https://wa.me/${CORE_CONFIG.contact.primary.whatsapp.replace(/\D/g, '')}`;
  const googleRating = CORE_CONFIG.reviews.platforms.google.rating;

  // State for copy feedback
  const [showPhoneCopy, setShowPhoneCopy] = useState(false);
  const [showEmailCopy, setShowEmailCopy] = useState(false);

  // ============= Event Handlers =============
  
  /**
   * Handles phone number click
   * - On mobile: Opens phone dialer
   * - On desktop: Copies to clipboard with feedback
   */
  const handlePhoneClick = () => {
    const phoneNumber = CORE_CONFIG.contact.primary.phone.replace(/\D/g, '');
    if (window.innerWidth <= 768) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      navigator.clipboard.writeText(phoneNumber);
      setShowPhoneCopy(true);
      setTimeout(() => setShowPhoneCopy(false), 1500);
    }
  };

  /**
   * Handles email click
   * Copies email to clipboard with feedback
   */
  const handleEmailClick = () => {
    navigator.clipboard.writeText(CORE_CONFIG.contact.primary.email);
    setShowEmailCopy(true);
    setTimeout(() => setShowEmailCopy(false), 1500);
  };

  // ============= Render Method =============
  return (
    <>
      <style>{styles}</style>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* ============= Business Info Section ============= */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{CORE_CONFIG.business.basic.name}</h3>
              <p className="text-gray-400">
              Comfortable stays & delicious food in since {CORE_CONFIG.business.basic.foundedYear}.
              
              </p>
              
              {/* Social Media Links */}
              <div className="mt-4 flex space-x-4">
                <a 
                  href={CORE_CONFIG.social.facebook.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href={CORE_CONFIG.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  title="Chat with us on WhatsApp"
                  aria-label="Contact us on WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a 
                  href={CORE_CONFIG.location.primary.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label="Get directions"
                >
                  <MapPin className="w-6 h-6" />
                </a>
              </div>

              {/* Online Order Button */}
              <div className="mt-4 text-left">
                {CORE_CONFIG.delivery.enabled && CORE_CONFIG.delivery.partners.length > 0 && (
                  <a 
                    href={CORE_CONFIG.delivery.partners[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Order Online
                  </a>
                )}
              </div>
            </div>

            {/* ============= Quick Links Section ============= */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/menu" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/banquet" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Banquet Hall
                  </a>
                </li>
              </ul>
            </div>

            {/* ============= Opening Hours Section ============= */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-gray-400">
              <li>Open Daily</li>
              <li>
                Lunch:
                <br />
                {CORE_CONFIG.operations.timing.lunch.open} - {CORE_CONFIG.operations.timing.lunch.close}
              </li>
              <li>
                Dinner:
                <br />
                {CORE_CONFIG.operations.timing.dinner.open} - {CORE_CONFIG.operations.timing.dinner.close}
              </li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-gray-400 mt-1">
                  Rated {googleRating} on Google Reviews
                </p>
              </div>
            </div>

            {/* ============= Contact Section ============= */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="cursor-pointer flex items-center relative group">
                  <Phone className="icon-size mr-2" />
                  <span 
                    onClick={handlePhoneClick}
                    className="group-hover:text-amber-500 transition-colors relative"
                  >
                    {CORE_CONFIG.contact.primary.phone}
                    {showPhoneCopy && <CopyFeedback text="Copied!" />}
                  </span>
                </li>
                <li 
                  className="cursor-pointer flex items-center relative group"
                  onClick={() => window.open(CORE_CONFIG.location.primary.googleMapsUrl, '_blank')}
                >
                  <MapPin className="icon-size mr-2" />
                  <span className="group-hover:text-amber-500 transition-colors">
                    {CORE_CONFIG.location.primary.street}<br />
                    {CORE_CONFIG.location.primary.area}<br />
                    {CORE_CONFIG.location.primary.city}, {CORE_CONFIG.location.primary.state}<br />
                    {CORE_CONFIG.location.primary.pincode}
                  </span>
                </li>
                <li className="cursor-pointer flex items-center relative group">
                  <Mail className="icon-size mr-2" />
                  <span 
                    onClick={handleEmailClick}
                    className="group-hover:text-amber-500 transition-colors relative email-address"
                  >
                    {CORE_CONFIG.contact.primary.email}
                    {showEmailCopy && <CopyFeedback text="Copied!" />}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ============= Copyright Section ============= */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} {CORE_CONFIG.business.basic.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm">
              Website by{' '}
              <a
                href="#"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                Hustle Studios
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;