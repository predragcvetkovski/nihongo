import React from 'react';
import { WritingPracticeBlock } from '../types';
import StrokeOrderDisplay from './StrokeOrderDisplay';
import WritingPracticeCanvas from './WritingPracticeCanvas';

interface WritingPracticeExerciseProps {
  block: WritingPracticeBlock;
}

const WritingPracticeExercise: React.FC<WritingPracticeExerciseProps> = ({ block }) => {
  return (
    <div className="glassmorphic-card p-6 my-6 font-sans text-gray-100">
      <div className="flex flex-col items-center space-y-6">
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-sky-300 mb-2">
            {block.title || `Practice Writing: ${block.characterToPractice.char}`}
          </h3>
          {block.instructions && (
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 mt-2 mb-4">
              <p className="text-sm text-gray-300 max-w-md mx-auto">{block.instructions}</p>
            </div>
          )}
        </div>

        <StrokeOrderDisplay 
          character={block.characterToPractice} 
          imageClassName="w-40 h-40 bg-white rounded-md shadow-lg border-2 border-slate-400"
          textClassName="text-5xl md:text-6xl text-gray-50" // Ensure text is visible
          className="p-2 bg-slate-700/50 rounded-lg shadow-inner"
        />
        
        <WritingPracticeCanvas 
          characterToPractice={block.characterToPractice.char}
          guidanceImageUrl={block.guidanceImageUrl || block.characterToPractice.strokeOrderDiagramUrl} 
          width={280}
          height={280}
          canvasId={`writing-canvas-${block.id}`}
        />
      </div>
    </div>
  );
};

export default WritingPracticeExercise;