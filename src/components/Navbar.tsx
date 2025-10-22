import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CORE_CONFIG } from '../config/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Banquet Hall', href: '/banquet' },
    { name: 'Reviews', href: '/reviews' },
    { 
      name: 'Contact', 
      href: '#contact',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Try to find the contact section first
        const contactSection = document.getElementById('contact');
        
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fall back to footer if contact section doesn't exist
          const footer = document.getElementById('footer') || document.querySelector('footer');
          
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
          } else if (location.pathname !== '/') {
            // If we're not on the homepage and can't find the elements,
            // navigate to homepage with the contact hash
            window.location.href = '/#contact';
          }
        }
        
        setIsOpen(false);
      }
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle contact link navigation when URL contains #contact or #footer
  useEffect(() => {
    if (location.hash === '#contact' || location.hash === '#footer') {
      setTimeout(() => {
        // Try contact section first, then fall back to footer
        const targetElement = 
          document.getElementById('contact') || 
          document.getElementById('footer') || 
          document.querySelector('footer');
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Delay to ensure the DOM is fully loaded
    }
  }, [location.hash]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 font-bold text-2xl text-amber-700">
            {CORE_CONFIG.business.basic.name}
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-amber-600' 
                      : 'text-white hover:text-amber-300'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isScrolled 
                  ? 'text-gray-700 hover:text-amber-600' 
                  : 'text-white hover:text-amber-300'
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={item.onClick}
                className="text-gray-700 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;