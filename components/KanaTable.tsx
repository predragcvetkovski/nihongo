import React from 'react';
import { KanaCharacter } from '../types';
import AudioPlayButton from './AudioPlayButton';

interface KanaTableProps {
  characters: KanaCharacter[];
  kanaSet: 'hiragana' | 'katakana';
  onStartWritingPractice?: (character: KanaCharacter) => void;
}

const KanaTable: React.FC<KanaTableProps> = ({ characters, kanaSet, onStartWritingPractice }) => {
  return (
    <div className="my-4 font-sans">
      <h4 className="text-lg font-semibold text-sky-300 mb-4 capitalize">{kanaSet} Characters Chart</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {characters.map((kana) => {
          const canPractice = !!(onStartWritingPractice && kana.strokeOrderDiagramUrl);
          return (
            <div
              key={kana.char}
              className={`glassmorphic-card-inner p-3 flex flex-col items-center text-center h-full rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                canPractice ? 'cursor-pointer hover:bg-sky-700/40' : 'opacity-90'
              }`}
              onClick={canPractice ? () => onStartWritingPractice(kana) : undefined}
              role={canPractice ? "button" : undefined}
              tabIndex={canPractice ? 0 : undefined}
              aria-label={canPractice ? `Practice writing ${kana.char}` : `${kana.char} - ${kana.romaji}`}
              onKeyDown={canPractice ? (e) => { if (e.key === 'Enter' || e.key === ' ') onStartWritingPractice(kana); } : undefined}
            >
              <div className="flex-grow flex flex-col items-center justify-center w-full py-1">
                <AudioPlayButton textToSpeak={kana.char} className="mb-1 text-sky-400 hover:text-sky-200" />
                <div className="text-5xl font-bold font-japanese text-gray-50 mb-1" lang="ja">{kana.char}</div>
                <div className="text-md text-sky-300">{kana.romaji}</div>
              </div>

              {kana.exampleWord && (
                <div className="mt-2 pt-2 border-t border-slate-600/50 w-full text-xs">
                  <p className="text-gray-300">
                    <span className="font-japanese" lang="ja">{kana.exampleWord}</span> 
                    <span className="font-sans text-gray-400"> ({kana.exampleRomaji})</span>
                  </p>
                  <p className="text-gray-400">{kana.exampleMeaning}
                    <AudioPlayButton textToSpeak={kana.exampleWord} className="ml-1 inline-block align-middle text-sky-400 hover:text-sky-200" />
                  </p>
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