import React from 'react';
import { KanaCharacter } from '../types';
import StrokeOrderDisplay from './StrokeOrderDisplay';
import WritingPracticeCanvas from './WritingPracticeCanvas';
import { CloseIcon } from '../constants';

interface WritingPracticeModalProps {
  character: KanaCharacter | null;
  onClose: () => void;
}

const WritingPracticeModal: React.FC<WritingPracticeModalProps> = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[120] overflow-y-auto"> {/* Higher z-index */}
      <div className="glassmorphic-card w-full max-w-lg flex flex-col font-sans"> {/* Use custom class */}
        <header className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-filter backdrop-blur-md rounded-t-lg"> {/* Match card radius */}
          <h2 className="text-2xl font-bold text-sky-200">
            Practice Writing: <span className="font-japanese text-3xl" lang="ja">{character.char}</span> ({character.romaji})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-sky-300 transition-colors p-2 rounded-full hover:bg-white/10 active:bg-white/20"
            aria-label="Close writing practice"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow flex flex-col items-center text-gray-100 space-y-6"> {/* Updated: flex-col, items-center, space-y-6 */}
          <p className="text-gray-300 text-center text-sm">
            Focus on the stroke order and proportions. Use the 'Clear Canvas' button to try again.
          </p>
          
          <StrokeOrderDisplay 
            character={character}
            imageClassName="w-40 h-40" // Updated to square dimensions
            textClassName="text-5xl"
          />
          
          <WritingPracticeCanvas
            characterToPractice={character.char}
            guidanceImageUrl={character.strokeOrderDiagramUrl} // Use the primary stroke order image as guidance
            width={280} // Updated canvas size
            height={280} // Updated canvas size
            canvasId={`modal-writing-canvas-${character.char}`}
          />
        </main>

        <footer className="p-4 border-t border-white/10 sticky bottom-0 bg-black/40 backdrop-filter backdrop-blur-md rounded-b-lg"> {/* Match card radius */}
          <button
            onClick={onClose}
            className="w-full bg-sky-500/60 hover:bg-sky-400/70 backdrop-filter backdrop-blur-sm border border-sky-400/60 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg"
          >
            Done Practicing
          </button>
        </footer>
      </div>
    </div>
  );
};

export default WritingPracticeModal;