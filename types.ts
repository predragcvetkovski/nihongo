export enum LessonType {
  HIRAGANA = 'HIRAGANA',
  KATAKANA = 'KATAKANA',
  GRAMMAR = 'GRAMMAR',
  VOCABULARY = 'VOCABULARY',
  PRACTICE = 'PRACTICE',
  CULTURE = 'CULTURE',
  REVIEW = 'REVIEW',
  KANJI = 'KANJI',
}

export enum ContentBlockType {
  TEXT = 'TEXT',
  KANA_INFO = 'KANA_INFO',
  VOCABULARY_LIST = 'VOCABULARY_LIST',
  GRAMMAR_EXPLANATION = 'GRAMMAR_EXPLANATION',
  GEMINI_PRACTICE = 'GEMINI_PRACTICE', // Will be phased out by AI_TUTOR_STREAM
  CULTURAL_NOTE = 'CULTURAL_NOTE',
  FILL_IN_THE_BLANK_EXERCISE = 'FILL_IN_THE_BLANK_EXERCISE',
  WRITING_PRACTICE = 'WRITING_PRACTICE',
  PRONUNCIATION_PRACTICE = 'PRONUNCIATION_PRACTICE', // Will be phased out by AI_TUTOR_STREAM
  AI_TUTOR_STREAM = 'AI_TUTOR_STREAM', // New type for interactive AI tutor
  INTERESTING_FACT = 'INTERESTING_FACT', // New type for interesting facts/stories
}

export interface BaseContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
}

export interface TextContentBlock extends BaseContentBlock {
  type: ContentBlockType.TEXT;
  markdownContent: string;
}

export interface KanaCharacter {
  char: string;
  romaji: string;
  exampleWord?: string;
  exampleRomaji?: string;
  exampleMeaning?: string;
  audioSrc?: string; 
  strokeOrderDiagramUrl?: string; 
  strokeCount?: number;
}
export interface KanaInfoContentBlock extends BaseContentBlock {
  type: ContentBlockType.KANA_INFO;
  kanaSet: 'hiragana' | 'katakana';
  introduction: string;
  characters: KanaCharacter[];
}

export interface VocabularyItem {
  id: string; 
  japanese: string;
  romaji: string;
  meaning: string;
  exampleSentence?: string; 
  exampleSentenceRomaji?: string;
  exampleSentenceMeaning?: string;
  audioSrc?: string; 
}

export interface VocabularyListContentBlock extends BaseContentBlock {
  type: ContentBlockType.VOCABULARY_LIST;
  items: VocabularyItem[];
}

export interface GrammarExplanationContentBlock extends BaseContentBlock {
  type: ContentBlockType.GRAMMAR_EXPLANATION;
  explanation: string; 
  exampleSentences: VocabularyItem[]; 
}

export interface GeminiPracticeContentBlock extends BaseContentBlock {
  type: ContentBlockType.GEMINI_PRACTICE;
  instructionText: string;
  geminiPrompt: string;
  requiresUserInput?: boolean; 
  isJsonOutput?: boolean;
  placeholder?: string;
}

export interface CulturalNoteContentBlock extends BaseContentBlock {
  type: ContentBlockType.CULTURAL_NOTE;
  note: string; 
}

export interface FillInTheBlankExerciseBlock extends BaseContentBlock {
  type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE;
  sentenceParts: (string | null)[]; 
  correctAnswer: string;
  explanation?: string; 
}

export interface WritingPracticeBlock extends BaseContentBlock {
  type: ContentBlockType.WRITING_PRACTICE;
  characterToPractice: KanaCharacter;
  instructions?: string; 
  guidanceImageUrl?: string; 
}

export interface PronunciationPracticeContentBlock extends BaseContentBlock {
  type: ContentBlockType.PRONUNCIATION_PRACTICE;
  instructionText: string;
  targetPhraseJapanese: string;
  targetPhraseRomaji: string;
  geminiSystemInstruction?: string; 
}

export interface AiTutorStreamContentBlock extends BaseContentBlock {
  type: ContentBlockType.AI_TUTOR_STREAM;
  initialSystemPrompt: string;
  placeholderText?: string;
}

export interface InterestingFactContentBlock extends BaseContentBlock {
  type: ContentBlockType.INTERESTING_FACT;
  storyTitle: string;
  storyMarkdown: string;
  relatedVocabularyIds: string[]; // IDs of VocabularyItem from the same lesson
}

export type LessonContentBlock = 
  | TextContentBlock 
  | KanaInfoContentBlock 
  | VocabularyListContentBlock 
  | GrammarExplanationContentBlock 
  | GeminiPracticeContentBlock // Keep for backward compatibility if any old data exists
  | CulturalNoteContentBlock
  | FillInTheBlankExerciseBlock
  | WritingPracticeBlock
  | PronunciationPracticeContentBlock // Keep for backward compatibility
  | AiTutorStreamContentBlock
  | InterestingFactContentBlock; // Added new block type

export interface LessonDay {
  day: number;
  title: string;
  category: string; 
  overview: string; 
  contentBlocks: LessonContentBlock[];
}

export interface GeminiResponse {
  text?: string;
  json?: any;
  error?: string;
}

export enum SrsLevel {
  NEW = 0,
  LEARNING = 1, 
  KNOWN = 2,    
  MASTERED = 3  
}

export interface UserVocabularySrsEntry {
  srsLevel: SrsLevel;
  lastReviewed?: string; 
  nextReview?: string;   
}

export type UserVocabularySrsData = Record<string, UserVocabularySrsEntry>; 

// For AiTutorStream component
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text?: string; // Text content of the message
  audioUrl?: string; // URL for user's recorded audio
  isThinking?: boolean; // AI is processing indicator
  isError?: boolean;
}