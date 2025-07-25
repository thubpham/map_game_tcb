import { useState, useMemo } from 'react';
import { Trophy, Users, Target, Crown, ChevronRight, UserPlus, Award, MapPin, Quote, Check } from 'lucide-react';
import Card from '../components/common/Card';
import { MOCK_USER } from '../data/user';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import { MOCK_ACTIVITIES } from '../data/activities';
import RecentActivity from '../components/dashboard/RecentActivity';
import { MOTIVATIONAL_FOOD_QUOTES } from '../data/motivationalQuotes';
import Slideover from '../components/common/Slideover';
import FriendProfile from './FriendProfile';

const FriendsCompetitionDashboard = () => {
  // const [selectedFriend, setSelectedFriend] = useState(null);

  // Setting states to control motivational quotes seleection
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Settings for friends-related components
  const [isFriendSlideoverOpen, setIsFriendSlideoverOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsFriendSlideoverOpen(true);
  };

  const handleCloseFriendSlideover = () => {
    setIsFriendSlideoverOpen(false);
    setSelectedFriendId(null);
  };

  // Setting to track following status
  const [followingUsers, setFollowingUsers] = useState(new Set());

  const handleFollowToggle = (userName) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userName)) {
        newSet.delete(userName);
      } else {
        newSet.add(userName);
      }
      return newSet;
    });
  };

  // Create ranking logic using actual data
  const rankedPlayers = useMemo(() => {
    const allPlayers = [
      {
        ...MOCK_USER,
        id: MOCK_USER.id,
        name: MOCK_USER.name,
        totalPoints: MOCK_USER.points, // Map points to totalPoints for consistency
        isCurrentUser: true,
        challengesJoined: [], // User data doesn't have this
        restaurantsVisited: [],
        recentCompletions: [],
        mutualFriends: 0
      },
      ...MOCK_FRIENDS_WITH_ACTIVITY.map(friend => ({
        ...friend,
        isCurrentUser: false
      }))
    ];

    return allPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
  }, []);

  // Calculate user's rank and stats
  const userStats = useMemo(() => {
    const userRank = rankedPlayers.findIndex(player => player.isCurrentUser) + 1;
    const totalFriends = MOCK_FRIENDS_WITH_ACTIVITY.length;
    const leader = rankedPlayers[0];
    const pointsFromLeader = leader.totalPoints - MOCK_USER.points;
    
    return {
      rank: userRank,
      totalFriends,
      pointsFromLeader: leader.isCurrentUser ? 0 : pointsFromLeader
    };
  }, [rankedPlayers]);

  // const handleSelectFriend = (friendId) => {
  //   const friend = MOCK_FRIENDS_WITH_ACTIVITY.find(f => f.id === friendId);
  //   setSelectedFriend(friend);
  //   console.log('Selected friend:', friend);
  // };

  // Handle quote rotation on click
  const handleQuoteClick = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_FOOD_QUOTES.length);
  };

  // Get current quote
  const currentQuote = MOTIVATIONAL_FOOD_QUOTES[currentQuoteIndex];

  // Get rank display icon matching Dashboard style
  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header matching Dashboard UserProfile style */}
      <div className="mb-8 pt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Friends Competition</h1>
              <p className="text-gray-600">See how you stack up against your friends!</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Friends
              </button>
            </div>
          </div>

          {/* User stats overview using Dashboard card style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">Your Rank</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">#{userStats.rank}</div>
              <div className="text-sm text-gray-500">
                {userStats.pointsFromLeader > 0 
                  ? `${userStats.pointsFromLeader} points from leader`
                  : 'You\'re in the lead!'
                }
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Total Friends</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.totalFriends}</div>
              <div className="text-sm text-gray-500">In your network</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-green-500" />
                <span className="text-sm font-medium text-gray-600">Your Points</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_USER.points.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Current tier: {MOCK_USER.currentTier}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout - Leaderboard and Discover More Friends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* Left column - Leaderboard (takes 2/3 width) */}
        <Card className="lg:col-span-2 h-full p-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard</h2>
                <p className="text-gray-600">Current standings among your friends</p>
              </div>
            </div>

            <div className="space-y-4">
              {rankedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  onClick={() => !player.isCurrentUser && handleSelectFriend(player.id)}
                  className={`flex items-center gap-4 rounded-xl transition-all cursor-pointer p-6 ${
                    player.isCurrentUser
                      ? 'bg-blue-50 border-2 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {/* Rank indicator */}
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <img 
                      src={player.avatarUrl || `https://i.pravatar.cc/150?u=${player.name}`} 
                      alt={player.name} 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm" 
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Player info using available data */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-semibold text-gray-900">
                        {player.name}
                      </span>
                      {player.isCurrentUser && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                          YOU
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {!player.isCurrentUser && (
                        <>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{player.mutualFriends} mutual friends</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{player.restaurantsVisited?.length || 0} places visited</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{player.challengesJoined?.length || 0} challenges</span>
                          </div>
                        </>
                      )}
                      {player.isCurrentUser && (
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Next tier: {MOCK_USER.nextTier} ({MOCK_USER.pointsToNextTier - MOCK_USER.points} points needed)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Points display */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {player.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>

                  { <ChevronRight className="w-5 h-5 text-gray-400" /> }
                </div>
              ))}
            </div>
        </Card>

        {/* Right column - Discover More Friends (takes 1/3 width, top 5 suggestions) */}
        <Card className="lg:col-span-1 h-full p-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover More Friends</h2>
              <p className="text-gray-600">Connect with more people in your network</p>
            </div>

            <div className="space-y-4">
              {[
                { name: "Alex Thompson", mutualFriends: 3, points: 1850 },
                { name: "Lisa Park", mutualFriends: 2, points: 2100 },
                { name: "David Kim", mutualFriends: 5, points: 1750 },
                { name: "Sarah Wilson", mutualFriends: 4, points: 1920 },
                { name: "Mike Chen", mutualFriends: 2, points: 1680 }
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${suggestion.name}`} 
                    alt={suggestion.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900 mb-1">{suggestion.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{suggestion.mutualFriends} mutual friends</div>
                    <div className="text-xs text-gray-500">{suggestion.points.toLocaleString()} points</div>
                  </div>

                  <button
                    onClick={() => handleFollowToggle(suggestion.name)}
                    className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center shadow-lg ${
                      followingUsers.has(suggestion.name)
                        ? 'bg-transparent border-2 border-blue-600 text-blue-600 text-sm hover:bg-blue-50'
                        : 'bg-blue-600 text-white text-sm hover:bg-blue-700'
                    }`}
                  >
                    {followingUsers.has(suggestion.name) ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                      </>
                    ) : (
                      'Follow'
                    )}
                  </button>

                </div>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Suggestions
              </button>
            </div>
        </Card>
      </div>

      {/* User Recent Activity */}
      <div className = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <Card className = "lg:col-span-2 h-full p-3">
            <RecentActivity activities={MOCK_ACTIVITIES} />
        </Card>
        <Card className = "lg:col-span-1 h-full p-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Food Inspirations</h2>
          </div>
          <div 
            onClick={handleQuoteClick}
            className="cursor-pointer p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <blockquote className="text-lg font-medium text-gray-800 mb-3 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-sm text-orange-600 font-semibold">
                  — {currentQuote.author}
                </cite>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Click for new inspiration</span>
                <div className="flex gap-1">
                  {MOTIVATIONAL_FOOD_QUOTES.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentQuoteIndex ? 'bg-orange-500' : 'bg-orange-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Slideover
          isOpen={isFriendSlideoverOpen}
          onClose={handleCloseFriendSlideover}
          title="Friend Profile">
          {selectedFriendId && <FriendProfile friendId={selectedFriendId} />}
        </Slideover>

      </div>
    </div>
  );
};

export default FriendsCompetitionDashboard;