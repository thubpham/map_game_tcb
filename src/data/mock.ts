// src/data/mock.ts

import type { User, PointOfInterest, Suggestion, Promotion, RewardTier, Activity, Challenge} from '../types';

export const MOCK_USER: User = {
  name: 'John Doe',
  points: 1250,
  currentTier: 'Silver',
  nextTier: 'Gold',
  pointsToNextTier: 2500,
};

export const MOCK_POIs: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Gourmet Burger Kitchen',
    category: 'Food',
    position: [51.505, -0.09],
    voucher: { title: '2-for-1 Burgers', description: 'Buy one burger and get the second one free.' },
  },
  {
    id: 'poi-2',
    name: 'The Coffee Bean',
    category: 'Drink',
    position: [51.51, -0.1],
    voucher: { title: 'Free Pastry', description: 'Get a free pastry with any large coffee purchase.' },
  },
  {
    id: 'poi-3',
    name: 'Pizzeria Roma',
    category: 'Food',
    position: [51.515, -0.08],
    voucher: { title: '15% Off Your Bill', description: 'Enjoy a 15% discount on your total bill.' },
  },
  {
    id: 'poi-4',
    name: 'City Spa & Services',
    category: 'Service',
    position: [51.512, -0.11],
    voucher: { title: '$20 Off Massage', description: 'Relax with a $20 discount on any 60-minute massage.' },
  },
  {
    id: 'poi-5',
    name: 'Sushi Palace',
    category: 'Food',
    position: [51.508, -0.095],
    voucher: { title: 'Free Edamame', description: 'Complimentary edamame with any sushi set.' },
  },
  {
    id: 'poi-6',
    name: 'Noodle House',
    category: 'Food',
    position: [51.503, -0.085],
    voucher: { title: '10% Off Noodles', description: '10% discount on all noodle dishes.' },
  },
  {
    id: 'poi-7',
    name: 'Tea Emporium',
    category: 'Drink',
    position: [51.513, -0.098],
    voucher: { title: 'Buy One Get One Tea', description: 'Purchase any tea and get another free.' },
  },
  {
    id: 'poi-8',
    name: 'Juice Bar Express',
    category: 'Drink',
    position: [51.507, -0.105],
    voucher: { title: 'Free Health Shot', description: 'A complimentary health shot with any juice order.' },
  },
  {
    id: 'poi-9',
    name: 'Elite Hair Salon',
    category: 'Service',
    position: [51.509, -0.082],
    voucher: { title: '20% Off Haircut', description: 'Get a stylish haircut with 20% off.' },
  },
  {
    id: 'poi-10',
    name: 'Quick Laundry Service',
    category: 'Service',
    position: [51.516, -0.10],
    voucher: { title: '$5 Off Dry Cleaning', description: 'Save $5 on your next dry cleaning order.' },
  },
];

export const MOCK_SUGGESTIONS: Suggestion[] = [
  { id: 'sug-1', title: 'Craving a Juicy Burger?', imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/burger-promotion-design-template-86c06b67ac6909b09a344c5de2ff411e_screen.jpg?ts=1601122948' },
  { id: 'sug-2', title: 'Time for a Coffee Break!', imageUrl: 'https://thumbs.dreamstime.com/b/promotion-banner-coffee-shop-vector-template-special-offer-cafe-buy-get-free-concept-advertising-81755427.jpg' },
  { id: 'sug-3', title: 'How About Pizza Tonight?', imageUrl: 'https://img.pikbest.com/origin/05/98/98/72IpIkbEsTZ2n.jpg!w700wp' },
  { id: 'sug-4', title: 'Warm Up with Ramen!', imageUrl: 'https://i.pinimg.com/736x/5c/d6/98/5cd698c7cce492c5361825c16f93e7ef.jpg' },
];

export const MOCK_PROMOTIONS: Promotion[] = [
    { id: 'promo-1', title: 'Weekend Special', description: 'Earn 2x points on all food purchases this weekend.' },
    { id: 'promo-2', title: 'Happy Hour Drinks', description: 'Get 50% off all drinks from 4 PM to 6 PM on weekdays.' },
];

export const MOCK_REWARD_TIERS: RewardTier[] = [
    { name: 'Bronze', points: 0 },
    { name: 'Silver', points: 1000 },
    { name: 'Gold', points: 2500 },
    { name: 'Platinum', points: 5000 },
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 'act-1', storeName: 'Gourmet Burger Kitchen', description: 'Used 2-for-1 Voucher', points: 50, date: '2025-07-15' },
    { id: 'act-2', storeName: 'The Coffee Bean', description: 'Earned 2x Points', points: 30, date: '2025-07-14' },
    { id: 'act-3', storeName: 'Pizzeria Roma', description: 'Spent $25', points: 25, date: '2025-07-12' },
    { id: 'act-4', storeName: 'City Spa & Services', description: 'Welcome Bonus', points: 10, date: '2025-07-10' },
];

// Mock challanges
export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'Hanoi Burger Blitz',
    category: 'Food',
    poiIds: ['poi-1', 'poi-3'], // Gourmet Burger Kitchen, Pizzeria Roma (for variety)
    description: 'Conquer Hanoi\'s best burgers and earn bonus points!',
    imageUrl: 'https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?s=612x612&w=0&k=20&c=lmJ0qUjC3FtCrWOGU0hWvqBgXcKZ1imiXKOMuHRfFH8=',
  },
  {
    id: 'challenge-2',
    name: 'Traditional Noodle Quest',
    category: 'Food',
    poiIds: ['poi-5', 'poi-6'], // Sushi Palace, Noodle House
    description: 'Discover hidden gems of authentic Vietnamese noodles and sushi.',
    imageUrl: 'https://t3.ftcdn.net/jpg/03/37/48/82/360_F_337488257_uIisoWFIYsSa0NMOVwDmiVDSmEjGrMSc.jpg',
  },
  {
    id: 'challenge-3',
    name: 'Matcha Sprint Hanoi',
    category: 'Drink',
    poiIds: ['poi-2', 'poi-7'], // The Coffee Bean, Tea Emporium
    description: 'Race through Hanoi\'s top matcha and tea spots.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/59010a64579fb3e8ae5b9281/1739136086434-PZ5Z7PP2GEKWE3Y4C4V1/deeplycoffeewinter-2.PNG',
  },
  {
    id: 'challenge-4',
    name: 'Juice & Chill Challenge',
    category: 'Drink',
    poiIds: ['poi-8'], // Juice Bar Express
    description: 'Refresh yourself with the city\'s finest fresh juices.',
    imageUrl: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-benefits-1296x728-feature.jpg',
  },
  {
    id: 'challenge-5',
    name: 'Urban Wellness Journey',
    category: 'Service',
    poiIds: ['poi-4', 'poi-9'], // City Spa & Services, Elite Hair Salon
    description: 'Pamper yourself and discover the best relaxation spots.',
    imageUrl: 'https://images.unsplash.com/photo-1561133211-6067fc8e7348?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFya3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 'challenge-6',
    name: 'Daily Essentials Loop',
    category: 'Service',
    poiIds: ['poi-10'], // Quick Laundry Service
    description: 'Complete your daily errands and get rewarded.',
    imageUrl: 'https://pathways.org/_next/image?url=https%3A%2F%2Fd2i2c20kelx1tf.cloudfront.net%2Fpublic%2FMom_with_baby_in_supermarket_smaller-1024x682.jpg&w=1200&q=75',
  },
];