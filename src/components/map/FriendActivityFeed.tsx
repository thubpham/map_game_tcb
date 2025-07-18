import type { Friend } from '../../types';
import FriendActivityCard from './FriendActivityCard';

interface FriendActivityFeedProps {
  friends: Friend[];
}

const FriendActivityFeed = ({ friends }: FriendActivityFeedProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect with Friends</h2>
      {/* The 'scrollbar-hide' class is applied here */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {friends.map(friend => (
          <FriendActivityCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendActivityFeed;