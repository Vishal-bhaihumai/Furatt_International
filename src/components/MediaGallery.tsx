import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaGalleryProps {
  media: string[];
  title: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, title }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % media.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + media.length) % media.length);
  };

  return (
    <div>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {media.map((url, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={url}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Fullscreen Popup */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 text-white hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-amber-400 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-7xl max-h-[90vh] w-full h-full p-4">
            <img
              src={media[selectedIndex]}
              alt={`${title} ${selectedIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg font-medium">{title}</p>
              <p className="text-sm">
                Image {selectedIndex + 1} of {media.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery