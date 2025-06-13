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
    <div className="glassmorphic-card p-6 my-6 font-sans text-gray-100">
      <h4 className="text-lg font-semibold text-sky-300 mb-3">{block.title || 'Fill in the Blank Challenge!'}</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-lg">
          {block.sentenceParts.map((part, index) => 
            part === null ? (
              <input
                key={`blank-${index}`}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isSubmitted}
                className="inline-block w-28 p-2 border border-slate-500 bg-slate-700/60 rounded-lg text-sky-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-center mx-1 transition-shadow font-japanese"
                aria-label="Blank space to fill in"
                lang="ja"
              />
            ) : (
              <span key={`part-${index}`} className="font-japanese text-gray-200" lang="ja">{part}</span>
            )
          )}
        </div>

        {!isSubmitted && (
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="bg-sky-600 hover:bg-sky-700 border border-sky-700 disabled:bg-slate-600 disabled:text-gray-400 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Check Answer
          </button>
        )}
      </form>

      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-lg border flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 ${
          isCorrect 
            ? 'bg-green-700/40 border-green-600' 
            : 'bg-red-700/40 border-red-600'
          }`}
        >
          {isCorrect ? (
            <CheckIcon className="h-8 w-8 text-green-300 flex-shrink-0" />
          ) : (
            <CloseIcon className="h-8 w-8 text-red-300 flex-shrink-0" />
          )}
          <div className="flex-grow text-center sm:text-left">
            <p className={`font-semibold ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
              {isCorrect ? 'Correct! よくできました！ (Yoku dekimashita - Well done!)' : <span lang="ja" className="font-japanese">Not quite. The correct answer is: <strong className="font-semibold text-sky-200">{block.correctAnswer}</strong></span>}
            </p>
            {block.explanation && (
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-sky-400 hover:text-sky-300 mt-1 inline-flex items-center"
              >
                <LightBulbIcon className="h-4 w-4 mr-1" />
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            )}
          </div>
           <button
            onClick={handleTryAgain}
            className="bg-slate-600 hover:bg-slate-500 border border-slate-500 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0 mt-2 sm:mt-0"
          >
            Try Again
          </button>
        </div>
      )}
      {isSubmitted && showExplanation && block.explanation && (
        <div className="mt-3 p-3 bg-slate-700/60 rounded-lg text-gray-300 text-sm border border-slate-600">
          {block.explanation}
        </div>
      )}
    </div>
  );
};

export default FillInTheBlankExercise;