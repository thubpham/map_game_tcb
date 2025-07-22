import { useState } from 'react';
import type { Friend } from '../../types';
import { Trophy, MapPin, Award, Check } from 'lucide-react';

interface FriendActivityCardProps {
  friend: Friend;
}

const iconMap = {
  challenge: <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />,
  poi: <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />,
};

const FriendActivityCard = ({ friend }: FriendActivityCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 transition-all hover:shadow-lg w-80 flex-shrink-0">
      {/* Card Header */}
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={friend.avatarUrl}
          alt={friend.name}
          className="w-14 h-14 rounded-full border-2 border-indigo-200"
        />
        <div className="flex-grow">
          <p className="text-lg font-bold text-gray-800">{friend.name}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Award className="w-4 h-4 mr-1.5 text-indigo-500" />
            <span className="font-semibold">{friend.totalPoints.toLocaleString()}</span>
            <span className="ml-1">Total Points</span>
          </div>
        </div>
      </div>

      {/* Mutual Friends */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{friend.mutualFriends}</span> Mutual Friends
          {friend.mutualFriendNames.length > 0}
        </p>
      </div>

      {/* Follow Button */}
      <div className="mb-4">
        <button
          onClick={handleFollowToggle}
          className={`w-full py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-200 ${
            isFollowing
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } flex items-center justify-center`}
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

      {/* Recent Completions */}
      <div>
        <h4 className="font-semibold text-gray-600 mb-2 text-sm">Recent Completions:</h4>
        <ul className="space-y-2 min-h-20">
          {friend.recentCompletions.length > 0 ? (
            friend.recentCompletions.slice(0, 3).map((completion, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                {iconMap[completion.type]}
                <span className="ml-2 truncate">{completion.name}</span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-400">No activity to show this week.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FriendActivityCard;
