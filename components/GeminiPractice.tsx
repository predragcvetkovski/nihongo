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
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };


  return (
    <div className="glassmorphic-card p-6 my-6 font-sans text-gray-100">
      <h4 className="text-lg font-semibold text-sky-300 mb-3 flex items-center">
        <SparklesIcon className="h-6 w-6 mr-2 text-yellow-400" />
        {block.title || 'AI Practice Zone'}
      </h4>
      <div className="p-3 bg-slate-800/40 rounded-lg mb-4 border border-slate-700">
        <p className="text-sm text-gray-300">{block.instructionText}</p>
      </div>
      
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
            className="w-full p-3 bg-slate-700/60 border border-slate-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow font-japanese"
            lang="ja" 
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || (block.requiresUserInput && !userInput.trim())}
        className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 border border-sky-700 disabled:bg-slate-600 disabled:text-gray-400 disabled:border-slate-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
      >
        {isLoading ? (
           <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <SparklesIcon className="h-5 w-5 mr-2" />
        )}
        {isLoading ? 'Thinking...' : (block.requiresUserInput ? 'Send to AI' : 'Ask AI')}
      </button>

      {error && <ErrorDisplay message={error} />}
      
      {geminiData && (
        <div className="mt-5 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <h5 className="text-md font-semibold text-sky-300 mb-2">AI Response:</h5>
          {geminiData.text && (
            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed p-3 bg-black/30 rounded-md">
              {formatGeminiTextResponse(geminiData.text)}
            </div>
          )}
          {geminiData.json && (
            <pre className="text-gray-200 whitespace-pre-wrap bg-slate-800 p-3 rounded-md text-sm overflow-x-auto border border-slate-700">
              {JSON.stringify(geminiData.json, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiPractice;