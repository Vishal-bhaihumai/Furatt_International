import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSpinnerProps {
  customDuration?: number;  // Optional prop to override default duration
  customMessage?: string;   // Optional prop to override default message
}

const LoadingSpinner = ({ 
  customDuration,
  customMessage = "Cooking your experience..."
}: LoadingSpinnerProps) => {
  const wokImage = "/wok-image.webp";
  const [showAnimation, setShowAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Duration logic
  const firstVisitDuration = 1500;
  const pageSwapDuration = 800;
  const [animationDuration, setAnimationDuration] = useState(firstVisitDuration);

  useEffect(() => {
    try {
      const hasVisitedBefore = localStorage.getItem("hasVisited");
      const duration = customDuration || (hasVisitedBefore ? pageSwapDuration : firstVisitDuration);

      setAnimationDuration(duration);
      
      if (!hasVisitedBefore) {
        localStorage.setItem("hasVisited", "true");
      }

      setShowAnimation(true);

      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, duration);

      return () => clearTimeout(timer);
    } catch (err) {
      // Fallback if localStorage is not available
      setAnimationDuration(pageSwapDuration);
      console.error("LocalStorage error:", err);
    }
  }, [customDuration]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = wokImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setError("Failed to load animation image");
  }, []);

  // Don't show anything if animation is complete
  if (!showAnimation) return null;

  // Show fallback if there's an error
  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          className="w-40 h-40 border-4 border-gray-200 border-t-orange-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <p className="mt-6 text-lg text-white font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50"
        >
          {/* Container for Wok & Buffering Animation */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Rotating Buffer Circle */}
            <motion.div
              className="absolute w-40 h-40 border-4 border-gray-200 border-t-orange-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />

            {/* Wok Image */}
            {imageLoaded && (
              <motion.img
                src={wokImage}
                alt="Wok"
                className="w-24 h-24 object-contain z-10"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>

          {/* Animated Text */}
          <motion.p
            className="mt-6 text-lg text-white font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {customMessage}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner;