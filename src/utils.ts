import type { ColorRule } from './types';

// Available colors in the app
export const availableColors = [
  'black', 'white', 'gray', 'navy', 'beige', 
  'blue', 'red', 'green', 'brown', 'yellow', 'pink', 'khaki', 'olive',
  'light-denim', 'denim', 'dark-denim', 'black-denim'
];

export const colorHarmonyList = availableColors;

export const denimColors = ['light-denim', 'denim', 'dark-denim', 'black-denim'];
export const bottomColors = availableColors.filter(color => color !== 'red' && color !== 'pink');

// Color harmony database
export const colorHarmonyDatabase: ColorRule[] = [
  // --- Male ---
  {
    name: "Business casual navy gray",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "blue"], topTypes: ['shirt', 'knit'], topPatterns: ['solid', 'stripe', 'check'],
    bottom: ["gray", "beige"],
    outerwear: ["navy"]
  },
  {
    name: "Summer business shirt slacks",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "blue", "navy"], topTypes: ['shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["gray", "beige", "navy"],
    outerwear: ["none"]
  },
  {
    name: "Minimal black and white",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["black"],
    outerwear: ["black", "gray", "none"]
  },
  {
    name: "Casual denim jacket",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "gray", "black"], topTypes: ['t-shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["black", "beige"],
    outerwear: denimColors
  },
  {
    name: "Workwear olive khaki denim",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige"], topTypes: ['t-shirt', 'knit', 'shirt'], topPatterns: ['solid', 'check', 'gingham'],
    bottom: [...denimColors, "beige"],
    outerwear: ["khaki", "olive"]
  },
  {
    name: "Brown beige casual",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black"], topTypes: ['knit', 'shirt'], topPatterns: ['solid', 'check'],
    bottom: ["beige"],
    outerwear: ["brown"]
  },
  {
    name: "Summer navy beige",
    gender: 'male', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "navy"], topTypes: ['shirt', 't-shirt'], topPatterns: ['solid', 'stripe'],
    bottom: ["beige", ...denimColors],
    outerwear: ["none"]
  },

  // --- Female two-piece ---
  {
    name: "Classic trench denim",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "navy"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: [...denimColors, "white"],
    outerwear: ["beige"]
  },
  {
    name: "Soft spring summer casual",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white"], topTypes: ['t-shirt', 'shirt'], topPatterns: ['solid', 'gingham'],
    bottom: [...denimColors, "white", "gray"],
    outerwear: ["pink", "none"]
  },
  {
    name: "French chic navy red",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "gray"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: ["white", ...denimColors],
    outerwear: ["navy", "none"]
  },
  {
    name: "All white neutral",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white"], bottom: ["white"],
    outerwear: ["white", "beige", "gray", "none"]
  },
  {
    name: "Winter earthy olive beige",
    gender: 'female', mode: 'two-piece', seasons: ['winter'],
    top: ["beige", "white", "black"], bottom: ["khaki", "olive", "beige", ...denimColors],
    outerwear: ["brown", "black", "khaki", "olive"]
  },

  // --- Female one-piece ---
  {
    name: "Feminine trench dress",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall'],
    dress: ["black", "navy", "white"],
    outerwear: ["beige"]
  },
  {
    name: "Chic black jacket dress",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'winter'],
    dress: ["white", "gray", "beige"],
    outerwear: ["black", "navy"]
  },
  {
    name: "Fresh summer dress",
    gender: 'female', mode: 'one-piece', seasons: ['summer'],
    dress: ["white", "pink", "yellow", "blue", "navy"],
    outerwear: ["none"]
  },

  // --- Unisex ---
  {
    name: "All black chic",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black"], topTypes: ['t-shirt', 'knit', 'shirt'], topPatterns: ['solid'],
    bottom: ["black"],
    outerwear: ["black"]
  },
  {
    name: "Monotone minimal",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "gray", "black"], topTypes: ['t-shirt', 'knit'], topPatterns: ['solid'],
    bottom: ["gray", "black", "white"],
    outerwear: ["black", "gray", "white", "none"]
  },
  {
    name: "Modern denim setup",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray", "navy"], topTypes: ['t-shirt', 'shirt', 'knit'], topPatterns: ['solid', 'stripe'],
    bottom: denimColors,
    outerwear: denimColors
  },
  {
    name: "Denim shirt casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: denimColors, topTypes: ['shirt'], topPatterns: ['solid'],
    bottom: ["white", "beige", "black", "gray", ...denimColors],
    outerwear: ["none", "beige", "navy", "black", "brown"]
  },
  {
    name: "Light denim shirt and khaki pants",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["light-denim", "denim"], topTypes: ['shirt'], topPatterns: ['solid'],
    bottom: ["khaki", "olive", "beige"],
    outerwear: ["none", "navy", "beige", "brown"]
  },
  {
    name: "Top accent matching",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors,
    bottom: ["black", "white", "gray", ...denimColors, "beige"],
    outerwear: ["black", "gray", "navy", "beige", "white", "none", "black-leather", "brown-leather"]
  },
  {
    name: "Bottom accent matching",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray"],
    bottom: bottomColors,
    outerwear: ["black", "gray", "navy", "none", "black-leather"]
  },
  {
    name: "Dress accent matching",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'summer', 'winter'],
    dress: availableColors,
    outerwear: ["black", "gray", "beige", "navy", "white", "none"]
  },

  // --- Pattern specific rules ---
  {
    name: "Marine stripe casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "navy"], topTypes: ["t-shirt", "knit"], topPatterns: ["stripe"],
    bottom: [...denimColors, "white", "navy"],
    outerwear: ["navy", "none"]
  },
  {
    name: "Checked shirt casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["red", "navy", "blue", "green"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: [...denimColors, "beige", "black"],
    outerwear: ["none", "black", "navy"]
  },
  {
    name: "Gingham shirt casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue", "black", "red"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "navy", ...denimColors],
    outerwear: ["navy", "beige", "none"]
  },
  {
    name: "Formal solid shirt",
    gender: 'male', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "blue"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["black", "navy", "gray"],
    outerwear: ["black", "navy", "gray"]
  },
  {
    name: "Black leather denim",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "gray"], topTypes: ["t-shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "black"],
    outerwear: ["black-leather"]
  },
  {
    name: "Vintage brown leather",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "beige", "black"],
    outerwear: ["brown-leather"]
  },
  {
    name: "Soft feminine blouse",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "beige", "pink"], topTypes: ["shirt", "knit"], topPatterns: ["solid"],
    bottom: ["black", "beige", "navy"],
    outerwear: ["black", "beige", "none"]
  },
  {
    name: "Clean tonal beige",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "beige", "brown"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid"],
    bottom: ["beige", "brown", "white"],
    outerwear: ["beige", "brown", "white"]
  },
  {
    name: "Urban gray layering",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["gray", "black", ...denimColors],
    outerwear: ["gray", "black", "navy"]
  },
  {
    name: "Navy preppy casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["white", "blue", "gray"], topTypes: ["shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: ["beige", "white", ...denimColors],
    outerwear: ["navy", "beige"]
  },
  {
    name: "Workwear olive denim",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige", "gray"], topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "black", "beige"],
    outerwear: ["olive", "khaki", "brown"]
  },
  {
    name: "Light summer minimal",
    gender: 'unisex', mode: 'two-piece', seasons: ['summer'],
    top: ["white", "beige", "blue", "gray"], topTypes: ["t-shirt", "shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["white", "beige", ...denimColors, "gray"],
    outerwear: ["none"]
  },
  {
    name: "Black and denim street",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black", "white", "gray"], topTypes: ["t-shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "black"],
    outerwear: ["black", ...denimColors, "black-leather"]
  },
  {
    name: "White denim clean fit",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["navy", "blue", "black", "beige"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid", "stripe"],
    bottom: ["white"],
    outerwear: ["navy", "beige", ...denimColors, "none"]
  },
  {
    name: "Soft feminine neutral",
    gender: 'female', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "beige", "blue", "yellow"], topTypes: ["shirt", "knit", "t-shirt"], topPatterns: ["solid", "gingham", "stripe"],
    bottom: ["white", "beige", ...denimColors],
    outerwear: ["beige", "white", "navy", "none"]
  },
  {
    name: "Modern monochrome dress",
    gender: 'female', mode: 'one-piece', seasons: ['spring-fall', 'winter'],
    dress: ["black", "gray", "navy", "beige"],
    outerwear: ["black", "gray", "navy", "beige", "brown-leather"]
  },
  {
    name: "Fresh summer dress",
    gender: 'female', mode: 'one-piece', seasons: ['summer'],
    dress: ["white", "blue", "yellow", "beige", "pink"],
    outerwear: ["none"]
  },
  {
    name: "Brown leather casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "black", "beige", "gray"], topTypes: ["t-shirt", "knit", "shirt"], topPatterns: ["solid", "check"],
    bottom: [...denimColors, "black", "beige", "brown"],
    outerwear: ["brown-leather"]
  },
  {
    name: "Dark indigo refined",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "beige", "black"], topTypes: ["shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: [...denimColors, "navy", "gray"],
    outerwear: [...denimColors, "navy", "gray", "black"]
  },
  {
    name: "Universal neutral pants base",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: ["black", "white", "gray", "navy", "beige", "brown"],
    outerwear: ["none", "black", "white", "gray", "navy", "beige", "brown", "black-leather", "brown-leather", ...denimColors]
  },
  {
    name: "Universal denim pants base",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: denimColors,
    outerwear: ["none", "black", "white", "gray", "navy", "beige", "brown", "khaki", "olive", "black-leather", "brown-leather", ...denimColors]
  },
  {
    name: "Khaki olive pants base",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white", "black", "gray", "beige", "brown", "navy", "blue", "green", ...denimColors],
    topTypes: ["t-shirt", "shirt", "knit"],
    topPatterns: ["solid", "stripe", "check", "gingham"],
    bottom: ["khaki", "olive"],
    outerwear: ["none", "black", "gray", "navy", "beige", "brown", "khaki", "olive", ...denimColors]
  },
  {
    name: "Summer broad casual base",
    gender: 'unisex', mode: 'two-piece', seasons: ['summer'],
    top: availableColors, topTypes: ["t-shirt", "shirt"], topPatterns: ["solid", "stripe", "gingham"],
    bottom: ["white", "gray", "navy", "beige", "khaki", "olive", ...denimColors],
    outerwear: ["none"]
  },
  {
    name: "Dark pants safe base",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: availableColors, topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe", "check"],
    bottom: ["black", "gray", "navy", "black-denim", "dark-denim"],
    outerwear: ["none", "black", "gray", "navy", "beige", "brown", "black-leather", "brown-leather"]
  },
  {
    name: "Pink top neutral base",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["pink"], topTypes: ["t-shirt", "shirt", "knit"], topPatterns: ["solid", "stripe"],
    bottom: ["white", "beige", "gray", "black", "navy", ...denimColors],
    outerwear: ["none", "white", "beige", "gray", "navy", ...denimColors]
  },
  {
    name: "Solid white shirt essential",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: ["white"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["beige", "navy", "gray", "black", "khaki", ...denimColors],
    outerwear: ["navy", "beige", "gray", "black", "brown", "none", "black-leather", "brown-leather"]
  },
  {
    name: "Solid blue shirt smart casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["beige", "navy", "gray", "white", ...denimColors],
    outerwear: ["navy", "beige", "gray", "none", ...denimColors]
  },
  {
    name: "Solid black shirt refined",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["black"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["gray", "black", "beige", "navy", "dark-denim", "black-denim"],
    outerwear: ["gray", "black", "navy", "brown", "black-leather", "brown-leather"]
  },
  {
    name: "Solid pink shirt neutral",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["pink"], topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["white", "beige", "gray", "navy", ...denimColors],
    outerwear: ["none", "white", "beige", "gray", "navy"]
  },
  {
    name: "Stripe shirt navy classic",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "blue", "navy"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: ["navy", "white", "beige", "gray", ...denimColors],
    outerwear: ["navy", "beige", "gray", "none"]
  },
  {
    name: "Stripe shirt denim casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["white", "blue", "gray"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: denimColors,
    outerwear: ["none", "navy", "beige", "gray", ...denimColors]
  },
  {
    name: "Stripe shirt city neutral",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black"], topTypes: ["shirt"], topPatterns: ["stripe"],
    bottom: ["black", "gray", "navy", "beige", "black-denim", "dark-denim"],
    outerwear: ["black", "gray", "navy", "beige", "black-leather"]
  },
  {
    name: "Check shirt denim workwear",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["red", "green", "blue", "navy", "brown"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: [...denimColors, "black", "beige", "khaki"],
    outerwear: ["none", "black", "navy", "brown", "khaki", "olive", "brown-leather"]
  },
  {
    name: "Check shirt khaki casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["blue", "green", "brown", "red", "navy"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: ["khaki", "olive", "beige", "brown", ...denimColors],
    outerwear: ["none", "brown", "khaki", "olive", "navy", "beige"]
  },
  {
    name: "Check shirt dark pants",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'winter'],
    top: ["white", "gray", "black", "navy", "red", "green"], topTypes: ["shirt"], topPatterns: ["check"],
    bottom: ["black", "gray", "navy", "black-denim", "dark-denim"],
    outerwear: ["none", "black", "gray", "navy", "black-leather"]
  },
  {
    name: "Gingham shirt clean casual",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer'],
    top: ["blue", "black", "red", "green", "navy"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "white", "navy", "gray", ...denimColors],
    outerwear: ["none", "navy", "beige", "white", "gray"]
  },
  {
    name: "Gingham shirt preppy",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall'],
    top: ["blue", "navy", "green", "red"], topTypes: ["shirt"], topPatterns: ["gingham"],
    bottom: ["beige", "navy", "white", "khaki"],
    outerwear: ["navy", "beige", "brown", "none"]
  },
  {
    name: "Denim shirt by tone",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: denimColors, topTypes: ["shirt"], topPatterns: ["solid"],
    bottom: ["khaki", "beige", "white", "black", "gray", "navy", ...denimColors],
    outerwear: ["none", "beige", "navy", "black", "gray", "brown", "khaki", "olive"]
  },
  {
    name: "Pattern shirt neutral safety net",
    gender: 'unisex', mode: 'two-piece', seasons: ['spring-fall', 'summer', 'winter'],
    top: availableColors, topTypes: ["shirt"], topPatterns: ["stripe", "check", "gingham"],
    bottom: ["black", "white", "gray", "navy", "beige", ...denimColors],
    outerwear: ["none", "black", "white", "gray", "navy", "beige"]
  }
];

export const getColorHex = (colorName: string) => {
  const map: Record<string, string> = {
    black: '#1a1a1a',
    white: '#f8fafc',
    gray: '#94a3b8',
    navy: '#1e3a8a',
    beige: '#f3e1ce',
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#10b981',
    brown: '#78350f',
    yellow: '#eab308',
    pink: '#ec4899',
    khaki: '#867b54',
    'light-denim': '#86a9c8',
    denim: '#3b5998',
    'dark-denim': '#18345f',
    'black-denim': '#20242b',
    olive: '#4b5320',
    'black-leather': '#1f1f1f',
    'brown-leather': '#5c3a21'
  };
  return map[colorName.toLowerCase()] || '#cbd5e1';
};
