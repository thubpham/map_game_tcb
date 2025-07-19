import type { Challenge, PointOfInterest } from '../../types';
import { MapPin, Star, Award } from 'lucide-react';
import React from 'react'; // Import React if not already present in the original file

// Helper to render stars for difficulty
const DifficultyStars = ({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) => {
  const numStars = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
  return (
    <div className="flex items-center">
      {[...Array(3)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < numStars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

interface ChallengeDetailSlideoverProps {
  challenge: Challenge;
}

const ChallengeDetailSlideover: React.FC<ChallengeDetailSlideoverProps> = ({ challenge }) => {
  const mockChallenge = {
    ...challenge,
    points: challenge.points || 500, // Example default
    difficulty: challenge.difficulty || 'medium', // Example default
    pois: challenge.pois || [], // Example default
  };

  return (
    <div className="p-4">
      <img src={mockChallenge.imageUrl} alt={mockChallenge.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{mockChallenge.name}</h3>
      <p className="text-sm font-semibold text-indigo-600 mb-3">{mockChallenge.category}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <Award className="w-5 h-5 text-amber-500 mr-1" />
          <span className="font-medium">{mockChallenge.points} Points</span>
        </div>
        <DifficultyStars difficulty={mockChallenge.difficulty as 'easy' | 'medium' | 'hard'} />
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{mockChallenge.description}</p>

      {mockChallenge.pois && mockChallenge.pois.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Points of Interest:</h4>
          <ul className="space-y-2">
            {mockChallenge.pois.map((poi: PointOfInterest) => (
              <li key={poi.id} className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" />
                <span>{poi.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200">
        Start Challenge
      </button>
    </div>
  );
};

export default ChallengeDetailSlideover;
