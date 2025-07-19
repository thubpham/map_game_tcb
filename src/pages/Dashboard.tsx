// src/pages/Dashboard.tsx

import { useState } from 'react';
import UserProfile from '../components/dashboard/UserProfile';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import RewardScheme from '../components/dashboard/RewardScheme';
import SuggestionCarousel from '../components/dashboard/SuggestionCarousel';
import Promotions from '../components/dashboard/Promotions';
import RecentActivity from '../components/dashboard/RecentActivity';
import Leaderboard from '../components/dashboard/Leaderboard';
import Slideover from '../components/common/Slideover';
import FriendProfile from './FriendProfile';

import { MOCK_USER } from '../data/user';
import { MOCK_CHALLENGES } from '../data/challenges';
import { MOCK_PROMOTIONS } from '../data/promotions';
import { MOCK_REWARD_TIERS } from '../data/rewardTiers';
import { MOCK_ACTIVITIES } from '../data/activities';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';

const Dashboard = () => {
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsSlideoverOpen(true);
  };

  const handleCloseSlideover = () => {
    setIsSlideoverOpen(false);
    setSelectedFriendId(null);
  };

  return (
    <div className="space-y-8">
      <UserProfile user={MOCK_USER} />
      <ProgressTracker
        currentPoints={MOCK_USER.points}
        pointsToNextTier={MOCK_USER.pointsToNextTier}
        currentTier={MOCK_USER.currentTier}
        nextTier={MOCK_USER.nextTier}
      />
      <SuggestionCarousel challenges={MOCK_CHALLENGES} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Promotions promotions={MOCK_PROMOTIONS} />
            <RecentActivity activities={MOCK_ACTIVITIES} />
        </div>
        <div className="lg:col-span-1 space-y-8">
            <Leaderboard currentUser={MOCK_USER} friends={MOCK_FRIENDS_WITH_ACTIVITY} onSelectFriend={handleSelectFriend} />
            <RewardScheme tiers={MOCK_REWARD_TIERS} currentTier={MOCK_USER.currentTier} />
        </div>
      </div>

      <Slideover
        isOpen={isSlideoverOpen}
        onClose={handleCloseSlideover}
        title="Friend Profile"
      >
        {selectedFriendId && <FriendProfile friendId={selectedFriendId} />}
      </Slideover>
    </div>
  );
};

export default Dashboard;
