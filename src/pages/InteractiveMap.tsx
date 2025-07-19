// src/pages/InteractiveMap.tsx

import { useState, useMemo, useEffect } from 'react';
import MapContainer from '../components/map/MapContainer';
import { MOCK_POIs } from '../data/mockPoisData';
import { MOCK_CHALLENGES } from '../data/challenges';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import type { PointOfInterest } from '../types';
import { useGeolocation } from '../hook/useGeolocation';
import ChallengeSection from '../components/map/ChallengeSection';
import FriendActivityFeed from '../components/map/FriendActivityFeed';
import { useChallengeStore } from '../store/challengeStore'; // Import the store
import Slideover from '../components/common/Slideover';
import FriendProfile from './FriendProfile';

type Category = PointOfInterest['category'];

const InteractiveMap = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([21.0283334, 105.8540410]); // Default center set to Hanoi, Vietnam
  const [isFriendSlideoverOpen, setIsFriendSlideoverOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const { isLoading, position, getPosition } = useGeolocation();
  const { activeChallengeId, setActiveChallenge } = useChallengeStore(); // Get activeChallengeId from store

  const [selectedChallengeCategory, setSelectedChallengeCategory] = useState<Category | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

  // Effect to sync activeChallengeId from store to local state
  useEffect(() => {
    if (activeChallengeId && activeChallengeId !== selectedChallengeId) {
      setSelectedChallengeId(activeChallengeId);
      // Optionally, clear the activeChallengeId from the store after it's used
      // setActiveChallenge(null);
    }
  }, [activeChallengeId, selectedChallengeId, setActiveChallenge]);

  if (position && (mapCenter[0] !== position[0] || mapCenter[1] !== position[1])) {
    setMapCenter(position);
  }

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsFriendSlideoverOpen(true);
  };

  const handleCloseFriendSlideover = () => {
    setIsFriendSlideoverOpen(false);
    setSelectedFriendId(null);
  };

  // Handler for changing the selected challenge category (Layer 1 filter)
  const handleChallengeCategoryChange = (category: Category) => {
    // Toggle selection: if already selected, deselect; otherwise, select
    setSelectedChallengeCategory(prev => (prev === category ? null : category));
    setSelectedChallengeId(null); // Reset specific challenge selection when category changes
    setActiveChallenge(null); // Clear active challenge from store
  };

  // Handler for selecting a specific challenge (Layer 2 filter)
  const handleChallengeSelect = (challengeId: string) => {
    // Toggle selection: if already selected, deselect; otherwise, select
    setSelectedChallengeId(prev => (prev === challengeId ? null : challengeId));
    setActiveChallenge(null); // Clear active challenge from store
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
    <div className="pb-16">
      <FriendActivityFeed
        friends={MOCK_FRIENDS_WITH_ACTIVITY}
        onSelectFriend={handleSelectFriend}
      />

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
      <div className="h-[55vh] w-full rounded-xl shadow-lg overflow-hidden mt-6 relative z-0">
        <MapContainer
          center={mapCenter} // Passes the current map center (user location or default)
          pointsOfInterest={filteredPOIs}
          selectedChallengeId={selectedChallengeId} // Pass selectedChallengeId to MapContainer
        />
      </div>

      <Slideover
        isOpen={isFriendSlideoverOpen}
        onClose={handleCloseFriendSlideover}
        title="Friend Profile"
      >
        {selectedFriendId && <FriendProfile friendId={selectedFriendId} />}
      </Slideover>
    </div>
  );
};

export default InteractiveMap;
