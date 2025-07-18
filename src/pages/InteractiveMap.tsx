// src/pages/InteractiveMap.tsx

import { useState, useMemo } from 'react';
import MapContainer from '../components/map/MapContainer';
import { MOCK_POIs, MOCK_CHALLENGES } from '../data/mock';
import type { PointOfInterest } from '../types'; // Using 'import type' for type-only import
import { useGeolocation } from '../hook/useGeolocation'; // Corrected: Path changed from 'hook' to 'hooks'
import ChallengeSection from '../components/map/ChallengeSection';

// Defining Category type for clarity, derived from PointOfInterest
type Category = PointOfInterest['category'];

const InteractiveMap = () => {
  // State for the map's center coordinates
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); // Default center

  // Geolocation hook for getting user's current position
  const { isLoading, position, getPosition } = useGeolocation();

  // States for managing challenge selection
  const [selectedChallengeCategory, setSelectedChallengeCategory] = useState<Category | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

  // Effect to update map center when geolocation position changes
  // This runs on initial load if position is available, and whenever getPosition is called
  if (position && (mapCenter[0] !== position[0] || mapCenter[1] !== position[1])) {
      setMapCenter(position);
  }

  // Handler for changing the selected challenge category (Layer 1 filter)
  const handleChallengeCategoryChange = (category: Category) => {
    // Toggle selection: if already selected, deselect; otherwise, select
    setSelectedChallengeCategory(prev => (prev === category ? null : category));
    setSelectedChallengeId(null); // Reset specific challenge selection when category changes
  };

  // Handler for selecting a specific challenge (Layer 2 filter)
  const handleChallengeSelect = (challengeId: string) => {
    // Toggle selection: if already selected, deselect; otherwise, select
    setSelectedChallengeId(prev => (prev === challengeId ? null : challengeId));
  };

  // Memoized computation of points of interest to display on the map
  const filteredPOIs = useMemo(() => {
    if (selectedChallengeId) {
      // Tier 1: Specific challenge is selected
      const challenge = MOCK_CHALLENGES.find(c => c.id === selectedChallengeId);
      if (challenge) {
        return MOCK_POIs.filter(poi => challenge.poiIds.includes(poi.id));
      }
      return [] // Challenge not found or empty 
    } else if (selectedChallengeCategory) {
      // Tier 2: No challenge selected but category selected
      return MOCK_POIs.filter(poi => poi.category === selectedChallengeCategory);
    } else {
      // Tier 3: Nothing selected - default to showing all POIs
      return MOCK_POIs;
    }
  }, [selectedChallengeId, setSelectedChallengeCategory]);

  return (
    // The entire component's JSX is wrapped in a single parent div
    <div>
      {/* The main Challenge Section, which handles category selection and challenge carousel */}
      <ChallengeSection
          challenges={MOCK_CHALLENGES}
          selectedChallengeCategory={selectedChallengeCategory}
          onChallengeCategoryChange={handleChallengeCategoryChange}
          selectedChallengeId={selectedChallengeId}
          onChallengeSelect={handleChallengeSelect}
          onCenterMeClick={getPosition}
          isLocating={isLoading}
      />
      
      {/* Container for the Leaflet map */}
      <div className="h-[65vh] w-full rounded-xl shadow-lg overflow-hidden mt-6">
          <MapContainer 
            center={mapCenter} // Passes the current map center (user location or default)
            pointsOfInterest={filteredPOIs} // Passes the dynamically filtered POIs
          />
      </div>
    </div>
  );
};

export default InteractiveMap;