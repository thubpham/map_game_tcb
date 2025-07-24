# CODEBASE

// src/components/dashboard/Leaderboard.tsx

import { useMemo } from 'react';
import type { User, Friend } from '../../types';
import Card from '../common/Card';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  currentUser: User;
  friends: Friend[];
  onSelectFriend: (friendId: string) => void;
}

const Leaderboard = ({ currentUser, friends, onSelectFriend }: LeaderboardProps) => {
  const rankedList = useMemo(() => {
    const combined = [
      {
        id: currentUser.id,
        name: currentUser.name,
        avatarUrl: `https://i.pravatar.cc/150?u=${currentUser.name}`,
        totalPoints: currentUser.points,
      },
      ...friends,
    ];
    return combined.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [currentUser, friends]);

  const rankIcons = [
    <Trophy key="gold" className="w-6 h-6 text-yellow-500" />,
    <Medal key="silver" className="w-6 h-6 text-slate-400" />,
    <Award key="bronze" className="w-6 h-6 text-amber-700" />,
  ];

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Friend Leaderboard</h2>
      <ul className="space-y-3">
        {rankedList.map((player, index) => {
          const isCurrentUser = player.id === currentUser.id;
          const rank = index + 1;
          return (
            <li key={player.id}>
              <div
                onClick={() => !isCurrentUser && onSelectFriend(player.id)}
                className={`flex items-center p-3 rounded-lg transition-all cursor-pointer ${isCurrentUser ? 'bg-indigo-100 border-2 border-indigo-300' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className="text-lg font-bold text-gray-500 w-8">{rank <= 3 ? rankIcons[index] : rank}</span>
                <img src={player.avatarUrl} alt={player.name} className="w-10 h-10 rounded-full mx-3" />
                <span className="font-semibold text-gray-800 flex-grow">{player.name} {isCurrentUser && '(You)'}</span>
                <span className="font-bold text-indigo-600">{player.totalPoints.toLocaleString()} pts</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Leaderboard;



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
      <UserProfile user={MOCK_USER} />

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

      <div className ="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* On large screens, this becomes a row. By default, items in a flex row will stretch to the same height. */}

        {/* First Column: Dietary Suggestion */}
        <div className ="lg:col-span-2 h-full"> {/* Use width utilities instead of column spans */}
            <DietarySuggestion />
        </div>

        {/* Second Column: Promotions, Leaderboard, Recent Activity */}
        <div className ="lg:col-span-1 h-full space-y-8"> {/* Use width utilities */}
            <Leaderboard currentUser={MOCK_USER} friends={MOCK_FRIENDS_WITH_ACTIVITY} onSelectFriend={handleSelectFriend} />
            {/* <Promotions promotions={MOCK_PROMOTIONS} /> */}
            {/* <RecentActivity activities={MOCK_ACTIVITIES} /> */}
        </div>
      </div>

      <div className = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className = "lg:col-span-2 h-full">
        </div>
        <div className = "lg:col-span-1 h-full">
          <RecentActivity activities={MOCK_ACTIVITIES} />
        </div>
      </div>

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


//// src/components/dashboard/SuggestionCarousel.tsx


import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { PointOfInterest, SuggestionCarouselProps } from '../../types';

const SuggestionCarousel = ({ items, onItemClick, renderItem }: SuggestionCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust as needed
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide" ref={carouselRef}>
        {items.map((item) => (
          <div key={item.id} onClick={() => onItemClick(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/70 transition-colors z-10"
        aria-label="Scroll left"
      >
        <ArrowLeft className="text-gray-800 w-6 h-6" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/70 transition-colors z-10"
        aria-label="Scroll right"
      >
        <ArrowRight className="text-gray-800 w-6 h-6" />
      </button>
    </div>
  );
};

export default SuggestionCarousel;


//// src/components/dashboard/DietarySuggestion.tsx

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
      <div className="grid grid-cols-1 gap-6">
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

// src/components/dashboard/TodaysPickCard.tsx

import { Clock, MapPin, Star, Bookmark, Eye } from 'lucide-react';
import type { PointOfInterest } from '../../types';

interface TodaysPickCardProps {
  poi: PointOfInterest;
  onOpenSlideover: (poi: PointOfInterest) => void;
}

const TodaysPickCard = ({ poi, onOpenSlideover }: TodaysPickCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          Today's Pick
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          95% Match
        </span>
      </div>
      
      <div 
        className="cursor-pointer group"
        onClick={() => onOpenSlideover(poi)}
      >
        <div className="relative mb-4">
          <img
            src={poi.menu && poi.menu.length > 0 ? poi.menu[0].imageUrl : '/path/to/placeholder.png'}
            alt={poi.name}
            className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-gray-900">
            $$
          </div>
        </div>
        
        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {poi.name}
        </h4>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>0.3 miles away</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Open until 10:00 PM</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">
          Perfect for your love of spicy Asian fusion. Try their signature pad thai!
        </p>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View Menu
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysPickCard;


## my instruction

You are expert in frontend development
a great developer who think deeply and analyze to find and fix all the hardest frontend bug

At the moment, i am encounter a bug in Dashboard page
in my page, at one div, i put DietarySuggestion and LeaderBoard as 2 component, side by side
I expect them to have similar vertical height


HOWEVER, right now, maybe due to the shadow or the curve or the padding, the leaderboard and each suggestioncard are mis aligned (although inside a same div)

Can you help me on this to match them, i fell so frustruated when seeing 2 mis aligned component

Maybe fix them and let leaderboard to be scrollable, so that it always matching the suggestion card