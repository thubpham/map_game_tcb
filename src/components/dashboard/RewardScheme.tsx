import { RewardTier } from '../../types';
import Card from '../common/Card';
import { Star } from 'lucide-react';

interface RewardSchemeProps {
    tiers: RewardTier[];
    currentTier: string;
}

const tierColors: { [key: string]: { text: string; bg: string; } } = {
    Bronze: { text: 'text-amber-700', bg: 'bg-amber-100' },
    Silver: { text: 'text-slate-500', bg: 'bg-slate-100' },
    Gold: { text: 'text-amber-500', bg: 'bg-amber-100' },
    Platinum: { text: 'text-indigo-500', bg: 'bg-indigo-100' },
};

const RewardScheme = ({ tiers, currentTier }: RewardSchemeProps) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reward Tiers</h2>
        <ul className="space-y-3">
            {tiers.map(tier => {
                const isCurrent = tier.name === currentTier;
                return (
                    <li key={tier.name} className={`flex items-center justify-between p-3 rounded-lg ${isCurrent ? tierColors[tier.name].bg : ''}`}>
                        <div className="flex items-center space-x-3">
                            <Star className={`w-6 h-6 ${tierColors[tier.name].text}`} />
                            <span className="font-semibold text-gray-700">{tier.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">{tier.points.toLocaleString()} pts</span>
                    </li>
                )
            })}
        </ul>
    </Card>
  );
};

export default RewardScheme;