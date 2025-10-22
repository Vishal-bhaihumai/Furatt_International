import { MenuStructure, MenuItem } from '../types/menu';

// Define section and subsection types
interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  subsections?: string[];
}

interface SubSection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

// Menu structure with sections and subsections
const structure = {
  sections: {
    appetizers: {
      id: "appetizers",
      title: "Appetizers",
      description: "Refreshing beverages and drinks",
      order: 1
    },
    soups: {
      id: "soups",
      title: "Hot Steaming Soups & Shorbhas",
      description: "Traditional Indian and continental soups",
      order: 2
    },
    tandoori: {
      id: "tandoori",
      title: "Tandoori Sholey",
      description: "Tandoor-cooked specialties",
      order: 3
    },
    paneer: {
      id: "paneer",
      title: "Paneer ka Khazana",
      description: "Cottage cheese delicacies",
      order: 4
    },
    vegetables: {
      id: "vegetables",
      title: "Subz ka Khazana",
      description: "Vegetable preparations",
      order: 5
    },
    daal: {
      id: "daal",
      title: "Mahekati Daalen",
      description: "Lentil preparations",
      order: 6
    },
    rice: {
      id: "rice",
      title: "Chawalon ki Rangat",
      description: "Rice specialties",
      order: 7,
      subsections: ["biryani", "plain-rice", "khichdi"]
    },
    breads: {
      id: "breads",
      title: "Bhatiyari Zaverat",
      description: "Indian breads",
      order: 8,
      subsections: ["roti", "naan", "specialty"]
    },
    continental: {
      id: "continental",
      title: "Continental",
      description: "Western specialties",
      order: 9
    },
    chinese: {
      id: "chinese",
      title: "Chinese",
      description: "Indo-Chinese favorites",
      order: 10
    },
    accompaniments: {
      id: "accompaniments",
      title: "Salad / Raita / Papad",
      description: "Side dishes and accompaniments",
      order: 11
    },
    combos: {
      id: "combos",
      title: "Fixed Lunch Combos",
      description: "Special lunch combinations",
      order: 12
    }
  },

  subsections: {
    biryani: {
      id: "biryani",
      title: "Biryani & Pulav",
      description: "Aromatic rice preparations",
      order: 1
    },
    "plain-rice": {
      id: "plain-rice",
      title: "Plain Rice",
      description: "Simple rice preparations",
      order: 2
    },
    khichdi: {
      id: "khichdi",
      title: "Khichdi",
      description: "Rice and lentil preparations",
      order: 3
    },
    roti: {
      id: "roti",
      title: "Roti",
      description: "Traditional Indian flatbreads",
      order: 1
    },
    naan: {
      id: "naan",
      title: "Naan/Kulcha/Paratha",
      description: "Refined flour breads",
      order: 2
    },
    specialty: {
      id: "specialty",
      title: "Specialty Breads",
      description: "Special bread preparations",
      order: 3
    }
  }
};
const items: MenuItem[] = [
  // Appetizers (Beverages)
  {
    id: "fruit-punch",
    name: "Fruit Punch",
    price: "₹119",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon",
    price: "₹119",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "strawberry-punch",
    name: "Strawberry Punch",
    price: "₹119",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "mint-mojito",
    name: "Mint Mojito",
    price: "₹119",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "fresh-lime-soda",
    name: "Fresh Lime Soda",
    price: "₹80",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "jaljeera-soda",
    name: "Jaljeera Soda",
    price: "₹90",
    sections: ["appetizers"],
    isVeg: true
  },
  {
    id: "fresh-lime-water",
    name: "Fresh Lime Water",
    price: "₹60",
    sections: ["appetizers"],
    isVeg: true
  },

  // Soups Section
  {
    id: "cream-tomato-soup",
    name: "Cream of Tomato Soup",
    description: "Fresh tomato puree, cream, and indian spices with fresh bread crumbs",
    price: "₹90",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "minestrone-soup",
    name: "Minestrone Soup",
    description: "Minced boiled vegetables with lots of cheese and cream in tomato puree",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "veg-hot-sour-soup",
    name: "Veg Hot & Sour Soup",
    description: "Fresh minced vegetables with chinese spices & sauces",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "veg-manchow-soup",
    name: "Veg Manchow Soup",
    description: "Fresh minced vegetables & crispy fried noodles with chinese spices & sauces",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "sweet-corn-soup",
    name: "Veg Sweet Corn Soup",
    description: "Minced vegetables, fresh american corn and cream with chinese sauces",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "french-onion-soup",
    name: "French Onion Soup",
    description: "Fresh onion puree with indian spices",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "tomato-dhaniya-shorbha",
    name: "Tamato Dhaniya Shorbha",
    description: "Tomato based thin soup with indian spices & garnish with coriander leafs",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "palak-shorbha",
    name: "Palak Shorbha",
    description: "Fresh spinach puree with lots of cream & indian spices",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "daal-adrakhi-shorbha",
    name: "Daal Adrakhi Shorbha",
    description: "Smashed daal with ginger and indian spices",
    price: "₹95",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "cream-mushroom-soup",
    name: "Cream of Mushroom Soup",
    description: "Chopped mushroom with white creamy sauce",
    price: "₹99",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "cream-vegetable-soup",
    name: "Cream of Vegetable Soup",
    description: "Boiled chopped vegetables with creamy sauce",
    price: "₹99",
    sections: ["soups"],
    isVeg: true
  },
  {
    id: "lemon-coriander-soup",
    name: "Lemon Coriander Soup",
    description: "Boiled chopped vegetables with lemon juice & garnished coriander leaves",
    price: "₹99",
    sections: ["soups"],
    isVeg: true
  },
    // Tandoori Sholey Section
    {
      id: "tandoori-paneer-platter",
      name: "Tandoori Paneer Platter",
      description: "Assorted cottage cheese tikka served in one platter",
      price: "₹350",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-bharra-tikka",
      name: "Paneer Bharra Tikka",
      description: "Stuffed cheese, cashunuts & capsicum in paneer & marinated in Yellow chilly flavored curd",
      price: "₹220",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-malai-tikka",
      name: "Paneer Malai Tikka",
      description: "Home made cottage cheese marinated in mava & creamy curd With indian spices",
      price: "₹220",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-tikka-dry",
      name: "Panner Tikka Dry",
      description: "Pieces of cottage cheese marinated in spicy tomato puree and curd, Cooked in tandoor",
      price: "₹210",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-lasuniya-tikka",
      name: "Paneer Lasuniya Tikka",
      description: "Paneer cubes marinated with garlic and cooked in tandoor",
      price: "₹210",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-hariyali-tikka",
      name: "Paneer Hariyali Tikka",
      description: "Pieces of cottage cheese marinated in spicy coriander mint chatni",
      price: "₹210",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "paneer-papdi-steak",
      name: "Paneer Papdi Steak",
      description: "Finger cut home made cottage cheese deep fried with roasted papad",
      price: "₹220",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "tandoori-veg-platter",
      name: "Tandoori Veg. Platter",
      description: "Assorted veg. kababs served in one platter",
      price: "₹320",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "corn-ke-kabab",
      name: "Corn ke Kabab",
      description: "Fresh American corn with smashed cheese with indian spices",
      price: "₹199",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "dahi-ke-kabab",
      name: "Dahi Ke Kabab",
      description: "Chopped onion, tomato, capsicum with creamy curd & coated by bread crums",
      price: "₹199",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "kabuli-kabab",
      name: "Kabuli Kabab",
      description: "Smashed kabuli chana with indian & lukhnavi spices",
      price: "₹199",
      sections: ["tandoori"],
      isVeg: true
    },
    {
      id: "veg-harabhara-kabab",
      name: "Veg. Harabhara Kabab",
      description: "Minced vegetables fried tikki with indian spices",
      price: "₹190",
      sections: ["tandoori"],
      isVeg: true
    },
  
    // Paneer ka Khazana Section
    {
      id: "orizon-la-jawab",
      name: "Orizon La-jawab",
      description: "Diced cottage cheese & capsicum with green chilly sauce with two type of indian red and yellow gravy",
      price: "₹220",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "orizon-special",
      name: "Orizon Special",
      description: "Diced cottage cheese & capsicum with green chilly sauce with two type of indian green and yellow gravy",
      price: "₹230",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "tandoori-paneer-lahsuniya",
      name: "Tandoori paneer Lahsuniya",
      description: "Dried Diced cut cottage cheese With scoub cut onion & capsicum with fresh chopped garlic",
      price: "₹230",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-pasandida",
      name: "Paneer Pasandida",
      description: "Three layerd of colloured Cottage cheese with Cooked in rich Tomato spiced greavy",
      price: "₹230",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-bhuna",
      name: "Paneer Bhuna",
      description: "Smashed cottage cheesecooked in highly spiced Brown gravy",
      price: "₹215",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-zalzalla",
      name: "Paneer Zalzalla",
      description: "Diced cottage cheese cooked in highly spiced tomato gravy",
      price: "₹215",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-hungama",
      name: "Paneer Hungama",
      description: "Chopped cottage cheese & fresh sweet corn with Indian yellow gravy and garnish with coriander leafs",
      price: "₹215",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-afghani",
      name: "Paneer Afghani",
      description: "Extra grated cottage cheese and capsicum with Indian yellow gravy on roasted papad",
      price: "₹215",
      sections: ["paneer"],
      isVeg: true
    },
    {
      id: "paneer-kasturi",
      name: "Paneer Kasturi",
      description: "Roasted kasturi methi leafs with grated cottage cheese in indian Yellow gravy",
      price: "₹215",
      sections: ["paneer"],
      isVeg: true
    },
    // Continue with more Paneer items...
  
    // Subz ka Khazana Section
    {
      id: "vegetable-badami",
      name: "Vegetable Badami",
      description: "Minced cutted mixed vegetables & capsicum in highly spice Indian brown gravy",
      price: "₹199",
      sections: ["vegetables"],
      isVeg: true
    },
    {
      id: "vegetable-diwani",
      name: "Vegetable Diwani",
      description: "Minced cutted vegetables and button mushroom with Spicy green chilly sauce",
      price: "₹199",
      sections: ["vegetables"],
      isVeg: true
    },
    {
      id: "vegetable-angara",
      name: "Vegetable Angara",
      description: "Minced vegetables with spicy tomato gravy, served in hot sizzler's platter",
      price: "₹199",
      sections: ["vegetables"],
      isVeg: true
    },
      // Continuing Subz ka Khazana Section
  {
    id: "nawabi-handi",
    name: "Nawabi Handi",
    description: "Fresh mixed vegetables & chopped spinach with creamy spinach gravy",
    price: "₹199",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "methi-mutter-malai",
    name: "Methi Mutter Malai",
    description: "Kasturi methi & green peas cooked in rich & indian creamy gravy",
    price: "₹199",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "vegetable-balty",
    name: "Vegetable Balty",
    description: "Fresh mixed vegetables cooked in indian spicy gravy served in balty",
    price: "₹190",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "vegetable-toofani",
    name: "Vegetable Toofani",
    description: "Chopped mixed vegetable cooked in highly spice indian red gravy",
    price: "₹195",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "navratna-korma",
    name: "Navratna Korma",
    description: "Limed mixed vegetables cooked in rich cashew gravy with Fresh fruits & dry fruits",
    price: "₹199",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "corn-palak",
    name: "Corn Palak",
    description: "Fresh american corn cooked in rich spinach & cream sauce",
    price: "₹185",
    sections: ["vegetables"],
    isVeg: true
  },
  {
    id: "chana-masala",
    name: "Chana Masala",
    description: "Chick peas coocked with ginger & green chilly in north west frontier delicacy",
    price: "₹180",
    sections: ["vegetables"],
    isVeg: true
  },

  // Mahekati Daalen (Daal) Section
  {
    id: "daal-makhani",
    name: "Daal Makhani",
    description: "Blacked lentil and red beans cooked with butter & cream",
    price: "₹155",
    sections: ["daal"],
    isVeg: true
  },
  {
    id: "daal-bukhara",
    name: "Daal Bukhara",
    description: "Yellow tuver lentils cooked with rai seed, indian spices & rich cream",
    price: "₹155",
    sections: ["daal"],
    isVeg: true
  },
  {
    id: "daal-palak",
    name: "Daal Palak",
    description: "Yellow tuver lentils & cremy spinach cooked with indian spices",
    price: "₹145",
    sections: ["daal"],
    isVeg: true
  },
  {
    id: "daal-tadka",
    name: "Daal Tadka",
    description: "Yellow tuver lentils cooked with onion, lined whole red chilly & garlic",
    price: "₹135",
    sections: ["daal"],
    isVeg: true
  },
  {
    id: "daal-fry",
    name: "Daal Fried",
    description: "Yellow tuver lentils cooked with indian spices",
    price: "₹125",
    sections: ["daal"],
    isVeg: true
  },

  // Chawalon ki Rangat (Rice) Section
  {
    id: "tawa-biryani",
    name: "Tawa Biryani",
    description: "Diced cut vegetables with Basmati rice cooked Indian garam masala Served in tawa Plater",
    price: "₹190",
    sections: ["rice"],
    subsections: ["biryani"],
    isVeg: true
  },
  {
    id: "dum-biryani",
    name: "Dum Biryani",
    description: "Seasonal vegetables & basmati rice dummed with traditional",
    price: "₹185",
    sections: ["rice"],
    subsections: ["biryani"],
    isVeg: true
  },
  {
    id: "handi-biryani",
    name: "Handi Biryani",
    description: "Diced cut veg. with chips of potato & cottage cheese cooked Indian garam masala served in handi",
    price: "₹185",
    sections: ["rice"],
    subsections: ["biryani"],
    isVeg: true
  },
  {
    id: "veg-kheema-biryani",
    name: "Veg. Kheema Biryani",
    description: "Mixed veg. & soya bin kheema with basmati rice cooked in indian gravy",
    price: "₹185",
    sections: ["rice"],
    subsections: ["biryani"],
    isVeg: true
  },
  {
    id: "jeera-rice",
    name: "Jeera Rice",
    description: "Steam rice flavored with cumin seeds",
    price: "₹125",
    sections: ["rice"],
    subsections: ["plain-rice"],
    isVeg: true
  },
  {
    id: "safed-chawal",
    name: "Safed Chawal",
    description: "Steam rice with traditional smelled of india",
    price: "₹115",
    sections: ["rice"],
    subsections: ["plain-rice"],
    isVeg: true
  },

  // Khichdi Section
  {
    id: "daal-khichdi",
    name: "Daal Khichdi",
    price: "₹130",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "tadka-daal-khichdi",
    name: "Tadka Daal Khichdi",
    price: "₹150",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "palak-khichdi",
    name: "Palak Khichdi",
    price: "₹160",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "rajwadi-khichdi",
    name: "Rajwadi Khichdi",
    price: "₹180",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "kadhi-khichdi",
    name: "Kadhi Khichdi",
    price: "₹150",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "masala-kadhi-khichdi",
    name: "Masala Kadhi Khichdi",
    price: "₹170",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },
  {
    id: "gujarati-kadhi",
    name: "Gujarati Kadhi",
    price: "₹90",
    sections: ["rice"],
    subsections: ["khichdi"],
    isVeg: true
  },

  // Bhatiyari Zaverat (Breads) Section
  {
    id: "plain-tawa-roti",
    name: "Plain Tawa Rotti",
    price: "₹15",
    sections: ["breads"],
    subsections: ["roti"],
    isVeg: true
  },
  {
    id: "butter-tawa-roti",
    name: "Butter Tawa Rotti",
    price: "₹20",
    sections: ["breads"],
    subsections: ["roti"],
    isVeg: true
  },
  {
    id: "plain-tandoori-roti",
    name: "Plain Tandoori Rotti",
    price: "₹18",
    sections: ["breads"],
    subsections: ["roti"],
    isVeg: true
  },
  {
    id: "butter-tandoori-roti",
    name: "Butter Tandoori Rotti",
    price: "₹23",
    sections: ["breads"],
    subsections: ["roti"],
    isVeg: true
  },
    // Continuing Bhatiyari Zaverat (Breads) Section
    {
      id: "plain-naan",
      name: "Plain Paratha / Naan / Kulcha",
      price: "₹45",
      sections: ["breads"],
      subsections: ["naan"],
      isVeg: true
    },
    {
      id: "butter-naan",
      name: "Butter Paratha / Naan / Kulcha",
      price: "₹55",
      sections: ["breads"],
      subsections: ["naan"],
      isVeg: true
    },
    {
      id: "stuffed-paratha",
      name: "Stuffed Paratha / Kulcha",
      price: "₹75",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "missi-roti",
      name: "Missi Rotti",
      price: "₹60",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "garlic-naan",
      name: "Garlic Naan",
      price: "₹70",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "roomali-roti",
      name: "Roomali Rotti",
      price: "₹70",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "cheese-naan",
      name: "Cheese Naan",
      price: "₹99",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "garlic-cheese-naan",
      name: "Garlic Cheese Naan",
      price: "₹110",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "garlic-cheese-chilly-naan",
      name: "Garlic Cheese Chilly Naan",
      price: "₹115",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
    {
      id: "paneer-paratha",
      name: "Paneer Paratha",
      price: "₹95",
      sections: ["breads"],
      subsections: ["specialty"],
      isVeg: true
    },
  
    // Continental Section
    {
      id: "veg-baked-au-gratin",
      name: "Veg. Baked Au Gratin",
      price: "₹199",
      sections: ["continental"],
      isVeg: true
    },
    {
      id: "baked-macaroni",
      name: "Baked Macaroni With P/a.",
      price: "₹229",
      sections: ["continental"],
      isVeg: true
    },
    {
      id: "baked-spaghetti",
      name: "Baked Spaghetti",
      price: "₹229",
      sections: ["continental"],
      isVeg: true
    },
  
    // Chinese Section
    {
      id: "mozzarella-cheese-stick",
      name: "Mozzarella Cheese Stick",
      price: "₹249",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "babycorn-chilly",
      name: "Babby Corn Chilly",
      price: "₹190",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "chinese-bhel",
      name: "Chinese Bhel",
      price: "₹190",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "paneer-65",
      name: "Paneer '65",
      price: "₹210",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "paneer-chilly",
      name: "Paneer Chilly",
      price: "₹210",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "crispy-vegetables",
      name: "Crispy Vegetables",
      price: "₹180",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "crispy-chilly-potatoes",
      name: "Crispy Chilly Potatoes",
      price: "₹180",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-spring-roll",
      name: "Veg. Spring Roll",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-manchurian",
      name: "Veg. Manchurian",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-choupsy",
      name: "Veg. Choupsy",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "american-choupsy",
      name: "American Choupsy",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-hakka-noodles",
      name: "Veg. Hakka Noodles",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-schezwan-noodles",
      name: "Veg. Schezwan Noodles",
      price: "₹195",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "manchurian-noodles",
      name: "Manchurian Noodles",
      price: "₹190",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "manchurian-fried-rice",
      name: "Manchurian Fried Rice",
      price: "₹190",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-schezwan-fried-rice",
      name: "Veg. Schzewan Fried Rice",
      price: "₹180",
      sections: ["chinese"],
      isVeg: true
    },
    {
      id: "veg-fried-rice",
      name: "Veg. Fried Rice",
      price: "₹170",
      sections: ["chinese"],
      isVeg: true
    },
  
    // Accompaniments Section (Salad/Raita/Papad)
    {
      id: "tomato-salad",
      name: "Tomato Salad",
      price: "₹80",
      sections: ["accompaniments"],
      subsections: ["salad"],
      isVeg: true
    },
    {
      id: "kachumber-salad",
      name: "Kachumber Salad",
      price: "₹95",
      sections: ["accompaniments"],
      subsections: ["salad"],
      isVeg: true
    },
    {
      id: "green-salad",
      name: "Green Salad",
      price: "₹80",
      sections: ["accompaniments"],
      subsections: ["salad"],
      isVeg: true
    },
    {
      id: "pineapple-raita",
      name: "Pineapple Raita",
      price: "₹80",
      sections: ["accompaniments"],
      subsections: ["raita"],
      isVeg: true
    },
    {
      id: "boondi-raita",
      name: "Boondi Raita",
      price: "₹70",
      sections: ["accompaniments"],
      subsections: ["raita"],
      isVeg: true
    },
    {
      id: "vegetable-raita",
      name: "Vegetable Raita",
      price: "₹70",
      sections: ["accompaniments"],
      subsections: ["raita"],
      isVeg: true
    },
    {
      id: "plain-curd",
      name: "Plain Curd",
      price: "₹60",
      sections: ["accompaniments"],
      subsections: ["raita"],
      isVeg: true
    },
    {
      id: "masala-cheese-papad",
      name: "Masala Cheese Papad",
      price: "₹60",
      sections: ["accompaniments"],
      subsections: ["papad"],
      isVeg: true
    },
    {
      id: "masala-papad",
      name: "Masala Papad",
      price: "₹40",
      sections: ["accompaniments"],
      subsections: ["papad"],
      isVeg: true
    },
    {
      id: "fried-papad",
      name: "Fried Papad",
      price: "₹30",
      sections: ["accompaniments"],
      subsections: ["papad"],
      isVeg: true
    },
    {
      id: "roasted-papad",
      name: "Roasted Papad",
      price: "₹25",
      sections: ["accompaniments"],
      subsections: ["papad"],
      isVeg: true
    },
  
    // Fixed Lunch Combos
    {
      id: "lozon-fixed-lunch",
      name: "LOZON Fixed Lunch",
      description: "1 Paneer, 1 Mixed Vegetable, 3 Butter Rotti, Jeera Rice - Daal Fry, Roasted Papad, Veg. Raita",
      price: "₹125",
      sections: ["combos"],
      isVeg: true
    },
    {
      id: "midzon-fixed-lunch",
      name: "MIDZON Fixed Lunch",
      description: "1 Paneer, 1 Mixed Vegetable, 3 Butter Rotti, Jeera Rice - Daal fry, 2 pcs Gulab jamun, Roasted Papad, Butter Milk (200ml)",
      price: "₹150",
      sections: ["combos"],
      isVeg: true
    }
  ];
  
  // Export the complete menu data structure
  export const menuData = {
    structure,
    items,
  
    // Helper functions
    getSections: () => {
      return Object.values(structure.sections).sort((a, b) => a.order - b.order);
    },
  
    getSubsections: (sectionId: string) => {
      const section = structure.sections[sectionId];
      if (!section?.subsections) return [];
      return section.subsections.map(id => structure.subsections[id])
        .sort((a, b) => a.order - b.order);
    },
  
    getItemsBySection: (sectionId: string) => {
      return items.filter(item => item.sections.includes(sectionId));
    },
  
    getItemsBySubsection: (subsectionId: string) => {
      return items.filter(item => item.subsections?.includes(subsectionId));
    },
  
    getItemsBySubSection: (sectionId: string, subsectionId: string) => {
      return items.filter(item => 
        item.sections.includes(sectionId) && 
        item.subsections?.includes(subsectionId)
      );
    },
  
    getFeaturedItems: () => {
      return items.filter(item => item.sections.includes('most-loved'));
    },
  
    searchItems: (query: string) => {
      const searchTerm = query.toLowerCase();
      return items.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        (item.description?.toLowerCase().includes(searchTerm) ?? false)
      );
    },
  
    hasSubsections: (sectionId: string) => {
      const section = structure.sections[sectionId];
      return section?.subsections && section.subsections.length > 0;
    }
  };
  
  export default menuData;