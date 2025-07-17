// src/components/map/PointOfInterestMarker.tsx

import { Marker } from 'react-leaflet';
import { PointOfInterest } from '../../types';
import { divIcon } from 'leaflet';
import { Utensils, Coffee, Gem } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import StoreDetailsPopup from './StoreDetailsPopup';

interface PointOfInterestMarkerProps {
  poi: PointOfInterest;
}

const categoryIcons = {
    Food: <Utensils className="w-5 h-5 text-white" />,
    Drink: <Coffee className="w-5 h-5 text-white" />,
    Service: <Gem className="w-5 h-5 text-white" />
};

const PointOfInterestMarker = ({ poi }: PointOfInterestMarkerProps) => {
    const iconHtml = renderToString(
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            {categoryIcons[poi.category]}
        </div>
    );

    const customIcon = divIcon({
        html: iconHtml,
        className: 'bg-transparent border-0',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });


  return (
    <Marker position={poi.position} icon={customIcon}>
      <StoreDetailsPopup poi={poi} />
    </Marker>
  );
};

export default PointOfInterestMarker;