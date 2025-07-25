import React from 'react';
import Card from '../common/Card';

const SuggestedForYou: React.FC = () => {
  return (
    <Card className="p-3 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Suggested For You</h2>
      <div className="flex flex-col items-center justify-center flex-grow mb-4">
        <img
          src="https://image.bnews.vn/MediaUpload/Medium/2024/11/04/eco-kv-xanh-sm-final-20241104162117.jpg"
          alt="Suggested for You"
          className="w-9/10 h-auto object-cover rounded-lg mb-2"
        />
        <h3 className="2xl font-semibold text-gray-800 mb-2"> Visa Debit Eco Card</h3>
        <p className="text-gray-600 text-center text-lg mb-4">
          Discover Green Living With Techcombank!
        </p>
        <button className="mt-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md border-2 border-amber-600 hover:bg-transparent hover:text-amber-600 active:bg-transparent active:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200">
          Discover Now!
        </button>
      </div>
    </Card>
  );
};

export default SuggestedForYou;