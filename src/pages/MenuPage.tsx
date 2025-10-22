import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { menuData } from '../data/menuData';
import VegIcon from '../components/VegIcon';
import { MenuItem } from '../types/menu';
import { useLocation } from 'react-router-dom';

const MenuPage = () => {
  const [expandedSection, setExpandedSection] = useState<string>("");
  const [expandedSubSection, setExpandedSubSection] = useState<string | null>(null);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if this is a direct navigation to menu page
    if (isInitialLoad) {
      setIsInitialLoad(false);
      if (!location.hash) {
        window.scrollTo(0, 0);
        setExpandedSection("");
        return;
      }
    }

    // Handle hash-based navigation
    const section = location.hash.slice(1);
    if (section) {
      setExpandedSection(section);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash, isInitialLoad]);

  // Reset expanded state when navigating away from menu
  useEffect(() => {
    return () => {
      setExpandedSection("");
      setExpandedSubSection(null);
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection("");
    } else {
      setExpandedSection(sectionId);
      setExpandedSubSection(null);
      
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleDownloadMenu = () => {
    const pdfUrl = 'Menu Pdf/Orizon_Menu.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Orizon-Menu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Item Card Component to reduce duplication
  const ItemCard = ({ item }: { item: MenuItem }) => (
    <div className="bg-white rounded-lg shadow-sm border border-amber-100">
      {item.images?.[0] && (
        <div className="relative">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {item.isVeg && (
            <div className="absolute top-2 right-2">
              <VegIcon />
            </div>
          )}
        </div>
      )}
      
      <div className={`p-4 ${!item.images?.[0] && 'rounded-t-lg'}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            {!item.images?.[0] && item.isVeg && (
              <div className="mt-1">
                <VegIcon />
              </div>
            )}
          </div>
          <span className="font-semibold text-amber-700 ml-4">{item.price}</span>
        </div>
        {item.description && (
          <p className="text-gray-600 text-sm mt-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuData.getSections().map((section) => (
            <div key={section.id} id={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => handleSectionClick(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-amber-600 text-white"
              >
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>

              {expandedSection === section.id && (
                <div className="p-6">
                  {menuData.hasSubsections(section.id) ? (
                    // Render sections with subsections
                    <div className="space-y-6">
                      {menuData.getSubsections(section.id).map((subsection) => (
                        <div key={subsection.id} className="mb-4">
                          <button
                            onClick={() => setExpandedSubSection(
                              expandedSubSection === subsection.id ? null : subsection.id
                            )}
                            className="w-full px-4 py-2 flex items-center justify-between bg-amber-100 text-amber-800 rounded-lg"
                          >
                            <h3 className="text-lg font-medium">{subsection.title}</h3>
                            {expandedSubSection === subsection.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {expandedSubSection === subsection.id && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                              {menuData.getItemsBySubSection(section.id, subsection.id).map((item) => (
                                <ItemCard key={item.id} item={item} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Render sections without subsections
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {menuData.getItemsBySection(section.id).map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Menu Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleDownloadMenu}
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Menu PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;