import type { Suggestion } from '../../types';
import { ArrowRight } from 'lucide-react';

interface SuggestionCarouselProps {
  suggestions: Suggestion[];
}

const SuggestionCarousel = ({ suggestions }: SuggestionCarouselProps) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What's your next adventure?</h2>
        <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex-shrink-0 w-80 h-52 relative rounded-xl shadow-lg overflow-hidden cursor-pointer group">
                  <img src={suggestion.imageUrl} alt={suggestion.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-xl font-bold">{suggestion.title}</h3>
                    <p className="text-indigo-200 text-sm mt-1">Discover new places</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-white w-5 h-5"/>
                  </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default SuggestionCarousel