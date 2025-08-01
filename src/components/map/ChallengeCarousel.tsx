import type { Challenge } from '../../types';
import ChallengeCard from './ChallengeCard';

interface ChallengeCarouselProps {
  challenges: Challenge[];
  selectedChallengeId: string | null;
  onChallengeSelect: (challengeId: string) => void;
}

const ChallengeCarousel = ({ challenges, selectedChallengeId, onChallengeSelect }: ChallengeCarouselProps) => {
  if (challenges.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No challenges available for this category yet.
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-2 space-x-4 hide-scrollbar">
        {challenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isSelected={challenge.id === selectedChallengeId}
            onClick={onChallengeSelect}
          />
        ))}
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ChallengeCarousel;