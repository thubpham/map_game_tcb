// src/types/index.ts

export interface User {
    id:string;
    name: string;
    points: number;
    currentTier: 'Bronze' | 'Silver' | 'Gold';
    nextTier: 'Silver' | 'Gold' | 'Platinum';
    pointsToNextTier: number;
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
    happy: number;
    exploratory: number;
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
    recentCompletions: { type: string; name: string }[];
  }

  // export type FriendActivityType = 'challenge_completed' | 'weekly_summary';

  // export type FriendActivity = {
  //   id: string;
  //   friendId: string;
  //   timestamp: string;
  // } & (
  //     | { type: 'challenge_completed'; targetId: string; }
  //     | { type: 'weekly_summary'; targetIds: string[]; }
  // );
