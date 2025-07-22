import { Utensils, Coffee, Gem, XCircle, LocateFixed, Loader } from 'lucide-react';
import type { Challenge, PointOfInterest } from '../../types';
import ChallengeCarousel from './ChallengeCarousel';

type Category = PointOfInterest['category'];

interface ChallengeSectionProps {
  challenges: Challenge[];
  selectedChallengeCategory: Category | null;
  onChallengeCategoryChange: (category: Category) => void;
  selectedChallengeId: string | null;
  onChallengeSelect: (challengeId: string) => void;
  onCenterMeClick: () => void; // New properties for center me button
  isLocating: boolean;
}

const CHALLENGE_CATEGORIES: Category[] = ['Food', 'Drink', 'Service'];

const categoryIcons: Record<Category, React.ReactElement> = {
  Food: <Utensils className="w-5 h-5 mr-2" />,
  Drink: <Coffee className="w-5 h-5 mr-2" />,
  Service: <Gem className="w-5 h-5 mr-2" />,
};

const ChallengeSection = ({
  challenges,
  selectedChallengeCategory,
  onChallengeCategoryChange,
  selectedChallengeId,
  onChallengeSelect,
  onCenterMeClick,
  isLocating,
}: ChallengeSectionProps) => {
  const filteredChallenges = challenges.filter(
    (challenge) =>
      selectedChallengeCategory === null || challenge.category === selectedChallengeCategory
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Active Challenges</h2>
        <div className="flex items-center gap-2"> 
            {/* "Clear Challenge" button appears only when a specific challenge is selected */}
            {selectedChallengeId && (
            <button
                onClick={() => onChallengeSelect('')} // Deselects the current challenge
                className="flex items-center text-red-600 hover:text-red-800 text-sm font-semibold transition-colors"
            >
                <XCircle className="w-4 h-4 mr-1" /> Clear Challenge
            </button>
            )}

            <button 
                onClick={onCenterMeClick}
                disabled={isLocating}
                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
            >
                {isLocating ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <LocateFixed className="w-4 h-4 mr-2" />}
                {isLocating ? 'Locating...' : 'Center Map'}
            </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Select a category to find challenges or click on a challenge to see participating stores.
      </p>

      {/* Layer 1: Challenge Category Selection Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {CHALLENGE_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onChallengeCategoryChange(category)}
            className={`flex items-center px-5 py-2 text-base font-semibold rounded-full border-2 transition-colors duration-200 ease-in-out
              ${selectedChallengeCategory === category
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' // Active state styling
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' // Inactive state styling
              }
            `}
          >
            {categoryIcons[category]}
            {category}
          </button>
        ))}
      </div>

      {/* Layer 2: Challenge Carousel - conditionally rendered based on category selection */}
      {selectedChallengeCategory && (
        <div className="mt-6">
          <ChallengeCarousel
            challenges={filteredChallenges} // Only show challenges for the selected category
            selectedChallengeId={selectedChallengeId}
            onChallengeSelect={onChallengeSelect}
          />
        </div>
      )}
      {/* Message displayed when no challenge category is selected */}
      {!selectedChallengeCategory && (
        <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
          Select a category for challenges.
        </div>
      )}
    </div>
  );
};

export default ChallengeSection