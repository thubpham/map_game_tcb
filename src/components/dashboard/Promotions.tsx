import type { Promotion } from '../../types';
import Card from '../common/Card';
import { Ticket } from 'lucide-react';

interface PromotionsProps {
    promotions: Promotion[];
}

const Promotions = ({ promotions }: PromotionsProps) => {
  return (
    <Card>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Hot Deals & Promotions</h2>
        <div className="space-y-4">
            {promotions.map(promo => (
                <div key={promo.id} className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Ticket className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{promo.title}</h3>
                        <p className="text-sm text-gray-600">{promo.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default Promotions;