import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/friends';
import { Award, Trophy, MapPin, Star, MessageSquare, Flame } from 'lucide-react';
import Card from '../components/common/Card';
import FlavorProfileChart from '../components/dashboard/FlavorProfileChart';
import { MOCK_POIs } from '../data/mockPoisData';
import { MOCK_CHALLENGES } from '../data/challenges';

interface FriendProfileProps {
  friendId: string;
}

// A new component for a cleaner layout
const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50/80 rounded-xl space-y-2 border border-gray-200/60">
        {icon}
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
);

const FriendProfile = ({ friendId }: FriendProfileProps) => {
  const friend = MOCK_FRIENDS_WITH_ACTIVITY.find(f => f.id === friendId);

  if (!friend) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Friend not found.</h2>
        <p className="text-gray-500 mt-4">Please select a valid friend.</p>
      </div>
    );
  }

  // Helper to get full POI details from an ID
  const getPoiDetails = (poiId: string) => MOCK_POIs.find(p => p.id === poiId);
  const getChallengeDetails = (challengeId: string) => MOCK_CHALLENGES.find(c => c.id === challengeId);

  return (
    <div className="space-y-8 p-4 bg-gray-50/50 rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80">
        <img
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          src={friend.avatarUrl}
          alt={friend.name}
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{friend.name}</h1>
          <div className="mt-2 flex items-center space-x-2 text-2xl text-amber-500">
            <Award className="w-8 h-8" />
            <span className="font-semibold">{friend.totalPoints.toLocaleString()} Points</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Trophy className="w-8 h-8 text-indigo-500" />} label="Challenges Won" value={friend.challengesJoined.length} />
        <StatCard icon={<MapPin className="w-8 h-8 text-rose-500" />} label="Restaurants Visited" value={friend.restaurantsVisited.length} />
        <StatCard icon={<MessageSquare className="w-8 h-8 text-teal-500" />} label="Reviews Written" value={friend.restaurantsVisited.filter(r => r.review).length} />
        <StatCard icon={<Flame className="w-8 h-8 text-red-500" />} label="Highest Score" value="N/A" />
      </div>

      {/* Flavor Profile */}
      <Card>
        <FlavorProfileChart metrics={friend.flavorProfile} />
      </Card>
      
      {/* Challenge History */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Challenge History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friend.challengesJoined.map(challengeId => {
            const challenge = getChallengeDetails(challengeId);
            if (!challenge) return null;
            return (
              <div key={challenge.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200/70 space-x-4">
                <img src={challenge.imageUrl} alt={challenge.name} className="w-20 h-20 rounded-md object-cover"/>
                <div>
                  <h3 className="font-bold text-gray-800">{challenge.name}</h3>
                  <p className="text-sm text-gray-500">{challenge.description}</p>
                  <div className="mt-2 text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full inline-block">+{challenge.points} Points</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Restaurant & Review Feed */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dining History</h2>
        <ul className="space-y-6">
          {friend.restaurantsVisited.map((visit, index) => {
            const poi = getPoiDetails(visit.poiId);
            if (!poi) return null;

            return (
              <li key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200/70">
                <div className="flex space-x-4">
                  <img src={poi.mainImageUrl} alt={poi.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{poi.name}</h3>
                        <p className="text-sm text-gray-500">{poi.type} - {poi.category}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{visit.date}</span>
                    </div>
                    {visit.review && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200/80">
                         <div className="flex items-center space-x-1">
                            {[...Array(visit.review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
                         </div>
                         <p className="text-gray-700 mt-1 italic">"{visit.review.comment}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default FriendProfile;