import { useState, useMemo } from 'react';
import { 
  Trophy, Medal, Award, TrendingUp, TrendingDown, Users, Target, MapPin, 
  Star, Calendar, ChevronRight, Crown, Zap, Flame, Filter, Search, 
  MoreVertical, Gift, Clock, Eye, Award as AwardIcon, ChevronDown,
  ArrowUp, ArrowDown, Activity, MapPin as LocationIcon, Calendar as CalendarIcon
} from 'lucide-react';

// Mock data - you can replace with your actual data
const MOCK_USER = {
  id: 1,
  name: "You",
  points: 2850,
  level: 8,
  streak: 12,
  totalChallenges: 24,
  totalRewards: 8
};

const MOCK_FRIENDS_WITH_ACTIVITY = [
  {
    id: 2,
    name: "Sarah Chen",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    totalPoints: 3200,
    level: 10,
    streak: 15,
    isOnline: true,
    lastActivity: "2 hours ago",
    challengesJoined: [{ name: "Food Explorer", type: "poi" }],
    restaurantsVisited: [{ poiId: "Downtown Café", date: "2024-07-20", review: { rating: 5 } }],
    recentCompletions: [
      { name: "Coffee Connoisseur", type: "challenge", points: 150 },
      { name: "Weekend Warrior", type: "poi", points: 200 }
    ]
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=mike",
    totalPoints: 2950,
    level: 9,
    streak: 8,
    isOnline: false,
    lastActivity: "1 day ago",
    challengesJoined: [{ name: "Local Explorer", type: "poi" }],
    restaurantsVisited: [{ poiId: "Sunset Bistro", date: "2024-07-19", review: { rating: 4 } }],
    recentCompletions: [
      { name: "Social Butterfly", type: "challenge", points: 100 }
    ]
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatarUrl: "https://i.pravatar.cc/150?u=emma",
    totalPoints: 2650,
    level: 7,
    streak: 20,
    isOnline: true,
    lastActivity: "30 minutes ago",
    challengesJoined: [{ name: "Foodie Quest", type: "challenge" }],
    restaurantsVisited: [{ poiId: "Green Garden", date: "2024-07-21", review: { rating: 5 } }],
    recentCompletions: [
      { name: "Streak Master", type: "challenge", points: 300 }
    ]
  }
];

// Enhanced Card component with Techcombank styling
const Card = ({ children, className = "", gradient = false, hover = false }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 ${
    hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''
  } ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''} ${className}`}>
    {children}
  </div>
);

// Statistics Overview Component with Techcombank branding
const StatisticsOverview = ({ currentUser, friends }) => {
  const stats = useMemo(() => {
    const totalFriends = friends.length;
    const totalPoints = friends.reduce((sum, friend) => sum + friend.totalPoints, 0) + currentUser.points;
    const averagePoints = Math.round(totalPoints / (totalFriends + 1));
    const userRank = [...friends, { ...currentUser, totalPoints: currentUser.points }]
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .findIndex(player => player.id === currentUser.id) + 1;
    
    const weeklyGrowth = 12.5; // Mock data
    const activeFriends = friends.filter(f => f.isOnline).length;
    
    return { totalFriends, totalPoints, averagePoints, userRank, weeklyGrowth, activeFriends };
  }, [currentUser, friends]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden" hover>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-xs text-red-100 uppercase tracking-wide font-semibold">Current Rank</div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">#{stats.userRank}</div>
          <div className="text-red-100 text-sm flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            <span>+2 this week</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-gray-800 to-black text-white relative overflow-hidden" hover>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-300 uppercase tracking-wide font-semibold">Total Friends</div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalFriends}</div>
          <div className="text-gray-300 text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{stats.activeFriends} online now</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white relative overflow-hidden" hover>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-xs text-yellow-100 uppercase tracking-wide font-semibold">Total Points</div>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalPoints.toLocaleString()}</div>
          <div className="text-yellow-100 text-sm flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            <span>+{stats.weeklyGrowth}% this week</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 relative overflow-hidden" hover>
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-600 opacity-5 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Average Points</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">{stats.averagePoints.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">Community average</div>
        </div>
      </Card>
    </div>
  );
};

// Enhanced Leaderboard Component
const EnhancedLeaderboard = ({ currentUser, friends, onSelectFriend }) => {
  const [sortBy, setSortBy] = useState('points');
  const [filterOnline, setFilterOnline] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const rankedList = useMemo(() => {
    const combined = [
      {
        id: currentUser.id,
        name: currentUser.name,
        avatarUrl: `https://i.pravatar.cc/150?u=${currentUser.name}`,
        totalPoints: currentUser.points,
        level: currentUser.level,
        streak: currentUser.streak,
        isCurrentUser: true,
        isOnline: true,
        lastActivity: "now"
      },
      ...friends.map(friend => ({ ...friend, isCurrentUser: false })),
    ];

    let filtered = combined;
    
    if (filterOnline) {
      filtered = filtered.filter(player => player.isOnline || player.isCurrentUser);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'level': return b.level - a.level;
        case 'streak': return b.streak - a.streak;
        default: return b.totalPoints - a.totalPoints;
      }
    });
  }, [currentUser, friends, sortBy, filterOnline, searchTerm]);

  const getRankIcon = (index) => {
    const icons = [
      <div key="gold" className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg">
        <Crown className="w-5 h-5 text-white" />
      </div>,
      <div key="silver" className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg">
        <Medal className="w-5 h-5 text-white" />
      </div>,
      <div key="bronze" className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg">
        <Award className="w-5 h-5 text-white" />
      </div>,
    ];
    return index < 3 ? icons[index] : (
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full shadow-md">
        <span className="text-sm font-bold text-gray-700">#{index + 1}</span>
      </div>
    );
  };

  const getPointsTrend = (points, index) => {
    if (index === 0) return { 
      icon: <Crown className="w-4 h-4 text-yellow-500" />, 
      text: "Leading", 
      color: "text-yellow-600 bg-yellow-50", 
      bgColor: "bg-yellow-50" 
    };
    const diff = rankedList[0].totalPoints - points;
    return {
      icon: <TrendingUp className="w-4 h-4 text-red-500" />,
      text: `-${diff} pts`,
      color: "text-red-600 bg-red-50",
      bgColor: "bg-red-50"
    };
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-xl">
              <Trophy className="w-7 h-7 text-red-600" />
            </div>
            Competition Leaderboard
          </h2>
          <p className="text-gray-600">Compete with friends and climb to the top!</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full sm:w-48"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white"
            >
              <option value="points">Sort by Points</option>
              <option value="level">Sort by Level</option>
              <option value="streak">Sort by Streak</option>
            </select>
            
            <button
              onClick={() => setFilterOnline(!filterOnline)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filterOnline 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Online Only
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-4">
        {rankedList.map((player, index) => {
          const trend = getPointsTrend(player.totalPoints, index);
          
          return (
            <div
              key={player.id}
              onClick={() => !player.isCurrentUser && onSelectFriend(player.id)}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                player.isCurrentUser
                  ? 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 shadow-xl'
                  : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-xl border border-gray-100'
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Rank */}
                {getRankIcon(index)}
                
                {/* Avatar with status */}
                <div className="relative">
                  <img 
                    src={player.avatarUrl} 
                    alt={player.name} 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg" 
                  />
                  {player.isOnline && !player.isCurrentUser && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Player Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold text-gray-800">
                      {player.name}
                    </span>
                    {player.isCurrentUser && (
                      <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full font-semibold">
                        YOU
                      </span>
                    )}
                    {index === 0 && <Flame className="w-5 h-5 text-orange-500" />}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${trend.bgColor}`}>
                      {trend.icon}
                      <span className={`text-sm font-medium ${trend.color.split(' ')[0]}`}>
                        {trend.text}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <AwardIcon className="w-4 h-4" />
                      <span>Level {player.level}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{player.streak} day streak</span>
                    </div>
                  </div>
                  
                  {!player.isCurrentUser && (
                    <div className="text-xs text-gray-500 mt-1">
                      Last active: {player.lastActivity}
                    </div>
                  )}
                </div>
                
                {/* Points */}
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {player.totalPoints.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
                
                {!player.isCurrentUser && (
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                )}
              </div>
              
              {/* Glow effect for current user */}
              {player.isCurrentUser && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-2xl pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Enhanced Recent Activity Component
const RecentActivity = ({ friends }) => {
  const [filter, setFilter] = useState('all');
  
  const recentActivities = useMemo(() => {
    const activities = [];
    friends.forEach(friend => {
      friend.restaurantsVisited?.forEach(visit => {
        activities.push({
          id: `${friend.id}-${visit.poiId}`,
          friendName: friend.name,
          friendAvatar: friend.avatarUrl,
          type: 'visit',
          location: visit.poiId,
          date: visit.date,
          rating: visit.review?.rating,
          points: 50,
        });
      });
      friend.recentCompletions?.forEach(completion => {
        activities.push({
          id: `${friend.id}-${completion.name}`,
          friendName: friend.name,
          friendAvatar: friend.avatarUrl,
          type: completion.type,
          name: completion.name,
          points: completion.points,
          date: new Date().toISOString().split('T')[0],
        });
      });
    });
    
    let filtered = activities;
    if (filter !== 'all') {
      filtered = activities.filter(activity => activity.type === filter);
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  }, [friends, filter]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'challenge': return <Target className="w-5 h-5 text-red-500" />;
      case 'poi': return <MapPin className="w-5 h-5 text-green-500" />;
      case 'visit': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Zap className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'challenge': return 'bg-red-50 border-red-200';
      case 'poi': return 'bg-green-50 border-green-200';
      case 'visit': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-xl">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            Recent Friend Activity
          </h3>
          <p className="text-gray-600">Stay updated with your friends' latest achievements</p>
        </div>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          {['all', 'challenge', 'visit', 'poi'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                filter === filterType
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities.map((activity) => (
          <div 
            key={activity.id} 
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${getActivityColor(activity.type)}`}
          >
            <img 
              src={activity.friendAvatar} 
              alt={activity.friendName} 
              className="w-12 h-12 rounded-full border-4 border-white shadow-md" 
            />
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-1 bg-white rounded-lg shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <span className="font-bold text-gray-800">{activity.friendName}</span>
                <span className="text-gray-600 text-sm">
                  {activity.type === 'visit' ? 'visited' : 'completed'}
                </span>
                <span className="font-semibold text-gray-800">
                  {activity.name || activity.location}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{activity.date}</span>
                </div>
                {activity.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{activity.rating}/5</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs font-semibold text-red-600">
                  <span>+{activity.points} pts</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Enhanced Top Performers Component
const TopPerformers = ({ friends }) => {
  const [metric, setMetric] = useState('points');
  
  const topPerformers = useMemo(() => {
    return friends
      .sort((a, b) => {
        switch (metric) {
          case 'level': return b.level - a.level;
          case 'streak': return b.streak - a.streak;
          default: return b.totalPoints - a.totalPoints;
        }
      })
      .slice(0, 3)
      .map((friend, index) => ({
        ...friend,
        rank: index + 1,
        badge: ['🥇', '🥈', '🥉'][index],
      }));
  }, [friends, metric]);

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-600" />
            </div>
            Top Performers
          </h3>
          <p className="text-sm text-gray-600">This week's champions</p>
        </div>
        
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white"
        >
          <option value="points">Points</option>
          <option value="level">Level</option>
          <option value="streak">Streak</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {topPerformers.map((performer, index) => (
          <div key={performer.id} className="group flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-3xl">{performer.badge}</div>
            <img 
              src={performer.avatarUrl} 
              alt={performer.name} 
              className="w-14 h-14 rounded-full border-4 border-white shadow-lg" 
            />
            <div className="flex-grow">
              <div className="font-bold text-gray-800 mb-1">{performer.name}</div>
              <div className="text-sm text-gray-600 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  {performer.challengesJoined?.length || 0} challenges
                </span>
                <span className="flex items-center gap-1">
                  <LocationIcon className="w-3 h-3" />
                  {performer.restaurantsVisited?.length || 0} visits
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-red-600">
                {metric === 'points' ? performer.totalPoints.toLocaleString() : 
                 metric === 'level' ? `L${performer.level}` : 
                 `${performer.streak} days`}
              </div>
              <div className="text-xs text-gray-500">
                {metric === 'points' ? 'points' : metric}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </div>
        ))}
      </div>
    </Card>
  );
};

// Main Dashboard Component
const FriendsCompetitionDashboard = () => {
	const [selectedFriend, setSelectedFriend] = useState(null);
	const currentUser = MOCK_USER;
	const friends = MOCK_FRIENDS_WITH_ACTIVITY;
  
	const handleSelectFriend = (friendId) => {
	  const friend = friends.find(f => f.id === friendId);
	  setSelectedFriend(friend);
	  console.log('Selected friend:', friend);
	};
  
	return (
	  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
		<div className="max-w-7xl mx-auto px-6 py-8">
		  {/* Header */}
		  <div className="mb-8">
			<div className="flex items-center gap-4 mb-4">
			  <div className="p-3 bg-red-600 rounded-2xl shadow-lg">
				<Users className="w-8 h-8 text-white" />
			  </div>
			  <div>
				<h1 className="text-4xl font-bold text-gray-800 mb-2">Friends Competition</h1>
				<p className="text-gray-600 text-lg">Track progress, compete with friends, and climb the leaderboard!</p>
			  </div>
			</div>
			
			{/* Quick Actions */}
			<div className="flex flex-wrap gap-3">
			  <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
				<Users className="w-4 h-4" />
				Invite Friends
			  </button>
			  <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
				<Target className="w-4 h-4" />
				Join Challenge
			  </button>
			  <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-red-200 hover:text-red-600 transition-all flex items-center gap-2">
				<Gift className="w-4 h-4" />
				View Rewards
			  </button>
			</div>
		  </div>
  
		  {/* Statistics Overview */}
		  <StatisticsOverview currentUser={currentUser} friends={friends} />
  
		  {/* Main Content Grid */}
		  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
			{/* Leaderboard - Takes 2 columns */}
			<div className="xl:col-span-2">
			  <EnhancedLeaderboard 
				currentUser={currentUser} 
				friends={friends} 
				onSelectFriend={handleSelectFriend}
			  />
			</div>
			
			{/* Top Performers - Takes 1 column */}
			<div>
			  <TopPerformers friends={friends} />
			</div>
		  </div>
  
		  {/* Recent Activity - Full width */}
		  <RecentActivity friends={friends} />
		  
		  {/* Additional Features */}
		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
			{/* Weekly Challenge Progress */}
			<Card className="p-6">
			  <div className="flex items-center justify-between mb-6">
				<div>
				  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
					<div className="p-2 bg-red-100 rounded-xl">
					  <Target className="w-5 h-5 text-red-600" />
					</div>
					Weekly Challenge
				  </h3>
				  <p className="text-gray-600 text-sm">Food Explorer Challenge</p>
				</div>
				<div className="text-right">
				  <div className="text-2xl font-bold text-red-600">7/10</div>
				  <div className="text-xs text-gray-500">POIs visited</div>
				</div>
			  </div>
			  
			  <div className="mb-4">
				<div className="flex justify-between text-sm text-gray-600 mb-2">
				  <span>Progress</span>
				  <span>70% complete</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-3">
				  <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{width: '70%'}}></div>
				</div>
			  </div>
			  
			  <div className="text-sm text-gray-600">
				<p className="mb-2">Visit 3 more restaurants to complete the challenge and earn <span className="font-semibold text-red-600">500 bonus points</span>!</p>
				<p className="text-xs">Ends in 3 days</p>
			  </div>
			</Card>
			
			{/* Friend Suggestions */}
			<Card className="p-6">
			  <div className="mb-6">
				<h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
				  <div className="p-2 bg-red-100 rounded-xl">
					<Users className="w-5 h-5 text-red-600" />
				  </div>
				  Suggested Friends
				</h3>
				<p className="text-gray-600 text-sm">People you might know</p>
			  </div>
			  
			  <div className="space-y-3">
				{[
				  { name: "Alex Thompson", mutualFriends: 3, points: 1850 },
				  { name: "Lisa Park", mutualFriends: 2, points: 2100 },
				  { name: "David Kim", mutualFriends: 5, points: 1750 }
				].map((suggestion, index) => (
				  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
					<img 
					  src={`https://i.pravatar.cc/150?u=${suggestion.name}`} 
					  alt={suggestion.name}
					  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
					/>
					<div className="flex-grow">
					  <div className="font-semibold text-gray-800">{suggestion.name}</div>
					  <div className="text-xs text-gray-500">{suggestion.mutualFriends} mutual friends • {suggestion.points} pts</div>
					</div>
					<button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
					  Add
					</button>
				  </div>
				))}
			  </div>
			</Card>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default FriendsCompetitionDashboard; 