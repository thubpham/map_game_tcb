import React from 'react';
import { MOCK_POIs } from '../../data/mockPoisData';
import type { PointOfInterest } from '../../types';
import Card from '../common/Card';

interface WhatToEatTodayProps {
  onSelectPoi: (poi: PointOfInterest) => void;
}

const WhatToEatToday: React.FC<WhatToEatTodayProps> = ({ onSelectPoi }) => {
  const foodAndDrinkPOIs = MOCK_POIs.filter(
    (poi) => poi.category === 'Food' || poi.category === 'Drink'
  );

  const getRandomPOIs = (arr: PointOfInterest[], num: number): PointOfInterest[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const suggestedPOIs = getRandomPOIs(foodAndDrinkPOIs, 4);

  return (
    <Card title="What to Eat Today">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {suggestedPOIs.length > 0 ? (
          suggestedPOIs.map((poi) => (
            <div
              key={poi.id}
              className="flex-shrink-0 w-48 cursor-pointer"
              onClick={() => onSelectPoi(poi)}
            >
              <img
                src={poi.mainImageUrl}
                alt={poi.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-md font-semibold truncate">{poi.name}</h4>
              <p className="text-sm text-gray-500 truncate">{poi.type} - {poi.category}</p>
            </div>
          ))
        ) : (
          <p>No food or drink suggestions available.</p>
        )}
      </div>
    </Card>
  );
};

export default WhatToEatToday;
