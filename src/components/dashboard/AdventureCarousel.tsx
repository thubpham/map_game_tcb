import type { Challenge } from '../../types';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useRef, useState } from 'react';
import Slideover from '../common/Slideover';
import ChallengeDetailSlideover from './ChallengeDetailSlideover';
import { calculateTimeLeft } from '../../utils/timeUtils';

interface AdventureCarouselProps {
  challenges: Challenge[];
}

const AdventureCarousel = ({ challenges }: AdventureCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust as needed
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const openSlideover = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsSlideoverOpen(true);
  };

  const closeSlideover = () => {
    setIsSlideoverOpen(false);
    setSelectedChallenge(null);
  };

  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What's your next adventure?</h2>
        <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide" ref={carouselRef}>
            {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex-shrink-0 w-80 h-52 relative rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => openSlideover(challenge)}
                >
                  <img src={challenge.imageUrl} alt={challenge.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-xl font-bold">{challenge.name}</h3>
                  </div>
                  {challenge.expiresAt && (
                    <div className="absolute top-4 left-4 bg-red-600/80 px-3 py-1 rounded-full shadow-lg flex items-center">
                      <Clock className="w-4 h-4 text-white mr-1" />
                      <span className="text-white text-xs font-bold uppercase">
                        {calculateTimeLeft(challenge.expiresAt)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-white w-5 h-5"/>
                  </div>
                </div>
            ))}
            </div>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/70 transition-colors z-10"
              aria-label="Scroll left"
            >
              <ArrowLeft className="text-gray-800 w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/70 transition-colors z-10"
              aria-label="Scroll right"
            >
              <ArrowRight className="text-gray-800 w-6 h-6" />
            </button>
        </div>

        {selectedChallenge && (
          <Slideover
            isOpen={isSlideoverOpen}
            onClose={closeSlideover}
            title={selectedChallenge.name}
          >
            <ChallengeDetailSlideover challenge={selectedChallenge} />
          </Slideover>
        )}
    </div>
  );
};

export default AdventureCarousel