import type { RewardTier } from '../../types';
import Card from '../common/Card';
import { Star, Check } from 'lucide-react';

interface RewardSchemeProps {
    tiers: RewardTier[];
    currentTier: string;
}

const tierColors: { [key: string]: { text: string; bg: string; border: string; } } = {
    Bronze: { text: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-200' },
    Silver: { text: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' },
    Gold: { text: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-200' },
    Platinum: { text: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
};

const RewardScheme = ({ tiers, currentTier }: RewardSchemeProps) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Loyalty Tiers</h2>
        <ul className="space-y-3">
            {tiers.map(tier => {
                const isCurrent = tier.name === currentTier;
                const colors = tierColors[tier.name];
                return (
                    <li key={tier.name} className={`flex items-center justify-between p-4 rounded-lg border ${isCurrent ? `${colors.bg} ${colors.border} font-semibold` : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center space-x-3">
                            <Star className={`w-6 h-6 ${colors.text}`} />
                            <span className={`font-semibold ${colors.text}`}>{tier.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">{tier.points.toLocaleString()} pts</span>
                          {isCurrent && <Check className="w-5 h-5 text-green-500" />}
                        </div>
                    </li>
                )
            })}
        </ul>
    </Card>
  );
};

export default RewardScheme;