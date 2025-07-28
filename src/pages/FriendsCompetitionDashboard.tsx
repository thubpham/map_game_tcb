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
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFriendSlideoverOpen, setIsFriendSlideoverOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [followingUsers, setFollowingUsers] = useState(new Set());

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setIsFriendSlideoverOpen(true);
  };

  const handleCloseFriendSlideover = () => {
    setIsFriendSlideoverOpen(false);
    setSelectedFriendId(null);
  };

  const handleFollowToggle = (userName: string) => {
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

  const rankedPlayers = useMemo(() => {
    const allPlayers = [
      {
        ...MOCK_USER,
        id: MOCK_USER.id,
        name: MOCK_USER.name,
        totalPoints: MOCK_USER.points,
        isCurrentUser: true,
        challengesJoined: [],
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

  const handleQuoteClick = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_FOOD_QUOTES.length);
  };

  const currentQuote = MOTIVATIONAL_FOOD_QUOTES[currentQuoteIndex];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-600" />;
    if (rank === 2) return <Award className="w-5 h-5 text-amber-600" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="mb-8 pt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Friends Competition</h1>
              <p className="text-gray-600">See how you stack up against your friends!</p>
            </div>
            <button className="w-full md:w-auto px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold shadow-md border-2 border-amber-600 hover:bg-transparent hover:text-amber-600 flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Invite Friends</span>
            </button>
          </div>

          {/* User stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-amber-600" />
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

            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-amber-600" />
                <span className="text-sm font-medium text-gray-600">Total Friends</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.totalFriends}</div>
              <div className="text-sm text-gray-500">In your network</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-amber-600" />
                <span className="text-sm font-medium text-gray-600">Your Points</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_USER.points.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Current tier: {MOCK_USER.currentTier}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Leaderboard */}
        <Card className="lg:col-span-2 p-4 md:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard</h2>
              <p className="text-gray-600">Current standings among your friends</p>
            </div>
            <div className="space-y-4">
              {rankedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  onClick={() => !player.isCurrentUser && handleSelectFriend(player.id)}
                  className={`flex items-center justify-between gap-4 rounded-xl transition-all p-4 ${
                    player.isCurrentUser
                      ? 'bg-amber-50 border-2 border-amber-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  } ${!player.isCurrentUser ? 'cursor-pointer' : ''}`}
                >
                  {/* Left Group: Rank, Avatar, Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="relative flex-shrink-0">
                      <img 
                        src={player.avatarUrl || `https://i.pravatar.cc/150?u=${player.name}`} 
                        alt={player.name} 
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-sm" 
                      />
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-amber-600 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-md md:text-lg font-semibold text-gray-900 truncate">
                          {player.name}
                        </span>
                        {player.isCurrentUser && (
                          <span className="px-2 py-0.5 bg-amber-600 text-white text-xs rounded-full font-semibold flex-shrink-0">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 truncate">
                        {!player.isCurrentUser && (
                          <>
                            <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{player.mutualFriends} mutual</span></div>
                            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{player.restaurantsVisited?.length || 0} visits</span></div>
                          </>
                        )}
                        {player.isCurrentUser && (
                          <div className="flex items-center gap-1"><Award className="w-4 h-4" /><span>Next: {MOCK_USER.nextTier}</span></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Group: Points and Chevron */}
                  <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg md:text-xl font-bold text-gray-900">{player.totalPoints.toLocaleString()}</div>
                      <div className="text-xs md:text-sm text-gray-500">points</div>
                    </div>
                    <div className="w-5 h-5">
                      {!player.isCurrentUser && <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </Card>

        {/* Discover Friends */}
        <Card className="lg:col-span-1 p-4 md:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover</h2>
              <p className="text-gray-600">Connect with others</p>
            </div>
            <div className="space-y-4">
              {[
                { name: "Alex Thompson", mutualFriends: 3, points: 1850 },
                { name: "Lisa Park", mutualFriends: 2, points: 2100 },
                { name: "David Kim", mutualFriends: 5, points: 1750 },
                { name: "Sarah Wilson", mutualFriends: 4, points: 1920 },
                { name: "Mike Chen", mutualFriends: 2, points: 1680 }
              ].slice(0, 3).map((suggestion) => (
                <div key={suggestion.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${suggestion.name}`} 
                    alt={suggestion.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900">{suggestion.name}</div>
                    <div className="text-xs text-gray-500">{suggestion.mutualFriends} mutual</div>
                  </div>
                  <button
                    onClick={() => handleFollowToggle(suggestion.name)}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center shadow-sm text-sm ${
                      followingUsers.has(suggestion.name)
                        ? 'bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {followingUsers.has(suggestion.name) ? <Check className="w-4 h-4" /> : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-amber-600 hover:text-amber-700 font-medium text-sm">
                View All
              </button>
            </div>
        </Card>
      </div>

      {/* Activity and Inspirations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2 p-4 md:p-6">
            <RecentActivity activities={MOCK_ACTIVITIES} />
        </Card>
        <Card className="lg:col-span-1 p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inspirations</h2>
          </div>
          <div 
            onClick={handleQuoteClick}
            className="cursor-pointer p-6 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl border border-amber-100 hover:from-amber-100 hover:to-amber-100 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <blockquote className="text-md font-medium text-gray-800 mb-3 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-sm text-amber-600 font-semibold">— {currentQuote.author}</cite>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Click for more</span>
                <div className="flex gap-1">
                  {MOTIVATIONAL_FOOD_QUOTES.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentQuoteIndex ? 'bg-amber-500' : 'bg-amber-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Slideover
        isOpen={isFriendSlideoverOpen}
        onClose={handleCloseFriendSlideover}
        title="Friend Profile">
        {selectedFriendId && <FriendProfile friendId={selectedFriendId} />}
      </Slideover>
    </div>
  );
};

export default FriendsCompetitionDashboard;