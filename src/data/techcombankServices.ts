import { CreditCard, Zap, Award, Target, Calendar} from 'lucide-react';

export const TECHCOMBANK_SERVICES = [
  {
    id: 'auto-earning',
    name: 'Techcombank Auto-Earning 2.0',
    description: 'Smart feature that automatically earns daily profit on your current account balance.',
    boosterBenefit: '+50% Points on Daily Tasks',
    interestRate: 'Up to 4.4% p.a.',
    minAmount: 'No minimum',
    features: [
      'Earn up to 4.4% p.a. automatically on idle funds',
      'Full flexibility: spend, transfer, withdraw anytime 24/7',
      'Convert interest into U-Points (up to 6% annual rate)',
    ],
    gradient: 'from-amber-500 to-amber-700',
    icon: Zap,
    isPopular: true
  },
  {
    id: 'bao-loc-cd',
    name: 'Bao Loc Certificate of Deposit',
    description: 'Fixed-term certificate of deposit offering fixed-interest returns with high liquidity and flexible denominations.',
    boosterBenefit: '+30% Reward Points',
    interestRate: 'Up to 4.4% p.a.',
    minAmount: 'VND 10 million',
    features: [
      'Interest rates up to 4.4% p.a. depending on term',
      'Minimum investment as low as VND 10 million',
      'Flexible term durations available'
    ],
    gradient: 'from-amber-600 to-orange-600',
    icon: Award
  },
  {
    id: 'nhu-y-savings',
    name: 'Nhu Y Savings (Flexible Deposit)',
    description: 'Online flexible saving account with smart scheduling and goal-based savings management tools.',
    boosterBenefit: '+25% Goal Achievement Bonus',
    interestRate: 'Competitive rates',
    minAmount: 'Flexible',
    features: [
      'Set up automatic deposits (daily/weekly/monthly)',
      'Higher interest for larger or timely contributions',
      'Multiple term options from 3 to 60 months',
    ],
    gradient: 'from-amber-500 to-yellow-600',
    icon: Target,
    isPopular: true
  },
  {
    id: 'term-deposit',
    name: 'Personal Term Deposit',
    description: 'Traditional savings account offering fixed interest at higher rates over predetermined terms.',
    boosterBenefit: '+40% Long-term Rewards',
    interestRate: 'Higher rates for longer terms',
    minAmount: 'VND 10 million',
    features: [
      'Terms from 1 week to multiple years',
      'Flexible interest payment options',
      'Early settlement allowed before maturity',
    ],
    gradient: 'from-amber-600 to-amber-800',
    icon: Calendar
  },
  {
    id: 'cards-insurance',
    name: 'Credit/Debit Cards & Bancassurance',
    description: 'International cards and partnering bancassurance products with comprehensive coverage and rewards.',
    boosterBenefit: '+60% Spending Rewards',
    interestRate: 'Cashback & Points',
    minAmount: 'No minimum',
    features: [
      'Cashback and reward points for spending',
      'Access to preferential promotions and discounts',
      'Insurance packages with global coverage',
    ],
    gradient: 'from-amber-700 to-red-600',
    icon: CreditCard,
    isPopular: true
  }
];