import React, { useState, useEffect } from 'react';
import { StarIcon } from '../constants';

const GitHubStarSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`py-6 px-4 text-center font-sans transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto max-w-2xl">
        <h3 className="text-xl font-medium text-gray-400 mb-2">
          Enjoying NihonGO30?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Help us grow by starring our open-source repository on GitHub!
        </p>
        <a
          href="https://github.com/predragcvetkovski/nihongo"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center text-sky-400 hover:text-sky-300 font-medium py-2 px-3 rounded-md transition-colors duration-200 group ${isLoaded ? 'shimmer-link-active' : ''}`}
          aria-label="Star the NihonGO30 repository on GitHub"
        >
          <StarIcon className="h-5 w-5 mr-1.5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          Star on GitHub
        </a>
      </div>
    </div>
  );
};

export default GitHubStarSection;