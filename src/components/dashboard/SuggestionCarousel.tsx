//// src/components/dashboard/SuggestionCarousel.tsx

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { PointOfInterest, SuggestionCarouselProps } from '../../types';

const SuggestionCarousel = ({ items, onItemClick, renderItem }: SuggestionCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide" ref={carouselRef}>
        {items.map((item) => (
          <div key={item.id} onClick={() => onItemClick(item)}>
            {renderItem(item)}
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
  );
};

export default SuggestionCarousel;
