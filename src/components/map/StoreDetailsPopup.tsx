// src/components/map/StoreDetailsPopup.tsx

import { Popup } from 'react-leaflet';
import { useState } from 'react';
import type { PointOfInterest } from '../../types';
import Slideover from '../common/Slideover';
import StoreDetailSlideoverContent from './StoreDetailSlideoverContent'; // New component for slideover content

interface StoreDetailsPopupProps {
  poi: PointOfInterest;
}

const StoreDetailsPopup = ({ poi }: StoreDetailsPopupProps) => {
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(false);

  const handleViewDetailsClick = () => {
    setIsSlideoverOpen(true);
  };

  const handleCloseSlideover = () => {
    setIsSlideoverOpen(false);
  };

  return (
    <Popup>
      <div className="p-1">
        <h3 className="font-bold text-lg text-gray-800">{poi.name}</h3>
        <p className="text-sm text-indigo-600 font-semibold my-2">{poi.voucher.title}</p>
        <p className="text-xs text-gray-600 mb-3">{poi.voucher.description}</p>
        <button
          className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={handleViewDetailsClick}
        >
          View Details
        </button>
      </div>

      <Slideover
        isOpen={isSlideoverOpen}
        onClose={handleCloseSlideover}
        title={poi.name}
      >
        <StoreDetailSlideoverContent poi={poi} />
      </Slideover>
    </Popup>
  );
};

export default StoreDetailsPopup;
