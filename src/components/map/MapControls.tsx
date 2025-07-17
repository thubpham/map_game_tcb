// src/components/map/MapControls.tsx
import { Utensils, Coffee, Gem, LocateFixed, Loader } from 'lucide-react';
import { PointOfInterest } from '../../types';

type Category = PointOfInterest['category'];

interface MapControlsProps {
  categories: Category[];
  selectedCategories: Category[];
  onCategoryChange: (category: Category) => void;
  onCenterMeClick: () => void;
  isLocating: boolean;
}

const categoryIcons: Record<Category, React.ReactElement> = {
    Food: <Utensils className="w-5 h-5 mr-2" />,
    Drink: <Coffee className="w-5 h-5 mr-2" />,
    Service: <Gem className="w-5 h-5 mr-2" />,
};

const MapControls = ({ categories, selectedCategories, onCategoryChange, onCenterMeClick, isLocating }: MapControlsProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
            <p className="font-semibold text-gray-700">Filter by:</p>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                        selectedCategories.includes(category)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                    }`}
                >
                    {categoryIcons[category]}
                    {category}
                </button>
            ))}
        </div>
        <button 
            onClick={onCenterMeClick}
            disabled={isLocating}
            className="flex items-center px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
        >
            {isLocating ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <LocateFixed className="w-5 h-5 mr-2" />}
            {isLocating ? 'Locating...' : 'Center on Me'}
        </button>
    </div>
  );
};

export default MapControls;