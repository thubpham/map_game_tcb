import type { PointOfInterest } from '../types';

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
  {
    id: 'poi-11',
    name: 'Phở Thìn Lò Đúc',
    category: 'Food',
    position: [21.012, 105.859], // Hai Ba Trung District
    voucher: { title: 'Free Quẩy Sticks', description: 'Get a free side of fried dough sticks with any phở bowl.' },
  },
  {
    id: 'poi-12',
    name: 'Giảng Café (Egg Coffee)',
    category: 'Drink',
    position: [21.031, 105.852], // Hoan Kiem District
    voucher: { title: '10% Off Second Cup', description: 'Enjoy a 10% discount on your second cup of delicious egg coffee.' },
  },
  {
    id: 'poi-13',
    name: 'Bánh Mì 25',
    category: 'Food',
    position: [21.035, 105.850], // Old Quarter
    voucher: { title: 'Free Pate Topping', description: 'Add our famous homemade pate to any Bánh Mì for free.' },
  },
  {
    id: 'poi-14',
    name: 'Hanoi Social Club',
    category: 'Drink',
    position: [21.029, 105.847], // Hoan Kiem District
    voucher: { title: 'Live Music Discount', description: '15% off your drink order during live music nights.' },
  },
  {
    id: 'poi-15',
    name: 'Cộng Cà Phê',
    category: 'Drink',
    position: [21.045, 105.820], // Near West Lake
    voucher: { title: 'Free Upgrade', description: 'Upgrade your regular coffee to our famous Coconut Coffee.' },
  },
  {
    id: 'poi-16',
    name: 'Quán Ăn Ngon',
    category: 'Food',
    position: [21.022, 105.841], // Phan Boi Chau Street
    voucher: { title: 'Free Chè Dessert', description: 'Enjoy a complimentary traditional Vietnamese dessert with your meal.' },
  },
  {
    id: 'poi-17',
    name: 'Bia Hơi Corner (Tạ Hiện)',
    category: 'Drink',
    position: [21.034, 105.851], // Old Quarter
    voucher: { title: '3rd Beer is on Us!', description: 'Buy two glasses of fresh Bia Hơi and get the third one free.' },
  },
  {
    id: 'poi-18',
    name: 'Chả Cá Thăng Long',
    category: 'Food',
    position: [21.030, 105.845], // Duong Thanh Street
    voucher: { title: 'Group Discount', description: 'Get 15% off your total bill for groups of 4 or more.' },
  },
  {
    id: 'poi-19',
    name: 'Áo Dài Thanh Liem Tailors',
    category: 'Service',
    position: [21.032, 105.849], // Hang Gai Street (Silk Street)
    voucher: { title: '20% Off Custom Tailoring', description: 'Get a 20% discount on any custom-made Áo Dài.' },
  },
  {
    id: 'poi-20',
    name: 'La Siesta Spa',
    category: 'Service',
    position: [21.036, 105.848], // Ma May Street
    voucher: { title: 'Free Herbal Tea', description: 'Relax after your treatment with a complimentary pot of herbal tea.' },
  },
];
