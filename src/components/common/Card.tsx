import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // Add title as an optional prop
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200/80">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;