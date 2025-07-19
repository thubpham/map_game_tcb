import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-gray-800 p-8">
      <div className="container mx-auto flex items-center">
        <img
          src="https://brandlogos.net/wp-content/uploads/2023/09/techcombank-logo_brandlogos.net_1dcg9.png" // Placeholder for a profile picture or logo
          alt="myJournal Logo"
          className="h-8 mr-2"
        />
        <h1 className="text-2xl font-bold">
          <span className="text-black">Challenge</span>{' '}
          <span className="text-red-600">Club</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
