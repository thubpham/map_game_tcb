import { useParams } from 'react-router-dom';
import { MOCK_FRIENDS_WITH_ACTIVITY } from '../data/mock';
import { ArrowLeft, Award, Trophy, MapPin } from 'lucide-react';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';

const FriendProfile = () => {
  const { friendId } = useParams<{ friendId: string }>();
  const friend = MOCK_FRIENDS_WITH_ACTIVITY.find(f => f.id === friendId);

  if (!friend) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Friend not found.</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const iconMap = {
    challenge: <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    poi: <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />,
  };

  return (
    <div className="space-y-6">
       <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600 font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
        </Link>
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

      {/* Recent Activity Card */}
      <Card>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Achievements</h2>
        <ul className="space-y-3">
          {friend.recentCompletions.length > 0 ? (
            friend.recentCompletions.map((completion, index) => (
              <li key={index} className="flex items-center text-gray-700 p-3 bg-gray-50 rounded-lg">
                {iconMap[completion.type]}
                <span className="ml-3 font-medium">{completion.name}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recent activity to show.</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default FriendProfile;