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
  GEMINI_PRACTICE = 'GEMINI_PRACTICE',
  CULTURAL_NOTE = 'CULTURAL_NOTE',
  FILL_IN_THE_BLANK_EXERCISE = 'FILL_IN_THE_BLANK_EXERCISE',
  WRITING_PRACTICE = 'WRITING_PRACTICE',
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
  audioSrc?: string; // For pre-recorded audio, primarily will use TTS
  strokeOrderDiagramUrl?: string; // URL to an image/gif showing stroke order
  strokeCount?: number;
}
export interface KanaInfoContentBlock extends BaseContentBlock {
  type: ContentBlockType.KANA_INFO;
  kanaSet: 'hiragana' | 'katakana';
  introduction: string;
  characters: KanaCharacter[];
}

export interface VocabularyItem {
  id: string; // Unique ID, e.g., "day1-vocab-0"
  japanese: string;
  romaji: string;
  meaning: string;
  exampleSentence?: string; 
  exampleSentenceRomaji?: string;
  exampleSentenceMeaning?: string;
  audioSrc?: string; // For pre-recorded audio, primarily will use TTS
}

export interface VocabularyListContentBlock extends BaseContentBlock {
  type: ContentBlockType.VOCABULARY_LIST;
  items: VocabularyItem[];
}

export interface GrammarExplanationContentBlock extends BaseContentBlock {
  type: ContentBlockType.GRAMMAR_EXPLANATION;
  explanation: string; // Markdown supported
  exampleSentences: VocabularyItem[]; // Reusing VocabularyItem for structure, id might not be relevant here or could be "grammar-ex-N"
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
  note: string; // Markdown supported
}

export interface FillInTheBlankExerciseBlock extends BaseContentBlock {
  type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE;
  sentenceParts: (string | null)[]; // Array of strings and null (for blank). e.g., ["猫は", null, "です。"]
  correctAnswer: string;
  explanation?: string; // Explanation for the correct answer
}

export interface WritingPracticeBlock extends BaseContentBlock {
  type: ContentBlockType.WRITING_PRACTICE;
  characterToPractice: KanaCharacter;
  instructions?: string; // e.g., "Practice writing 'あ'. Pay attention to stroke order and balance."
  guidanceImageUrl?: string; // Optional image to display as faint background in canvas
}

export type LessonContentBlock = 
  | TextContentBlock 
  | KanaInfoContentBlock 
  | VocabularyListContentBlock 
  | GrammarExplanationContentBlock 
  | GeminiPracticeContentBlock 
  | CulturalNoteContentBlock
  | FillInTheBlankExerciseBlock
  | WritingPracticeBlock;

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

// SRS Data Structure
export enum SrsLevel {
  NEW = 0,
  LEARNING = 1, // Reviewed once or twice, still shaky
  KNOWN = 2,    // Fairly comfortable
  MASTERED = 3  // Confidently known
}

export interface UserVocabularySrsEntry {
  srsLevel: SrsLevel;
  lastReviewed?: string; // ISO date string
  nextReview?: string;   // ISO date string (for more complex scheduling)
}

export type UserVocabularySrsData = Record<string, UserVocabularySrsEntry>; // Keyed by VocabularyItem.id
