import { useMemo, useState, useRef, useEffect } from 'react';
import Card from '../common/Card';
import type { StarbucksProgressTrackerProps } from '../../types';
import ReactDOM from 'react-dom';
import type { CarouselBoxProps } from '../../types';
import { MOCK_CAROUSEL_BOX } from '../../data/tcbRewards';

const CarouselBox = ({ title, description, imageURL, isSelected, onClick }: CarouselBoxProps) => (
  <div
    className={`flex-none w-64 h-28 rounded-lg p-3 mr-3 relative overflow-hidden cursor-pointer 
      transition-all duration-200 ease-in-out hover:scale-105
      ${isSelected ? 'border-3 border-green-500 shadow-lg' : 'border border-gray-200'} 
    `}
    onClick={onClick}
  >
    <img 
      src={imageURL} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover rounded-md" 
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex flex-col justify-center items-center text-center text-white">
      <h3 className="text-sm font-bold mb-1">{title}</h3>
      <p className="text-xs opacity-90">{description}</p>
    </div>
  </div>
);

/**
 * A compact component that displays a progress bar inspired by the Starbucks Rewards UI.
 * Redesigned to take up less vertical space while maintaining functionality.
 */
const StarbucksProgressTracker = ({ starBalance, tiers }: StarbucksProgressTrackerProps) => {
  const maxTier = useMemo(() => Math.max(...tiers), [tiers]);
  const progressPercentage = Math.min((starBalance / maxTier) * 100, 100);

  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState<CarouselBoxProps[]>([]);

  const detailsButtonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const calculatePosition = () => {
      if (showDetailsPopup && detailsButtonRef.current) {
        const rect = detailsButtonRef.current.getBoundingClientRect();
        setPopupPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.right - 256,
        });
      }
    };
    calculatePosition();
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);
    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [showDetailsPopup]);

  const nextTierValue = useMemo(() => {
    const sortedTiers = [...tiers].sort((a, b) => a - b);
    for (const tier of sortedTiers) {
      if (starBalance < tier) {
        return tier;
      }
    }
    return null;
  }, [starBalance, tiers]);

  const starsToNextTier = nextTierValue ? nextTierValue - starBalance : 0;

  return (
    <Card>
      {/* Compact Header Section */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{starBalance}</span>
            <span className="ml-2 text-lg font-semibold text-yellow-600">★ Stars</span>
          </div>
          {/* Active Offers - More compact badges */}
          <div className="flex flex-wrap ml-4 gap-2">
            {selectedOffers.map(offer => (
              <div
                key={offer.id}
                className="px-2 py-1 border border-green-500 bg-green-50 rounded-full text-xs font-medium text-green-700"
              >
                {offer.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Progress Section */}
      <div className="mb-4">
        {/* Progress Bar - Reduced height and margins */}
        <div className="relative h-6 flex items-center mx-2">
          <div className="absolute w-full h-3 bg-gray-200 rounded-full" />
          <div
            className="absolute h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Progress Text - More compact */}
        <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
          <span>
            <span className="font-semibold text-gray-800">{Math.max(0, 2000 - starBalance)}</span> stars to Gold Tier
          </span>
          <button
            ref={detailsButtonRef}
            className="ml-3 px-2 py-1 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setShowDetailsPopup(!showDetailsPopup)}
          >
            Details
          </button>
        </div>
      </div>

      {/* Compact Carousel Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Special Offers</h3>
          <span className="text-sm text-gray-500">{selectedOffers.length} active</span>
        </div>
        
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_CAROUSEL_BOX.map(box => (
            <CarouselBox
              key={box.id}
              {...box}
              isSelected={selectedOffers.some(offer => offer.id === box.id)}
              onClick={() => {
                setSelectedOffers(prevSelectedOffers => {
                  if (prevSelectedOffers.some(offer => offer.id === box.id)) {
                    return prevSelectedOffers.filter(offer => offer.id !== box.id);
                  } else {
                    return [...prevSelectedOffers, box];
                  }
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Details Popup - Unchanged functionality */}
      {showDetailsPopup && ReactDOM.createPortal(
        <div
          className="absolute bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 w-64"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <p className="text-sm font-semibold text-gray-800 mb-2">Current Tier Rewards</p>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
            <li>Free birthday drink at any vendor</li>
            <li>Double star days every month</li>
            <li>Personalized offers on your birthday</li>
            <li>Early access to new products</li>
            <li>Exclusive merchandise discounts</li>
            <li>Bonus stars every week</li>
            <li>Early access to special events</li>
          </ul>
        </div>,
        document.body
      )}
    </Card>
  );
};

export default StarbucksProgressTracker;