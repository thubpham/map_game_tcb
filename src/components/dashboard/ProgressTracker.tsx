import Card from '../common/Card';

interface ProgressTrackerProps {
  currentPoints: number;
  pointsToNextTier: number;
  currentTier: string;
  nextTier: string;
}

const ProgressTracker = ({ currentPoints, pointsToNextTier, currentTier, nextTier }: ProgressTrackerProps) => {
  const progressPercentage = (currentPoints / pointsToNextTier) * 100;

  return (
    <Card>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your Progress</h2>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-semibold text-gray-600">{currentTier} Tier</span>
            <span className="text-sm font-semibold text-indigo-600">{nextTier} Tier</span>
        </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-gray-600 mt-2">
        {currentPoints.toLocaleString()} / {pointsToNextTier.toLocaleString()} points to reach {nextTier}
      </p>
    </Card>
  );
};

export default ProgressTracker;