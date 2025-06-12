import React from 'react';
import { KanaCharacter } from '../types';

interface StrokeOrderDisplayProps {
  character: KanaCharacter;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

const StrokeOrderDisplay: React.FC<StrokeOrderDisplayProps> = ({ character, className = '', imageClassName = 'w-16 h-16', textClassName = 'text-3xl' }) => {
  if (!character.strokeOrderDiagramUrl) {
    return (
      <div className={`flex flex-col items-center justify-center p-2 ${className} font-sans`}>
        <span className={`${textClassName} font-bold text-gray-100 font-japanese`} lang="ja">{character.char}</span>
        <span className="text-xs text-gray-400 mt-1">Stroke order unavailable</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center p-1 ${className} font-sans`}>
      <img 
        src={character.strokeOrderDiagramUrl} 
        alt={`Stroke order for ${character.char}`} 
        className={`${imageClassName} object-contain border border-white/20 rounded-md bg-white shadow-md`} // bg-white for GIF visibility
        crossOrigin="anonymous" 
      />
      <div className="mt-1.5 text-center">
        <span className={`block ${textClassName} font-bold text-gray-100 font-japanese`} lang="ja">{character.char}</span>
        {character.strokeCount && (
          <span className="text-xs text-gray-400">{character.strokeCount} stroke{character.strokeCount !== 1 ? 's' : ''}</span>
        )}
      </div>
    </div>
  );
};

export default StrokeOrderDisplay;