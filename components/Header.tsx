import React from 'react';
import { APP_TITLE_PREFIX, APP_TITLE_ACCENT, APP_TITLE_SUFFIX, BookOpenIcon } from '../constants';

const Header: React.FC = () => {
  return (
    // Apply glassmorphic-like effect with Tailwind if a direct class isn't perfect
    <header className="sticky top-0 z-50 bg-black/40 backdrop-filter backdrop-blur-lg shadow-lg border-b border-white/10">
      <div className="container mx-auto flex items-center justify-center p-4"> {/* Changed sm:justify-start to justify-center */}
        <BookOpenIcon className="h-8 w-8 text-sky-300 mr-3" />
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight font-sans">
            {APP_TITLE_PREFIX}
            <span className="text-red-500">{APP_TITLE_ACCENT}</span>
            {APP_TITLE_SUFFIX}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;