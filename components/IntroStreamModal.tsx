import React, { useState } from 'react';
import { CloseIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, CheckIcon } from '../constants';

interface IntroStreamModalProps {
  onClose: () => void;
}

interface SlideContent {
  icon?: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
  title: string;
  content: React.ReactNode; // Can be string or JSX for more complex content
  accentColor?: string; // e.g. 'text-sky-300'
}

const introSlides: SlideContent[] = [
  {
    icon: SparklesIcon,
    title: 'ようこそ！Welcome to NihonGO30!',
    content: (
      <>
        <p className="mb-2">Discover the beauty and structure of the Japanese language!</p>
        <p>Japanese uses three main writing systems:</p>
        <ul className="list-disc list-inside ml-4 my-2 text-gray-300">
          <li><strong>Hiragana (ひらがな):</strong> Phonetic script for native Japanese words and grammar.</li>
          <li><strong>Katakana (カタカナ):</strong> Phonetic script mainly for foreign loanwords and emphasis.</li>
          <li><strong>Kanji (漢字):</strong> Logographic characters adopted from Chinese, representing ideas or words.</li>
        </ul>
        <p>Don't worry, we'll guide you through them step-by-step!</p>
      </>
    ),
    accentColor: 'text-yellow-400',
  },
  {
    icon: BookOpenIcon,
    title: 'Meet Sakura Sensei - Your AI Tutor!',
    content: (
      <>
        <p className="mb-2">Learning a new language is an exciting journey, and Sakura Sensei is here to make it interactive and fun!</p>
        <p className="font-semibold text-sky-300 mb-1">Why an AI Tutor?</p>
        <ul className="list-disc list-inside ml-4 my-2 text-gray-300">
          <li>Practice anytime, anywhere, at your own pace.</li>
          <li>Get interactive feedback within the "Talk to Sensei Live" chat.</li>
          <li>A friendly guide to help you use new vocabulary and grammar.</li>
        </ul>
        <p>Sakura Sensei is designed to be a patient and encouraging learning partner.</p>
      </>
    ),
    accentColor: 'text-sky-300',
  },
  {
    icon: SparklesIcon,
    title: 'How Sakura Sensei Helps You Learn',
    content: (
      <>
        <p className="mb-2">Sakura Sensei is integrated into each lesson to enhance your practice:</p>
        <ul className="list-disc list-inside ml-4 my-2 text-gray-300">
          <li><strong>Conversational Practice:</strong> Chat with Sensei in the "Talk to Sensei Live" section about lesson topics. Sensei will use Japanese (with Romaji & English translations) to help you practice.</li>
          <li><strong>Vocabulary & Grammar Application:</strong> Sensei will encourage you to use the words and grammar you're learning in context.</li>
          <li><strong>Audio Interaction:</strong> When you send voice messages, Sakura Sensei will provide a transcription and respond to your spoken Japanese.</li>
        </ul>
        <p>The goal is to make your learning active and engaging!</p>
      </>
    ),
    accentColor: 'text-purple-400',
  },
  {
    icon: CheckIcon,
    title: 'Your Path to Japanese Basics',
    content: (
      <>
        <p className="mb-2">NihonGO30 offers a structured 30-day plan covering Hiragana, Katakana, essential Kanji, core grammar, and practical vocabulary.</p>
        <p>With daily lessons, varied exercises, and Sakura Sensei's guidance, you'll build a strong foundation in Japanese.</p>
        <p className="mt-4 font-semibold text-lg text-green-400">Are you ready to begin your adventure?</p>
      </>
    ),
    accentColor: 'text-green-400',
  },
];


const IntroStreamModal: React.FC<IntroStreamModalProps> = ({ onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = introSlides[currentSlideIndex];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    if (currentSlideIndex < introSlides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onClose(); // Close on "Get Started" from the last slide
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-filter backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 z-[200] font-sans">
      <div className="glassmorphic-card w-full max-w-2xl max-h-[90vh] flex flex-col !p-0 shadow-2xl border-sky-500/30">
        <header className="p-4 sm:p-5 border-b-2 border-slate-700/50 flex justify-between items-center bg-slate-800/80 backdrop-filter backdrop-blur-lg rounded-t-lg">
          <div className="flex items-center">
            {IconComponent && <IconComponent className={`h-7 w-7 mr-3 ${currentSlide.accentColor || 'text-sky-300'}`} />}
            <h2 className={`text-xl sm:text-2xl font-bold ${currentSlide.accentColor || 'text-sky-300'}`}>
              {currentSlide.title}
            </h2>
          </div>
          {currentSlideIndex === introSlides.length -1 ? null : ( // Hide close button on last slide to encourage "Get Started"
             <button
                onClick={onClose}
                className="text-gray-400 hover:text-sky-300 transition-colors p-2 rounded-full hover:bg-slate-700 active:bg-slate-600"
                aria-label="Skip intro"
              >
              <CloseIcon className="h-6 w-6" />
            </button>
          )}
        </header>

        <main className="p-5 sm:p-8 overflow-y-auto flex-grow bg-slate-800/60 text-gray-200 leading-relaxed text-sm sm:text-base min-h-[300px]">
          {typeof currentSlide.content === 'string' ? <p>{currentSlide.content}</p> : currentSlide.content}
        </main>
        
        <footer className="p-4 sm:p-5 border-t-2 border-slate-700/50 bg-slate-800/80 backdrop-filter backdrop-blur-lg rounded-b-lg flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-center space-x-2">
            {introSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlideIndex ? 'bg-sky-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex w-full sm:w-auto space-x-3">
            <button
              onClick={handlePrevious}
              disabled={currentSlideIndex === 0}
              className="flex-1 sm:flex-initial bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center shadow-md"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1 sm:mr-2" /> Previous
            </button>
            <button
              onClick={handleNext}
              className={`flex-1 sm:flex-initial text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center shadow-md ${
                currentSlideIndex === introSlides.length - 1 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-sky-500 hover:bg-sky-600'
              }`}
            >
              {currentSlideIndex === introSlides.length - 1 ? 'Get Started!' : 'Next'}
              {currentSlideIndex < introSlides.length - 1 && <ChevronRightIcon className="h-5 w-5 ml-1 sm:ml-2" />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IntroStreamModal;