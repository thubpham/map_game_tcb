import { useState } from 'react';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import { 
  Award, Trophy, MapPin, Star, MessageSquare, Check, TrendingUp, Users, Heart, Clock, Target
} from 'lucide-react';

import Card from '../components/common/Card';
// import FlavorProfileChart from '../components/dashboard/FlavorProfileChart';
// import FriendProfileBarChart from '../components/dashboard/FriendProfileBarChart';
import FriendProfileRadarChart from '../components/dashboard/FriendProfileRadarChart';
import { MOCK_POIs } from '../data/mockPoisData';
import { MOCK_CHALLENGES } from '../data/challenges';

interface FriendProfileProps {
  friendId: string;
}

// A new component for a cleaner layout
const StatCard = ({ 
  icon, 
  label, 
  value, 
  trend, 
  trendValue 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}) => (
  <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl space-y-2 border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
    {icon}
    <span className="text-2xl font-bold text-gray-800">{value}</span>
    <span className="text-sm font-medium text-gray-500 text-center">{label}</span>
    {trend && trendValue && (
      <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-green-100 text-green-600' :
        trend === 'down' ? 'bg-red-100 text-red-600' :
        'bg-gray-100 text-gray-600'
      }`}>
        <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
        <span>{trendValue}</span>
      </div>
    )}
  </div>
);

const ActivityItem = ({ 
  type, 
  title, 
  description, 
  date, 
  points 
}: {
  type: 'challenge' | 'review' | 'visit';
  title: string;
  description: string;
  date: string;
  points?: number;
}) => {
  const getIcon = () => {
    switch (type) {
      case 'challenge': return <Trophy className="w-5 h-5 text-indigo-500" />;
      case 'review': return <MessageSquare className="w-5 h-5 text-teal-500" />;
      case 'visit': return <MapPin className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{date}</span>
          {points && (
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              +{points} pts
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const FriendProfile = ({ friendId }: FriendProfileProps) => {
  const friend = MOCK_FRIENDS_WITH_ACTIVITY.find(f => f.id === friendId);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'reviews'>('overview');

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  if (!friend) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Friend not found.</h2>
        <p className="text-gray-500 mt-4">Please select a valid friend.</p>
      </div>
    );
  }

  const getPoiDetails = (poiId: string) => MOCK_POIs.find(p => p.id === poiId);
  const getChallengeDetails = (challengeId: string) => MOCK_CHALLENGES.find(c => c.id === challengeId);

  // Calculate some additional stats
  const reviewsCount = friend.restaurantsVisited.filter(r => r.review).length;
  const avgRating = reviewsCount > 0 
    ? friend.restaurantsVisited
        .filter(r => r.review)
        .reduce((sum, r) => sum + (r.review?.rating || 0), 0) / reviewsCount
    : 0;

  return (
    <div className="space-y-6 p-4 bg-gray-50/30 rounded-2xl max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center space-x-6">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg"
              src={friend.avatarUrl}
              alt={friend.name}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{friend.name}</h1>
            <div className="flex items-center space-x-2 text-lg">
              <Award className="w-6 h-6" />
              <span className="font-semibold">{friend.totalPoints.toLocaleString()} Points</span>
            </div>
            {friend.mutualFriends > 0 && (
              <div className="mt-2 flex items-center space-x-2 text-sm opacity-90">
                <Users className="w-4 h-4" />
                <span>{friend.mutualFriends} mutual friends</span>
              </div>
            )}
          </div>
          <button
            onClick={handleFollowToggle}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              isFollowing
                ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                : 'bg-white text-indigo-600 hover:bg-gray-100'
            } flex items-center justify-center shadow-lg`}
          >
            {isFollowing ? (
              <>
                <Check className="w-5 h-5 mr-2" /> Following
              </>
            ) : (
              'Follow'
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Trophy className="w-8 h-8 text-indigo-500" />} 
          label="Challenges" 
          value={friend.challengesJoined.length}
          trend="up"
          trendValue="+2 this week"
        />
        <StatCard 
          icon={<MapPin className="w-8 h-8 text-rose-500" />} 
          label="Places Visited" 
          value={friend.restaurantsVisited.length}
          trend="up"
          trendValue="+1 this week"
        />
        <StatCard 
          icon={<MessageSquare className="w-8 h-8 text-teal-500" />} 
          label="Reviews" 
          value={reviewsCount}
        />
        <StatCard 
          icon={<Star className="w-8 h-8 text-amber-500" />} 
          label="Avg Rating" 
          value={avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
        />
      </div>

      {/* Food Profile Chart */}
      {/* <FriendProfileBarChart metrics={friend.flavorProfile} friendName={friend.name} /> */}
      <FriendProfileRadarChart metrics={friend.flavorProfile} friendName={friend.name} />

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200">
        {[
          { key: 'overview', label: 'Overview', icon: Target },
          { key: 'activity', label: 'Activity', icon: TrendingUp },
          { key: 'reviews', label: 'Reviews', icon: MessageSquare }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === key
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {friend.recentCompletions.slice(0, 3).map((completion, index) => (
                  <ActivityItem
                    key={index}
                    type={completion.type === 'challenge' ? 'challenge' : 'visit'}
                    title={completion.name}
                    description={completion.type === 'challenge' ? 'Challenge completed' : 'Restaurant visited'}
                    date="2 days ago"
                    points={completion.type === 'challenge' ? 50 : undefined}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Favorite Places
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {friend.restaurantsVisited.slice(0, 4).map((visit, index) => {
                  const poi = getPoiDetails(visit.poiId);
                  if (!poi) return null;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img src={poi.mainImageUrl} alt={poi.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{poi.name}</h4>
                        <p className="text-xs text-gray-600">{poi.type}</p>
                        {visit.review && (
                          <div className="flex items-center mt-1">
                            {[...Array(visit.review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Timeline</h3>
            <div className="space-y-3">
              {friend.challengesJoined.map(challengeId => {
                const challenge = getChallengeDetails(challengeId);
                if (!challenge) return null;
                return (
                  <ActivityItem
                    key={challenge.id}
                    type="challenge"
                    title={challenge.name}
                    description={challenge.description}
                    date="1 week ago"
                    points={challenge.points}
                  />
                );
              })}
              {friend.restaurantsVisited.map((visit, index) => {
                const poi = getPoiDetails(visit.poiId);
                if (!poi) return null;
                return (
                  <ActivityItem
                    key={index}
                    type="visit"
                    title={`Visited ${poi.name}`}
                    description={`${poi.type} in ${poi.category}`}
                    date={visit.date}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews & Ratings</h3>
            <div className="space-y-4">
              {friend.restaurantsVisited
                .filter(visit => visit.review)
                .map((visit, index) => {
                  const poi = getPoiDetails(visit.poiId);
                  if (!poi || !visit.review) return null;
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img src={poi.mainImageUrl} alt={poi.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{poi.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(visit.review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{visit.date}</span>
                          </div>
                          <p className="text-gray-700 mt-2 italic">"{visit.review.comment}"</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FriendProfile;