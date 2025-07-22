import type { Challenge } from '../types';

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    name: 'Hanoi Burger Blitz',
    category: 'Food',
    poiIds: ['poi-1'], // Chops Burger Kitchen
    description: 'Conquer Hanoi\'s best burgers and earn bonus points!',
    imageUrl: 'https://media.istockphoto.com/id/1188412964/photo/hamburger-with-cheese-and-french-fries.jpg?s=612x612&w=0&k=20&c=lmJ0qUjC3FtCrWOGU0hWvqBgXcKZ1imiXKOMuHRfFH8=',
    points: 75,
    difficulty: 'easy',
    pois: [],
    expiresAt: '2025-08-01T23:59:59Z', // Expires in about a week
  },
  {
    id: 'challenge-2',
    name: 'Pizza & Italian Delights',
    category: 'Food',
    poiIds: ['poi-3'], // Pizzeria Roma
    description: 'Savor authentic Italian pizzas in the heart of Hanoi.',
    imageUrl: 'https://kitchenswagger.com/wp-content/uploads/2023/05/margherita-pizza-close.jpg',
    points: 75,
    difficulty: 'easy',
    pois: [],
    expiresAt: '2025-08-15T23:59:59Z', // Expires in about 3 weeks
  },
  {
    id: 'challenge-3',
    name: 'Authentic Vietnamese Eats',
    category: 'Food',
    poiIds: ['poi-11', 'poi-13', 'poi-16', 'poi-18'], // Phở Thìn, Bánh Mì 25, Quán Ăn Ngon, Chả Cá Thăng Long
    description: 'Embark on a culinary journey through Hanoi\'s most iconic Vietnamese dishes.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFeAOvwAudr81tBwLZpIbSEe0ne-5divWSQ&s',
    points: 150,
    difficulty: 'medium',
    pois: [],
    expiresAt: '2025-07-25T23:59:59Z', // Expires in a few days
  },
  {
    id: 'challenge-4',
    name: 'Asian Noodle & Sushi Journey',
    category: 'Food',
    poiIds: ['poi-5', 'poi-6'], // Sushi Nhan, Noodle House
    description: 'Explore the diverse flavors of Asian noodles and fresh sushi.',
    imageUrl: 'https://t3.ftcdn.net/jpg/03/37/48/82/360_F_337488257_uIisoWFIYsSa0NMOVwDmiVDSMSc.jpg',
    points: 100,
    difficulty: 'medium',
    pois: [],
    expiresAt: '2025-08-08T23:59:59Z', // Expires in about 2 weeks
  },
  {
    id: 'challenge-5',
    name: 'Hanoi Coffee Culture',
    category: 'Drink',
    poiIds: ['poi-2', 'poi-12', 'poi-15'], // The Coffee Bean, Giảng Café, Cộng Cà Phê
    description: 'Immerse yourself in Hanoi\'s vibrant coffee scene, from traditional to modern.',
    imageUrl: 'https://cafegiang.vn/wp-content/uploads/2023/04/giangw-e1682570947418.jpeg',
    points: 120,
    difficulty: 'medium',
    pois: [],
    expiresAt: '2025-08-22T23:59:59Z', // Expires in about a month
  },
  {
    id: 'challenge-6',
    name: 'Tea Time Tranquility',
    category: 'Drink',
    poiIds: ['poi-7'], // Tea Emporium
    description: 'Find your inner peace at Hanoi\'s finest tea spots.',
    imageUrl: 'https://www.news-medical.net/image-handler/picture/2021/9/shutterstock_251566309.jpg',
    points: 60,
    difficulty: 'easy',
    pois: [],
  },
  {
    id: 'challenge-7',
    name: 'Fresh Juice & Smoothie Boost',
    category: 'Drink',
    poiIds: ['poi-8'], // Juice Bar Express
    description: 'Recharge with refreshing and healthy juices and smoothies.',
    imageUrl: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-benefits-1296x728-feature.jpg',
    points: 60,
    difficulty: 'easy',
    pois: [],
  },
  {
    id: 'challenge-8',
    name: 'Hanoi Nightlife Explorer',
    category: 'Drink',
    poiIds: ['poi-14', 'poi-17'], // Hanoi Social Club, Bia Hơi Hải Xồm
    description: 'Experience Hanoi\'s lively nightlife and local bar scene.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/89/e9/bb/pretty.jpg?w=900&h=500&s=1',
    points: 100,
    difficulty: 'medium',
    pois: [],
  },
  {
    id: 'challenge-9',
    name: 'Urban Wellness & Beauty',
    category: 'Service',
    poiIds: ['poi-4', 'poi-9', 'poi-20'], // City Spa & Services, 30 Shine Hair Saloon, La Siesta Spa
    description: 'Pamper yourself with top-notch spa and beauty treatments.',
    imageUrl: 'https://images.unsplash.com/photo-1561133211-6067fc8e7348?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFya3xlbnwwfHwwfHx8MA%3D%3D',
    points: 120,
    difficulty: 'medium',
    pois: [],
  },
  {
    id: 'challenge-10',
    name: 'Local Services & Tailoring',
    category: 'Service',
    poiIds: ['poi-10', 'poi-19'], // Giặt Là Sapy, Áo Dài Thanh Liem Tailors
    description: 'Discover essential local services and traditional tailoring.',
    imageUrl: 'https://pathways.org/_next/image?url=https%3A%2F%2Fd2i2c20kelx1tf.cloudfront.net%2Fpublic%2FMom_with_baby_in_supermarket_smaller-1024x682.jpg&w=1200&q=75',
    points: 80,
    difficulty: 'easy',
    pois: [],
  },
];
