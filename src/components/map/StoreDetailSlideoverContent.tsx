// src/components/map/StoreDetailSlideoverContent.tsx
import type { PointOfInterest } from '../../types';

interface StoreDetailSlideoverContentProps {
  poi: PointOfInterest;
}

const StoreDetailSlideoverContent = ({ poi }: StoreDetailSlideoverContentProps) => {
  return (
    <div className="space-y-6 pb-10">
      {/* Promotion Details Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Special Promotion!</h2>
        <h3 className="text-xl font-semibold mb-3">{poi.voucher.title}</h3>
        <p className="text-lg mb-4">{poi.voucher.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Expires: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          <span className="bg-white text-indigo-700 px-3 py-1 rounded-full font-bold">
            Save {poi.voucher.discount}%
          </span>
        </div>
      </section>

      {/* Store Introduction Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {poi.name}</h2>
        <p className="text-gray-700 mb-4">
          {poi.name} is a beloved local spot known for its {poi.type.toLowerCase()} and vibrant atmosphere.
          We pride ourselves on using fresh, high-quality ingredients to create memorable experiences for our customers.
        </p>

        {/* Menu Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Menu Highlights</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {poi.menu.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={item.imageUrl} alt={item.item} className="rounded-lg shadow-md w-full h-32 object-cover mb-2" />
              <span className="font-medium text-gray-700">{item.item}</span>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Reviews</h3>
        <div className="space-y-4 mb-4">
          {poi.reviews.map((review, index) => (
            <div key={index} className="border-t border-gray-200 pt-4">
              <div className="flex items-center mb-1">
                <span className="font-semibold text-indigo-600">Anonymous User</span> {/* Changed to Anonymous User */}
                <span className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
              <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="text-gray-700">
          <p><span className="font-semibold">Pricing:</span> {'$'.repeat(poi.pricing)}{' '}</p>
        </div>
      </section>
    </div>
  );
};

export default StoreDetailSlideoverContent;
