import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '../hooks/useFormValidation';
import { CORE_CONFIG, SITE_CONFIG } from '../config/constants';

const BanquetPage = () => {
  // State management
  const [activeImage, setActiveImage] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Image slider controls
  const nextSlide = () => {
    setActiveImage((prev) => (prev + 1) % CORE_CONFIG.facilities.banquet.gallery.length);
  };

  const prevSlide = () => {
    setActiveImage((prev) => (prev - 1 + CORE_CONFIG.facilities.banquet.gallery.length) % CORE_CONFIG.facilities.banquet.gallery.length);
  };

  // Form validation setup
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidation(
    {
      name: '',
      phone: '',
      email: '',
      eventType: '',
      guests: '',
      date: '',
      notes: ''
    },
    {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      phone: {
        required: true,
        pattern: /^[0-9]{10}$/,
        custom: (value) => {
          if (!/^[0-9]{10}$/.test(value)) {
            return 'Please enter a valid 10-digit phone number';
          }
        }
      }
    }
  );
    /**
   * Handle form submission with WhatsApp integration
   */
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!validateForm()) {
        return;
      }
  
      try {
        const messageText = SITE_CONFIG.features.forms.banquet.whatsapp.messageTemplate
          .replace('{name}', values.name)
          .replace('{phone}', values.phone)
          .replace('{email}', values.email)
          .replace('{eventType}', values.eventType)
          .replace('{guests}', values.guests)
          .replace('{date}', new Date(values.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }))
          .replace('{notes}', values.notes || 'No additional notes');
  
        const whatsappNumber = CORE_CONFIG.contact.primary.whatsapp.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  
        setSubmitStatus('success');
  
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          setSubmitStatus('idle');
          resetForm();
        }, SITE_CONFIG.features.forms.common.timing.redirectDelay);
  
      } catch (error) {
        console.error('Banquet inquiry error:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), SITE_CONFIG.features.forms.common.timing.successMessageDuration);
      }
    };
  
    return (
      <div className="min-h-screen pt-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Banquet Hall</h1>
  
          {/* Image Slider Section */}
          <div className="relative mb-12 h-[600px] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                              <img
                src={CORE_CONFIG.facilities.banquet.gallery[activeImage].image}
                alt={CORE_CONFIG.facilities.banquet.gallery[activeImage].title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4 sm:px-0">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-bold mb-4"
                >
                  {CORE_CONFIG.facilities.banquet.gallery[activeImage].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl italic"
                >
                  {CORE_CONFIG.facilities.banquet.gallery[activeImage].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Virtual Tour Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Virtual Tour</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CONFIG.facilities.banquet.virtualTour.map((view, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={view.url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Virtual Tour View ${index + 1}`}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Features Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Banquet Features</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Capacity & Space</h3>
                <ul className="space-y-2 text-gray-600">
                  {CORE_CONFIG.facilities.banquet.features.capacity.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-600">
                  {CORE_CONFIG.facilities.banquet.features.services.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <ul className="space-y-2 text-gray-600">
                  {CORE_CONFIG.facilities.banquet.features.amenities.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Banquet Inquiry</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                  {SITE_CONFIG.features.forms.banquet.messages.success.content}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {SITE_CONFIG.features.forms.banquet.messages.error.content}
                </div>
              )}
                            {/* Name Field */}
                            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    touched.name && errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                  }`}
                  required
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      touched.phone && errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                    required
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Event Type Field */}
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={values.eventType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    touched.eventType && errors.eventType
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                  }`}
                >
                  <option value="">Select event type</option>
                  {CORE_CONFIG.facilities.banquet.eventTypes.map((type, index) => (
                    <option key={index} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {touched.eventType && errors.eventType && (
                  <p className="mt-1 text-sm text-red-600">{errors.eventType}</p>
                )}
              </div>

              {/* Guests Field */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="1"
                    max={CORE_CONFIG.facilities.dining.seating.totalCapacity}
                    value={values.guests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      touched.guests && errors.guests
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                </div>
                {touched.guests && errors.guests && (
                  <p className="mt-1 text-sm text-red-600">{errors.guests}</p>
                )}
              </div>

              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      touched.date && errors.date
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                </div>
                {touched.date && errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Notes Field */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-md font-semibold hover:bg-amber-700 transition-colors"
              >
                {submitStatus === 'idle' 
                  ? SITE_CONFIG.features.forms.banquet.messages.loading.default
                  : SITE_CONFIG.features.forms.banquet.messages.loading.button
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanquetPage;