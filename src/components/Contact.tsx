import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import { CORE_CONFIG } from '../config/constants';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      message: ''
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
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value) => {
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
        }
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      formData.append('timestamp', new Date().toISOString());
      formData.append('userAgent', navigator.userAgent);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        resetForm();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-orange-900">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">{CORE_CONFIG.contact.primary.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">{CORE_CONFIG.contact.primary.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">
                    {CORE_CONFIG.location.primary.street}, {CORE_CONFIG.location.primary.area}, {CORE_CONFIG.location.primary.city}, {CORE_CONFIG.location.primary.state}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div className="text-gray-700">
                    <p>Mon-Fri: {CORE_CONFIG.operations.timing.weekdays.open} - {CORE_CONFIG.operations.timing.weekdays.close}</p>
                    <p>Sat-Sun: {CORE_CONFIG.operations.timing.weekends.open} - {CORE_CONFIG.operations.timing.weekends.close}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-orange-900">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href={CORE_CONFIG.social.facebook.url} className="text-orange-600 hover:text-orange-700" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                    </svg>
                  </a>
                  <a href={CORE_CONFIG.social.instagram.url} className="text-orange-600 hover:text-orange-700" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2.982c2.937,0,3.285.011,4.445.064a6.087,6.087,0,0,1,2.042.379,3.408,3.408,0,0,1,1.265.823,3.408,3.408,0,0,1,.823,1.265,6.087,6.087,0,0,1,.379,2.042c.053,1.16.064,1.508.064,4.445s-.011,3.285-.064,4.445a6.087,6.087,0,0,1-.379,2.042,3.643,3.643,0,0,1-2.088,2.088,6.087,6.087,0,0,1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087,6.087,0,0,1-2.043-.379,3.408,3.408,0,0,1-1.265-.823,3.408,3.408,0,0,1-.823-1.265,6.087,6.087,0,0,1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087,6.087,0,0,1,.379-2.042,3.408,3.408,0,0,1,.823-1.265,3.408,3.408,0,0,1,1.265-.823,6.087,6.087,0,0,1,2.043-.379c1.16-.053,1.508-.064,4.445-.064M12,1c-2.987,0-3.362.013-4.535.066a8.074,8.074,0,0,0-2.67.511,5.392,5.392,0,0,0-1.949,1.27,5.392,5.392,0,0,0-1.27,1.949,8.074,8.074,0,0,0-.511,2.67C1.013,8.638,1,9.013,1,12s.013,3.362.066,4.535a8.074,8.074,0,0,0,.511,2.67,5.392,5.392,0,0,0,1.27,1.949,5.392,5.392,0,0,0,1.949,1.27,8.074,8.074,0,0,0,2.67.511C8.638,22.987,9.013,23,12,23s3.362-.013,4.535-.066a8.074,8.074,0,0,0,2.67-.511,5.625,5.625,0,0,0,3.219-3.219,8.074,8.074,0,0,0,.511-2.67C22.987,15.362,23,14.987,23,12s-.013-3.362-.066-4.535a8.074,8.074,0,0,0-.511-2.67,5.392,5.392,0,0,0-1.27-1.949,5.392,5.392,0,0,0-1.949-1.27,8.074,8.074,0,0,0-2.67-.511C15.362,1.013,14.987,1,12,1Zm0,5.351A5.649,5.649,0,1,0,17.649,12,5.649,5.649,0,0,0,12,6.351Zm0,9.316A3.667,3.667,0,1,1,15.667,12,3.667,3.667,0,0,1,12,15.667Zm5.872-10.859a1.32,1.32,0,1,0,1.32,1.32A1.32,1.32,0,0,0,17.872,4.808Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <h3 className="text-2xl font-semibold mb-6 text-orange-900">Send us a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  Sorry, there was an error sending your message. Please try again later.
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                    required
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 ${
                      touched.phone && errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md text-gray-900 ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitStatus === 'success'}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;