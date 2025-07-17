// src/types/index.ts

export interface User {
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
    voucher: {
      title: string;
      description: string;
    };
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