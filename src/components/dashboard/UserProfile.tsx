import type { User } from '../../types';
import { Award } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 pt-2 md:flex-row md:items-start md:space-x-6 md:space-y-0">
      <div className="relative">
        <img
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          src={`https://i.pravatar.cc/150?u=${user.name}`} // Using a placeholder for avatar
          alt={user.name}
        />
        <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2 text-white">
          <Award className="w-5 h-5" />
        </div>
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
        <p className="text-lg sm:text-xl text-gray-500 mt-1">You're in <span className="font-semibold text-indigo-600">{user.currentTier}</span> rank.</p>
      </div>
    </div>
  );
};

export default UserProfile;
