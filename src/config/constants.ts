// src/config/constants.ts

// Core Configuration - SINGLE SOURCE OF TRUTH
export const CORE_CONFIG = {
  business: {
    basic: {
      name: "Guest House",
      type: "hotel",
      foundedYear: 2012,
      cuisine: ["North Indian", "Punjabi", "Chinese"],
      specialties: ["Pure Vegetarian", "Jain Options Available"],
      isVegetarian: true,
      hasJainOptions: true,
      tagline: "Your Home Away from Home",
      establishmentType: ["Hotel", "Guest House", "Restaurant"]
    },
    branding: {
      colors: {
        primary: "#B45309",   // amber-600
        secondary: "#FDE68A", // amber-200
        accent: "#92400E",    // amber-800
        text: "#1F2937"       // gray-800
      },
      logo: {
        main: "/images/logo.png",
        alternate: "/images/logo-white.png",
        favicon: "/favicon.ico"
      }
    }
  },

  accommodation: {
    propertyStats: {
      yearsOfService: 25,
      totalRooms: 24,
      happyGuests: "10K+",
      roomService: "24/7"
    },
    roomTypes: [
      {
        id: "classic",
        name: "Classic Rooms",
        tagline: "Comfort That Feels Like Home",
        description: "Thoughtfully designed rooms offering a perfect blend of comfort and value. Each room features quality furnishings and all essential amenities for a memorable stay.",
        features: ["Queen/Twin Beds", "Complimentary Breakfast", "Free Wi-Fi", "24/7 Room Service"],
        highlight: "Great Value",
        images: {
          folder: "/Images/Rooms/Classic/",
          count: 3,
          placeholders: ["CLASSIC_ROOM_1", "CLASSIC_ROOM_2", "CLASSIC_ROOM_3"]
        }
      },
      {
        id: "premium",
        name: "Premium AC Rooms",
        tagline: "Enhanced Comfort, Perfect Climate",
        description: "Experience superior comfort with our climate-controlled premium rooms. Featuring modern amenities and elegant interiors, perfect for discerning travelers.",
        features: ["Air Conditioning", "King Size Bed", "Smart TV & OTT", "Complimentary Breakfast"],
        highlight: "Most Booked",
        images: {
          folder: "/Images/Rooms/Premium/",
          count: 3,
          placeholders: ["PREMIUM_ROOM_1", "PREMIUM_ROOM_2", "PREMIUM_ROOM_3"]
        }
      },
      {
        id: "executive",
        name: "Executive Rooms",
        tagline: "Where Luxury Meets Functionality",
        description: "Spacious rooms with premium furnishings and a dedicated work area. Designed for guests who appreciate extra space and refined comfort.",
        features: ["Premium King Bed", "Work Station", "Mini Fridge", "Complimentary Breakfast"],
        highlight: "Business Ready",
        images: {
          folder: "/Images/Rooms/Executive/",
          count: 3,
          placeholders: ["EXECUTIVE_ROOM_1", "EXECUTIVE_ROOM_2", "EXECUTIVE_ROOM_3"]
        }
      },
      {
        id: "suite",
        name: "Family Suites",
        tagline: "Togetherness in Luxury",
        description: "Expansive two-room suites with separate living areas. Ideal for families and groups seeking space, privacy, and premium amenities all under one roof.",
        features: ["2 Bedrooms", "Living Room", "Kitchenette", "Complimentary All Meals"],
        highlight: "Perfect for Families",
        images: {
          folder: "/Images/Rooms/Suite/",
          count: 3,
          placeholders: ["SUITE_ROOM_1", "SUITE_ROOM_2", "SUITE_ROOM_3"]
        }
      }
    ],
    amenities: {
      common: [
        "Complimentary Breakfast",
        "Free High-Speed Wi-Fi",
        "24/7 Front Desk",
        "Daily Housekeeping",
        "In-house Pure Veg Restaurant",
        "Laundry Service",
        "Room Service",
        "Power Backup",
        "Hot Water Round the Clock",
        "Secure Parking"
      ],
      premium: [
        "Air Conditioning",
        "Smart TV with OTT Apps",
        "Mini Refrigerator",
        "Work Desk with Charging Points",
        "Premium Bath Amenities",
        "Tea/Coffee Maker"
      ]
    },
    policies: {
      checkIn: "12:00 PM",
      checkOut: "11:00 AM",
      earlyCheckIn: "Subject to Availability",
      lateCheckOut: "Subject to Availability",
      complimentaryBreakfast: "7:00 AM - 10:30 AM"
    },
    messages: {
      cta: {
        primary: "Not Sure Which Room to Choose?",
        secondary: "Our friendly staff is here to help you find the perfect accommodation for your needs and budget."
      },
      whatsapp: {
        roomInquiry: "Hi, I'm interested in {roomType}. Please share availability and rates.",
        generalInquiry: "Hi, I need help choosing a room for my stay."
      }
    },
    highlights: [
      "All rooms include complimentary breakfast",
      "Pure vegetarian in-house restaurant",
      "Located in the heart of the city",
      "Family-owned with personalized service"
    ]
  },

  contact: {
    primary: {
      phone: "+91 1231231231",
      whatsapp: "+91 1231231231",
      email: "123@gmail.com"
    },
    secondary: {
      phone: "+91 1231231231"
    }
  },

  location: {
    primary: {
      street: "Opp HDFC Bank",
      area: "Sayajigunj",
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      pincode: "390001",
      landmark: "Near MS University",
      coordinates: {
        latitude: "22.3072° N",
        longitude: "73.1812° E"
      },
      googleMapsUrl: "https://maps.app.goo.gl/yNMFx8SJnZZUxzAB9",
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=your-embed-code"
    }
  },

  social: {
    facebook: {
      url: "https://www.facebook.com/p/Orizon-Restaurant-100068678364334/",
      handle: "@orizonrestaurant",
      enabled: true
    },
    instagram: {
      url: "https://www.instagram.com/orizon_restaurant/",
      handle: "@orizonrestaurant",
      enabled: true
    }
  },
  
  operations: {
    timing: {
      lunch: {
        open: "11:00 AM",
        close: "3:15 PM"
      },
      dinner: {
        open: "6:30 PM",
        close: "10:45 PM"
      }
    },
    reservation: {
      enabled: true,
      maxPartySize: 20,
      timeSlots: {
        first: "11:00",
        last: "22:30",
        interval: 30 // minutes
      }
    }
  },

  reviews: {
    platforms: {
      google: {
        rating: 4.1,
        url: "https://www.google.com/maps/place/Orizon+Restaurant/@22.2868452,73.1659995,17z/data=!4m8!3m7!1s0x395fc61a972eb723:0xc9e660d327777e1e!8m2!3d22.2868452!4d73.1685744!9m1!1b1!16s%2Fg%2F124t20jzr?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
        reviewUrl: "https://www.google.com/maps/place/Orizon+Restaurant/@22.2868452,73.1659995,17z/data=!4m8!3m7!1s0x395fc61a972eb723:0xc9e660d327777e1e!8m2!3d22.2868452!4d73.1685744!9m1!1b1!16s%2Fg%2F124t20jzr?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D", 
        logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBmaWxsPSIjRkZDMTA3IiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMS42NDksNC42NTctNi4wOCw4LTExLjMwMyw4Yy02LjYyNywwLTEyLTUuMzczLTEyLTEyYzAtNi42MjcsNS4zNzMtMTIsMTItMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxMi45NTUsNCw0LDEyLjk1NSw0LDI0YzAsMTEuMDQ1LDguOTU1LDIwLDIwLDIwYzExLjA0NSwwLDIwLTguOTU1LDIwLTIwQzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiLz48cGF0aCBmaWxsPSIjRkY3MDQzIiBkPSJNNi4zMDYsMTQuNjkxbDYuNTcxLDQuODE5QzE0LjY1NSwxNS4xMDgsMTguOTYxLDEyLDI0LDEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiIvPjxwYXRoIGZpbGw9IiM0Q0FGNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2Yy01LjIwMiwwLTkuNjE5LTMuMzE3LTExLjI4My03Ljk0NmwtNi41MjIsNS4wMjVDOS41MDUsMzkuNTU2LDE2LjIyNyw0NCwyNCw0NHoiLz48cGF0aCBmaWxsPSIjMTk3NkQyIiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMC43OTIsMi4yMzctMi4yMzEsNC4xNjYtNC4wODcsNS41NzFjMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiLz48L3N2Zz4="
      },
      zomato: {
        url: "https://www.zomato.com/vadodara/orizon-restaurant-akota/reviews",
        reviewUrl: "https://www.zomato.com/vadodara/orizon-restaurant-akota/reviews",
        logo: "https://b.zmtcdn.com/images/logo/zomato_logo_2017.png"
      }
    },
    featured: [
      {
        id: 6,
        author: "Manan Pandya",
        rating: 5,
        platform: "Google",
        date: "9 months ago",
        text: "Amazing Punjabi food available here. They have good take away options such as the combos and the thalis. Must try and must visit this place. Recommended dishes: Gulab Jamun, Veg Sweet Corn Soup, Hara Bhara Kebab and Manchow Soup, Mix Veg, Tandoori Roti, Dal Tadka, Veg Combo, Cheese Butter Masala, Assorted Roti's, Corn Cheese Samosa."
      },
      {
        id: 7,
        author: "Urvi Mistry",
        rating: 5,
        platform: "Google", // or other platform if specified
        date: "a year ago",
        text: "I ordered the meal packet and the food was amazing.all my guests loved it. Both bhaji were delicious,roti were soft , chas was nice and gulab jamun too."
      },
      {
        id: 8,
        author: "Jaimin Shah MjStudio",
        rating: 5,
        platform: "Google",
        date: "3 months ago",
        text: "Everything was perfectly balanced..food , service, parking, lift & staircase,, the staff was so good that nothing needed to discuss or argue.. too good experience."
      },
      {
        id: 9,
        author: "Isha",
        rating: 5,
        platform: "Google", // or other platform if specified
        date: "3 months ago",
        text: "The service was good. Not too much pricey as well. Very cooperative staff."
      },
      {
        id: 10,
        author: "Rahul Patel",
        rating: 5,
        platform: "Google",
        date: "9 months ago",
        text: "Very nice option ....food quality and taste best.... great ambiance. Recommended dishes: Spring Roll, Dry Manchurian and Hara Bhara Kebab."
      },
      {
        id: 11,
        author: "Nirmal Mochi",
        rating: 5,
        platform: "Google",
        date: "2 years ago",
        text: "Fantastic food and nice ambiance. Must go for a bite of healthy food."
      },
      {
        id: 12,
        author: "Shraddha Parikh",
        rating: 5,
        platform: "Google",
        date: "5 years ago",
        text: "Food is very good. It's like the next choice after my home food. We visit this restaurant very frequently or we order food at home. Staff is good and now well known to us. Very nice punjabi food and rates are absolutely reasonable."
      },
      {
        id: 13,
        author: "vinay chawla",
        rating: 5,
        platform: "Google",
        date: "6 years ago",
        text: "I have tried the limited executive lunch there... More than sufficient for me and my wife as well. And food quality was good every time I had it. Good ambience. Good pricing. 5 stars for excellent food quality."
      },
      {
        id: 14,
        author: "shraddha parikh",
        rating: 5,
        platform: "Google",
        date: "6 years ago",
        text: "It's a very nice restaurant as far as food is concerned. We go there often or even order for home delivery. Very palatable taste. Nice, cosy and tidy restaurant--- good hygenically. It has a banquet hall too which can accomodate around 100 person. Can arrange kitty parties and birthday celebrations. I would certainly recommend this restaurant to anybody/ everybody."
      },
      {
         id: 15,
         author: "shraddha parikh",
         rating: 5,
         platform: "Google",
         date: "6 years ago",
         text: "It's a very nice restaurant as far as food is concerned. We go there often or even order for home delivery. Very palatable taste. Nice, cosy and tidy restaurant--- good hygenically. It has a banquet hall too which can accomodate around 100 person. Can arrange kitty parties and birthday celebrations. I would certainly recommend this restaurant to anybody/ everybody."
      }

    ],
    submission: {
    platforms: {
      google: {
        enabled: true,
        reviewUrl: "https://www.google.com/maps/place/Orizon+Restaurant/@22.2868452,73.1659995,17z/data=!4m8!3m7!1s0x395fc61a972eb723:0xc9e660d327777e1e!8m2!3d22.2868452!4d73.1685744!9m1!1b1!16s%2Fg%2F124t20jzr?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
      },
      zomato: {
        enabled: true,
        reviewUrl: "https://www.zomato.com/review"
      }
    },
    feedbackCategories: [
      { id: 'food', label: 'Food Quality' },
      { id: 'service', label: 'Service' },
      { id: 'ambience', label: 'Ambience' },
      { id: 'cleanliness', label: 'Cleanliness' },
      { id: 'value', label: 'Value for Money' }
    ],
    contactPreferences: [
      { id: 'phone', label: 'Phone' },
      { id: 'email', label: 'Email' },
      { id: 'whatsapp', label: 'WhatsApp' }
    ]
  },
    overall: {
    rating: 3.9,
    totalReviews: 1400,  // Sum of all platform reviews
    distribution: {
      5: 850,  // Number of 5-star reviews
      4: 300,  // Number of 4-star reviews
      3: 100,  // Number of 3-star reviews
      2: 30,   // Number of 2-star reviews
      1: 20    // Number of 1-star reviews
    }
  }
  },
  
  facilities: {
    dining: {
      seating: {
        indoor: 120,
        outdoor: 30,
        privateRoom: 20,
        totalCapacity: 170
      },
      sections: {
        familyArea: true,
        privateBooths: true,
        partyHall: true
      }
    },
    banquet: {
      gallery: [
        {
          image: "/images/Banquet section hero (4).webp",
          title: "Ambience",
          description: "Where luxury meets comfort in every corner"
        },
        {
          image: "/images/Banquet section hero (3).webp",          
          title: "Celebrations",
          description: "Creating memories that last a lifetime"
        },
        {
          image: "/images/Banquet section hero (5).webp",
          title: "Gatherings",
          description: "Perfect space for your perfect moments"
        },
        {
          image: "/images/Banquet section hero (2).webp",
          title: "Elegance",
          description: "Designed to impress, crafted for your events"
        },
        {
          image: "/images/Banquet section hero (1).webp",
          title: "Occasions",
          description: "Every celebration deserves a stunning setting"
        }
      ]
      ,
      virtualTour: [
  {
    url: "https://www.google.com/maps/embed?pb=!4v1741550248042!6m8!1m7!1sCAoSLEFGMVFpcE9KNUF1cnVab0FubXJha3l6dkNsS200eFlHOHZ2ak9Ed2YtVVJ4!2m2!1d22.28687212905248!2d73.1685740919439!3f0!4f0!5f0.7820865974627469",
    title: "Main Hall"
  },
  {
    url: "https://www.google.com/maps/embed?pb=!4v1741550343468!6m8!1m7!1sCAoSLEFGMVFpcFBIUDdXazdqSEdDUVBKck9ZWnJ3bEFZelpyQXZLbTNaTUh6RXBX!2m2!1d22.28684185831597!2d73.16854546359218!3f355.60757103605164!4f-0.5769961828539749!5f0.7820865974627469",
    title: "Stage Area"
  },
  {
    url: "https://www.google.com/maps/embed?pb=!4v1741550312401!6m8!1m7!1sCAoSLEFGMVFpcE9yUmhsZUZPM3BOdjIxdUVlMGdRWFZGU09yUmpyWHUwVU50Slo5!2m2!1d22.2869215643452!2d73.16853087933613!3f80!4f0!5f0.7820865974627469",
    title: "Dining Setup"
  }
],
      seating: {
        dining: 150,
        standing: 250,
        minimumGuests: 50
      },
      features: {
        capacity: [
          "Up to 250 guests",
          "3 hours of complimentary hall usage",
          "Parking Available"
        ],
        services: [
          "Customized catering packages",
          "Decoration services (3rd patry)",
          "Corporate meet",
          "Birthday Parties",
          "Marriage Reception",
          "Get Together" 
        ],
        amenities: [
          "Elevator available",
          "Customizable lighting",
          "Air conditioning",
          "Separate entrance"
        ]

      },
      eventTypes: [
        { value: "wedding", label: "Wedding Reception" },
        { value: "birthday", label: "Birthday Party" },
        { value: "corporate", label: "Corporate Event" },
        { value: "social", label: "Social Gathering" },
        { value: "festival", label: "Festival Celebration" },
        { value: "other", label: "Other" }
      ],
      
    },
    parking: {
      available: true,
      valet: true,
      capacity: 50
    },
    amenities: {
      basic: [
        "Air Conditioning",
        "Wheelchair Access",
        "Washrooms"
      ],
    }
  },

 

  delivery: {
    enabled: true,
    partners: [
      {
        name: "Zomato",
        enabled: true,
        link: "https://www.zomato.com/vadodara/orizon-restaurant-akota/order",
        logo: "/images/partners/zomato.png",
        minimumOrder: 200
      },
      {
        name: "Swiggy",
        enabled: true,
        link: "",
        logo: "/images/partners/swiggy.png",
        minimumOrder: 200
      }
    ],
    restrictions: {
      radius: 5,
      minimumOrder: 200
    }
  }
}; 

// Site Configuration for Features and Behavior
export const SITE_CONFIG = {
  features: {
    menu: {
      display: {
        popupEnabled: false,
        showPrices: true,
        showImages: true,
        showDescription: true,
        showDietaryInfo: true
      },
      animation: {
        type: "fade",
        delay: 200,
        enabled: true
      },
      filters: {
        enabled: true,
        options: [
          "Jain",
          "Spicy",
          "Chef's Special",
          "New",
          "Popular"
        ]
      }
    },

    forms: {
      common: {
        validation: {
          enabled: true,
          showErrorsOnSubmit: true,
          showErrorsOnChange: false,
          validateOnBlur: true
        },
        timing: {
          successMessageDuration: 1000,
          redirectDelay: 1500
        }
      },

      reservation: {
        enabled: true,
        whatsapp: {
          enabled: true,
          number: CORE_CONFIG.contact.primary.whatsapp.replace(/\D/g, ""),
          messageTemplate: `
Hey Team ${CORE_CONFIG.business.basic.name}! 👋

I would like to book a table at your restaurant. Here are my details:

--------------------------------
Name: {name}
Phone: {phone}
Date: {date}
Time: {time}
Party Size: {guests} {guestText}
{occasionText}
{specialRequestsText}
--------------------------------

Looking forward to your confirmation! 🙏
          `
        },
        messages: {
          success: {
            title: "🎉 Great choice!",
            content: "We're redirecting you to WhatsApp where our team will confirm your reservation."
          },
          error: {
            title: "🙈 Oops!",
            content: "Looks like our devs are too busy with out tikkas! Please try again."
          },
          loading: {
            button: "Submitting your Inquiry...",
            default: "Submit Inquiry"
          }
        }
      },

      banquet: {
        enabled: true,
        whatsapp: {
          enabled: true,
          messageTemplate: `
Hey Team ${CORE_CONFIG.business.basic.name}! 👋

New Banquet Hall Inquiry:

--------------------------------
Name: {name}
Phone: {phone}
Email: {email}
Event Type: {eventType}
Number of Guests: {guests}
Preferred Date: {date}
Additional Notes: {notes}
          `
        },
        messages: {
          success: {
            title: "🎉 Thank you for your inquiry!",
            content: "We're redirecting you to WhatsApp where our team will assist you with the booking."
          },
          error: {
            title: "🙈 Oops!",
            content: "There was an error processing your inquiry. Please try again."
          },
          loading: {
            button: "📝 Processing...",
            default: "Submit Inquiry"
          }
        },
        validation: {
          maxGuests: 250,
          minAdvanceBookingDays: 7,
          maxAdvanceBookingDays: 180
        }
      }
    }
  }
};

// Helper Functions
export const siteHelpers = {
  // ... existing helper functions remain unchanged ...
};

// Backward Compatibility
export const RESTAURANT_CONFIG = {
  // ... existing backward compatibility config remains unchanged ...
};
