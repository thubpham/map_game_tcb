import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      {children}
    </main>
  );
};

export default PageWrapper;