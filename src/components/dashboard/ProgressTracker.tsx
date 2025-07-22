import { useMemo, useState, useRef, useEffect } from 'react'; // Add useRef and useEffect
import Card from '../common/Card';
import type { StarbucksProgressTrackerProps } from '../../types';
import ReactDOM from 'react-dom'; // Import ReactDOM for createPortal

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

  // 1. Create a ref for the button to get its DOM element and position
  const detailsButtonRef = useRef<HTMLButtonElement>(null);
  // 2. State to store the calculated position of the popup
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // 3. Use useEffect to calculate position when the popup is shown or window resizes/scrolls
  useEffect(() => {
    if (showDetailsPopup && detailsButtonRef.current) {
      const rect = detailsButtonRef.current.getBoundingClientRect();
      setPopupPosition({
        // Position the popup 8px below the button
        top: rect.bottom + window.scrollY + 8,
        // Align the right edge of the popup with the right edge of the button
        // The popup has w-64 which is 256px.
        left: rect.right - 256,
      });
    }
  }, [showDetailsPopup]); // Recalculate when popup visibility changes

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
      {/* Section for displaying the user's current star balance */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-4xl font-bold">{starBalance}</span>
          <span className="ml-1 text-xl font-bold text-yellow-600">★ Star balance</span>
        </div>
        <div className="relative">
          <button
            ref={detailsButtonRef} // 4. Assign the ref to your button
            className="px-6 py-2 border border-gray-400 rounded-full font-semibold text-gray-800 hover:bg-gray-100"
            onClick={() => setShowDetailsPopup(!showDetailsPopup)}
          >
            Details
          </button>
          {/* The popup content is removed from here and will be rendered via a Portal */}
        </div>
      </div>

      {/*
        Container for the progress bar assembly.
        - `mx-4` adds horizontal margin to shorten the progress line.
      */}
      <div className="relative h-10 flex items-center mt-4 mx-4">
        {/* The background track, vertically centered to align with the markers */}
        <div className="absolute w-full h-4 bg-gray-200 rounded-full top-1/2 -translate-y-1/2" />

        {/* The filled (gold) portion of the progress bar */}
        <div
          className="absolute h-4 bg-[#CBAA6C] rounded-full top-1/2 -translate-y-1/2"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Text below the progress bar */}
      <div className="text-center mt-4 text-sm text-gray-600">
        You are <span className="font-bold">{Math.max(0, 2000 - starBalance)}</span> stars from Gold Tier! (Gold Tier starts from 2000 stars)
      </div>

      {/* Action buttons, with increased top margin for better spacing */}
      <div className="flex justify-start items-center mt-12 space-x-3">
      </div>

      {/* 5. Render the popup using ReactDOM.createPortal */}
      {showDetailsPopup && ReactDOM.createPortal(
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64" // Use 'fixed' for viewport positioning, higher z-index
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <p className="text-sm font-semibold text-gray-800 mb-2">Current Tier Rewards</p>
          <ul className="list-disc list-inside text-xs text-gray-600">
            <li>Free birthday drink</li>
            <li>Double star days</li>
            <li>Personalized offers</li>
            <li>Early access to new products</li>
            <li>Exclusive merchandise discounts</li>
            <li>Complimentary food item with purchase</li>
            <li>Bonus stars on select days</li>
            <li>Access to special events</li>
          </ul>
        </div>,
        document.body // Target: render directly into the body element
      )}
    </Card>
  );
};

export default StarbucksProgressTracker;