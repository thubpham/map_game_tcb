// src/data/mock.ts

import { User, PointOfInterest, Suggestion, Promotion, RewardTier, Activity } from '../types';
// import BurgerImg from '../assets/images/burger.jpg';
// import CoffeeImg from '../assets/images/coffee.jpg';
// import PizzaImg from '../assets/images/pizza.jpg';
// import RamenImg from '../assets/images/ramen.jpg';

export const MOCK_USER: User = {
  name: 'Customer',
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