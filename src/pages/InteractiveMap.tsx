// src/pages/InteractiveMap.tsx

import { useState, useMemo } from 'react';
import MapContainer from '../components/map/MapContainer';
import MapControls from '../components/map/MapControls';
import { MOCK_POIs } from '../data/mock';
import { PointOfInterest } from '../types';
import { useGeolocation } from '../hook/useGeolocation';

type Category = PointOfInterest['category'];

const ALL_CATEGORIES: Category[] = ['Food', 'Drink', 'Service'];

const InteractiveMap = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(ALL_CATEGORIES);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const { isLoading, position, getPosition } = useGeolocation();

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleCenterMe = () => {
    getPosition();
  };

  if (position && (mapCenter[0] !== position[0] || mapCenter[1] !== position[1])) {
      setMapCenter(position);
  }

  const filteredPOIs = useMemo(() => {
    return MOCK_POIs.filter(poi => selectedCategories.includes(poi.category));
  }, [selectedCategories]);

  return (
    <div>
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Places to Earn</h1>
            <p className="text-gray-600 mb-6">Filter categories or center the map to discover new places.</p>
        </div>
        <MapControls 
            categories={ALL_CATEGORIES}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onCenterMeClick={handleCenterMe}
            isLocating={isLoading}
        />
        <div className="h-[65vh] w-full rounded-xl shadow-lg overflow-hidden">
            <MapContainer center={mapCenter} pointsOfInterest={filteredPOIs} />
        </div>
    </div>
  );
};

export default InteractiveMap;