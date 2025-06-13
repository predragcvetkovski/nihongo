import React from 'react';
import { APP_TITLE_PREFIX, APP_TITLE_ACCENT, APP_TITLE_SUFFIX } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 backdrop-filter backdrop-blur-md text-gray-400 p-6 text-center border-t border-white/10 font-sans">
      <div className="flex items-center justify-center">
        <span>
          © {new Date().getFullYear()} {APP_TITLE_PREFIX}
          <span className="text-red-500">{APP_TITLE_ACCENT}</span>
          {APP_TITLE_SUFFIX}
        </span>
      </div>
      <p className="text-xs mt-1">AI-Powered Japanese Learning.</p>
      <p className="text-xs mt-2">Published by <a href="https://nihongo.site" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">Nihongo.site</a></p>
    </footer>
  );
};

export default Footer;