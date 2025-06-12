import React from 'react';
import { WritingPracticeBlock } from '../types';
import StrokeOrderDisplay from './StrokeOrderDisplay';
import WritingPracticeCanvas from './WritingPracticeCanvas';

interface WritingPracticeExerciseProps {
  block: WritingPracticeBlock;
}

const WritingPracticeExercise: React.FC<WritingPracticeExerciseProps> = ({ block }) => {
  return (
    <div className="my-6 glassmorphic-card font-sans text-gray-100 p-6"> {/* Use custom class, added padding */}
      <div className="flex flex-col items-center space-y-6"> {/* Main vertical stack, centered items */}
        
        <div className="text-center"> {/* Centering title and instructions */}
          <h3 className="text-2xl font-semibold text-sky-200 mb-2">
            {block.title || `Practice Writing: ${block.characterToPractice.char}`}
          </h3>
          {block.instructions && (
            <p className="text-gray-300 mb-4 text-sm max-w-md mx-auto">{block.instructions}</p>
          )}
        </div>

        <StrokeOrderDisplay 
          character={block.characterToPractice} 
          imageClassName="w-40 h-40" // Updated to square dimensions
          textClassName="text-5xl md:text-6xl"
        />
        
        <WritingPracticeCanvas 
          characterToPractice={block.characterToPractice.char}
          // Using character's strokeOrderDiagramUrl as default guidance if specific guidanceImageUrl isn't set for the block
          guidanceImageUrl={block.guidanceImageUrl || block.characterToPractice.strokeOrderDiagramUrl} 
          width={280} // Slightly larger canvas for vertical layout
          height={280}
          canvasId={`writing-canvas-${block.id}`}
        />
      </div>
    </div>
  );
};

export default WritingPracticeExercise;