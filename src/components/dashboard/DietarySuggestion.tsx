import { useState } from 'react';
import { MOCK_POIs } from '../../data/mockPoisData';
import Slideover from '../common/Slideover';
import StoreDetailSlideoverContent from '../map/StoreDetailSlideoverContent';
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
        Based on your unique diet and preferences, here are some hand-picked suggestions just for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {MOCK_POIs.filter(poi => poi.category === 'Food' && poi.menu && poi.menu.length > 0)
          .slice(0, 3) // Take the first 3 food POIs
          .map((poi, index) => (
            <div
              key={poi.id}
              className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm rounded-xl p-5 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-200 cursor-pointer"
              onClick={() => handleOpenSlideover(poi)}
            >
              <img
                src={poi.menu[0].imageUrl} // Use the first menu item's image
                alt={poi.menu[0].item}
                className={`w-24 h-24 object-cover rounded-full mb-3 border-4 ${
                  index === 0 ? 'border-yellow-400' : index === 1 ? 'border-green-400' : 'border-red-400'
                } shadow-lg`}
              />
              <h3 className="text-xl font-bold mb-1">{poi.name}</h3>
              <p className="text-sm opacity-80">{poi.menu[0].item}</p>
            </div>
          ))}
      </div>

      <div className="text-center">
        <button className="bg-white text-purple-800 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition-colors transform hover:scale-105">
          Discover More Personalized Picks!
        </button>
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
