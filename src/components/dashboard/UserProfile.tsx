import { User } from '../../types';
import { Award } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.name}!</h1>
      <div className="mt-4 flex items-center justify-center space-x-2 text-2xl text-amber-500">
        <Award className="w-8 h-8" />
        <span className="font-semibold">{user.points.toLocaleString()} Points</span>
      </div>
    </div>
  );
};

export default UserProfile;