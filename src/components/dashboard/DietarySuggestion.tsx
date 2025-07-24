import { useState } from 'react';
import { MOCK_POIs } from '../../data/mockPoisData';
import Slideover from '../common/Slideover';
import StoreDetailSlideoverContent from '../map/StoreDetailSlideoverContent';
import type { PointOfInterest } from '../../types';
import SuggestionCarousel from './SuggestionCarousel'; // Import the existing carousel component

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

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Background elements for game-like aesthetic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <img src="/path/to/game-texture.png" alt="texture" className="w-full h-full object-cover" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      <div className="absolute -top-5 -left-5 w-20 h-20 bg-white opacity-5 rounded-full"></div>

      <h2 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
        Your Next Culinary Adventure Awaits!
      </h2>
      <p className="text-lg text-center mb-8 opacity-90">
        Based on your Foodie Profile, here are some suggestions just for you!
      </p>

      <SuggestionCarousel
        // items={MOCK_POIs.filter(poi => poi.category === 'Food' && poi.menu && poi.menu.length > 0).slice(0, 5)}
        items={MOCK_POIs.filter(poi => poi.category === 'Food').slice(0, 5)}
        onItemClick={handleOpenSlideover}
      />

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
