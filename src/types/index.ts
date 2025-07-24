// src/types/index.ts

export interface User {
    id:string;
    name: string;
    points: number;
    currentTier: 'Bronze' | 'Silver' | 'Gold';
    nextTier: 'Silver' | 'Gold' | 'Platinum';
    pointsToNextTier: number;
  }

export interface UserProfileProps {
  user: User;
}

export interface Booster {
  id: string;
  name: string;
  benefit: string;
  service: 'credit-card' | 'savings' | 'mobile-banking' | 'premium';
  icon: any;
  isActive: boolean;
}
  
export interface PointOfInterest {
  id: string;
  name: string;
  category: 'Food' | 'Drink' | 'Service';
  position: [number, number];
  type: string; // Added type property
  voucher: {
    title: string;
    description: string;
    discount: number; // Added discount property
  };
  reviews: {
    rating: number;
    comment: string;
  }[];
  pricing: number; // 1-5 rating for price
  menu: {
    item: string;
    imageUrl: string;
  }[];
  mainImageUrl: string; // Added for the main picture of the POI
}

export interface Suggestion {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
}

export interface RewardTier {
    name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    points: number;
}

export interface Activity {
  id: string;
  storeName: string;
  description: string;
  points: number;
  date: string;
}

export interface Challenge {
  id: string;
  name: string;
  category: 'Food' | 'Drink' | 'Service';
  poiIds: string[]; // IDs of POIs included in this challenge
  description: string;
  imageUrl: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  pois: PointOfInterest[]; // Array of POI objects
  expiresAt?: string; // Optional expiration date string (ISO 8601 format)
}

export interface Review {
  rating: number;
  comment: string;
}

export interface RestaurantVisit {
  poiId: string;
  date: string; // e.g., "2024-07-15"
  review?: Review;
}

export interface FoodJournalMetrics {
  adventurous: number;
  healthy: number;
  convenient: number;
  happy: number;
  comfort: number;
}
export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  totalPoints: number;
  challengesJoined: string[]; 
  restaurantsVisited: RestaurantVisit[];
  flavorProfile: FoodJournalMetrics; 
  recentCompletions: { type: 'challenge' | 'poi'; name: string }[];
  mutualFriends: number;
  mutualFriendNames: string[];
}
export interface CharacterProfile {
  name: string;
  image: string; // URL or path to image
  description: string;
}

// Might need to change to add background picture
export interface CarouselBoxProps {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface ProgressTrackerProps {
  currentPoints: number;
  pointsToNextTier: number;
  currentTier: string;
  nextTier: string;
}

export interface StarbucksProgressTrackerProps {
  starBalance: number;
  tiers: number[];
}

export interface FoodieProfileBarChartProps {
  metrics: FoodJournalMetrics;
}

export interface SlideoverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface TodaysPickCardProps {
  poi: PointOfInterest;
  onOpenSlideover: (poi: PointOfInterest) => void;
}

export interface SuggestionCarouselProps {
  items: PointOfInterest[];
  onItemClick: (item: PointOfInterest) => void;
  renderItem: (item: PointOfInterest) => React.ReactNode;
}
