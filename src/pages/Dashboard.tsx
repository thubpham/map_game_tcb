// src/pages/Dashboard.tsx

import { useState } from 'react';
import UserProfile from '../components/dashboard/UserProfile';
// import StarbucksProgressTracker from '../components/dashboard/ProgressTracker';
// import SuggestionCarousel from '../components/dashboard/SuggestionCarousel'; // This is now a generic carousel
import Promotions from '../components/dashboard/Promotions';
import RecentActivity from '../components/dashboard/RecentActivity';
// import Leaderboard from '../components/dashboard/Leaderboard';
// import WhatToEatToday from '../components/dashboard/WhatToEatToday';
import Slideover from '../components/common/Slideover';
import FriendProfile from './FriendProfile';
import StoreDetailSlideoverContent from '../components/map/StoreDetailSlideoverContent';
// import FlavorProfileChart from '../components/dashboard/FlavorProfileChart';
import FoodieProfileBarChart from '../components/dashboard/FoodieProfileBarChart';
import FoodieProfileRadarChart from '../components/dashboard/FoodieProfileRadarChart';
import SuggestedForYou from '../components/dashboard/SuggestedForYou';
import DietarySuggestion from '../components/dashboard/DietarySuggestion';
import type { PointOfInterest } from '../types';
import { MOCK_USER } from '../data/user';
// import { MOCK_CHALLENGES } from '../data/challenges';
import { MOCK_PROMOTIONS } from '../data/promotions';
import { MOCK_ACTIVITIES } from '../data/activities';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import { MOCK_FOOD_JOURNAL_METRICS } from '../data/foodJournalMetrics';
import StarbucksProgressTracker from '../components/dashboard/ProgressTracker';
import Leaderboard from '../components/dashboard/Leaderboard';

const Dashboard = () => {
  const [isFriendSlideoverOpen, setIsFriendSlideoverOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [isPoiSlideoverOpen, setIsPoiSlideoverOpen] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsFriendSlideoverOpen(true);
  };

  const handleCloseFriendSlideover = () => {
    setIsFriendSlideoverOpen(false);
    setSelectedFriendId(null);
  };

  const handleSelectPoi = (poi: PointOfInterest) => {
    setSelectedPoi(poi);
    setIsPoiSlideoverOpen(true);
  };

  const handleClosePoiSlideover = () => {
    setIsPoiSlideoverOpen(false);
    setSelectedPoi(null);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="mb-8 pt-8">
        {/* <h2 className="text-2xl pl-4 font-bold text-gray-900 mb-4">Welcome User 1!</h2> */}
        <UserProfile user={ MOCK_USER } />
      </div>

      {/* <ProgressTracker
        currentPoints={MOCK_USER.points}
        pointsToNextTier={MOCK_USER.pointsToNextTier}
        currentTier={MOCK_USER.currentTier}
        nextTier={MOCK_USER.nextTier}
      /> */}
      {/* <StarbucksProgressTracker
        starBalance={MOCK_USER.points}
        tiers={[500, 1000, 1500, 2000]}
      /> */}
      {/* The SuggestionCarousel is now used by DietarySuggestion */}

      {/* <FlavorProfileChart metrics={MOCK_FOOD_JOURNAL_METRICS} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* First Column: Foodie Profile Bar Chart */}
        <div className="lg:col-span-2 h-full">
          {/* <FoodieProfileBarChart metrics={MOCK_FOOD_JOURNAL_METRICS} /> */}
          <FoodieProfileRadarChart metrics={MOCK_FOOD_JOURNAL_METRICS} />
        </div>

        {/* Second Column: Suggested for You */}
        <div className="lg:col-span-1 h-full">
          <SuggestedForYou />
        </div>
      </div>

      <div className ="grid grid-cols-1 lg:grid-cols-1 gap-8 items-stretch">
        {/* On large screens, this becomes a row. By default, items in a flex row will stretch to the same height. */}

        {/* First Column: Dietary Suggestion */}
        <div className ="lg:col-span-1 h-full"> {/* Use width utilities instead of column spans */}
          <h2 className="text-2xl pl-4 font-bold text-gray-900 mb-4">Top Picks Of The Day</h2>
          <DietarySuggestion />
        </div>
      </div>

      {/* <div className = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className = "lg:col-span-2 h-full">
        </div>
        <div className = "lg:col-span-1 h-full">
          <RecentActivity activities={MOCK_ACTIVITIES} />
        </div>
      </div> */}

      <Slideover
        isOpen={isFriendSlideoverOpen}
        onClose={handleCloseFriendSlideover}
        title="Friend Profile"
      >
        {selectedFriendId && <FriendProfile friendId={selectedFriendId} />}
      </Slideover>

      <Slideover
        isOpen={isPoiSlideoverOpen}
        onClose={handleClosePoiSlideover}
        title="Store Details"
      >
        {selectedPoi && <StoreDetailSlideoverContent poi={selectedPoi} />}
      </Slideover>
    </div>
  );
};

export default Dashboard;