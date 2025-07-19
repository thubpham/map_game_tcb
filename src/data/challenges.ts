import type { Challenge } from '../types';

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'Hanoi Burger Blitz',
    category: 'Food',
    poiIds: ['poi-1', 'poi-3', 'poi-13', 'poi-14'], // Gourmet Burger Kitchen, Pizzeria Roma (for variety)
    description: 'Conquer Hanoi\'s best burgers and earn bonus points!',
    imageUrl: 'https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?s=612x612&w=0&k=20&c=lmJ0qUjC3FtCrWOGU0hWvqBgXcKZ1imiXKOMuHRfFH8=',
  },
  {
    id: 'challenge-2',
    name: 'Traditional Noodle Quest',
    category: 'Food',
    poiIds: ['poi-5', 'poi-6', 'poi-11'], // Sushi Palace, Noodle House
    description: 'Discover hidden gems of authentic Vietnamese noodles and sushi.',
    imageUrl: 'https://t3.ftcdn.net/jpg/03/37/48/82/360_F_337488257_uIisoWFIYsSa0NMOVwDmiVDSmEjGrMSc.jpg',
  },
  {
    id: 'challenge-3',
    name: 'Caffein Sprint Hanoi',
    category: 'Drink',
    poiIds: ['poi-2', 'poi-7', 'poi-12', 'poi-15'], // The Coffee Bean, Tea Emporium
    description: 'Race through Hanoi\'s top matcha and tea spots.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/59010a64579fb3e8ae5b9281/1739136086434-PZ5Z7PP2GEKWE3Y4C4V1/deeplycoffeewinter-2.PNG',
  },
  {
    id: 'challenge-4',
    name: 'Juice & Chill Challenge',
    category: 'Drink',
    poiIds: ['poi-8', 'poi-17'], // Juice Bar Express
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
