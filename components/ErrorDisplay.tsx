import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;
  return (
    // Applying a glassmorphic style for errors
    <div className="bg-red-500/40 backdrop-filter backdrop-blur-md border border-red-400/50 text-red-100 px-4 py-3 rounded-xl relative my-4 shadow-lg font-sans" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorDisplay;