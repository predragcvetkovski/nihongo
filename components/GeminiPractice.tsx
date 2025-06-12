import React, { useState, useCallback } from 'react';
import { callGeminiAPI } from '../services/geminiService';
import { GeminiPracticeContentBlock, GeminiResponse } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import { SparklesIcon, ArrowPathIcon } from '../constants';

interface GeminiPracticeProps {
  block: GeminiPracticeContentBlock;
}

const GeminiPractice: React.FC<GeminiPracticeProps> = ({ block }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [geminiData, setGeminiData] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeminiQuery = useCallback(async (currentPrompt: string) => {
    setIsLoading(true);
    setError(null);
    setGeminiData(null);

    const fullPrompt = block.requiresUserInput ? `${currentPrompt}\n\nUser input: ${userInput}` : currentPrompt;
    
    const response = await callGeminiAPI(fullPrompt, block.isJsonOutput);
    
    if (response.error) {
      setError(response.error);
    } else {
      setGeminiData(response);
    }
    setIsLoading(false);
  }, [userInput, block.requiresUserInput, block.isJsonOutput, block.geminiPrompt]);

  const handleSubmit = () => {
    handleGeminiQuery(block.geminiPrompt);
  };

  const formatGeminiTextResponse = (text: string | undefined): React.ReactNode => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };


  return (
    <div className="my-6 glassmorphic-card font-sans text-gray-100"> {/* Use custom class */}
      <h4 className="text-xl font-semibold text-sky-300 mb-3 flex items-center">
        <SparklesIcon className="h-6 w-6 mr-2 text-sky-300" />
        {block.title || 'AI Practice Zone'}
      </h4>
      <p className="text-gray-300 mb-4 text-sm">{block.instructionText}</p>
      
      {block.requiresUserInput && (
        <div className="mb-4">
          <label htmlFor={`gemini-input-${block.id}`} className="block text-sm font-medium text-gray-300 mb-1.5">
            Your response:
          </label>
          <textarea
            id={`gemini-input-${block.id}`}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={block.placeholder || "Type your answer here..."}
            rows={3}
            className="w-full p-3 bg-black/30 backdrop-filter backdrop-blur-sm border border-white/20 rounded-lg text-gray-100 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-shadow font-japanese" // font-japanese for potential Japanese input
            lang="ja" 
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || (block.requiresUserInput && !userInput.trim())}
        className="w-full flex items-center justify-center bg-sky-500/60 hover:bg-sky-400/70 backdrop-filter backdrop-blur-sm border border-sky-400/60 disabled:bg-sky-700/40 disabled:text-sky-400 disabled:border-sky-600/40 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
      >
        {isLoading ? (
           <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <SparklesIcon className="h-5 w-5 mr-2" />
        )}
        {isLoading ? 'Thinking...' : (block.requiresUserInput ? 'Send to Gemini' : 'Ask Gemini')}
      </button>

      {error && <ErrorDisplay message={error} />}
      
      {geminiData && (
        <div className="mt-5 p-4 bg-black/30 backdrop-filter backdrop-blur-sm rounded-lg border border-white/20">
          <h5 className="text-md font-semibold text-sky-200 mb-2">Gemini's Response:</h5>
          {geminiData.text && (
            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {formatGeminiTextResponse(geminiData.text)}
            </div>
          )}
          {geminiData.json && (
            <pre className="text-gray-200 whitespace-pre-wrap bg-black/40 p-3 rounded-md text-sm overflow-x-auto border border-white/10">
              {JSON.stringify(geminiData.json, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiPractice;