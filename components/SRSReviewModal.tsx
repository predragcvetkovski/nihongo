import React, { useState, useEffect, useCallback } from 'react';
import { VocabularyItem, UserVocabularySrsEntry, SrsLevel } from '../types';
import { CloseIcon, SpeakerWaveIcon, CheckIcon, QuestionMarkCircleIcon, LightBulbIcon } from '../constants';
import AudioPlayButton from './AudioPlayButton';

interface SRSReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabularyToReview: VocabularyItem[];
  srsData: Record<string, UserVocabularySrsEntry>;
  updateSrsData: (itemId: string, knewIt: boolean) => void;
}

const SRSReviewModal: React.FC<SRSReviewModalProps> = ({ isOpen, onClose, vocabularyToReview, srsData, updateSrsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, unknown: 0, total: 0 });
  const [shuffledVocab, setShuffledVocab] = useState<VocabularyItem[]>([]);

  useEffect(() => {
    if (isOpen && vocabularyToReview.length > 0) {
      const enrichedVocab = vocabularyToReview.map(item => ({
        ...item,
        srsLevel: srsData[item.id]?.srsLevel || SrsLevel.NEW,
        lastReviewed: srsData[item.id]?.lastReviewed,
      }));

      const shuffled = [...enrichedVocab].sort(() => Math.random() - 0.5);
      
      setShuffledVocab(shuffled);
      setCurrentIndex(0);
      setShowAnswer(false);
      setSessionStats({ known: 0, unknown: 0, total: shuffled.length });
    }
  }, [isOpen, vocabularyToReview, srsData]);

  const currentItem = shuffledVocab[currentIndex];

  const handleNext = (knewIt: boolean) => {
    if (!currentItem) return;
    updateSrsData(currentItem.id, knewIt);
    setSessionStats(prev => ({ ...prev, [knewIt ? 'known' : 'unknown']: prev[knewIt ? 'known' : 'unknown'] + 1 }));
    
    if (currentIndex < shuffledVocab.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Mark as "showAnswer" so the final result is visible before modal might close
      setShowAnswer(true); 
    }
  };

  if (!isOpen || !currentItem) return null;

  const isSessionEnd = currentIndex >= shuffledVocab.length -1 && showAnswer;


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[110] overflow-y-auto">
      <div className="glassmorphic-card w-full max-w-xl flex flex-col font-sans"> {/* Use custom class */}
        <header className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-filter backdrop-blur-md rounded-t-lg"> {/* Match card radius */}
          <h2 className="text-xl font-bold text-sky-200">Vocabulary Review ({currentIndex + 1} / {sessionStats.total})</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-sky-300 transition-colors p-2 rounded-full hover:bg-white/10 active:bg-white/20"
            aria-label="Close review"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        <main className="p-6 flex-grow min-h-[280px] flex flex-col justify-center items-center text-gray-100"> {/* Default text color */}
          <div className="text-center">
            <div className="text-5xl lg:text-6xl font-bold text-gray-50 mb-4 flex items-center justify-center font-japanese" lang="ja">
              {currentItem.japanese}
              <AudioPlayButton textToSpeak={currentItem.japanese} className="ml-4 h-9 w-9 text-sky-300 hover:text-sky-100" /> {/* Larger button, themed color */}
            </div>
            {showAnswer ? (
              <div className="mt-2 space-y-1.5 text-gray-300">
                <p className="text-xl font-sans">{currentItem.romaji}</p>
                <p className="text-lg font-sans">{currentItem.meaning}</p>
                {currentItem.exampleSentence && (
                  <p className="text-sm italic mt-3 text-gray-400">
                    <span className="font-japanese" lang="ja">e.g., "{currentItem.exampleSentence}"</span> <span className="font-sans">({currentItem.exampleSentenceRomaji}) - {currentItem.exampleSentenceMeaning}</span>
                    <AudioPlayButton textToSpeak={currentItem.exampleSentence} className="ml-1 text-sky-300 hover:text-sky-100" />
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-xl h-20 flex items-center justify-center">(Meaning hidden)</p>
            )}
          </div>
        </main>

        <footer className="p-4 border-t border-white/10 bg-black/40 backdrop-filter backdrop-blur-md rounded-b-lg"> {/* Match card radius */}
          {showAnswer ? (
            <div className="flex justify-around gap-4">
              <button
                onClick={() => handleNext(false)}
                disabled={isSessionEnd && currentIndex === shuffledVocab.length -1} 
                className="w-full bg-red-500/60 hover:bg-red-400/70 backdrop-filter backdrop-blur-sm border border-red-400/60 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-red-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <QuestionMarkCircleIcon className="h-6 w-6 mr-2" /> Didn't Know
              </button>
              <button
                onClick={() => handleNext(true)}
                disabled={isSessionEnd && currentIndex === shuffledVocab.length -1}
                className="w-full bg-green-500/60 hover:bg-green-400/70 backdrop-filter backdrop-blur-sm border border-green-400/60 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-green-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <CheckIcon className="h-6 w-6 mr-2" /> Knew It!
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-sky-500/60 hover:bg-sky-400/70 backdrop-filter backdrop-blur-sm border border-sky-400/60 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-sky-400/30"
            >
              <LightBulbIcon className="h-6 w-6 mr-2" /> Show Answer
            </button>
          )}
          {isSessionEnd && (
             <div className="text-center text-sky-300 mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
               <p className="font-semibold">Review Session Complete!</p>
               <p>Known: {sessionStats.known}, Unknown: {sessionStats.unknown}</p>
             </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default SRSReviewModal;