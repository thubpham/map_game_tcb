import { Zap, CreditCard, Star, TrendingUp, Crown, Shield, Award, Users } from 'lucide-react';

export const GOLD_TIER_BENEFITS = [
    {
      id: 'weekly-challenge-boost',
      title: 'Weekly Challenge Boost',
      description: 'Exclusive weekly challenges with massive point multipliers',
      icon: Zap,
      currentTierValue: 'Regular challenges',
      goldTierValue: '5x point multiplier',
      isUpgrade: true
    },
    {
      id: 'free-monthly-order',
      title: 'Free Monthly Order',
      description: 'Complimentary delivery or service order every month',
      icon: CreditCard,
      currentTierValue: 'Not available',
      goldTierValue: 'Up to $50 value',
      isUpgrade: true
    },
    {
      id: 'priority-new-access',
      title: 'Priority New Product Access',
      description: 'First access to new challenges, features, and limited rewards',
      icon: Star,
      currentTierValue: 'Standard release',
      goldTierValue: '7-day early access',
      isUpgrade: true
    },
    {
      id: 'double-xp-weekends',
      title: 'Double XP Weekends',
      description: 'Earn double experience points every weekend',
      icon: TrendingUp,
      currentTierValue: 'Standard XP',
      goldTierValue: '2x XP Sat-Sun',
      isUpgrade: true
    },
    // {
    //   id: 'skip-challenge-token',
    //   title: 'Skip Challenge Token',
    //   description: 'Monthly token to skip any difficult challenge',
    //   icon: Shield,
    //   currentTierValue: 'Must complete all',
    //   goldTierValue: '1 skip token/month',
    //   isUpgrade: true
    // },
    // {
    //   id: 'vip-support',
    //   title: 'VIP Game Support',
    //   description: 'Priority support for game issues and account management',
    //   icon: Users,
    //   currentTierValue: 'Standard support',
    //   goldTierValue: 'VIP priority queue',
    //   isUpgrade: true
    // }
  ];