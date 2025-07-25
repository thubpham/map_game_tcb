// src/components/dashboard/Leaderboard.tsx

import { useMemo } from 'react';
import type { User, Friend } from '../../types';
import Card from '../common/Card';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  currentUser: User;
  friends: Friend[];
  onSelectFriend: (friendId: string) => void;
}

const Leaderboard = ({ currentUser, friends, onSelectFriend }: LeaderboardProps) => {
  const rankedList = useMemo(() => {
    const combined = [
      {
        id: currentUser.id,
        name: currentUser.name,
        avatarUrl: `https://i.pravatar.cc/150?u=${currentUser.name}`,
        totalPoints: currentUser.points,
      },
      ...friends,
    ];
    return combined.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [currentUser, friends]);

  const rankIcons = [
    <Trophy key="gold" className="w-6 h-6 text-yellow-500" />,
    <Medal key="silver" className="w-6 h-6 text-slate-400" />,
    <Award key="bronze" className="w-6 h-6 text-amber-700" />,
  ];

  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex-shrink-0">Friend Leaderboard</h2>
      
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-3">
          {rankedList.map((player, index) => {
            const isCurrentUser = player.id === currentUser.id;
            const rank = index + 1;
            return (
              <li key={player.id}>
                <div
                  onClick={() => !isCurrentUser && onSelectFriend(player.id)}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    isCurrentUser
                      ? 'bg-indigo-100 border-2 border-indigo-300 cursor-default'
                      : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  <span className="text-lg font-bold text-gray-500 w-8 flex-shrink-0 text-center">
                    {rank <= 3 ? rankIcons[index] : rank}
                  </span>
                  <img src={player.avatarUrl} alt={player.name} className="w-10 h-10 rounded-full mx-3 flex-shrink-0" />
                  <span className="font-semibold text-gray-800 flex-grow truncate pr-2">
                    {player.name} {isCurrentUser && '(You)'}
                  </span>
                  <span className="font-bold text-indigo-600 flex-shrink-0">
                    {player.totalPoints.toLocaleString()} pts
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default Leaderboard;