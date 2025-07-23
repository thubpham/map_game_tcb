import { useMemo, useState, useRef, useEffect } from 'react';
import Card from '../common/Card';
import type { StarbucksProgressTrackerProps } from '../../types';
import ReactDOM from 'react-dom';
import type { CarouselBoxProps } from '../../types'; // Import CarouselBoxProps
import { MOCK_CAROUSEL_BOX } from '../../data/tcbRewards';

const CarouselBox = ({ title, description, imageURL, isSelected, onClick }: CarouselBoxProps) => (
  <div
    className={`flex-none w-80 h-40 rounded-xl p-4 mr-4 relative overflow-hidden cursor-pointer 
      transition-all duration-200 ease-in-out 
      ${isSelected ? 'border-4 border-green-500' : ''} 
    `}
    onClick={onClick}
  >
    <img 
      src={imageURL} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover rounded-lg" 
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center text-center text-white">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

/**
 * A component that displays a progress bar inspired by the Starbucks Rewards UI.
 * It shows a user's progress through multiple reward tiers with a live indicator.
 */
const StarbucksProgressTracker = ({ starBalance, tiers }: StarbucksProgressTrackerProps) => {
  // To correctly position elements, we find the highest tier value to serve as our 100% mark.
  const maxTier = useMemo(() => Math.max(...tiers), [tiers]);

  // Calculate the user's progress as a percentage, capping it at 100%.
  const progressPercentage = Math.min((starBalance / maxTier) * 100, 100);

  const [showRewardsPopup, setShowRewardsPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState<CarouselBoxProps[]>([]);

  // 1. Create a ref for the button to get its DOM element and position
  const detailsButtonRef = useRef<HTMLButtonElement>(null);
  // 2. State to store the calculated position of the popup
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // 3. Use useEffect to calculate position when the popup is shown or window resizes/scrolls
  useEffect(() => {
    const calculatePosition = () => {
      if (showDetailsPopup && detailsButtonRef.current) {
        const rect = detailsButtonRef.current.getBoundingClientRect();
        setPopupPosition({
          // Position the popup 8px below the button.
          // We add window.scrollY to rect.bottom to get a document-relative Y coordinate.
          top: rect.bottom + window.scrollY + 8,
          // Align the right edge of the popup with the right edge of the button.
          // The popup has w-64 which is 256px.
          left: rect.right - 256,
        });
      }
    };
    // Initial calculation
    calculatePosition();
    // Add event listeners for scroll and resize to recalculate position
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);
    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [showDetailsPopup]); // Recalculate when popup visibility changes or relevant dependencies change
  const nextTierValue = useMemo(() => {
    const sortedTiers = [...tiers].sort((a, b) => a - b);
    for (const tier of sortedTiers) {
      if (starBalance < tier) {
        return tier;
      }
    }
    return null; // User has reached or surpassed all defined tiers
  }, [starBalance, tiers]);

  const starsToNextTier = nextTierValue ? nextTierValue - starBalance : 0;

  return (
    <Card>
      {/* Section for displaying the user's current star balance and activated boosters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div>
            <span className="text-4xl font-bold">{starBalance}</span>
            <span className="ml-1 text-xl font-bold text-yellow-600">★ Star balance</span>
          </div>
          {/* Activated Booster Boxes */}
          {selectedOffers.map(offer => (
            <div
              key={offer.id}
              className="ml-4 px-3 py-0.5 border-2 border-green-500 bg-green-200 bg-opacity-30 rounded-full text-sm font-semibold text-green-700"
            >
              {offer.title}
            </div>
          ))}
        </div>
      </div>

      {/*
        Container for the progress bar assembly.
        - `mx-4` adds horizontal margin to shorten the progress line.
      */}
      <div className="relative h-10 flex items-center mt-8 mx-4">
        {/* The background track, vertically centered to align with the markers */}
        <div className="absolute w-full h-4 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />

        {/* The filled (gold) portion of the progress bar */}
        <div
          className="absolute h-4 bg-[#CBAA6C] rounded-full top-1/2 -translate-y-1/2"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Text below the progress bar */}
      <div className="text-center mt-2 text-sm text-gray-600 flex items-center justify-center">

        <h3> You are <span className="font-bold"> {Math.max(0, 2000 - starBalance)}</span> stars from Gold Tier! </h3>
        <button
          ref={detailsButtonRef}
          className="ml-2 px-3 py-1 border border-gray-400 rounded-full font-semibold text-gray-800 text-xs hover:bg-gray-100"
          onClick={() => setShowDetailsPopup(!showDetailsPopup)}
        >
          Details
        </button>
      </div>

      {/* Action buttons, with increased top margin for better spacing */}
      <div className="flex justify-start items-center mt-12 space-x-3">
      </div>

      {/* Carousel Section */}
      <div className="mt-0 mb-8">
        <h2 className="text-xl font-bold mb-4">Special Offers</h2>
        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          {MOCK_CAROUSEL_BOX.map(box => (
            <CarouselBox
              key={box.id}
              {...box}
              isSelected={selectedOffers.some(offer => offer.id === box.id)}
              onClick={() => {
                setSelectedOffers(prevSelectedOffers => {
                  if (prevSelectedOffers.some(offer => offer.id === box.id)) {
                    // If already selected, remove it
                    return prevSelectedOffers.filter(offer => offer.id !== box.id);
                  } else {
                    // If not selected, add it
                    return [...prevSelectedOffers, box];
                  }
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Render the popup using ReactDOM.createPortal */}
      {showDetailsPopup && ReactDOM.createPortal(
        <div
          className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <p className="text-sm font-semibold text-gray-800 mb-2">Current Tier Rewards</p>
          <ul className="list-disc list-inside text-xs text-gray-600">
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
