import type { Challenge, PointOfInterest } from '../../types';
import { MapPin, Star, Award, Share2, Clock } from 'lucide-react';
import React from 'react'; // Import React if not already present in the original file
import { useNavigate } from 'react-router-dom';
import { useChallengeStore } from '../../store/challengeStore';

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
  const navigate = useNavigate();
  const { setActiveChallenge } = useChallengeStore();

  const mockChallenge = {
    ...challenge,
    points: challenge.points || 500, // Example default
    difficulty: challenge.difficulty || 'medium', // Example default
    pois: challenge.pois || [], // Example default
  };

  return (
    <div className="p-4 relative overflow-hidden">
      {/* Image with subtle overlay */}
      <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden shadow-lg">
        <img src={mockChallenge.imageUrl} alt={mockChallenge.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">{mockChallenge.name}</h3>
          <p className="text-sm font-semibold text-indigo-300">{mockChallenge.category}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <Award className="w-5 h-5 text-amber-500 mr-1" />
          <span className="font-medium">{mockChallenge.points} Points</span>
        </div>
        <DifficultyStars difficulty={mockChallenge.difficulty as 'easy' | 'medium' | 'hard'} />
      </div>

      {/* Time Limit / Urgency */}
      <div className="flex items-center text-gray-600 mb-4 bg-gray-100 p-2 rounded-md">
        <Clock className="w-4 h-4 text-blue-500 mr-2" />
        <span className="text-sm font-medium">Time Limit: 3 weeks</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{mockChallenge.description}</p>

      {/* Placeholder for progress/competition */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg shadow-inner">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Your Progress:</h4>
        <div className="w-full bg-blue-200 rounded-full h-3 dark:bg-blue-700">
          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '45%' }}></div> {/* Example progress */}
        </div>
        <p className="text-sm text-blue-600 mt-2 font-medium">45% Completed (Demo)</p>
      </div>

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

      <div className="flex space-x-4 mt-6">
        <button
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200"
          onClick={() => {
            setActiveChallenge(mockChallenge.id);
            navigate('/map');
          }}
        >
          Start Challenge
        </button>
        <button
          className="flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors duration-200"
          onClick={() => alert('Share Challenge!')} // Placeholder for share functionality
        >
          <Share2 className="w-5 h-5 mr-2" /> Share
        </button>
      </div>
    </div>
  );
};

export default ChallengeDetailSlideover;
