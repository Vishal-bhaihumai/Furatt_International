import React from 'react';
import { X, Clock, ChefHat, Flame, Info, Image } from 'lucide-react';
import { MenuItem } from '../types/menu';
import MediaGallery from './MediaGallery';

interface MenuPopupProps {
  item: MenuItem;
  onClose: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-64">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{item.name}</h2>
            {item.tagline && (
              <p className="text-lg text-amber-600 italic">{item.tagline}</p>
            )}
            <p className="text-xl font-semibold text-amber-700 mt-2">{item.price}</p>
          </div>

          {/* Description & Heritage */}
          <div className="space-y-4">
            <p className="text-gray-700">{item.description}</p>
            {item.heritage && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Heritage & Origin</h3>
                <p className="text-gray-700">{item.heritage.story}</p>
                <p className="text-sm text-amber-700 mt-2">Origin: {item.heritage.origin}</p>
              </div>
            )}
          </div>

          {/* Food Pairings */}
          {item.pairings && (item.pairings.dishes.length > 0 || item.pairings.beverages.length > 0) && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Best Enjoyed With</h3>
              <div className="flex flex-wrap gap-2">
                {[...item.pairings.dishes, ...item.pairings.beverages].map((pairing, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                  >
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chef's Section */}
          {item.chef && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">Chef's Tip</h3>
              </div>
              <p className="text-gray-700">{item.chef.tip}</p>
              <p className="text-sm text-gray-500 mt-2">- {item.chef.name}</p>
            </div>
          )}

          {/* Media Gallery Section */}
          {item.images.length > 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">Photos & Videos</h3>
              </div>
              <MediaGallery media={item.images} title={item.name} />
            </div>
          )}

          {/* Fun Fact */}
          {item.funFact && (
            <div className="bg-amber-50 p-4 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Fun Fact</h3>
                <p className="text-gray-700">{item.funFact}</p>
              </div>
            </div>
          )}

          {/* Recipe Overview */}
          {item.recipe && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Main Ingredients</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {item.recipe.mainIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-gray-700">Prep Time: {item.recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span className="text-gray-700">Cooking Method: {item.recipe.cookingMethod}</span>
                </div>
              </div>
            </div>
          )}

          {/* Dietary Information */}
          {item.dietary && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Dietary Information</h3>
              <div className="flex flex-wrap gap-3">
                {item.dietary.isJain && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Jain Friendly
                  </span>
                )}
                {item.dietary.isVegan && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Vegan
                  </span>
                )}
                {item.dietary.isGlutenFree && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Gluten Free
                  </span>
                )}
              </div>
              {item.dietary.spiceLevel > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Spice Level:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Flame
                        key={index}
                        className={`w-4 h-4 ${
                          index < item.dietary.spiceLevel
                            ? 'text-red-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {item.dietary.allergens.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-red-700 font-medium">Allergens:</p>
                  <p className="text-red-600">
                    {item.dietary.allergens.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Image Disclaimer */}
          <div className="text-sm text-gray-500 italic text-center border-t pt-4">
            Note: Images shown are for representation purposes only. Actual dish appearance may vary.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;