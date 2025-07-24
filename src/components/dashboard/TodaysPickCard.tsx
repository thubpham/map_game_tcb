// src/components/dashboard/TodaysPickCard.tsx

import { Clock, MapPin, Star, Bookmark, Eye } from 'lucide-react';
import type { PointOfInterest } from '../../types';

interface TodaysPickCardProps {
  poi: PointOfInterest;
  onOpenSlideover: (poi: PointOfInterest) => void;
}

const TodaysPickCard = ({ poi, onOpenSlideover }: TodaysPickCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-shadow duration-300 flex-shrink-0 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          Today's Pick
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          95% Match
        </span>
      </div>
      
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
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-gray-900">
            $$
          </div>
        </div>
        
        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {poi.name}
        </h4>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>0.3 miles away</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Open until 10:00 PM</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">
          Perfect for your love of spicy Asian fusion. Try their signature pad thai!
        </p>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Menu
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysPickCard;