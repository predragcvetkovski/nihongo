import React, { useState } from 'react';
import { FillInTheBlankExerciseBlock } from '../types';
import { CheckIcon, CloseIcon, LightBulbIcon } from '../constants';

interface FillInTheBlankExerciseProps {
  block: FillInTheBlankExerciseBlock;
}

const FillInTheBlankExercise: React.FC<FillInTheBlankExerciseProps> = ({ block }) => {
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsSubmitted(true);
    setIsCorrect(userInput.trim().toLowerCase() === block.correctAnswer.toLowerCase());
  };

  const handleTryAgain = () => {
    setUserInput('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  return (
    <div className="my-6 glassmorphic-card font-sans text-gray-100"> {/* Use custom class */}
      <h4 className="text-xl font-semibold text-sky-300 mb-3">{block.title || 'Fill in the Blank'}</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-lg text-gray-100">
          {block.sentenceParts.map((part, index) => 
            part === null ? (
              <input
                key={`blank-${index}`}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isSubmitted}
                className="inline-block w-28 p-2 border border-white/20 bg-black/30 backdrop-filter backdrop-blur-sm rounded-lg text-sky-100 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-center mx-1 transition-shadow font-japanese" // font-japanese for Japanese input
                aria-label="Blank space to fill in"
                lang="ja"
              />
            ) : (
              <span key={`part-${index}`} className="font-japanese" lang="ja">{part}</span>
            )
          )}
        </div>

        {!isSubmitted && (
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="bg-sky-500/60 hover:bg-sky-400/70 backdrop-filter backdrop-blur-sm border border-sky-400/60 disabled:bg-sky-700/40 disabled:text-sky-400 disabled:border-sky-600/40 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Check Answer
          </button>
        )}
      </form>

      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-lg backdrop-filter backdrop-blur-sm border flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 ${
          isCorrect 
            ? 'bg-green-500/40 border-green-400/50' 
            : 'bg-red-500/40 border-red-400/50'
          }`}
        >
          {isCorrect ? (
            <CheckIcon className="h-8 w-8 text-green-300 flex-shrink-0" />
          ) : (
            <CloseIcon className="h-8 w-8 text-red-300 flex-shrink-0" />
          )}
          <div className="flex-grow text-center sm:text-left">
            <p className={`font-semibold ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
              {isCorrect ? 'Correct!' : <span lang="ja" className="font-japanese">Not quite. The correct answer is: {block.correctAnswer}</span>}
            </p>
            {block.explanation && (
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-sky-300 hover:text-sky-200 mt-1 inline-flex items-center"
              >
                <LightBulbIcon className="h-4 w-4 mr-1" />
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            )}
          </div>
           <button
            onClick={handleTryAgain}
            className="bg-black/30 hover:bg-black/40 backdrop-filter backdrop-blur-sm border border-white/20 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0 mt-2 sm:mt-0"
          >
            Try Again
          </button>
        </div>
      )}
      {isSubmitted && showExplanation && block.explanation && (
        <div className="mt-3 p-3 bg-black/20 backdrop-filter backdrop-blur-sm rounded-lg text-gray-200 text-sm border border-white/10">
          {block.explanation}
        </div>
      )}
    </div>
  );
};

export default FillInTheBlankExercise;