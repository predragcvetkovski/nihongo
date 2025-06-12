import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      {/* Ensure spinner color contrasts with dark gradient */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-400"></div>
    </div>
  );
};

export default LoadingSpinner;