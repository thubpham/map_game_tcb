import type { Activity } from '../../types';
import Card from '../common/Card';
import { CheckCircle } from 'lucide-react';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Your Latest Achievements</h2>
      <ul className="space-y-4">
        {activities.map(activity => (
          <li key={activity.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">{activity.storeName}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-green-500">+{activity.points} pts</p>
                <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity;