import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { PointOfInterest } from '../../types';

interface SuggestionCarouselProps {
  items: PointOfInterest[];
  onItemClick: (item: PointOfInterest) => void;
}

const SuggestionCarousel = ({ items, onItemClick }: SuggestionCarouselProps) => {
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
        {items.map((poi, index) => (
          <div
            key={poi.id}
            className="flex-shrink-0 w-64 relative rounded-xl shadow-lg overflow-hidden cursor-pointer group bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm p-5 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-200"
            onClick={() => onItemClick(poi)}
          >
            <img
              src={poi.menu && poi.menu.length > 0 ? poi.menu[0].imageUrl : '/path/to/placeholder.png'}
              alt={poi.name}
              className={`w-24 h-24 object-cover rounded-full mb-3 border-4 ${
                index === 0 ? 'border-yellow-400' : index === 1 ? 'border-green-400' : 'border-red-400'
              } shadow-lg`}
            />
            <h3 className="text-white text-xl font-bold mb-1">{poi.name}</h3>
            {/* Generate a random match percentage >= 70% */}
            <p className="text-sm opacity-80 text-white">
              {Math.floor(Math.random() * 31) + 70}% Match
            </p>
            {/* <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="text-white w-5 h-5"/>
            </div> */}
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
