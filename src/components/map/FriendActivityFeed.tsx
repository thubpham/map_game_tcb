import type { Friend } from '../../types';
import FriendActivityCard from './FriendActivityCard';

interface FriendActivityFeedProps {
  friends: Friend[];
  onSelectFriend: (friendId: string) => void; // Add this prop
}

const FriendActivityFeed = ({ friends, onSelectFriend }: FriendActivityFeedProps) => {
  return (
    <div className="mb-8 pt-2">
      <h2 className="text-2xl pl-4 font-bold text-gray-900 mb-4">Connect with Friends</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {friends.map(friend => (
          <div key={friend.id} onClick={() => onSelectFriend(friend.id)}>
            <FriendActivityCard friend={friend} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendActivityFeed;