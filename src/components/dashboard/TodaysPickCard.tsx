// src/components/dashboard/TodaysPickCard.tsx

import { Clock, MapPin } from 'lucide-react';
import Card from '../common/Card';
import type { PointOfInterest } from '../../types';

interface TodaysPickCardProps {
  poi: PointOfInterest;
  onOpenSlideover: (poi: PointOfInterest) => void;
}

const TodaysPickCard = ({ poi, onOpenSlideover }: TodaysPickCardProps) => {
  return (
    <Card className="transition-shadow duration-300 flex-shrink-0 w-80 h-full p-3">
      <div 
        className="cursor-pointer group"
        onClick={() => onOpenSlideover(poi)}
      >
        <div className="relative mb-4">
          <img
            src={poi.menu && poi.menu.length > 0 ? poi.menu[0].imageUrl : '/path/to/placeholder.png'}
            alt={poi.name}
            className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Match Percentage - Top Left */}
          <div className="absolute top-3 left-3 bg-amber-100 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-amber-600">
            {(Math.random() * 30 + 70).toFixed(0)}% Match
          </div>
          
          {/* Price Index - Top Right */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-gray-900">
            $$
          </div>
        </div>
        
        <h4 className="text-lg font-semibold text-amber-600 mb-2 group-hover:text-amber-500 transition-colors">
          {poi.name}
        </h4>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{(Math.random() * 0.9 + 0.1).toFixed(1)}km away</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Open until 10:00 PM</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">
          {poi.voucher.description}
        </p>
      </div>
    </Card>
  );
};

export default TodaysPickCard;