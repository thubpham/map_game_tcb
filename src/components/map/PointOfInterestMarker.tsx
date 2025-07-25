// src/components/map/PointOfInterestMarker.tsx

import { Marker } from 'react-leaflet';
import type { PointOfInterest } from '../../types'; // Changed to type-only import
import { divIcon, DivIcon } from 'leaflet'; // Import DivIcon instead of Icon
import { Utensils, Coffee, Gem } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import StoreDetailsPopup from './StoreDetailsPopup';
import { MOCK_CHALLENGES } from '../../data/challenges'; // Import MOCK_CHALLENGES

interface PointOfInterestMarkerProps {
  poi: PointOfInterest;
  selectedChallengeId: string | null;
}

const categoryIcons = {
  Food: <Utensils className="w-5 h-5 text-white" />,
  Drink: <Coffee className="w-5 h-5 text-white" />,
  Service: <Gem className="w-5 h-5 text-white" />
};

const PointOfInterestMarker = ({ poi, selectedChallengeId }: PointOfInterestMarkerProps) => {
  const isPartOfSelectedChallenge = selectedChallengeId
    ? MOCK_CHALLENGES.find(challenge => challenge.id === selectedChallengeId)?.poiIds.includes(poi.id)
    : false;

  const iconHtml = renderToString(
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 ${isPartOfSelectedChallenge ? 'bg-amber-500 border-amber-600 animate-pulse' : 'bg-amber-600 border-white'}`}>
      {categoryIcons[poi.category]}
    </div>
  );

  const customIcon: DivIcon = divIcon({ // Explicitly type customIcon as DivIcon
    html: iconHtml,
    className: 'bg-transparent border-0',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <Marker position={poi.position} icon={customIcon}>
      <StoreDetailsPopup poi={poi} />
    </Marker>
  );
};

export default PointOfInterestMarker;
