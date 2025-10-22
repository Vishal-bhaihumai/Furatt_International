import React, { useState, useRef, useEffect } from 'react';
import { Star, ThumbsUp, X, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CORE_CONFIG } from '../config/constants';
import { useFormValidation } from '../hooks/useFormValidation';
import { api, Review } from '../services/supabase';

interface UploadedImage {
  file: File;
  preview: string;
}

interface FeedbackFormData {
  category: string;
  comment: string;
  visitDate: string;
  contactPreference?: string;
  contactDetails?: string;
}

const ReviewsPage = () => {
  // States
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [showContactFeedback, setShowContactFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [supabaseReviews, setSupabaseReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Constants
  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const platforms = {
    google: CORE_CONFIG.reviews.platforms.google,
    zomato: CORE_CONFIG.reviews.platforms.zomato
  };
  const platformOptions = ["All", "Google", "Zomato"];
  
  // Fetch reviews from Supabase on component mount
  useEffect(() => {
    fetchSupabaseReviews();
  }, []);

  const fetchSupabaseReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const reviews = await api.reviews.getApproved();
      setSupabaseReviews(reviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  // Combine Supabase reviews with featured reviews
  const reviews = [...CORE_CONFIG.reviews.featured, ...supabaseReviews];
  const filteredReviews = selectedPlatform === "All"
    ? reviews
    : reviews.filter(review => review.platform === selectedPlatform);

  // Image handling
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (uploadedImages.length + files.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    const newImages: UploadedImage[] = [];
    let hasErrors = false;

    Array.from(files).forEach(file => {
      const error = validateImage(file);
      if (error) {
        alert(error);
        hasErrors = true;
        return;
      }
      newImages.push({
        file,
        preview: URL.createObjectURL(file)
      });
    });

    if (!hasErrors) {
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const validateImage = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload JPG, PNG, or WebP images only';
    }
    if (file.size > MAX_FILE_SIZE) {
      return `Image size should be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    return null;
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleContactInput = (value: string) => {
    if (value.match(/^[0-9]{10}$/)) {
      setShowContactFeedback(true);
    } else {
      setShowContactFeedback(false);
    }
  };

  const handleRatingSelect = (rating: number) => {
    setCurrentRating(rating);
    setSubmitError(null); // Reset any previous errors
    
    if (rating >= 4) {
      setShowRatingModal(true);
    } else {
      setShowFeedbackForm(true);
      setShowSuccessMessage(false); // Ensure success message is hidden initially
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const reviewData = {
        name: formData.get('name') as string || 'Anonymous',
        rating: currentRating,
        comment: formData.get('comment') as string || '',
        images: uploadedImages.map(img => img.preview) // In a real app, you'd upload these to storage
      };

      // Submit to Supabase
      await api.reviews.create(reviewData);

      // Reset form and states
      setCurrentRating(0);
      setUploadedImages([]);
      form.reset();

      // Refresh reviews list
      fetchSupabaseReviews();

      // Show success message
      setSubmitSuccess(true);
      setShowSuccessMessage(true);

    } catch (error) {
      console.error('Failed to submit review:', error);
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
    // Platform redirect modal for 4-5 star ratings
  const PlatformRedirectModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setShowRatingModal(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setShowRatingModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Your Wonderful Rating! 🎉
        </h3>
        <p className="text-gray-600 mb-6">
          We're delighted that you enjoyed your experience. Would you mind sharing your review on any of these platforms?
        </p>

        <div className="space-y-4">
          <a
            href={CORE_CONFIG.reviews.platforms.google.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
          >
            <img
              src={CORE_CONFIG.reviews.platforms.google.logo}
              alt="Google"
              className="h-6"
            />
            <span className="text-gray-700 font-medium group-hover:text-amber-600">Review on Google</span>
          </a>
          <a
            href={CORE_CONFIG.reviews.platforms.zomato.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
          >
            <img
              src={CORE_CONFIG.reviews.platforms.zomato.logo}
              alt="Zomato"
              className="h-6"
            />
            <span className="text-gray-700 font-medium group-hover:text-amber-600">Review on Zomato</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );

  // Updated Feedback form for 1-3 star ratings with Supabase integration
  const DetailedFeedbackForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setShowFeedbackForm(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setShowFeedbackForm(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          We Value Your Feedback
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for sharing your experience. We're committed to improving and would love to hear more details.
        </p>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        {submitSuccess && showSuccessMessage ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              Thank you for sharing your feedback!
            </p>
            <button
              onClick={() => {
                setShowFeedbackForm(false);
                setSubmitSuccess(false); // Reset success state for future reviews
              }}
              className="w-full bg-amber-600 text-white py-3 rounded-md font-semibold hover:bg-amber-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowFeedbackForm(false);
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
            >
              Contact the Restaurant
            </button>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What aspects could be improved?
              </label>
              <select 
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select an area</option>
                {CORE_CONFIG.reviews.submission.feedbackCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Detailed Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please share your experience
              </label>
              <textarea
                name="comment"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Tell us about your experience..."
              ></textarea>
            </div>

            {/* Visit Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                When did you visit us?
              </label>
              <input
                type="date"
                name="visitDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Images (Optional)
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Upload up to 3 images (20MB each)
              </p>
              
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-md hover:border-amber-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Images</span>
                </button>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
                        {/* Contact Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How would you like us to contact you? (Optional)
              </label>
              <select 
                name="contactPreference"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 mb-2"
              >
                <option value="">Select contact preference</option>
                {CORE_CONFIG.reviews.submission.contactPreferences.map((pref) => (
                  <option key={pref.id} value={pref.id}>
                    {pref.label}
                  </option>
                ))}
              </select>
              
              <div className="relative">
                <input
                  type="text"
                  name="contactDetails"
                  placeholder="Your contact details"
                  onChange={(e) => handleContactInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
                {showContactFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 text-xs text-amber-600"
                  >
                    We'll reach out to you via call or WhatsApp
                  </motion.div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-amber-600 text-white py-3 rounded-md font-semibold hover:bg-amber-700 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Customer Reviews</h1>

        {/* 1. Overall Rating Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center">
            <div className="text-6xl font-bold text-amber-600 mb-4">
              {CORE_CONFIG.reviews.overall.rating}
            </div>
            <div className="flex justify-center items-center mb-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  key={index}
                  className="w-8 h-8 text-amber-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-600 text-lg">
              Based on {CORE_CONFIG.reviews.overall.totalReviews}+ reviews
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <a
                href={platforms.google.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <img
                  src={platforms.google.logo}
                  alt="Google"
                  className="h-5"
                />
                <span>{platforms.google.rating} ★</span>
              </a>
              <a
                href={platforms.zomato.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <img
                  src={platforms.zomato.logo}
                  alt="Zomato"
                  className="h-5"
                />
                <span>{platforms.zomato.rating} ★</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Write a Review Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Share Your Experience</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">How would you rate your experience?</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingSelect(rating)}
                    className="transform hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        (hoverRating || currentRating) >= rating
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Reviews List Section */}
        <div>
          {/* Platform Filter */}
          <div className="flex justify-center space-x-4 mb-8">
            {platformOptions.map(platform => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedPlatform === platform
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-800 hover:bg-amber-50'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoadingReviews && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading reviews...</p>
            </div>
          )}

          {/* Reviews Grid */}
          {!isLoadingReviews && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.author || review.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? 'text-amber-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date || review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.platform || 'Website'}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.text || review.comment}</p>
                  {(review.image || review.images?.[0]) && (
                    <img
                      src={review.image || review.images?.[0]}
                      alt="Review"
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <button 
                    onClick={() => handleHelpfulClick(review.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Helpful ({review.helpful || review.helpful_count || 0})</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showRatingModal && <PlatformRedirectModal />}
          {showFeedbackForm && <DetailedFeedbackForm />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewsPage;