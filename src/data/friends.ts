import type { Friend } from '../types';

export const MOCK_FRIENDS_WITH_ACTIVITY: Friend[] = [
  {
    id: 'friend-1',
    name: 'Alice',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-woman-mia-avatar-600nw-2127358541.jpg',
    totalPoints: 1250,
    recentCompletions: [
      { type: 'challenge', name: 'Taco Tuesday' },
      { type: 'poi', name: 'Gourmet Burger Kitchen' },
      { type: 'poi', name: 'The Corner Cafe' },
    ],
  },
  {
    id: 'friend-2',
    name: 'Bob',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg',
    totalPoints: 980,
    recentCompletions: [
      { type: 'challenge', name: 'Morning Brew' },
      { type: 'poi', name: 'Artisan Coffee' },
    ],
  },
  {
    id: 'friend-3',
    name: 'Charlie',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-african-man-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-883.jpg',
    totalPoints: 2100,
    recentCompletions: [
      { type: 'challenge', name: 'Pizza Passion' },
      { type: 'challenge', name: 'Sweet Tooth' },
      { type: 'poi', name: 'Luigi\'s Pizzeria' },
      { type: 'poi', name: 'The Ice Cream Parlour' },
    ],
  },
  {
    id: 'friend-4',
    name: 'Diana',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-woman-ann-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-738.jpg?semt=ais_hybrid&w=740',
    totalPoints: 1500,
    recentCompletions: [
        { type: 'poi', name: 'Central Park Fitness' },
    ],
  }
];
