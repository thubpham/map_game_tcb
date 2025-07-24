import { CreditCard, PiggyBank, Smartphone, TrendingUp, Building2, Shield } from 'lucide-react';

export const TECHCOMBANK_SERVICES = [
    {
      id: 1,
      name: "Techcombank Platinum Credit Card",
      description: "Premium credit card with exclusive dining rewards and airport lounge access",
      icon: CreditCard,
      boosterBenefit: "+3x points on dining",
      features: ["No annual fee first year", "Cashback on all purchases", "Priority customer service"],
      gradient: "from-purple-500 to-purple-700",
      isPopular: true
    },
    {
      id: 2,
      name: "F@st Mobile Banking",
      description: "Advanced mobile banking with AI-powered spending insights",
      icon: Smartphone,
      boosterBenefit: "+2x points on mobile transactions",
      features: ["Instant transfers", "Biometric security", "Smart budgeting tools"],
      gradient: "from-blue-500 to-blue-700",
      isPopular: false
    },
    {
      id: 3,
      name: "Techcom Savings Plus",
      description: "High-yield savings account with flexible terms and bonus interest",
      icon: PiggyBank,
      boosterBenefit: "+1.5x points on deposits",
      features: ["Competitive interest rates", "No minimum balance", "Goal-based savings"],
      gradient: "from-green-500 to-green-700",
      isPopular: false
    },
    {
      id: 4,
      name: "Investment Portfolio",
      description: "Professional investment management with diversified portfolios",
      icon: TrendingUp,
      boosterBenefit: "+4x points on investments",
      features: ["Expert portfolio management", "Low fees", "Regular rebalancing"],
      gradient: "from-orange-500 to-orange-700",
      isPopular: false
    },
    {
      id: 5,
      name: "Business Banking",
      description: "Comprehensive business solutions for entrepreneurs and companies",
      icon: Building2,
      boosterBenefit: "+5x points on business expenses",
      features: ["Business loans", "Corporate cards", "Cash management"],
      gradient: "from-indigo-500 to-indigo-700",
      isPopular: false
    },
    {
      id: 6,
      name: "Insurance Protection",
      description: "Complete insurance coverage for life, health, and property",
      icon: Shield,
      boosterBenefit: "+2x points on premiums",
      features: ["Life insurance", "Health coverage", "Property protection"],
      gradient: "from-red-500 to-red-700",
      isPopular: false
    }
  ];