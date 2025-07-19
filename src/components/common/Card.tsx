import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;