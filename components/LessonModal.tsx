import React from 'react';
import { 
  LessonDay, LessonContentBlock, ContentBlockType, BaseContentBlock, 
  VocabularyItem, GrammarExplanationContentBlock, KanaInfoContentBlock, 
  TextContentBlock, CulturalNoteContentBlock, GeminiPracticeContentBlock, 
  FillInTheBlankExerciseBlock, VocabularyListContentBlock, WritingPracticeBlock,
  KanaCharacter
} from '../types';
import { CloseIcon, CheckIcon } from '../constants';
import KanaTable from './KanaTable';
import GeminiPractice from './GeminiPractice';
import AudioPlayButton from './AudioPlayButton';
import FillInTheBlankExercise from './FillInTheBlankExercise';
import WritingPracticeExercise from './WritingPracticeExercise'; 


interface LessonModalProps {
  lesson: LessonDay | null;
  onClose: () => void;
  onMarkComplete: (day: number) => void;
  isCompleted: boolean;
  onStartWritingPractice: (character: KanaCharacter) => void; // New prop
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onMarkComplete, isCompleted, onStartWritingPractice }) => {
  if (!lesson) return null;

  const renderContentBlock = (block: LessonContentBlock): React.ReactNode => {
    // Using glassmorphic-card-inner for content blocks, padding handled by Tailwind p-5
    const baseBlockClasses = "mb-6 p-5 glassmorphic-card-inner text-gray-200"; 
    
    switch (block.type) {
      case ContentBlockType.TEXT:
        const textBlock = block as TextContentBlock;
        return (
          <div key={textBlock.id} className={baseBlockClasses}>
            {textBlock.title && <h3 className="text-2xl font-semibold text-sky-300 mb-3 font-sans">{textBlock.title}</h3>}
            <p className="whitespace-pre-line leading-relaxed text-base font-sans">{textBlock.markdownContent}</p>
          </div>
        );
      case ContentBlockType.KANA_INFO:
        const kanaBlock = block as KanaInfoContentBlock;
        return (
          <div key={kanaBlock.id} className={baseBlockClasses}>
            {kanaBlock.title && <h3 className="text-2xl font-semibold text-sky-300 mb-3 font-sans">{kanaBlock.title}</h3>}
            {kanaBlock.introduction && <p className="text-gray-300 mb-4 text-sm font-sans">{kanaBlock.introduction}</p>}
            <KanaTable 
              characters={kanaBlock.characters} 
              kanaSet={kanaBlock.kanaSet}
              onStartWritingPractice={onStartWritingPractice} // Pass prop
            />
          </div>
        );
      case ContentBlockType.VOCABULARY_LIST:
        const vocabBlock = block as VocabularyListContentBlock;
        return (
          <div key={vocabBlock.id} className={baseBlockClasses}>
            {vocabBlock.title && <h3 className="text-2xl font-semibold text-sky-300 mb-4 font-sans">{vocabBlock.title}</h3>}
            <ul className="space-y-4">
              {vocabBlock.items.map((item) => (
                <li key={item.id} className="p-4 bg-black/20 backdrop-filter backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xl text-gray-50 font-medium flex items-center font-japanese" lang="ja">
                      {item.japanese}
                      <AudioPlayButton textToSpeak={item.japanese} className="ml-2" />
                    </span>
                    <span className="text-sm text-sky-300 font-sans">{item.romaji}</span>
                  </div>
                  <p className="text-gray-300 text-sm font-sans">{item.meaning}</p>
                  {item.exampleSentence && (
                     <p className="text-xs text-gray-400 mt-2 italic flex items-center">
                       <span className="font-japanese" lang="ja">e.g., "{item.exampleSentence}"</span> <span className="font-sans">({item.exampleSentenceRomaji}) - {item.exampleSentenceMeaning}</span>
                       <AudioPlayButton textToSpeak={item.exampleSentence} className="ml-1" />
                     </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      case ContentBlockType.GRAMMAR_EXPLANATION:
        const grammarBlock = block as GrammarExplanationContentBlock;
        return (
          <div key={grammarBlock.id} className={baseBlockClasses}>
            {grammarBlock.title && <h3 className="text-2xl font-semibold text-sky-300 mb-3 font-sans">{grammarBlock.title}</h3>}
            <p className="whitespace-pre-line mb-4 leading-relaxed text-base font-sans">{grammarBlock.explanation}</p>
            <h4 className="text-lg font-medium text-sky-200 mb-3 font-sans">Examples:</h4>
            <ul className="space-y-3">
              {grammarBlock.exampleSentences.map((ex, index) => ( 
                <li key={ex.id || `gram-ex-${index}`} className="p-3 bg-black/20 backdrop-filter backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-md text-gray-50 flex items-center font-japanese" lang="ja">
                    {ex.japanese}
                    <AudioPlayButton textToSpeak={ex.japanese} className="ml-2" />
                  </p>
                  <p className="text-sm text-sky-300 font-sans">{ex.romaji}</p>
                  <p className="text-xs text-gray-300 font-sans">{ex.meaning}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case ContentBlockType.GEMINI_PRACTICE:
        return <GeminiPractice key={block.id} block={block as GeminiPracticeContentBlock} />;
      case ContentBlockType.CULTURAL_NOTE:
        const culturalBlock = block as CulturalNoteContentBlock;
         return (
          <div key={culturalBlock.id} className={`mb-6 p-5 bg-yellow-500/30 backdrop-filter backdrop-blur-md rounded-xl border border-yellow-400/40 shadow-lg font-sans`}>
            {culturalBlock.title && <h3 className="text-2xl font-semibold text-yellow-200 mb-2">{culturalBlock.title}</h3>}
            <p className="text-yellow-100 whitespace-pre-line leading-relaxed">{culturalBlock.note}</p>
          </div>
        );
      case ContentBlockType.FILL_IN_THE_BLANK_EXERCISE:
        return <FillInTheBlankExercise key={block.id} block={block as FillInTheBlankExerciseBlock} />;
      case ContentBlockType.WRITING_PRACTICE:
        return <WritingPracticeExercise key={block.id} block={block as WritingPracticeBlock} />;
      default:
        const unknownBlock = block as BaseContentBlock;
        console.warn(`Encountered an unsupported content block type: ${unknownBlock.type || 'unknown'}`);
        return (
          <div key={unknownBlock.id || `unknown-block-${Math.random().toString(36).substring(7)}`} className={`mb-6 p-5 bg-red-600/30 backdrop-filter backdrop-blur-md rounded-xl border border-red-500/40 shadow-lg font-sans`}>
            <h3 className="text-2xl font-semibold text-red-300 mb-2">Unsupported Content</h3>
            <p className="text-red-200">This content block type (${String(unknownBlock.type)}) is not recognized. Please check lesson data.</p>
          </div>
        );
    }
  };

  return (
    // Main modal container using glassmorphic-card (padding is part of the class)
    <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-[100] overflow-y-auto">
      <div className="glassmorphic-card w-full max-w-3xl max-h-[90vh] flex flex-col font-sans">
        <header className="p-4 sm:p-5 border-b border-white/10 flex justify-between items-center sticky top-0 bg-black/40 backdrop-filter backdrop-blur-md z-10 rounded-t-lg"> {/* Match card radius */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-200">{`Day ${lesson.day}: ${lesson.title}`}</h2>
            <p className="text-sm text-sky-300">{lesson.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-sky-300 transition-colors p-2 rounded-full hover:bg-white/10 active:bg-white/20"
            aria-label="Close lesson"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </header>

        <main className="p-4 sm:p-6 overflow-y-auto flex-grow text-gray-100"> {/* Default text color for modal content */}
          {lesson.contentBlocks.map(renderContentBlock)}
        </main>

        <footer className="p-4 sm:p-5 border-t border-white/10 sticky bottom-0 bg-black/40 backdrop-filter backdrop-blur-md z-10 rounded-b-lg"> {/* Match card radius */}
          {!isCompleted ? (
            <button
              onClick={() => {
                onMarkComplete(lesson.day);
                onClose();
              }}
              className="w-full bg-green-500/60 hover:bg-green-400/70 backdrop-filter backdrop-blur-sm border border-green-400/60 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:scale-[1.01]"
            >
              <CheckIcon className="h-6 w-6 mr-2" /> Mark as Complete
            </button>
          ) : (
            <p className="text-center text-green-300 font-semibold flex items-center justify-center text-lg">
              <CheckIcon className="h-6 w-6 mr-2 text-green-300" /> Day Completed!
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default LessonModal;