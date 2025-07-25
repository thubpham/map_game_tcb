import { useState, useMemo } from 'react';
import { 
  Trophy, Users, Target, Crown, ChevronRight, UserPlus, Award, 
  Star, MapPin, Calendar
} from 'lucide-react';
import Card from '../components/common/Card';

// Using the actual mock data structure from your files
const MOCK_USER = {
  id: 'user-barbie',
  name: 'Barbie',
  points: 1500,
  currentTier: 'Bronze',
  nextTier: 'Gold',
  pointsToNextTier: 2000,
};

const MOCK_FRIENDS_WITH_ACTIVITY = [
  {
    id: 'friend-1',
    name: 'Alice',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-woman-mia-avatar-600nw-2127358541.jpg',
    totalPoints: 1250,
    challengesJoined: ['challenge-3', 'challenge-5'],
    restaurantsVisited: [
      {
        poiId: 'poi-11',
        date: '2024-07-18',
        review: { rating: 5, comment: 'Absolutely legendary Phở. The broth was rich and flavorful. A must-visit!' },
      },
      {
        poiId: 'poi-12',
        date: '2024-07-16', 
        review: { rating: 5, comment: 'The egg coffee here is a revelation! So creamy and delicious.' },
      }
    ],
    recentCompletions: [
      { type: 'challenge', name: 'Authentic Vietnamese Eats' },
      { type: 'poi', name: 'Phở Thìn' },
    ],
    mutualFriends: 5,
    mutualFriendNames: ['David', 'Emily', 'Frank', 'Grace', 'Henry'],
  },
  {
    id: 'friend-2',
    name: 'Bob',
    avatarUrl: 'https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg',
    totalPoints: 980,
    challengesJoined: ['challenge-2', 'challenge-8'],
    restaurantsVisited: [
        {
            poiId: 'poi-3',
            date: '2024-07-12',
            review: { rating: 5, comment: 'Best pizza I\'ve had in a long time. Authentic taste and great service.' }
        }
    ],
    recentCompletions: [
      { type: 'challenge', name: 'Pizza & Italian Delights' },
      { type: 'poi', name: 'Pizzeria Roma' },
    ],
    mutualFriends: 3,
    mutualFriendNames: ['Ivy', 'Jack', 'Karen'],
  },
  {
    id: 'friend-3',
    name: 'Charlie',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-african-man-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-883.jpg',
    totalPoints: 2100,
    challengesJoined: ['challenge-1', 'challenge-4', 'challenge-9'],
    restaurantsVisited: [
        {
            poiId: 'poi-5',
            date: '2024-07-20',
            review: { rating: 4, comment: 'Really fresh and high-quality sushi. The sashimi platter was excellent.' }
        }
    ],
    recentCompletions: [
      { type: 'poi', name: 'Sushi Nhan' },
      { type: 'challenge', name: 'Hanoi Burger Blitz' },
    ],
    mutualFriends: 8,
    mutualFriendNames: ['Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam'],
  },
  {
    id: 'friend-4',
    name: 'Diana',
    avatarUrl: 'https://img.freepik.com/premium-vector/young-smiling-woman-ann-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-738.jpg?semt=ais_hybrid&w=740',
    totalPoints: 1500,
    challengesJoined: ['challenge-7', 'challenge-10'],
    restaurantsVisited: [
        {
            poiId: 'poi-8',
            date: '2024-07-19',
            review: { rating: 5, comment: 'The perfect boost after a workout. Love their green smoothie!' }
        }
    ],
    recentCompletions: [
        { type: 'poi', name: 'Juice Bar Express' },
        { type: 'challenge', name: 'Local Services & Tailoring' },
    ],
    mutualFriends: 2,
    mutualFriendNames: ['Tom', 'Uma'],
  }
];

const FriendsCompetitionDashboard = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Chain of Thought: Create ranking logic using actual data
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

  // Chain of Thought: Calculate user's rank and stats
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

  const handleSelectFriend = (friendId) => {
    const friend = MOCK_FRIENDS_WITH_ACTIVITY.find(f => f.id === friendId);
    setSelectedFriend(friend);
    console.log('Selected friend:', friend);
  };

  // Chain of Thought: Get rank display icon matching Dashboard style
  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Chain of Thought: Header matching Dashboard UserProfile style */}
      <div className="mb-8 pt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends Competition</h1>
              <p className="text-gray-600">See how you stack up against your friends!</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Friends
              </button>
            </div>
          </div>

          {/* Chain of Thought: User stats overview using Dashboard card style */}
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

      {/* Chain of Thought: Two-column layout - Leaderboard and Discover More Friends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* Chain of Thought: Left column - Leaderboard (takes 2/3 width) */}
        <Card className="lg:col-span-2 flex flex-row p-3 h-full">
          {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"> */}
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
                  className={`flex items-center gap-4 p-6 rounded-xl transition-all cursor-pointer ${
                    player.isCurrentUser
                      ? 'bg-blue-50 border-2 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {/* Chain of Thought: Rank indicator */}
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Chain of Thought: Avatar */}
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

                  {/* Chain of Thought: Player info using available data */}
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

                  {/* Chain of Thought: Points display */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {player.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>

                  {!player.isCurrentUser && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          {/* </div> */}
        </Card>

        {/* Chain of Thought: Right column - Discover More Friends (takes 1/3 width, top 5 suggestions) */}
        <Card className="lg:col-span-1 flex flex-row p-3 h-full">
          {/* <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"> */}
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
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Chain of Thought: View all link */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Suggestions
              </button>
            </div>
          {/* </div> */}
        </Card>
      </div>
    </div>
  );
};

export default FriendsCompetitionDashboard;