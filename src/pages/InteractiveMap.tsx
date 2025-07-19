// src/pages/InteractiveMap.tsx

import { useState, useMemo } from 'react';
import MapContainer from '../components/map/MapContainer';
import { MOCK_POIs } from '../data/pois';
import { MOCK_CHALLENGES } from '../data/challenges';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import type { PointOfInterest } from '../types'; 
import { useGeolocation } from '../hook/useGeolocation'; 
import ChallengeSection from '../components/map/ChallengeSection';
import FriendActivityFeed from '../components/map/FriendActivityFeed';

type Category = PointOfInterest['category'];

const InteractiveMap = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); // Default center

  const { isLoading, position, getPosition } = useGeolocation();

  const [selectedChallengeCategory, setSelectedChallengeCategory] = useState<Category | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

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

  const filteredPOIs = useMemo(() => {

    // Define a state that will track what type of conditions are being applied
    let currentPOIs = MOCK_POIs

    // Tier 1: Filter by categories
    if (selectedChallengeCategory) {
      currentPOIs = currentPOIs.filter(poi => poi.category === selectedChallengeCategory); // Retrieve pois in that category only
      if (selectedChallengeId) { // If a challenge is also detected
        const challenge = MOCK_CHALLENGES.find(c => c.id === selectedChallengeId);
        if (challenge) {
          currentPOIs = currentPOIs.filter(poi => challenge.poiIds.includes(poi.id)); // Retrieve pois in that challenge from a list of filtered pois 
        } // If no challenge is detected, return the list of pois filtered by category 
      } 
    } 
    return currentPOIs // If no category detected, return a full list of pois
  }, [selectedChallengeId, selectedChallengeCategory]);

  return (
    // The entire component's JSX is wrapped in a single parent div
    <div>
      {/* UPDATED: Using the horizontal FriendActivityFeed component */}
      <FriendActivityFeed friends={MOCK_FRIENDS_WITH_ACTIVITY} />

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
