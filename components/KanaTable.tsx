import React from 'react';
import { KanaCharacter } from '../types';
import AudioPlayButton from './AudioPlayButton';
// StrokeOrderDisplay is no longer used directly in this card view
// PencilSquareIcon is no longer used as the card itself is clickable

interface KanaTableProps {
  characters: KanaCharacter[];
  kanaSet: 'hiragana' | 'katakana';
  onStartWritingPractice?: (character: KanaCharacter) => void;
}

const KanaTable: React.FC<KanaTableProps> = ({ characters, kanaSet, onStartWritingPractice }) => {
  return (
    <div className="my-4 font-sans">
      <h4 className="text-xl font-semibold text-sky-300 mb-4 capitalize">{kanaSet} Characters</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {characters.map((kana) => {
          const canPractice = !!(onStartWritingPractice && kana.strokeOrderDiagramUrl);
          return (
            <div
              key={kana.char}
              className={`p-4 flex flex-col items-center text-center h-full transition-all duration-200 ease-in-out glassmorphic-card-inner ${ // Use custom class
                canPractice ? 'cursor-pointer hover:bg-black/40 transform hover:scale-105' : '' // Adjusted hover for inner card
              }`}
              onClick={canPractice ? () => onStartWritingPractice(kana) : undefined}
              role={canPractice ? "button" : undefined}
              tabIndex={canPractice ? 0 : undefined}
              aria-label={canPractice ? `Practice writing ${kana.char}` : `${kana.char} - ${kana.romaji}`}
              onKeyDown={canPractice ? (e) => { if (e.key === 'Enter' || e.key === ' ') onStartWritingPractice(kana); } : undefined}
            >
              {/* Main content area, grows to push example to bottom */}
              <div className="flex-grow flex flex-col items-center justify-center w-full py-2">
                <AudioPlayButton textToSpeak={kana.char} className="mb-2 text-sky-300 hover:text-sky-100" /> 
                <div className="text-6xl font-bold text-gray-50 mb-1 font-japanese" lang="ja">{kana.char}</div>
                <div className="text-md text-sky-300 mt-1 font-sans">{kana.romaji}</div>
              </div>

              {/* Example word at the bottom */}
              {kana.exampleWord && (
                <div className="text-xs text-gray-300 pt-3 border-t border-white/10 w-full mt-3"> {/* Subtle border */}
                  <span className="font-japanese" lang="ja">{kana.exampleWord}</span> <span className="font-sans">({kana.exampleRomaji}) - {kana.exampleMeaning}</span>
                  {kana.exampleWord && <AudioPlayButton textToSpeak={kana.exampleWord} className="ml-1 inline-block align-middle text-sky-300 hover:text-sky-100" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanaTable;