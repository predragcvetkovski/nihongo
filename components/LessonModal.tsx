import React from 'react';
import { 
  LessonDay, LessonContentBlock, ContentBlockType, BaseContentBlock, 
  VocabularyItem, GrammarExplanationContentBlock, KanaInfoContentBlock, 
  TextContentBlock, CulturalNoteContentBlock, GeminiPracticeContentBlock, 
  FillInTheBlankExerciseBlock, VocabularyListContentBlock, WritingPracticeBlock,
  PronunciationPracticeContentBlock, AiTutorStreamContentBlock,
  InterestingFactContentBlock, // Added InterestingFactContentBlock
  KanaCharacter
} from '../types';
import { CloseIcon, CheckIcon, SparklesIcon, BookOpenIcon, LightBulbIcon, StarIcon } from '../constants'; // Added StarIcon
import KanaTable from './KanaTable';
// import GeminiPractice from './GeminiPractice'; // To be replaced
// import PronunciationPractice from './PronunciationPractice'; // To be replaced
import AiTutorStream from './AiTutorStream'; // Import new component
import AudioPlayButton from './AudioPlayButton';
import FillInTheBlankExercise from './FillInTheBlankExercise';
import WritingPracticeExercise from './WritingPracticeExercise'; 
// Note: PronunciationPractice component might be kept if some lessons still use it, or fully removed if all are replaced


interface LessonModalProps {
  lesson: LessonDay | null;
  onClose: () => void;
  onMarkComplete: (day: number) => void;
  isCompleted: boolean;
  onStartWritingPractice: (character: KanaCharacter) => void; 
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, onClose, onMarkComplete, isCompleted, onStartWritingPractice }) => {
  if (!lesson) return null;

  const getVocabularyItemById = (id: string): VocabularyItem | undefined => {
    for (const block of lesson.contentBlocks) {
      if (block.type === ContentBlockType.VOCABULARY_LIST) {
        const vocabList = block as VocabularyListContentBlock;
        const foundItem = vocabList.items.find(item => item.id === id);
        if (foundItem) return foundItem;
      }
    }
    return undefined;
  };

  const renderContentBlock = (block: LessonContentBlock): React.ReactNode => {
    const baseBlockClasses = "glassmorphic-card p-4 sm:p-6 mb-6 text-gray-100"; // Base for all blocks in modal
    
    switch (block.type) {
      case ContentBlockType.TEXT:
        const textBlock = block as TextContentBlock;
        return (
          <div key={textBlock.id} className={`${baseBlockClasses}`}>
            {textBlock.title && <h3 className="text-xl font-semibold text-sky-300 mb-3">{textBlock.title}</h3>}
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="whitespace-pre-line leading-relaxed text-base text-gray-200">
                <span className="font-semibold text-lg text-sky-400">Note: </span>
                {textBlock.markdownContent}
              </p>
            </div>
          </div>
        );
      case ContentBlockType.KANA_INFO:
        const kanaBlock = block as KanaInfoContentBlock;
        return (
          <div key={kanaBlock.id} className={`${baseBlockClasses}`}>
            {kanaBlock.title && <h3 className="text-xl font-semibold text-sky-300 mb-3">{kanaBlock.title}</h3>}
            {kanaBlock.introduction && (
              <div className="p-3 bg-slate-800/40 rounded-lg mb-4 border border-slate-700">
                <p className="text-sm text-gray-300">{kanaBlock.introduction}</p>
              </div>
            )}
            <KanaTable 
              characters={kanaBlock.characters} 
              kanaSet={kanaBlock.kanaSet}
              onStartWritingPractice={onStartWritingPractice}
            />
          </div>
        );
      case ContentBlockType.VOCABULARY_LIST:
        const vocabBlock = block as VocabularyListContentBlock;
        return (
          <div key={vocabBlock.id} className={`${baseBlockClasses}`}>
            {vocabBlock.title && <h3 className="text-xl font-semibold text-sky-300 mb-3">{vocabBlock.title}</h3>}
            <ul className="space-y-3">
              {vocabBlock.items.map((item) => (
                <li key={item.id} className="glassmorphic-card-inner p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-2xl font-japanese text-gray-50 flex items-center" lang="ja">
                      {item.japanese}
                      <AudioPlayButton textToSpeak={item.japanese} className="ml-2 text-sky-300 hover:text-sky-200" />
                    </span>
                    <span className="text-sm text-gray-400">{item.romaji}</span>
                  </div>
                  <p className="text-gray-200">{item.meaning}</p>
                  {item.exampleSentence && (
                     <div className="mt-2 p-2 bg-black/20 rounded text-xs italic border border-slate-700">
                       <p className="text-gray-300 flex items-center">
                         <span className="font-japanese" lang="ja">e.g., "{item.exampleSentence}"</span> 
                         <span className="font-sans ml-1 text-gray-400">({item.exampleSentenceRomaji}) - {item.exampleSentenceMeaning}</span>
                         <AudioPlayButton textToSpeak={item.exampleSentence} className="ml-1 text-sky-300 hover:text-sky-200" />
                       </p>
                     </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      case ContentBlockType.GRAMMAR_EXPLANATION:
        const grammarBlock = block as GrammarExplanationContentBlock;
        return (
          <div key={grammarBlock.id} className={`${baseBlockClasses}`}>
            {grammarBlock.title && <h3 className="text-xl font-semibold text-sky-300 mb-3">{grammarBlock.title}</h3>}
            <div className="p-3 bg-slate-800/40 rounded-lg mb-4 border border-slate-700">
              <p className="whitespace-pre-line leading-relaxed text-base text-gray-200">{grammarBlock.explanation}</p>
            </div>
            <h4 className="text-lg font-semibold text-sky-400 mt-4 mb-2">Examples:</h4>
            <ul className="space-y-2">
              {grammarBlock.exampleSentences.map((ex, index) => ( 
                <li key={ex.id || `gram-ex-${index}`} className="p-3 bg-slate-700/50 rounded-md border border-slate-600">
                  <p className="text-md text-gray-100 flex items-center font-japanese" lang="ja">
                    {ex.japanese}
                    <AudioPlayButton textToSpeak={ex.japanese} className="ml-2 text-sky-300 hover:text-sky-200" />
                  </p>
                  <p className="text-sm text-sky-300 font-sans">{ex.romaji}</p>
                  <p className="text-xs text-gray-300 font-sans">{ex.meaning}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case ContentBlockType.AI_TUTOR_STREAM:
        return <AiTutorStream key={block.id} block={block as AiTutorStreamContentBlock} />;
      
      case ContentBlockType.INTERESTING_FACT:
        const factBlock = block as InterestingFactContentBlock;
        const relatedVocabItems = factBlock.relatedVocabularyIds
          .map(id => getVocabularyItemById(id))
          .filter(item => item !== undefined) as VocabularyItem[];
        return (
          <div key={factBlock.id} className={`${baseBlockClasses} border-indigo-500/50 bg-indigo-500/10`}>
            <h3 className="text-xl font-semibold text-indigo-300 mb-3 flex items-center">
              <StarIcon className="h-6 w-6 mr-2 text-yellow-400" />
              {factBlock.storyTitle}
            </h3>
            <div className="p-3 bg-indigo-400/10 rounded-lg border border-indigo-500/30 mb-4">
                <p className="whitespace-pre-line leading-relaxed text-indigo-200">{factBlock.storyMarkdown}</p>
            </div>
            {relatedVocabItems.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-indigo-300 mt-3 mb-2">Key Vocabulary in this Story:</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {relatedVocabItems.map(item => (
                    <li key={item.id} className="text-sm text-indigo-200">
                      <strong className="font-japanese text-indigo-100">{item.japanese}</strong> ({item.romaji}) - {item.meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case ContentBlockType.GEMINI_PRACTICE:
        console.warn(`Deprecated GeminiPractice block found: ${block.id}`);
        return (
          <div key={block.id} className={`${baseBlockClasses} border-orange-500/50 bg-orange-500/10`}>
            <h3 className="text-xl font-semibold text-orange-300 mb-3">Legacy Practice Block</h3>
            <p className="text-orange-200">This practice type is being replaced by the AI Tutor Stream. Content: {(block as GeminiPracticeContentBlock).instructionText}</p>
          </div>
        );
      case ContentBlockType.PRONUNCIATION_PRACTICE:
        console.warn(`Deprecated PronunciationPractice block found: ${block.id}`);
         return (
          <div key={block.id} className={`${baseBlockClasses} border-orange-500/50 bg-orange-500/10`}>
            <h3 className="text-xl font-semibold text-orange-300 mb-3">Legacy Pronunciation Block</h3>
            <p className="text-orange-200">This practice type is being replaced by the AI Tutor Stream. Target: {(block as PronunciationPracticeContentBlock).targetPhraseJapanese}</p>
          </div>
        );

      case ContentBlockType.CULTURAL_NOTE:
        const culturalBlock = block as CulturalNoteContentBlock;
         return (
          <div key={culturalBlock.id} className={`${baseBlockClasses} border-yellow-500/50 bg-yellow-500/10`}>
            {culturalBlock.title && <h3 className="text-xl font-semibold text-yellow-300 mb-3 flex items-center"><LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400"/>{culturalBlock.title}</h3>}
            <div className="p-3 bg-yellow-400/10 rounded-lg border border-yellow-500/30">
                <p className="whitespace-pre-line leading-relaxed text-yellow-200">{culturalBlock.note}</p>
            </div>
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
          <div key={unknownBlock.id || `unknown-block-${Math.random().toString(36).substring(7)}`} className={`${baseBlockClasses} border-red-500/50 bg-red-500/10`}>
            <h3 className="text-xl font-semibold text-red-300 mb-3">Unsupported Content</h3>
            <p className="text-red-200">This content block type (${String(unknownBlock.type)}) is not recognized. Please check lesson data.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-filter backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-[100] overflow-y-auto">
      <div className="glassmorphic-card w-full max-w-3xl max-h-[90vh] flex flex-col font-sans !p-0">
        <header className="p-4 sm:p-5 border-b-2 border-slate-700/50 flex justify-between items-center sticky top-0 bg-slate-800/80 backdrop-filter backdrop-blur-lg z-10 rounded-t-lg">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-300">{`Lesson ${lesson.day}: ${lesson.title}`}</h2>
            <p className="text-sm text-sky-400">{lesson.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-sky-300 transition-colors p-2 rounded-full hover:bg-slate-700 active:bg-slate-600"
            aria-label="Close lesson"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </header>

        <main className="p-4 sm:p-6 overflow-y-auto flex-grow bg-slate-800/50"> 
          {lesson.contentBlocks.map(renderContentBlock)}
        </main>

        <footer className="p-4 sm:p-5 border-t-2 border-slate-700/50 sticky bottom-0 bg-slate-800/80 backdrop-filter backdrop-blur-lg z-10 rounded-b-lg">
          {!isCompleted ? (
            <button
              onClick={() => {
                onMarkComplete(lesson.day);
                onClose();
              }}
              className="w-full bg-green-500 hover:bg-green-600 border border-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/40 transform hover:scale-[1.02]"
            >
              <CheckIcon className="h-6 w-6 mr-2" /> Mark as Complete
            </button>
          ) : (
            <p className="text-center text-green-400 font-semibold flex items-center justify-center text-lg">
              <CheckIcon className="h-6 w-6 mr-2 text-green-300" /> Lesson Completed!
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default LessonModal;