import { Suggestion } from '../../types';

interface SuggestionCarouselProps {
  suggestions: Suggestion[];
}

const SuggestionCarousel = ({ suggestions }: SuggestionCarouselProps) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What to do today?</h2>
        <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex-shrink-0 w-72 h-48 relative rounded-xl shadow-lg overflow-hidden cursor-pointer group">
                <img src={suggestion.imageUrl} alt={suggestion.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{suggestion.title}</h3>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default SuggestionCarousel;