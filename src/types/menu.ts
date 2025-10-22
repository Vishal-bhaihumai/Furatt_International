// Menu structure types
export interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  subsections?: string[];
}

export interface SubSection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline?: string;
  description?: string;  // Made optional
  price: string;
  sections: string[];
  subsections?: string[];  // Made optional
  heritage?: {
    origin: string;
    story: string;
  };
  pairings?: {
    dishes: string[];
    beverages: string[];
  };
  chef?: {
    tip: string;
    name: string;
  };
  recipe?: {
    mainIngredients: string[];
    prepTime: string;
    cookingMethod: string;
  };
  dietary?: {
    isJain: boolean;
    isSwaminarayan: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    spiceLevel: number;
    allergens: string[];
    customizations: string[];
  };
  funFact?: string;
  images?: string[];  // Made optional
  isVeg: boolean;
}

export interface MenuStructure {
  sections: { [key: string]: Section };
  subsections: { [key: string]: SubSection };
}