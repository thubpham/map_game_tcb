// src/components/map/StoreDetailsPopup.tsx

import { Popup } from 'react-leaflet';
import { PointOfInterest } from '../../types';

interface StoreDetailsPopupProps {
  poi: PointOfInterest;
}

const StoreDetailsPopup = ({ poi }: StoreDetailsPopupProps) => {
  return (
    <Popup>
      <div className="p-1">
        <h3 className="font-bold text-lg text-gray-800">{poi.name}</h3>
        <p className="text-sm text-indigo-600 font-semibold my-2">{poi.voucher.title}</p>
        <p className="text-xs text-gray-600 mb-3">{poi.voucher.description}</p>
        <button className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          View Details
        </button>
      </div>
    </Popup>
  );
};

export default StoreDetailsPopup;