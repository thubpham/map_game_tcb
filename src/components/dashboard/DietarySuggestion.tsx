//// src/components/dashboard/SuggestionCarousel.tsx

import { useState } from 'react';
import { MOCK_POIs } from '../../data/mockPoisData';
import Slideover from '../common/Slideover';
import StoreDetailSlideoverContent from '../map/StoreDetailSlideoverContent';
import SuggestionCarousel from './SuggestionCarousel';
import TodaysPickCard from './TodaysPickCard';
import type { PointOfInterest } from '../../types';

const DietarySuggestion = () => {
  const [showSlideover, setShowSlideover] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  const handleOpenSlideover = (poi: PointOfInterest) => {
    setSelectedPoi(poi);
    setShowSlideover(true);
  };

  const handleCloseSlideover = () => {
    setShowSlideover(false);
    setSelectedPoi(null);
  };

  // Get different types of recommendations
  const foodPois = MOCK_POIs.filter(poi => poi.category === 'Food');
  const todaysPicks = foodPois.slice(0, 5); // Get 5 items for the carousel

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 items-stretch">
        {/* Today's Pick Carousel */}
        <div className="lg:col-span-3">
          <SuggestionCarousel
            items={todaysPicks}
            onItemClick={handleOpenSlideover}
            renderItem={(item) => (
              <TodaysPickCard poi={item} onOpenSlideover={handleOpenSlideover} />
            )}
          />
        </div>
      </div>

      <Slideover
        isOpen={showSlideover}
        onClose={handleCloseSlideover}
        title={selectedPoi?.name || 'Restaurant Details'}
      >
        {selectedPoi && <StoreDetailSlideoverContent poi={selectedPoi} />}
      </Slideover>
    </div>
  );
};

export default DietarySuggestion;