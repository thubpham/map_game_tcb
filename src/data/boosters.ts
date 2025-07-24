import type { Booster } from "../types";
import { CreditCard, PiggyBank, Smartphone } from 'lucide-react';

export const MOCK_BOOSTER: Booster[] = [
    {
      id: 'auto-earning',
      name: 'Auto Earning Activated',
      benefit: '20% Any Drink Order',
      service: 'credit-card',
      icon: CreditCard,
      isActive: true
    },
    {
      id: 'savings-boost',
      name: 'Savings Plus',
      benefit: '15% Food Orders',
      service: 'savings',
      icon: PiggyBank,  
      isActive: true
    },
    {
      id: 'mobile-rewards',
      name: 'Mobile Banking Bonus',
      benefit: '10% Service Purchases',
      service: 'mobile-banking',
      icon: Smartphone,
      isActive: false
    }
  ];