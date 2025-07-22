import type { Friend } from '../types';

export const MOCK_FRIENDS_WITH_ACTIVITY: Friend[] = [
  {
    id: 'friend-1',
    name: 'Alice',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-woman-mia-avatar-600nw-2127358541.jpg',
    totalPoints: 1250,
    challengesJoined: ['challenge-3', 'challenge-5'],
    restaurantsVisited: [
      {
        poiId: 'poi-11', // Phở Thìn
        date: '2024-07-18',
        review: { rating: 5, comment: 'Absolutely legendary Phở. The broth was rich and flavorful. A must-visit!' },
      },
      {
        poiId: 'poi-12', // Giảng Café
        date: '2024-07-16',
        review: { rating: 5, comment: 'The egg coffee here is a revelation! So creamy and delicious.' },
      },
      {
        poiId: 'poi-1', // Chops Burger Kitchen
        date: '2024-06-25',
        review: { rating: 4, comment: 'Great burgers and a fun atmosphere. The 2-for-1 deal was awesome.' },
      }
    ],
    flavorProfile: {
        adventurous: 85,
        healthy: 50,
        convenient: 95,
        happy: 90,
        comfort: 70,
    },
    recentCompletions: [
      { type: 'challenge', name: 'Authentic Vietnamese Eats' },
      { type: 'poi', name: 'Phở Thìn' },
    ],
    mutualFriends: 5,
    mutualFriendNames: ['David', 'Emily', 'Frank', 'Grace', 'Henry'],
  },
  {
    id: 'friend-2',
    name: 'Bob',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg',
    totalPoints: 980,
    challengesJoined: ['challenge-2', 'challenge-8'],
    restaurantsVisited: [
        {
            poiId: 'poi-3', // Pizzeria Roma
            date: '2024-07-12',
            review: { rating: 5, comment: 'Best pizza I\'ve had in a long time. Authentic taste and great service.' }
        },
        {
            poiId: 'poi-14', // Hanoi Social Club
            date: '2024-07-05',
            review: { rating: 4, comment: 'Cool vibe and great live music. Drinks were a bit pricey but worth it.' }
        }
    ],
    flavorProfile: {
        adventurous: 60,
        healthy: 40,
        convenient: 80,
        happy: 55,
        comfort: 90,
    },
    recentCompletions: [
      { type: 'challenge', name: 'Pizza & Italian Delights' },
      { type: 'poi', name: 'Pizzeria Roma' },
    ],
    mutualFriends: 3,
    mutualFriendNames: ['Ivy', 'Jack', 'Karen'],
  },
  {
    id: 'friend-3',
    name: 'Charlie',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-african-man-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-883.jpg',
    totalPoints: 2100,
    challengesJoined: ['challenge-1', 'challenge-4', 'challenge-9'],
    restaurantsVisited: [
        {
            poiId: 'poi-5', // Sushi Nhan
            date: '2024-07-20',
            review: { rating: 4, comment: 'Really fresh and high-quality sushi. The sashimi platter was excellent.' }
        },
        {
            poiId: 'poi-1', // Chops Burger Kitchen
            date: '2024-07-10',
            review: { rating: 5, comment: 'Second time here, still amazing! The classic burger is perfection.' }
        },
        {
            poiId: 'poi-4', // City Spa & Services
            date: '2024-06-30',
        }
    ],
    flavorProfile: {
        adventurous: 90,
        healthy: 75,
        convenient: 85,
        happy: 80,
        comfort: 60,
    },
    recentCompletions: [
      { type: 'poi', name: 'Sushi Nhan' },
      { type: 'challenge', name: 'Hanoi Burger Blitz' },
    ],
    mutualFriends: 8,
    mutualFriendNames: ['Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam'],
  },
  {
    id: 'friend-4',
    name: 'Diana',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-woman-ann-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-738.jpg?semt=ais_hybrid&w=740',
    totalPoints: 1500,
    challengesJoined: ['challenge-7', 'challenge-10'],
    restaurantsVisited: [
        {
            poiId: 'poi-8', // Juice Bar Express
            date: '2024-07-19',
            review: { rating: 5, comment: 'The perfect boost after a workout. Love their green smoothie!' }
        },
        {
            poiId: 'poi-19', // Áo Dài Thanh Liem Tailors
            date: '2024-07-11',
        },
    ],
    flavorProfile: {
        adventurous: 40,
        healthy: 95,
        convenient: 90,
        happy: 30,
        comfort: 80,
    },
    recentCompletions: [
        { type: 'poi', name: 'Juice Bar Express' },
        { type: 'challenge', name: 'Local Services & Tailoring' },
    ],
    mutualFriends: 2,
    mutualFriendNames: ['Tom', 'Uma'],
  }
];
