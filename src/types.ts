export type Category = 'top' | 'bottom' | 'outerwear' | 'dress';

export type TopType = 't-shirt' | 'shirt' | 'knit' | 'auto';
export type TopPattern = 'solid' | 'stripe' | 'check' | 'gingham' | 'auto';

export interface OutfitSlot {
  category: Category;
  color: string | 'auto' | 'none';
}

export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  color: string;
}

export type Gender = 'male' | 'female' | 'unisex';
export type OutfitMode = 'two-piece' | 'one-piece';
export type Season = 'spring-fall' | 'summer' | 'winter';

export interface ColorRule {
  name: string;
  description?: string; // Magazine style description
  gender: Gender;
  seasons: Season[];
  top?: string[];
  topTypes?: TopType[];       // Allowed top item types
  topPatterns?: TopPattern[]; // Allowed top item patterns
  bottom?: string[];
  dress?: string[];
  outerwear: string[];
  mode?: OutfitMode;
}

export interface SavedOutfit {
  id: string;
  name: string;
  gender: Gender;
  mode: OutfitMode;
  season: Season;
  colors: {
    outerwear: string;
    top: string;
    topType: TopType;
    topPattern: TopPattern;
    bottom: string;
    dress: string;
  };
  createdAt: number;
}
