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

  export interface Challenge {
    id: string;
    name: string;
    category: 'Food' | 'Drink' | 'Service';
    poiIds: string[]; // IDs of POIs included in this challenge
    description: string;
    imageUrl: string;
  }

  // New interfaces for "Connect with your friends!" feature
  export interface Friend {
    id: string;
    name: string;
    avatarUrl: string;
    totalPoints: number;
    recentCompletions: {
        type: 'challenge' | 'poi';
        name: string;
    }[];
  };

  // export type FriendActivityType = 'challenge_completed' | 'weekly_summary';

  // export type FriendActivity = {
  //   id: string;
  //   friendId: string;
  //   timestamp: string;
  // } & (
  //     | { type: 'challenge_completed'; targetId: string; }
  //     | { type: 'weekly_summary'; targetIds: string[]; }
  // );