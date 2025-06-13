

import { LessonDay, ContentBlockType, LessonType, KanaCharacter, VocabularyListContentBlock, GrammarExplanationContentBlock, KanaInfoContentBlock, FillInTheBlankExerciseBlock, PronunciationPracticeContentBlock, TextContentBlock, AiTutorStreamContentBlock, InterestingFactContentBlock, VocabularyItem } from '../types';

const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/predragcvetkovski/kanji.gif/master/';

// Helper function to ensure character data is found
const getCharOrThrow = (charSet: KanaCharacter[], charSymbol: string, lessonContext: string): KanaCharacter => {
  const foundChar = charSet.find(c => c.char === charSymbol);
  if (!foundChar) {
    throw new Error(`Data integrity error: Character '${charSymbol}' not found in its set for ${lessonContext}.`);
  }
  return foundChar;
};

const hiraganaVowels: KanaCharacter[] = [
  { char: 'あ', romaji: 'a', exampleWord: 'あさ', exampleRomaji: 'asa', exampleMeaning: 'morning', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/あ.gif` },
  { char: 'い', romaji: 'i', exampleWord: 'いぬ', exampleRomaji: 'inu', exampleMeaning: 'dog', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/い.gif` },
  { char: 'う', romaji: 'u', exampleWord: 'うみ', exampleRomaji: 'umi', exampleMeaning: 'sea', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/う.gif` },
  { char: 'え', romaji: 'e', exampleWord: 'えき', exampleRomaji: 'eki', exampleMeaning: 'station', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/え.gif` },
  { char: 'お', romaji: 'o', exampleWord: 'おと', exampleRomaji: 'oto', exampleMeaning: 'sound', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/お.gif` },
];

const hiraganaKLine: KanaCharacter[] = [
  { char: 'か', romaji: 'ka', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/か.gif`, exampleWord: 'かさ', exampleRomaji: 'kasa', exampleMeaning: 'umbrella' },
  { char: 'き', romaji: 'ki', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/き.gif`, exampleWord: 'きく', exampleRomaji: 'kiku', exampleMeaning: 'to listen' },
  { char: 'く', romaji: 'ku', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/く.gif`, exampleWord: 'くつ', exampleRomaji: 'kutsu', exampleMeaning: 'shoes' },
  { char: 'け', romaji: 'ke', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/け.gif`, exampleWord: 'けむし', exampleRomaji: 'kemushi', exampleMeaning: 'caterpillar' },
  { char: 'こ', romaji: 'ko', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/こ.gif`, exampleWord: 'こえ', exampleRomaji: 'koe', exampleMeaning: 'voice' },
];

const hiraganaSLine: KanaCharacter[] = [
  { char: 'さ', romaji: 'sa', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/さ.gif` },
  { char: 'し', romaji: 'shi', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/し.gif` },
  { char: 'す', romaji: 'su', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/す.gif` },
  { char: 'せ', romaji: 'se', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/せ.gif` },
  { char: 'そ', romaji: 'so', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/そ.gif` },
];

const hiraganaTLine: KanaCharacter[] = [
  { char: 'た', romaji: 'ta', exampleWord: 'たな', exampleRomaji: 'tana', exampleMeaning: 'shelf', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/た.gif` },
  { char: 'ち', romaji: 'chi', exampleWord: 'ちか', exampleRomaji: 'chika', exampleMeaning: 'near', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ち.gif` },
  { char: 'つ', romaji: 'tsu', exampleWord: 'つくえ', exampleRomaji: 'tsukue', exampleMeaning: 'desk', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/つ.gif` },
  { char: 'て', romaji: 'te', exampleWord: 'て', exampleRomaji: 'te', exampleMeaning: 'hand', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/て.gif` },
  { char: 'と', romaji: 'to', exampleWord: 'とけい', exampleRomaji: 'tokei', exampleMeaning: 'clock', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/と.gif` },
];

const hiraganaNLine: KanaCharacter[] = [
  { char: 'な', romaji: 'na', exampleWord: 'なつ', exampleRomaji: 'natsu', exampleMeaning: 'summer', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/な.gif` },
  { char: 'に', romaji: 'ni', exampleWord: 'にく', exampleRomaji: 'niku', exampleMeaning: 'meat', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/に.gif` },
  { char: 'ぬ', romaji: 'nu', exampleWord: 'いぬ', exampleRomaji: 'inu', exampleMeaning: 'dog', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぬ.gif` },
  { char: 'ね', romaji: 'ne', exampleWord: 'ねこ', exampleRomaji: 'neko', exampleMeaning: 'cat', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ね.gif` },
  { char: 'の', romaji: 'no', exampleWord: 'のり', exampleRomaji: 'nori', exampleMeaning: 'seaweed', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/の.gif` },
];

const hiraganaHLine: KanaCharacter[] = [
  { char: 'は', romaji: 'ha', exampleWord: 'はな', exampleRomaji: 'hana', exampleMeaning: 'flower', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/は.gif` },
  { char: 'ひ', romaji: 'hi', exampleWord: 'ひと', exampleRomaji: 'hito', exampleMeaning: 'person', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ひ.gif` },
  { char: 'ふ', romaji: 'fu', exampleWord: 'ふね', exampleRomaji: 'fune', exampleMeaning: 'boat', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ふ.gif` },
  { char: 'へ', romaji: 'he', exampleWord: 'へや', exampleRomaji: 'heya', exampleMeaning: 'room', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/へ.gif` },
  { char: 'ほ', romaji: 'ho', exampleWord: 'ほし', exampleRomaji: 'hoshi', exampleMeaning: 'star', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ほ.gif` },
];

const hiraganaMLine: KanaCharacter[] = [
  { char: 'ま', romaji: 'ma', exampleWord: 'まど', exampleRomaji: 'mado', exampleMeaning: 'window', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ま.gif` },
  { char: 'み', romaji: 'mi', exampleWord: 'みみ', exampleRomaji: 'mimi', exampleMeaning: 'ear', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/み.gif` },
  { char: 'む', romaji: 'mu', exampleWord: 'むし', exampleRomaji: 'mushi', exampleMeaning: 'insect', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/む.gif` },
  { char: 'め', romaji: 'me', exampleWord: 'め', exampleRomaji: 'me', exampleMeaning: 'eye', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/め.gif` },
  { char: 'も', romaji: 'mo', exampleWord: 'もも', exampleRomaji: 'momo', exampleMeaning: 'peach', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/も.gif` },
];

const hiraganaYLine: KanaCharacter[] = [
  { char: 'や', romaji: 'ya', exampleWord: 'やま', exampleRomaji: 'yama', exampleMeaning: 'mountain', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/や.gif` },
  { char: 'ゆ', romaji: 'yu', exampleWord: 'ゆき', exampleRomaji: 'yuki', exampleMeaning: 'snow', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ゆ.gif` },
  { char: 'よ', romaji: 'yo', exampleWord: 'よる', exampleRomaji: 'yoru', exampleMeaning: 'night', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/よ.gif` },
];

const hiraganaRLine: KanaCharacter[] = [
  { char: 'ら', romaji: 'ra', exampleWord: 'さくら', exampleRomaji: 'sakura', exampleMeaning: 'cherry blossom', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ら.gif` },
  { char: 'り', romaji: 'ri', exampleWord: 'とり', exampleRomaji: 'tori', exampleMeaning: 'bird', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/り.gif` },
  { char: 'る', romaji: 'ru', exampleWord: 'はる', exampleRomaji: 'haru', exampleMeaning: 'spring', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/る.gif` },
  { char: 'れ', romaji: 're', exampleWord: 'これ', exampleRomaji: 'kore', exampleMeaning: 'this', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/れ.gif` },
  { char: 'ろ', romaji: 'ro', exampleWord: 'しろ', exampleRomaji: 'shiro', exampleMeaning: 'white', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ろ.gif` },
];

const hiraganaWLineN: KanaCharacter[] = [
  { char: 'わ', romaji: 'wa', exampleWord: 'わたし', exampleRomaji: 'watashi', exampleMeaning: 'I/me', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/わ.gif` },
  { char: 'を', romaji: 'wo (o)', exampleWord: 'ほんをよむ', exampleRomaji: 'hon o yomu', exampleMeaning: 'read a book (object marker)', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/を.gif` },
  { char: 'ん', romaji: 'n', exampleWord: 'パン', exampleRomaji: 'pan', exampleMeaning: 'bread', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ん.gif` },
];


const hiraganaDakutenGZDB: KanaCharacter[] = [
  { char: 'が', romaji: 'ga', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/が.gif` },
  { char: 'ぎ', romaji: 'gi', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぎ.gif` },
  { char: 'ぐ', romaji: 'gu', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぐ.gif` },
  { char: 'げ', romaji: 'ge', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/げ.gif` },
  { char: 'ご', romaji: 'go', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ご.gif` },
  { char: 'ざ', romaji: 'za', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ざ.gif` },
  { char: 'じ', romaji: 'ji', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/じ.gif` },
  { char: 'ず', romaji: 'zu', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ず.gif` },
  { char: 'ぜ', romaji: 'ze', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぜ.gif` },
  { char: 'ぞ', romaji: 'zo', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぞ.gif` },
  { char: 'だ', romaji: 'da', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/だ.gif` },
  { char: 'ぢ', romaji: 'ji (di)', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぢ.gif` }, // rare, filename is di.gif
  { char: 'づ', romaji: 'zu (du)', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/づ.gif` }, // rare, filename is du.gif
  { char: 'で', romaji: 'de', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/で.gif` },
  { char: 'ど', romaji: 'do', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ど.gif` },
  { char: 'ば', romaji: 'ba', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ば.gif` },
  { char: 'び', romaji: 'bi', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/び.gif` },
  { char: 'ぶ', romaji: 'bu', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぶ.gif` },
  { char: 'べ', romaji: 'be', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/べ.gif` },
  { char: 'ぼ', romaji: 'bo', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぼ.gif` },
];

const hiraganaHandakutenP: KanaCharacter[] = [
  { char: 'ぱ', romaji: 'pa', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぱ.gif` },
  { char: 'ぴ', romaji: 'pi', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぴ.gif` },
  { char: 'ぷ', romaji: 'pu', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぷ.gif` },
  { char: 'ぺ', romaji: 'pe', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/gif/150x150/ぺ.gif` },
  { char: 'ぽ', romaji: 'po', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}hiragana/static/150x150/ぽ.png` },
];

const hiraganaYoon: KanaCharacter[] = [ 
  { char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' },
  { char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' },
  { char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' },
  { char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' },
  { char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' },
  { char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' },
  { char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' },
  { char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' },
  { char: 'じゃ', romaji: 'ja' }, { char: 'じゅ', romaji: 'ju' }, { char: 'じょ', romaji: 'jo' },
  { char: 'ぢゃ', romaji: 'ja (dja)' }, { char: 'ぢゅ', romaji: 'ju (dju)' }, { char: 'ぢょ', romaji: 'jo (djo)' }, // rare
  { char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' },
  { char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' },
];


const katakanaVowels: KanaCharacter[] = [
  { char: 'ア', romaji: 'a', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ア.gif` },
  { char: 'イ', romaji: 'i', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/イ.gif` },
  { char: 'ウ', romaji: 'u', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ウ.gif` },
  { char: 'エ', romaji: 'e', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/エ.gif` },
  { char: 'オ', romaji: 'o', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/オ.gif` },
];

const katakanaKLine: KanaCharacter[] = [
  { char: 'カ', romaji: 'ka', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/カ.gif` },
  { char: 'キ', romaji: 'ki', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/キ.gif` },
  { char: 'ク', romaji: 'ku', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ク.gif` },
  { char: 'ケ', romaji: 'ke', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ケ.gif` },
  { char: 'コ', romaji: 'ko', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/コ.gif` },
];

const katakanaSLine: KanaCharacter[] = [
  { char: 'サ', romaji: 'sa', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/サ.gif` },
  { char: 'シ', romaji: 'shi', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/シ.gif` },
  { char: 'ス', romaji: 'su', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ス.gif` },
  { char: 'セ', romaji: 'se', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/セ.gif` },
  { char: 'ソ', romaji: 'so', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ソ.gif` },
];

const katakanaTLine: KanaCharacter[] = [
  { char: 'タ', romaji: 'ta', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/タ.gif` },
  { char: 'チ', romaji: 'chi', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/チ.gif` },
  { char: 'ツ', romaji: 'tsu', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ツ.gif` },
  { char: 'テ', romaji: 'te', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/テ.gif` },
  { char: 'ト', romaji: 'to', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ト.gif` },
];

const katakanaNLine: KanaCharacter[] = [
  { char: 'ナ', romaji: 'na', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ナ.gif` },
  { char: 'ニ', romaji: 'ni', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ニ.gif` },
  { char: 'ヌ', romaji: 'nu', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヌ.gif` },
  { char: 'ネ', romaji: 'ne', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ネ.gif` },
  { char: 'ノ', romaji: 'no', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ノ.gif` },
];

const katakanaHLine: KanaCharacter[] = [
  { char: 'ハ', romaji: 'ha', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ハ.gif` },
  { char: 'ヒ', romaji: 'hi', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヒ.gif` },
  { char: 'フ', romaji: 'fu', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/フ.gif` },
  { char: 'ヘ', romaji: 'he', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヘ.gif` },
  { char: 'ホ', romaji: 'ho', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ホ.gif` },
];

const katakanaMLine: KanaCharacter[] = [
  { char: 'マ', romaji: 'ma', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/マ.gif` },
  { char: 'ミ', romaji: 'mi', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ミ.gif` },
  { char: 'ム', romaji: 'mu', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ム.gif` },
  { char: 'メ', romaji: 'me', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/メ.gif` },
  { char: 'モ', romaji: 'mo', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/モ.gif` },
];

const katakanaYLine: KanaCharacter[] = [
  { char: 'ヤ', romaji: 'ya', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヤ.gif` },
  { char: 'ユ', romaji: 'yu', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ユ.gif` },
  { char: 'ヨ', romaji: 'yo', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヨ.gif` },
];

const katakanaRLine: KanaCharacter[] = [
  { char: 'ラ', romaji: 'ra', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ラ.gif` },
  { char: 'リ', romaji: 'ri', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/リ.gif` },
  { char: 'ル', romaji: 'ru', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ル.gif` },
  { char: 'レ', romaji: 're', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/レ.gif` },
  { char: 'ロ', romaji: 'ro', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ロ.gif` },
];

const katakanaWLineN: KanaCharacter[] = [
  { char: 'ワ', romaji: 'wa', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ワ.gif` },
  { char: 'ヰ', romaji: 'wi', strokeCount: 4, strokeOrderDiagramUrl: `https://upload.wikimedia.org/wikipedia/commons/d/d6/Katakana_%E3%83%B0_stroke_order_animation.gif` }, // Obsolete
  { char: 'ヱ', romaji: 'we', strokeCount: 3, strokeOrderDiagramUrl: `https://upload.wikimedia.org/wikipedia/commons/1/14/Katakana_%E3%83%B1_stroke_order_animation.gif` }, // Obsolete
  { char: 'ヲ', romaji: 'wo (o)', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}katakana/gif/150x150/ヲ.gif` }, // Rare, mostly for stylistic use
  { char: 'ン', romaji: 'n', strokeCount: 2, strokeOrderDiagramUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Katakana_%E3%83%B3_stroke_order_animation.gif/285px-Katakana_%E3%83%B3_stroke_order_animation.gif` },
];

const katakanaDakuten: KanaCharacter[] = [
  { char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' },
  { char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' },
  { char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'ji (di)' }, { char: 'ヅ', romaji: 'zu (du)' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' },
  { char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' },
  { char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' },
  { char: 'ヴ', romaji: 'vu' }, // For 'v' sounds
];

const katakanaYoon: KanaCharacter[] = [
  { char: 'キャ', romaji: 'kya' }, { char: 'キュ', romaji: 'kyu' }, { char: 'キョ', romaji: 'kyo' },
  { char: 'シャ', romaji: 'sha' }, { char: 'シュ', romaji: 'shu' }, { char: 'ショ', romaji: 'sho' },
  { char: 'チャ', romaji: 'cha' }, { char: 'チュ', romaji: 'chu' }, { char: 'チョ', romaji: 'cho' },
  { char: 'ニャ', romaji: 'nya' }, { char: 'ニュ', romaji: 'nyu' }, { char: 'ニョ', romaji: 'nyo' },
  { char: 'ヒャ', romaji: 'hya' }, { char: 'ヒュ', romaji: 'hyu' }, { char: 'ヒョ', romaji: 'hyo' },
  { char: 'ミャ', romaji: 'mya' }, { char: 'ミュ', romaji: 'myu' }, { char: 'ミョ', romaji: 'myo' },
  { char: 'リャ', romaji: 'rya' }, { char: 'リュ', romaji: 'ryu' }, { char: 'リョ', romaji: 'ryo' },
  { char: 'ギャ', romaji: 'gya' }, { char: 'ギュ', romaji: 'gyu' }, { char: 'ギョ', romaji: 'gyo' },
  { char: 'ジャ', romaji: 'ja' }, { char: 'ジュ', romaji: 'ju' }, { char: 'ジョ', romaji: 'jo' },
  { char: 'ヂャ', romaji: 'ja (dja)' }, { char: 'ヂュ', romaji: 'ju (dju)' }, { char: 'ヂョ', romaji: 'jo (djo)' },
  { char: 'ビャ', romaji: 'bya' }, { char: 'ビュ', romaji: 'byu' }, { char: 'ビョ', romaji: 'byo' },
  { char: 'ピャ', romaji: 'pya' }, { char: 'ピュ', romaji: 'pyu' }, { char: 'ピョ', romaji: 'pyo' },
  // Extended Katakana for foreign sounds
  { char: 'ウィ', romaji: 'wi' }, { char: 'ウェ', romaji: 'we' }, { char: 'ウォ', romaji: 'wo' },
  { char: 'ヴァ', romaji: 'va' }, { char: 'ヴィ', romaji: 'vi' }, { char: 'ヴェ', romaji: 've' }, { char: 'ヴォ', romaji: 'vo' },
  { char: 'シェ', romaji: 'she' }, { char: 'ジェ', romaji: 'je' },
  { char: 'チェ', romaji: 'che' },
  { char: 'ティ', romaji: 'ti' }, { char: 'トゥ', romaji: 'tu' },
  { char: 'ディ', romaji: 'di' }, { char: 'ドゥ', romaji: 'du' },
  { char: 'ファ', romaji: 'fa' }, { char: 'フィ', romaji: 'fi' }, { char: 'フェ', romaji: 'fe' }, { char: 'フォ', romaji: 'fo' },
];

// Kanji Section
const kanjiSet1_NumbersPeopleDay: KanaCharacter[] = [
  { char: '一', romaji: 'ichi, hito(tsu)', exampleWord: '一つ (hitotsu)', exampleRomaji: 'hitotsu', exampleMeaning: 'one (thing)', strokeCount: 1, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/一.gif` },
  { char: '二', romaji: 'ni, futa(tsu)', exampleWord: '二つ (futatsu)', exampleRomaji: 'futatsu', exampleMeaning: 'two (things)', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/二.gif` },
  { char: '三', romaji: 'san, mit(tsu)', exampleWord: '三つ (mittsu)', exampleRomaji: 'mittsu', exampleMeaning: 'three (things)', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/三.gif` },
  { char: '人', romaji: 'jin, nin, hito', exampleWord: '日本人 (nihonjin)', exampleRomaji: 'nihonjin', exampleMeaning: 'Japanese person', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/人.gif` },
  { char: '日', romaji: 'nichi, jitsu, hi, -ka', exampleWord: '日曜日 (nichiyoubi)', exampleRomaji: 'nichiyoubi', exampleMeaning: 'Sunday', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/日.gif` },
];

const kanjiSet2_ElementsTime: KanaCharacter[] = [
  { char: '月', romaji: 'getsu, gatsu, tsuki', exampleWord: '月曜日 (getsuyoubi)', exampleRomaji: 'getsuyoubi', exampleMeaning: 'Monday', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/月.gif` },
  { char: '火', romaji: 'ka, hi, -bi', exampleWord: '火曜日 (kayoubi)', exampleRomaji: 'kayoubi', exampleMeaning: 'Tuesday', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/火.gif` },
  { char: '水', romaji: 'sui, mizu', exampleWord: '水曜日 (suiyoubi)', exampleRomaji: 'suiyoubi', exampleMeaning: 'Wednesday', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/水.gif` },
  { char: '木', romaji: 'moku, boku, ki, ko-', exampleWord: '木曜日 (mokuyoubi)', exampleRomaji: 'mokuyoubi', exampleMeaning: 'Thursday', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/木.gif` },
  { char: '金', romaji: 'kin, kon, kane', exampleWord: '金曜日 (kinyoubi)', exampleRomaji: 'kinyoubi', exampleMeaning: 'Friday', strokeCount: 8, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/金.gif` },
  { char: '土', romaji: 'do, to, tsuchi', exampleWord: '土曜日 (doyoubi)', exampleRomaji: 'doyoubi', exampleMeaning: 'Saturday', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/土.gif` },
  { char: '年', romaji: 'nen, toshi', exampleWord: '今年 (kotoshi)', exampleRomaji: 'kotoshi', exampleMeaning: 'this year', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/年.gif` },
];

const kanjiSet3_SizesPosition: KanaCharacter[] = [
  { char: '大', romaji: 'dai, tai, oo(kii)', exampleWord: '大学 (daigaku)', exampleRomaji: 'daigaku', exampleMeaning: 'university', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/大.gif` },
  { char: '小', romaji: 'shou, chii(sai), ko-, o-', exampleWord: '小さい (chiisai)', exampleRomaji: 'chiisai', exampleMeaning: 'small', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/小.gif` },
  { char: '中', romaji: 'chuu, naka', exampleWord: '中国 (chuugoku)', exampleRomaji: 'chuugoku', exampleMeaning: 'China', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/中.gif` },
  { char: '上', romaji: 'jou, shou, ue, uwa-, kami, a(geru), nobo(ru)', exampleWord: '上 (ue)', exampleRomaji: 'ue', exampleMeaning: 'up, above', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/上.gif` },
  { char: '下', romaji: 'ka, ge, shita, shimo, moto, sa(geru), o(riru), kuda(saru)', exampleWord: '下 (shita)', exampleRomaji: 'shita', exampleMeaning: 'down, below', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/下.gif` },
  { char: '右', romaji: 'u, yuu, migi', exampleWord: '右手 (migite)', exampleRomaji: 'migite', exampleMeaning: 'right hand', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/右.gif` },
  { char: '左', romaji: 'sa, sha, hidari', exampleWord: '左手 (hidarite)', exampleRomaji: 'hidarite', exampleMeaning: 'left hand', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/左.gif` },
];

const kanjiSet4_DirectionsPlaces: KanaCharacter[] = [
  { char: '東', romaji: 'tou, higashi', exampleWord: '東京 (toukyou)', exampleRomaji: 'toukyou', exampleMeaning: 'Tokyo', strokeCount: 8, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/東.gif` },
  { char: '西', romaji: 'sei, sai, nishi', exampleWord: '西口 (nishiguchi)', exampleRomaji: 'nishiguchi', exampleMeaning: 'west exit', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/西.gif` },
  { char: '南', romaji: 'nan, na, minami', exampleWord: '南アメリカ (minami amerika)', exampleRomaji: 'minami amerika', exampleMeaning: 'South America', strokeCount: 9, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/南.gif` },
  { char: '北', romaji: 'hoku, kita', exampleWord: '北海道 (hokkaidou)', exampleRomaji: 'hokkaidou', exampleMeaning: 'Hokkaido', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/北.gif` },
  { char: '口', romaji: 'kou, ku, kuchi', exampleWord: '入口 (iriguchi)', exampleRomaji: 'iriguchi', exampleMeaning: 'entrance', strokeCount: 3, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/口.gif` },
  { char: '出', romaji: 'shutsu, sui, de(ru), da(su)', exampleWord: '出口 (deguchi)', exampleRomaji: 'deguchi', exampleMeaning: 'exit', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/出.gif` },
  { char: '入', romaji: 'nyuu, ju, i(ru), hai(ru)', exampleWord: '入る (hairu)', exampleRomaji: 'hairu', exampleMeaning: 'to enter', strokeCount: 2, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/入.gif` },
  { char: '本', romaji: 'hon, moto', exampleWord: '本 (hon)', exampleRomaji: 'hon', exampleMeaning: 'book', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/本.gif` },
];

const kanjiSet5_VerbsActions: KanaCharacter[] = [
  { char: '見', romaji: 'ken, mi(ru)', exampleWord: '見る (miru)', exampleRomaji: 'miru', exampleMeaning: 'to see/watch', strokeCount: 7, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/見.gif` },
  { char: '聞', romaji: 'bun, mon, ki(ku)', exampleWord: '聞く (kiku)', exampleRomaji: 'kiku', exampleMeaning: 'to hear/listen/ask', strokeCount: 14, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/聞.gif` },
  { char: '言', romaji: 'gen, gon, i(u), koto', exampleWord: '言う (iu)', exampleRomaji: 'iu', exampleMeaning: 'to say/speak', strokeCount: 7, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/言.gif` },
  { char: '話', romaji: 'wa, hana(su), hanashi', exampleWord: '話す (hanasu)', exampleRomaji: 'hanasu', exampleMeaning: 'to talk/speak', strokeCount: 13, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/話.gif` },
  { char: '食', romaji: 'shoku, jiki, ta(beru), ku(u)', exampleWord: '食べる (taberu)', exampleRomaji: 'taberu', exampleMeaning: 'to eat', strokeCount: 9, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/食.gif` },
  { char: '飲', romaji: 'in, on, no(mu)', exampleWord: '飲む (nomu)', exampleRomaji: 'nomu', exampleMeaning: 'to drink', strokeCount: 12, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/飲.gif` },
];

const kanjiSet6_Adjectives: KanaCharacter[] = [
  { char: '新', romaji: 'shin, atara(shii), ara(ta), nii-', exampleWord: '新しい (atarashii)', exampleRomaji: 'atarashii', exampleMeaning: 'new', strokeCount: 13, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/新.gif` },
  { char: '古', romaji: 'ko, furu(i)', exampleWord: '古い (furui)', exampleRomaji: 'furui', exampleMeaning: 'old', strokeCount: 5, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/古.gif` },
  { char: '多', romaji: 'ta, oo(i)', exampleWord: '多い (ooi)', exampleRomaji: 'ooi', exampleMeaning: 'many, much', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/多.gif` },
  { char: '少', romaji: 'shou, suku(nai), suko(shi)', exampleWord: '少ない (sukunai)', exampleRomaji: 'sukunai', exampleMeaning: 'few, little', strokeCount: 4, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/少.gif` },
  { char: '安', romaji: 'an, yasu(i)', exampleWord: '安い (yasui)', exampleRomaji: 'yasui', exampleMeaning: 'cheap, peaceful', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/安.gif` },
  { char: '高', romaji: 'kou, taka(i)', exampleWord: '高い (takai)', exampleRomaji: 'takai', exampleMeaning: 'high, tall, expensive', strokeCount: 10, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/高.gif` },
];

const kanjiSet7_ActionsMisc: KanaCharacter[] = [
  { char: '行', romaji: 'kou, gyou, an, i(ku), yu(ku), okona(u)', exampleWord: '行く (iku)', exampleRomaji: 'iku', exampleMeaning: 'to go', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/行.gif` },
  { char: '買', romaji: 'bai, ka(u)', exampleWord: '買う (kau)', exampleRomaji: 'kau', exampleMeaning: 'to buy', strokeCount: 12, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/買.gif` },
  { char: '旅', romaji: 'ryo, tabi', exampleWord: '旅行 (ryokou)', exampleRomaji: 'ryokou', exampleMeaning: 'travel, trip', strokeCount: 10, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/旅.gif` },
  { char: '好', romaji: 'kou, kono(mu), su(ku)', exampleWord: '好き (suki)', exampleRomaji: 'suki', exampleMeaning: 'like, fond of', strokeCount: 6, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/好.gif` },
];

const kanji_Toki_Time: KanaCharacter[] = [ 
  { char: '時', romaji: 'ji, toki', exampleWord: '時間 (jikan)', exampleMeaning: 'time, duration', strokeCount: 10, strokeOrderDiagramUrl: `${GITHUB_RAW_BASE_URL}kanji/gif/150x150/時.gif` }
];

// Helper function to generate AI Tutor system prompt
const generateAiTutorPrompt = (day: number, lessonTitle: string, lessonOverview: string): string => {
  return `You are a friendly and patient Japanese language tutor named 'Sakura Sensei'.
The user is currently on Day ${day} of their learning plan, which is titled "${lessonTitle}".
Today's lesson overview: "${lessonOverview}".
Your goal is to help the user practice the concepts from today's lesson. Engage the user in a conversation related to these topics.
You can:
- Ask questions related to the lesson.
- Suggest sentences for them to try using new vocabulary or grammar.
- Role-play simple scenarios relevant to the day's content.
- If the user uses English, gently guide them to try in Japanese if appropriate for the topic.
When responding:
- Primarily use simple Japanese.
- ALWAYS provide Romaji in parentheses after Japanese phrases or sentences, e.g., こんにちは (Konnichiwa).
- ALWAYS provide a concise English translation in square brackets after the Romaji, e.g., [Hello].
Example response format: 日本語の文 (Nihongo no bun) [Japanese sentence].
If the user sends an audio message, your response should:
1. First, provide a transcription of what you understood them to say, like: "You said: [transcribed audio in Japanese (Romaji)]".
2. Then, provide feedback on their pronunciation if it's relevant or if they struggled.
3. Finally, continue the conversation based on their utterance and the lesson topic.
Keep your responses relatively short, clear, and encouraging. Use emojis occasionally to make the interaction more engaging. Let's make learning fun! がんばりましょう！ (Ganbarimashou!) [Let's do our best!]`;
};


export const thirtyDayPlan_Unprocessed: LessonDay[] = [
  // Day 1: Introduction to Hiragana (Vowels)
  {
    day: 1,
    title: 'Hiragana Vowels & Basic Greetings',
    category: 'Hiragana & Greetings',
    overview: 'Learn the first 5 Hiragana characters (the vowels) and some essential Japanese greetings. Practice writing and pronunciation.',
    contentBlocks: [
      { id: 'd1-intro', type: ContentBlockType.TEXT, title: 'Welcome to Day 1!', markdownContent: 'Today, we embark on our Japanese learning journey! We will start with the foundational phonetic script, Hiragana, and learn some basic greetings. がんばって (ganbatte - good luck)!' },
      { id: 'd1-hiragana-vowels', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: Vowel Sounds & Writing', introduction: 'These are the foundational vowel sounds in Japanese. Pay attention to their shapes, stroke order, and how they are pronounced.', characters: hiraganaVowels },
      {
        id: 'd1-vocab-greetings', type: ContentBlockType.VOCABULARY_LIST, title: 'Basic Greetings', items: [
          { id: 'd1-vocab-0', japanese: 'こんにちは', romaji: 'Konnichiwa', meaning: 'Hello / Good afternoon' },
          { id: 'd1-vocab-1', japanese: 'おはようございます', romaji: 'Ohayou gozaimasu', meaning: 'Good morning (formal)' },
          { id: 'd1-vocab-2', japanese: 'こんばんは', romaji: 'Konbanwa', meaning: 'Good evening' },
          { id: 'd1-vocab-3', japanese: 'ありがとう', romaji: 'Arigatou', meaning: 'Thank you' },
          { id: 'd1-vocab-4', japanese: 'はい', romaji: 'Hai', meaning: 'Yes' },
          { id: 'd1-vocab-5', japanese: 'いいえ', romaji: 'Iie', meaning: 'No' },
        ]
      },
      {
        id: 'd1-writing-practice-a',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: あ (a)',
        characterToPractice: getCharOrThrow(hiraganaVowels, 'あ', "Day 1 'あ' writing practice"),
        instructions: "Let's practice writing 'あ'. Follow the stroke order diagram. Try to get the proportions right. Click 'Clear' to try again.",
        guidanceImageUrl: getCharOrThrow(hiraganaVowels, 'あ', "Day 1 'あ' writing practice").strokeOrderDiagramUrl
      },
      // InterestingFactContentBlock for Day 1
      {
        id: 'd1-fact',
        type: ContentBlockType.INTERESTING_FACT,
        storyTitle: "The Magic of 'Hai!'",
        storyMarkdown: "Did you know that in Japan, saying **はい (Hai)** is more than just agreement? Often, it's a polite way to show you're actively listening, like saying 'uh-huh' or 'I hear you'. So, next time you hear it in a conversation, remember this important cultural nuance! \n\nOf course, a friendly **こんにちは (Konnichiwa)** during the day or **おはようございます (Ohayou gozaimasu)** when you start your day will always be appreciated. And a heartfelt **ありがとう (Arigatou)** goes a long way whenever someone helps you or offers something nice.",
        relatedVocabularyIds: ['d1-vocab-4', 'd1-vocab-0', 'd1-vocab-1', 'd1-vocab-3']
      },
    ],
  },
  // Day 2: Hiragana (K-line & S-line)
  {
    day: 2,
    title: 'Hiragana K-line & S-line',
    category: 'Hiragana',
    overview: 'Learn the Hiragana "k" sounds (ka, ki, ku, ke, ko) and "s" sounds (sa, shi, su, se, so). Practice combining them with vowels.',
    contentBlocks: [
      { id: 'd2-intro', type: ContentBlockType.TEXT, title: 'Continuing Hiragana!', markdownContent: 'Let\'s expand our Hiragana knowledge with two new consonant lines: K and S. Pay close attention to the subtle differences in shapes.' },
      { id: 'd2-hiragana-k', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: K-line (か, き, く, け, こ)', introduction: 'These characters combine "k" with the five vowel sounds.', characters: hiraganaKLine },
      { id: 'd2-hiragana-s', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: S-line (さ, し, す, せ, そ)', introduction: 'These characters combine "s" with the five vowel sounds. Note that し (shi) is pronounced like "she".', characters: hiraganaSLine },
      {
        id: 'd2-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'New Vocabulary with K & S', items: [
          { id: 'd2-vocab-0', japanese: 'かさ', romaji: 'kasa', meaning: 'umbrella' },
          { id: 'd2-vocab-1', japanese: 'すし', romaji: 'sushi', meaning: 'sushi' },
          { id: 'd2-vocab-2', japanese: 'せき', romaji: 'seki', meaning: 'cough / seat' },
          { id: 'd2-vocab-3', japanese: 'あかい', romaji: 'akai', meaning: 'red (adjective)' },
          { id: 'd2-vocab-4', japanese: 'どこ', romaji: 'doko', meaning: 'where?' },
        ]
      },
      {
        id: 'd2-writing-practice-ka',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: か (ka)',
        characterToPractice: getCharOrThrow(hiraganaKLine, 'か', "Day 2 'か' writing practice"),
        instructions: "Practice writing 'か'. Remember the stroke order.",
        guidanceImageUrl: getCharOrThrow(hiraganaKLine, 'か', "Day 2 'か' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd2-writing-practice-sa',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: さ (sa)',
        characterToPractice: getCharOrThrow(hiraganaSLine, 'さ', "Day 2 'さ' writing practice"),
        instructions: "Practice writing 'さ'. It has three strokes.",
        guidanceImageUrl: getCharOrThrow(hiraganaSLine, 'さ', "Day 2 'さ' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd2-fact',
        type: ContentBlockType.INTERESTING_FACT,
        storyTitle: "The Case of the Missing 'Si'",
        storyMarkdown: "When learning the 'S-line' (さしすせそ), you might notice that **し (shi)** sounds like 'shee' not 'see'. Why? Japanese phonetics have evolved over centuries! Long ago, there might have been a 'si' sound, but it merged into 'shi'. This is common in languages; sounds change! So, when you order **すし (sushi)**, or ask for an **あかい (akai)** [red] **かさ (kasa)** [umbrella] because it's raining, you're using these unique sounds.",
        relatedVocabularyIds: ['d2-vocab-1', 'd2-vocab-3', 'd2-vocab-0']
      },
    ],
  },
  // Day 3: Basic Grammar (A は B です) & Culture
  {
    day: 3,
    title: 'First Sentence: A は B です',
    category: 'Grammar & Culture',
    overview: 'Learn your first Japanese sentence structure: "A wa B desu" (A is B). Introduce particles は (wa) and です (desu). Plus, a quick cultural note.',
    contentBlocks: [
      { id: 'd3-intro', type: ContentBlockType.TEXT, title: 'Your First Sentences!', markdownContent: 'Today, we\'ll learn a fundamental sentence pattern. This will allow you to start forming simple descriptive sentences.' },
      {
        id: 'd3-grammar-desu', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'The Sentence Structure: A は B です (A wa B desu)',
        explanation: 'This is a very common way to say "A is B".\n- **A**: The topic or subject of the sentence.\n- **は (wa)**: A topic marker particle. Note: Hiragana は (ha) is pronounced "wa" when used as a particle.\n- **B**: What A is. This can be a noun or an adjective.\n- **です (desu)**: A copula, similar to "is" or "am" or "are". It makes the sentence polite.',
        exampleSentences: [
          { id: 'd3-gram-ex-0', japanese: 'わたしはがくせいです。', romaji: 'Watashi wa gakusei desu.', meaning: 'I am a student.' },
          { id: 'd3-gram-ex-1', japanese: 'これはかさです。', romaji: 'Kore wa kasa desu.', meaning: 'This is an umbrella.' },
          { id: 'd3-gram-ex-2', japanese: 'すしはたかいです。', romaji: 'Sushi wa takai desu.', meaning: 'Sushi is expensive.' }
        ]
      },
      {
        id: 'd3-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Useful Nouns for Sentences', items: [
          { id: 'd3-vocab-0', japanese: 'わたし', romaji: 'watashi', meaning: 'I' },
          { id: 'd3-vocab-1', japanese: 'あなた', romaji: 'anata', meaning: 'you' },
          { id: 'd3-vocab-2', japanese: 'これ', romaji: 'kore', meaning: 'this (thing near speaker)' },
          { id: 'd3-vocab-3', japanese: 'それ', romaji: 'sore', meaning: 'that (thing near listener)' },
          { id: 'd3-vocab-4', japanese: 'あれ', romaji: 'are', meaning: 'that (thing over there, far from both)' },
          { id: 'd3-vocab-5', japanese: 'がくせい', romaji: 'gakusei', meaning: 'student' },
          { id: 'd3-vocab-6', japanese: 'せんせい', romaji: 'sensei', meaning: 'teacher' },
          { id: 'd3-vocab-7', japanese: 'ほん', romaji: 'hon', meaning: 'book' },
        ]
      },
      {
        id: 'd3-fill-blank',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice',
        sentenceParts: ["これ", "ほん", "です。"], // Kore wa hon desu.
        correctAnswer: "は",
        explanation: "The particle は (wa) is used here to mark 'これ' (kore - this) as the topic of the sentence."
      },
      { id: 'd3-culture', type: ContentBlockType.CULTURAL_NOTE, title: 'A Quick Note on Bowing', note: 'Bowing (お辞儀 - ojigi) is a very important part of Japanese culture. The depth and duration of the bow depend on the situation and the relationship between the people. It\'s used for greetings, apologies, thanks, and showing respect.' },
      {
        id: 'd3-fact',
        type: ContentBlockType.INTERESTING_FACT,
        storyTitle: "The Mysterious 'Wa'",
        storyMarkdown: "The particle **は (wa)**, written with the Hiragana for 'ha', is a cornerstone of Japanese. It marks the topic of your sentence. Imagine you pick up a **ほん (hon)** [book] and want to say 'This is a book'. You'd use **これ (kore)** [this] and say: **これはほんです (Kore wa hon desu.)**. You, as **わたし (watashi)** [I], might be a **がくせい (gakusei)** [student], so you'd say: **わたしはがくせいです (Watashi wa gakusei desu.)**. Mastering 'は (wa)' is key to sounding natural!",
        relatedVocabularyIds: ['d3-vocab-7', 'd3-vocab-2', 'd3-vocab-0', 'd3-vocab-5']
      },
    ],
  },
  // Day 4: Hiragana (T-line & N-line) & Particles は, も
  {
    day: 4,
    title: 'Hiragana (た行, な行) & Particles は, も',
    category: 'Hiragana & Grammar',
    overview: 'Learn Hiragana T-line (ta, chi, tsu, te, to) and N-line (na, ni, nu, ne, no). Review particle は (wa) and introduce particle も (mo - also).',
    contentBlocks: [
      { id: 'd4-intro', type: ContentBlockType.TEXT, title: 'More Hiragana & Particles!', markdownContent: 'Let\'s master more Hiragana and learn a new useful particle!' },
      { id: 'd4-hiragana-t', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: T-line (た, ち, つ, て, と)', introduction: 'These are the "t" sounds. Note: ち (chi) and つ (tsu) have unique pronunciations.', characters: hiraganaTLine },
      { id: 'd4-hiragana-n', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: N-line (な, に, ぬ, ね, の)', introduction: 'These are the "n" sounds.', characters: hiraganaNLine },
      {
        id: 'd4-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with T & N', items: [
          { id: 'd4-vocab-0', japanese: 'たかい', romaji: 'takai', meaning: 'expensive / tall' },
          { id: 'd4-vocab-1', japanese: 'ちいさい', romaji: 'chiisai', meaning: 'small' },
          { id: 'd4-vocab-2', japanese: 'つくえ', romaji: 'tsukue', meaning: 'desk' },
          { id: 'd4-vocab-3', japanese: 'て', romaji: 'te', meaning: 'hand' },
          { id: 'd4-vocab-4', japanese: 'なに', romaji: 'nani', meaning: 'what?' },
          { id: 'd4-vocab-5', japanese: 'いぬ', romaji: 'inu', meaning: 'dog' },
          { id: 'd4-vocab-6', japanese: 'ねこ', romaji: 'neko', meaning: 'cat' },
        ]
      },
      {
        id: 'd4-writing-practice-ta',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: た (ta)',
        characterToPractice: getCharOrThrow(hiraganaTLine, 'た', "Day 4 'た' writing practice"),
        instructions: "Practice writing 'た'. It has 4 strokes.",
        guidanceImageUrl: getCharOrThrow(hiraganaTLine, 'た', "Day 4 'た' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd4-writing-practice-na',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: な (na)',
        characterToPractice: getCharOrThrow(hiraganaNLine, 'な', "Day 4 'な' writing practice"),
        instructions: "Practice writing 'な'. It also has 4 strokes.",
        guidanceImageUrl: getCharOrThrow(hiraganaNLine, 'な', "Day 4 'な' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd4-grammar-mo', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particles: は (wa) Review & も (mo - also)',
        explanation: '**は (wa)**: Marks the topic of the sentence. (e.g., これはほんです - Kore wa hon desu - This is a book.)\n\n**も (mo)**: Means "also" or "too". It replaces は (wa) or が (ga - subject marker, to be learned later) when you want to say that something applies to this item as well.\nIf A is X, and B is *also* X, you say: 「AはXです。BもXです。」 (A wa X desu. B mo X desu.)',
        exampleSentences: [
          { id: 'd4-gram-ex-0', japanese: 'わたしはがくせいです。', romaji: 'Watashi wa gakusei desu.', meaning: 'I am a student.' },
          { id: 'd4-gram-ex-1', japanese: 'あなたもがくせいです。', romaji: 'Anata mo gakusei desu.', meaning: 'You are also a student.' },
          { id: 'd4-gram-ex-2', japanese: 'これはねこです。それもねこです。', romaji: 'Kore wa neko desu. Sore mo neko desu.', meaning: 'This is a cat. That is also a cat.' }
        ]
      },
      {
        id: 'd4-fill-blank-mo',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice (も)',
        sentenceParts: ["たなかさんはせんせいです。やまださん", "せんせいですか。"], 
        correctAnswer: "も",
        explanation: "The particle も (mo) is used here to ask if Yamada-san is *also* a teacher, just like Tanaka-san."
      },
      // ADD DAY 4 FACT HERE IF IMPLEMENTING FOR ALL DAYS
    ],
  },
  // Day 5: Hiragana (H-line & M-line) & Asking Questions (か)
  {
    day: 5,
    title: 'Hiragana (は行, ま行) & Asking Questions (か)',
    category: 'Hiragana & Grammar',
    overview: 'Learn Hiragana H-line (ha, hi, fu, he, ho) and M-line (ma, mi, mu, me, mo). Learn how to form basic questions using the particle か (ka).',
    contentBlocks: [
      { id: 'd5-intro', type: ContentBlockType.TEXT, title: 'Final Basic Hiragana Rows & Questions!', markdownContent: 'Today we will cover more Hiragana and learn a crucial skill: asking questions!' },
      { id: 'd5-hiragana-h', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: H-line (は, ひ, ふ, へ, ほ)', introduction: 'These are the "h" sounds. Remember, は (ha) is pronounced "wa" when used as a topic particle!', characters: hiraganaHLine },
      { id: 'd5-hiragana-m', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: M-line (ま, み, む, め, も)', introduction: 'These are the "m" sounds.', characters: hiraganaMLine },
      {
        id: 'd5-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with H & M', items: [
          { id: 'd5-vocab-0', japanese: 'はな', romaji: 'hana', meaning: 'flower / nose' },
          { id: 'd5-vocab-1', japanese: 'ひと', romaji: 'hito', meaning: 'person' },
          { id: 'd5-vocab-2', japanese: 'ふね', romaji: 'fune', meaning: 'boat' },
          { id: 'd5-vocab-3', japanese: 'まど', romaji: 'mado', meaning: 'window' },
          { id: 'd5-vocab-4', japanese: 'みみ', romaji: 'mimi', meaning: 'ear' },
          { id: 'd5-vocab-5', japanese: 'はい', romaji: 'hai', meaning: 'yes' },
          { id: 'd5-vocab-6', japanese: 'いいえ', romaji: 'iie', meaning: 'no' },
        ]
      },
      {
        id: 'd5-writing-practice-ha',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: は (ha)',
        characterToPractice: getCharOrThrow(hiraganaHLine, 'は', "Day 5 'は' writing practice"),
        instructions: "Practice writing 'は'.",
        guidanceImageUrl: getCharOrThrow(hiraganaHLine, 'は', "Day 5 'は' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd5-writing-practice-ma',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: ま (ma)',
        characterToPractice: getCharOrThrow(hiraganaMLine, 'ま', "Day 5 'ま' writing practice"),
        instructions: "Practice writing 'ま'.",
        guidanceImageUrl: getCharOrThrow(hiraganaMLine, 'ま', "Day 5 'ま' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd5-grammar-ka', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Asking Questions with か (ka)',
        explanation: 'To turn a statement into a yes/no question in Japanese, you simply add the particle か (ka) to the end of the sentence. The intonation usually rises at the end, just like in English.\n\nStatement: これはほんです。 (Kore wa hon desu.) - This is a book.\nQuestion: これはほんですか。 (Kore wa hon desu ka?) - Is this a book?',
        exampleSentences: [
          { id: 'd5-gram-ex-0', japanese: 'あなたはがくせいですか。', romaji: 'Anata wa gakusei desu ka?', meaning: 'Are you a student?' },
          { id: 'd5-gram-ex-1', japanese: 'はい、がくせいです。', romaji: 'Hai, gakusei desu.', meaning: 'Yes, I am a student.' },
          { id: 'd5-gram-ex-2', japanese: 'いいえ、せんせいではありません。', romaji: 'Iie, sensei dewa arimasen.', meaning: 'No, I am not a teacher. (ではありません - dewa arimasen is the polite negative of です)' }
        ]
      },
      // ADD DAY 5 FACT HERE
    ],
  },
    // Day 6: Hiragana (Y, R lines) & Particle の (Possession)
  {
    day: 6,
    title: 'Hiragana (や行, ら行) & Particle の (Possession)',
    category: 'Hiragana & Grammar',
    overview: 'Learn Hiragana Y-line (ya, yu, yo) and R-line (ra, ri, ru, re, ro). Introduce the possessive particle の (no).',
    contentBlocks: [
      { id: 'd6-intro', type: ContentBlockType.TEXT, title: 'More Hiragana & Showing Possession!', markdownContent: 'We are getting close to finishing basic Hiragana! Today we also learn how to say "my book" or "Tanaka\'s cat".' },
      { id: 'd6-hiragana-y', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: Y-line (や, ゆ, よ)', introduction: 'These are the "y" sounds. There are only three in this set.', characters: hiraganaYLine },
      { id: 'd6-hiragana-r', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: R-line (ら, り, る, れ, ろ)', introduction: 'These are the "r" sounds. The Japanese "r" is a bit like a soft "d" or a flicked "l", not a hard English "r".', characters: hiraganaRLine },
      {
        id: 'd6-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with Y & R', items: [
          { id: 'd6-vocab-0', japanese: 'やま', romaji: 'yama', meaning: 'mountain' },
          { id: 'd6-vocab-1', japanese: 'ゆき', romaji: 'yuki', meaning: 'snow' },
          { id: 'd6-vocab-2', japanese: 'よる', romaji: 'yoru', meaning: 'night' },
          { id: 'd6-vocab-3', japanese: 'さくら', romaji: 'sakura', meaning: 'cherry blossom' },
          { id: 'd6-vocab-4', japanese: 'とり', romaji: 'tori', meaning: 'bird' },
          { id: 'd6-vocab-5', japanese: 'くるま', romaji: 'kuruma', meaning: 'car' },
        ]
      },
      {
        id: 'd6-grammar-no', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Possessive Particle の (no)',
        explanation: 'The particle の (no) is used to show possession, similar to an apostrophe "s" in English, or "of".\nStructure: [Owner] の [Item]\nExample: わたし の ほん (watashi no hon) - My book (Book of me)\nExample: やまださん の ねこ (Yamada-san no neko) - Mr./Ms. Yamada\'s cat (Cat of Mr./Ms. Yamada)',
        exampleSentences: [
          { id: 'd6-gram-ex-0', japanese: 'これはわたしのかさです。', romaji: 'Kore wa watashi no kasa desu.', meaning: 'This is my umbrella.' },
          { id: 'd6-gram-ex-1', japanese: 'あれはせんせいのくるまですか。', romaji: 'Are wa sensei no kuruma desu ka?', meaning: 'Is that the teacher\'s car over there?' },
          { id: 'd6-gram-ex-2', japanese: 'たなかさんのいぬはちいさいです。', romaji: 'Tanaka-san no inu wa chiisai desu.', meaning: 'Mr. Tanaka\'s dog is small.' }
        ]
      },
      {
        id: 'd6-writing-practice-ya',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: や (ya)',
        characterToPractice: getCharOrThrow(hiraganaYLine, 'や', "Day 6 'や' writing practice"),
        instructions: "Practice writing 'や'. Pay attention to its unique shape.",
        guidanceImageUrl: getCharOrThrow(hiraganaYLine, 'や', "Day 6 'や' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd6-writing-practice-ri',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: り (ri)',
        characterToPractice: getCharOrThrow(hiraganaRLine, 'り', "Day 6 'り' writing practice"),
        instructions: "Practice writing 'り'. It has two strokes.",
        guidanceImageUrl: getCharOrThrow(hiraganaRLine, 'り', "Day 6 'り' writing practice").strokeOrderDiagramUrl
      },
      // ADD DAY 6 FACT HERE
    ],
  },
  // Day 7: Hiragana (W-line, ん) & Review
  {
    day: 7,
    title: 'Hiragana (わ行, ん) & Review',
    category: 'Hiragana & Review',
    overview: 'Learn the final basic Hiragana: W-line (wa, wo) and the syllabic "n" (ん). Review all Hiragana learned so far.',
    contentBlocks: [
      { id: 'd7-intro', type: ContentBlockType.TEXT, title: 'Completing Basic Hiragana!', markdownContent: 'Congratulations! After today, you will know all the basic Hiragana characters. We will then focus on variations and Katakana.' },
      {
        id: 'd7-hiragana-w-n', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Hiragana: W-line (わ, を) and ん (n)',
        introduction: 'わ (wa) is straightforward. を (wo) is pronounced "o" and is almost exclusively used as an object marker particle (more on that later!). ん (n) is a syllabic "n" and can change its sound slightly depending on what follows it.',
        characters: hiraganaWLineN
      },
      {
        id: 'd7-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with W & ん', items: [
          { id: 'd7-vocab-0', japanese: 'わたし', romaji: 'watashi', meaning: 'I, me' },
          { id: 'd7-vocab-1', japanese: 'ほんをよむ', romaji: 'hon o yomu', meaning: 'to read a book (を as object marker)' },
          { id: 'd7-vocab-2', japanese: 'パン', romaji: 'pan', meaning: 'bread (from Portuguese pão)' },
          { id: 'd7-vocab-3', japanese: 'えんぴつ', romaji: 'enpitsu', meaning: 'pencil' },
          { id: 'd7-vocab-4', japanese: 'でんわ', romaji: 'denwa', meaning: 'telephone' },
        ]
      },
      {
        id: 'd7-writing-practice-wa',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: わ (wa)',
        characterToPractice: getCharOrThrow(hiraganaWLineN, 'わ', "Day 7 'わ' writing practice"),
        instructions: "Practice writing 'わ'.",
        guidanceImageUrl: getCharOrThrow(hiraganaWLineN, 'わ', "Day 7 'わ' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd7-writing-practice-n',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: ん (n)',
        characterToPractice: getCharOrThrow(hiraganaWLineN, 'ん', "Day 7 'ん' writing practice"),
        instructions: "Practice writing 'ん'. It's a single, flowing stroke.",
        guidanceImageUrl: getCharOrThrow(hiraganaWLineN, 'ん', "Day 7 'ん' writing practice").strokeOrderDiagramUrl
      },
      { id: 'd7-review', type: ContentBlockType.TEXT, title: 'Hiragana Review Time!', markdownContent: 'Take some time to review all the Hiragana characters learned from Day 1 to Day 7. Use the Kana tables in previous lessons. Try writing them all out!' },
      // ADD DAY 7 FACT HERE
    ],
  },
  // Day 8: Voiced Sounds (Dakuten) & P-sounds (Handakuten)
  {
    day: 8,
    title: 'Voiced Sounds (Dakuten & Handakuten)',
    category: 'Hiragana Variations',
    overview: 'Learn how adding small marks (dakuten and handakuten) changes consonant sounds (e.g., か ka -> が ga, は ha -> ば ba -> ぱ pa).',
    contentBlocks: [
      { id: 'd8-intro', type: ContentBlockType.TEXT, title: 'Expanding Hiragana Sounds!', markdownContent: 'With just two small marks, we can create many new sounds from the Hiragana we already know!' },
      {
        id: 'd8-hiragana-dakuten', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Voiced Sounds: Dakuten (゛)',
        introduction: 'The dakuten (゛), also called "ten-ten", is a pair of small strokes added to certain Hiragana to make the consonant sound voiced.\nK-line (かきくけこ) -> G-line (がぎぐげご)\nS-line (さしすせそ) -> Z-line (ざじずぜぞ) (Note: し shi -> じ ji)\nT-line (たちつてと) -> D-line (だぢづでど) (Note: ち chi -> ぢ ji, つ tsu -> づ zu. ぢ & づ are rare and often sound like じ & ず respectively.)\nH-line (はひふへほ) -> B-line (ばびぶべぼ)',
        characters: hiraganaDakutenGZDB
      },
      {
        id: 'd8-hiragana-handakuten', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'P-Sounds: Handakuten (゜)',
        introduction: 'The handakuten (゜), also called "maru", is a small circle added ONLY to the H-line Hiragana to change them to P-sounds.\nH-line (はひふへほ) -> P-line (ぱぴぷぺぽ)',
        characters: hiraganaHandakutenP
      },
      {
        id: 'd8-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with Dakuten & Handakuten', items: [
          { id: 'd8-vocab-0', japanese: 'がくせい', romaji: 'gakusei', meaning: 'student' },
          { id: 'd8-vocab-1', japanese: 'でんわ', romaji: 'denwa', meaning: 'telephone' },
          { id: 'd8-vocab-2', japanese: 'かばん', romaji: 'kaban', meaning: 'bag' },
          { id: 'd8-vocab-3', japanese: 'えんぴつ', romaji: 'enpitsu', meaning: 'pencil' },
          { id: 'd8-vocab-4', japanese: 'てがみ', romaji: 'tegami', meaning: 'letter (mail)' },
          { id: 'd8-vocab-5', japanese: 'そば', romaji: 'soba', meaning: 'buckwheat noodles / near' },
          { id: 'd8-vocab-6', japanese: 'ぱん', romaji: 'pan', meaning: 'bread' },
        ]
      },
      // ADD DAY 8 FACT HERE
    ],
  },
  // Day 9: Combined Sounds (Yōon)
  {
    day: 9,
    title: 'Combined Sounds (Yōon)',
    category: 'Hiragana Variations',
    overview: 'Learn Yōon - sounds made by combining an "i-column" Hiragana (e.g., き, し, ち) with a small や, ゆ, or よ (e.g., き + ゃ = きゃ kya).',
    contentBlocks: [
      { id: 'd9-intro', type: ContentBlockType.TEXT, title: 'Hiragana Combinations: Yōon!', markdownContent: 'Yōon are contracted sounds that are very common in Japanese. They are formed by taking a Hiragana ending in "i" (like き ki, し shi, ち chi, に ni, ひ hi, み mi, り ri) and adding a small version of や (ゃ), ゆ (ゅ), or よ (ょ).' },
      {
        id: 'd9-hiragana-yoon', type: ContentBlockType.KANA_INFO, kanaSet: 'hiragana', title: 'Yōon Examples',
        introduction: 'The small や, ゆ, or よ merges with the preceding character to form one syllable.\nExamples: き (ki) + ゃ (small ya) = きゃ (kya)\nし (shi) + ゅ (small yu) = しゅ (shu)\nち (chi) + ょ (small yo) = ちょ (cho)\nThis also applies to their dakuten/handakuten versions (e.g., ぎ + ゃ = ぎゃ gya; ぴ + ゅ = ぴゅ pyu).',
        characters: hiraganaYoon
      },
      {
        id: 'd9-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with Yōon', items: [
          { id: 'd9-vocab-0', japanese: 'きょう', romaji: 'kyou', meaning: 'today' },
          { id: 'd9-vocab-1', japanese: 'かいしゃ', romaji: 'kaisha', meaning: 'company' },
          { id: 'd9-vocab-2', japanese: 'びょういん', romaji: 'byouin', meaning: 'hospital' },
          { id: 'd9-vocab-3', japanese: 'りょこう', romaji: 'ryokou', meaning: 'travel' },
          { id: 'd9-vocab-4', japanese: 'しゃしん', romaji: 'shashin', meaning: 'photograph' },
          { id: 'd9-vocab-5', japanese: 'じしょ', romaji: 'jisho', meaning: 'dictionary' },
          { id: 'd9-vocab-6', japanese: 'ちゃいろ', romaji: 'chairo', meaning: 'brown (color)' },
        ]
      },
      // ADD DAY 9 FACT HERE
    ],
  },
  // Day 10: Introduction to Katakana (Vowels & K, S lines)
  {
    day: 10,
    title: 'Intro to Katakana (ア行, カ行, サ行)',
    category: 'Katakana',
    overview: 'Begin learning Katakana, the script used for foreign loanwords and emphasis. Cover vowels, K-line, and S-line. Notice similarities and differences to Hiragana.',
    contentBlocks: [
      { id: 'd10-intro', type: ContentBlockType.TEXT, title: 'New Script: Katakana!', markdownContent: 'Katakana is another phonetic script like Hiragana. It has the same sounds but different, more angular characters. It\'s primarily used for foreign loanwords (e.g., テレビ terebi - TV), onomatopoeia, and for emphasis.' },
      { id: 'd10-katakana-vowels', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: Vowel Sounds (ア, イ, ウ, エ, オ)', introduction: 'These are the Katakana vowels. Some might look similar to their Hiragana counterparts or even Kanji!', characters: katakanaVowels },
      { id: 'd10-katakana-k', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: K-line (カ, キ, ク, ケ, コ)', introduction: 'Katakana "k" sounds. Compare カ (ka) to Hiragana か (ka).', characters: katakanaKLine },
      { id: 'd10-katakana-s', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: S-line (サ, シ, ス, セ, ソ)', introduction: 'Katakana "s" sounds. Note シ (shi) and ソ (so) look very similar to ツ (tsu) and ン (n) respectively – pay attention to stroke direction and angle!', characters: katakanaSLine },
      {
        id: 'd10-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Katakana Vocabulary (Loanwords)', items: [
          { id: 'd10-vocab-0', japanese: 'アメリカ', romaji: 'amerika', meaning: 'America (USA)' },
          { id: 'd10-vocab-1', japanese: 'カメラ', romaji: 'kamera', meaning: 'camera' },
          { id: 'd10-vocab-2', japanese: 'タクシー', romaji: 'takushii', meaning: 'taxi' },
          { id: 'd10-vocab-3', japanese: 'スポーツ', romaji: 'supootsu', meaning: 'sports' },
          { id: 'd10-vocab-4', japanese: 'キス', romaji: 'kisu', meaning: 'kiss' },
        ]
      },
      {
        id: 'd10-writing-practice-A',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: ア (A)',
        characterToPractice: getCharOrThrow(katakanaVowels, 'ア', "Day 10 'ア' writing practice"),
        instructions: "Practice writing Katakana 'ア'. It's more angular than Hiragana 'あ'.",
        guidanceImageUrl: getCharOrThrow(katakanaVowels, 'ア', "Day 10 'ア' writing practice").strokeOrderDiagramUrl
      },
      // ADD DAY 10 FACT HERE
    ],
  },
  // Day 11: Katakana (T, N lines) & Long Vowel Sound
  {
    day: 11,
    title: 'Katakana (タ行, ナ行) & Long Vowels',
    category: 'Katakana',
    overview: 'Learn Katakana T-line and N-line. Understand how long vowel sounds are represented in Katakana (using a dash ー).',
    contentBlocks: [
      { id: 'd11-intro', type: ContentBlockType.TEXT, title: 'More Katakana & Elongated Sounds!', markdownContent: 'Continuing with Katakana and a simple way to show long vowels.' },
      { id: 'd11-katakana-t', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: T-line (タ, チ, ツ, テ, ト)', introduction: 'Katakana "t" sounds. Watch out for ツ (tsu) – it\'s very similar to シ (shi) and ソ (so)! Angle is key.', characters: katakanaTLine },
      { id: 'd11-katakana-n', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: N-line (ナ, ニ, ヌ, ネ, ノ)', introduction: 'Katakana "n" sounds. ニ (ni) is simple. ノ (no) is just one stroke.', characters: katakanaNLine },
      {
        id: 'd11-grammar-long-vowel', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Long Vowel Sound in Katakana (ー)',
        explanation: 'In Katakana, long vowel sounds are usually indicated by a horizontal dash (ー) following the vowel to be elongated.\nExamples:\nカ (ka) -> カー (kaa)\nキ (ki) -> キー (kii)\nク (ku) -> クー (kuu)\nケ (ke) -> ケー (kee)\nコ (ko) -> コー (koo)\nThis applies to all Katakana characters ending in a vowel sound.',
        exampleSentences: [
          { id: 'd11-gram-ex-0', japanese: 'コーヒー', romaji: 'koohii', meaning: 'coffee' },
          { id: 'd11-gram-ex-1', japanese: 'タクシー', romaji: 'takushii', meaning: 'taxi' },
          { id: 'd11-gram-ex-2', japanese: 'ケーキ', romaji: 'keeki', meaning: 'cake' },
          { id: 'd11-gram-ex-3', japanese: 'ノート', romaji: 'nooto', meaning: 'notebook' },
        ]
      },
      {
        id: 'd11-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Katakana Vocabulary', items: [
          { id: 'd11-vocab-0', japanese: 'テニス', romaji: 'tenisu', meaning: 'tennis' },
          { id: 'd11-vocab-1', japanese: 'ネクタイ', romaji: 'nekutai', meaning: 'necktie' },
          { id: 'd11-vocab-2', japanese: 'チーズ', romaji: 'chiizu', meaning: 'cheese' },
          { id: 'd11-vocab-3', japanese: 'パーティー', romaji: 'paathii', meaning: 'party' },
        ]
      },
      {
        id: 'd11-writing-practice-TA',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: タ (TA)',
        characterToPractice: getCharOrThrow(katakanaTLine, 'タ', "Day 11 'タ' writing practice"),
        instructions: "Practice writing Katakana 'タ'.",
        guidanceImageUrl: getCharOrThrow(katakanaTLine, 'タ', "Day 11 'タ' writing practice").strokeOrderDiagramUrl
      },
      // ADD DAY 11 FACT HERE
    ],
  },
  // Day 12: Katakana (H, M lines) & Small Tsu (ッ)
  {
    day: 12,
    title: 'Katakana (ハ行, マ行) & Small Tsu (ッ)',
    category: 'Katakana',
    overview: 'Learn Katakana H-line and M-line. Introduce the small ッ (tsu), used to indicate a double consonant (sokuon).',
    contentBlocks: [
      { id: 'd12-intro', type: ContentBlockType.TEXT, title: 'Katakana Continues: H, M & Double Consonants!', markdownContent: 'More Katakana and an important symbol for pronunciation!' },
      { id: 'd12-katakana-h', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: H-line (ハ, ヒ, フ, ヘ, ホ)', introduction: 'Katakana "h" sounds.', characters: katakanaHLine },
      { id: 'd12-katakana-m', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: M-line (マ, ミ, ム, メ, モ)', introduction: 'Katakana "m" sounds.', characters: katakanaMLine },
      {
        id: 'd12-grammar-small-tsu', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Small Tsu (ッ) - Sokuon (促音)',
        explanation: 'The small ッ (tsu) in Katakana (like its Hiragana counterpart っ) indicates a doubled consonant sound. It creates a short pause or glottal stop before the consonant that follows it.\nExamples:\nベッド (beddo) - bed (from English "bed") - the "d" sound is emphasized.\nサッカー (sakkaa) - soccer - the "k" sound is emphasized (long vowel also present).',
        exampleSentences: [
          { id: 'd12-gram-ex-0', japanese: 'ベッド', romaji: 'beddo', meaning: 'bed' },
          { id: 'd12-gram-ex-1', japanese: 'カップ', romaji: 'kappu', meaning: 'cup' },
          { id: 'd12-gram-ex-2', japanese: 'マッチ', romaji: 'matchi', meaning: 'match (game/matches)' },
        ]
      },
      {
        id: 'd12-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Katakana Vocabulary', items: [
          { id: 'd12-vocab-0', japanese: 'ホテル', romaji: 'hoteru', meaning: 'hotel' },
          { id: 'd12-vocab-1', japanese: 'マイク', romaji: 'maiku', meaning: 'microphone' },
          { id: 'd12-vocab-2', japanese: 'ミルク', romaji: 'miruku', meaning: 'milk' },
          { id: 'd12-vocab-3', japanese: 'サッカー', romaji: 'sakkaa', meaning: 'soccer/football' },
        ]
      },
      // ADD DAY 12 FACT HERE
    ],
  },
  // Day 13: Katakana (Y, R, W lines, ン)
  {
    day: 13,
    title: 'Katakana (ヤ行, ラ行, ワ行, ン)',
    category: 'Katakana',
    overview: 'Complete the basic Katakana set with Y-line, R-line, W-line, and ン (n).',
    contentBlocks: [
      { id: 'd13-intro', type: ContentBlockType.TEXT, title: 'Finishing Basic Katakana!', markdownContent: 'Almost there! Today we cover the remaining standard Katakana characters.' },
      { id: 'd13-katakana-y', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: Y-line (ヤ, ユ, ヨ)', introduction: 'Katakana "y" sounds.', characters: katakanaYLine },
      { id: 'd13-katakana-r', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: R-line (ラ, リ, ル, レ, ロ)', introduction: 'Katakana "r" sounds. リ (ri) is similar to Hiragana り.', characters: katakanaRLine },
      {
        id: 'd13-katakana-w-n', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: W-line (ワ, ヰ, ヱ, ヲ) and ン (N)',
        introduction: 'ワ (wa) and ン (n) are common. ヲ (wo) is rare. ヰ (wi) and ヱ (we) are obsolete but good to recognize.',
        characters: katakanaWLineN
      },
      {
        id: 'd13-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Katakana Vocabulary', items: [
          { id: 'd13-vocab-0', japanese: 'ライオン', romaji: 'raion', meaning: 'lion' },
          { id: 'd13-vocab-1', japanese: 'ヨーロッパ', romaji: 'yooroppa', meaning: 'Europe' },
          { id: 'd13-vocab-2', japanese: 'ワイン', romaji: 'wain', meaning: 'wine' },
          { id: 'd13-vocab-3', japanese: 'ラーメン', romaji: 'raamen', meaning: 'ramen' },
          { id: 'd13-vocab-4', japanese: 'パン', romaji: 'pan', meaning: 'bread' }, 
        ]
      },
      // ADD DAY 13 FACT HERE
    ],
  },
  // Day 14: Katakana Dakuten, Handakuten & Yōon
  {
    day: 14,
    title: 'Katakana Voiced & Combined Sounds',
    category: 'Katakana Variations',
    overview: 'Learn Katakana voiced sounds (dakuten/handakuten) and combined sounds (Yōon), similar to Hiragana.',
    contentBlocks: [
      { id: 'd14-intro', type: ContentBlockType.TEXT, title: 'Expanding Katakana Sounds!', markdownContent: 'Just like Hiragana, Katakana uses dakuten, handakuten, and small ヤ, ユ, ヨ to create more sounds.' },
      {
        id: 'd14-katakana-dakuten', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: Dakuten (゛) & Handakuten (゜)',
        introduction: 'Works the same as Hiragana: カ (ka) -> ガ (ga), ハ (ha) -> バ (ba) -> パ (pa), etc. Also includes ヴ (vu) for "v" sounds.',
        characters: katakanaDakuten
      },
      {
        id: 'd14-katakana-yoon', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Katakana: Yōon (Combined Sounds)',
        introduction: 'Formed by combining an "i-column" Katakana with a small ヤ, ユ, or ヨ (e.g., キ + ャ = キャ kya). Also includes extended Katakana for foreign sounds like "she", "che", "fa", etc.',
        characters: katakanaYoon
      },
      {
        id: 'd14-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with Katakana Variations', items: [
          { id: 'd14-vocab-0', japanese: 'ジャズ', romaji: 'jazu', meaning: 'jazz' },
          { id: 'd14-vocab-1', japanese: 'パーティー', romaji: 'paathii', meaning: 'party' },
          { id: 'd14-vocab-2', japanese: 'チョコレート', romaji: 'chokoreeto', meaning: 'chocolate' },
          { id: 'd14-vocab-3', japanese: 'シャワー', romaji: 'shawaa', meaning: 'shower' },
          { id: 'd14-vocab-4', japanese: 'フォーク', romaji: 'fooku', meaning: 'fork' },
          { id: 'd14-vocab-5', japanese: 'ビデオ', romaji: 'bideo', meaning: 'video' },
        ]
      },
      // ADD DAY 14 FACT HERE
    ],
  },
  // Day 15: Review Hiragana & Katakana
  {
    day: 15,
    title: 'Full Kana Review',
    category: 'Review',
    overview: 'Review all Hiragana and Katakana characters, including their variations. Solidify your reading and writing skills for both scripts.',
    contentBlocks: [
      { id: 'd15-intro', type: ContentBlockType.TEXT, title: 'Mastering the Kana!', markdownContent: 'You\'ve learned all the basic Hiragana and Katakana! Today is for comprehensive review. This is a huge milestone!' },
      { id: 'd15-hiragana-full-review', type: ContentBlockType.TEXT, title: 'Hiragana Review', markdownContent: 'Go back through Days 1-9. Practice reading and writing all Hiragana characters, including vowels, k,s,t,n,h,m,y,r,w lines, ん, dakuten, handakuten, and yōon sounds.' },
      { id: 'd15-katakana-full-review', type: ContentBlockType.TEXT, title: 'Katakana Review', markdownContent: 'Go back through Days 10-14. Practice reading and writing all Katakana characters, including vowels, k,s,t,n,h,m,y,r,w lines, ン, long vowel mark (ー), small tsu (ッ), dakuten, handakuten, and yōon sounds.' },
      { id: 'd15-culture-note', type: ContentBlockType.CULTURAL_NOTE, title: 'Karaoke (カラオケ)', note: 'Karaoke is a hugely popular pastime in Japan, originating there! Many song lyrics will use a mix of Hiragana, Katakana, and Kanji. Being able to read Kana is your first step to singing along!' }
      // ADD DAY 15 FACT HERE
    ],
  },
    // Day 16: Demonstratives (これ, それ, あれ, この, その, あの)
  {
    day: 16,
    title: 'Pointing Things Out: Demonstratives',
    category: 'Grammar & Vocabulary',
    overview: 'Learn how to refer to things near you, near the listener, or far from both using これ/それ/あれ (kore/sore/are - this/that/that over there) and この/その/あの (kono/sono/ano - this/that/that over there + Noun).',
    contentBlocks: [
      { id: 'd16-intro', type: ContentBlockType.TEXT, title: 'これ, それ, あれ - This and That (Nouns)', markdownContent: 'These words act like nouns. They stand alone and refer to things.\n- **これ (kore)**: This thing (near the speaker).\n- **それ (sore)**: That thing (near the listener).\n- **あれ (are)**: That thing over there (far from both speaker and listener).' },
      {
        id: 'd16-grammar-kore', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Using これ, それ, あれ',
        explanation: 'These are used with the 「X は Y です」 pattern.\nExample: これはほんです。 (Kore wa hon desu.) - This is a book.',
        exampleSentences: [
          { id: 'd16-gram-ex-0', japanese: 'これはペンですか。', romaji: 'Kore wa pen desu ka?', meaning: 'Is this a pen?' },
          { id: 'd16-gram-ex-1', japanese: 'それはわたしのかさです。', romaji: 'Sore wa watashi no kasa desu.', meaning: 'That is my umbrella.' },
          { id: 'd16-gram-ex-2', japanese: 'あれはなんですか。', romaji: 'Are wa nan desu ka?', meaning: 'What is that over there? (なん nan = what)' }
        ]
      },
      { id: 'd16-intro-kono', type: ContentBlockType.TEXT, title: 'この, その, あの - This and That (Adjectives/Determiners)', markdownContent: 'These words must be followed by a noun. They describe *which* specific item you are talking about.\n- **この (kono) + Noun**: This [Noun] (near the speaker).\n- **その (sono) + Noun**: That [Noun] (near the listener).\n- **あの (ano) + Noun**: That [Noun] over there (far from both).' },
      {
        id: 'd16-grammar-kono', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Using この, その, あの',
        explanation: 'Example: このほんはたかいです。 (Kono hon wa takai desu.) - This book is expensive.\nCompare to: これはたかいほんです。 (Kore wa takai hon desu.) - This is an expensive book.',
        exampleSentences: [
          { id: 'd16-gram-ex-3', japanese: 'このペンはあなたのですか。', romaji: 'Kono pen wa anata no desu ka?', meaning: 'Is this pen yours?' },
          { id: 'd16-gram-ex-4', japanese: 'そのかばんはかわいいですね。', romaji: 'Sono kaban wa kawaii desu ne.', meaning: 'That bag is cute, isn\'t it? (ね ne - sentence ending particle seeking agreement)' },
          { id: 'd16-gram-ex-5', japanese: 'あのひとはだれですか。', romaji: 'Ano hito wa dare desu ka?', meaning: 'Who is that person over there? (だれ dare = who)' }
        ]
      },
      {
        id: 'd16-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Related Vocabulary', items: [
          { id: 'd16-vocab-0', japanese: 'ペン', romaji: 'pen', meaning: 'pen' },
          { id: 'd16-vocab-1', japanese: 'かばん', romaji: 'kaban', meaning: 'bag' },
          { id: 'd16-vocab-2', japanese: 'かわいい', romaji: 'kawaii', meaning: 'cute (い-adjective)' },
          { id: 'd16-vocab-3', japanese: 'なん (なに)', romaji: 'nan (nani)', meaning: 'what' },
          { id: 'd16-vocab-4', japanese: 'だれ', romaji: 'dare', meaning: 'who' },
        ]
      },
      // ADD DAY 16 FACT HERE
    ],
  },
  // Day 17: Basic Adjectives (い-adjectives & な-adjectives)
  {
    day: 17,
    title: 'Describing Things: Adjectives',
    category: 'Grammar & Vocabulary',
    overview: 'Learn the two main types of Japanese adjectives: い-adjectives and な-adjectives, and how to use them to describe nouns.',
    contentBlocks: [
      { id: 'd17-intro', type: ContentBlockType.TEXT, title: 'Adding Color: Adjectives!', markdownContent: 'Adjectives are words that describe nouns. Japanese has two main types: い-adjectives and な-adjectives.' },
      {
        id: 'd17-grammar-i-adj', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'い-Adjectives',
        explanation: 'い-adjectives (i-adjectives) end with the Hiragana character い (i) in their dictionary form (e.g., たかい takai - expensive, おおきい ookii - big).\n\n**To modify a noun directly:** Place the い-adjective directly before the noun.\nExample: たかいほん (takai hon) - expensive book.\n\n**To use in a sentence "Noun is Adjective":** The adjective keeps its い before です (desu).\nExample: このほんはたかいです。 (Kono hon wa takai desu.) - This book is expensive.',
        exampleSentences: [
          { id: 'd17-i-adj-ex-0', japanese: 'あたらしいくるま', romaji: 'atarashii kuruma', meaning: 'new car' },
          { id: 'd17-i-adj-ex-1', japanese: 'そのねこはちいさいです。', romaji: 'Sono neko wa chiisai desu.', meaning: 'That cat is small.' },
          { id: 'd17-i-adj-ex-2', japanese: 'おいしいすしですね。', romaji: 'Oishii sushi desu ne.', meaning: 'It\'s delicious sushi, isn\'t it?' },
        ]
      },
      {
        id: 'd17-grammar-na-adj', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'な-Adjectives',
        explanation: 'な-adjectives (na-adjectives) do not end in い (though some might seem to, like きれい kirei, but they are な-adjectives). They are often followed by な (na) when they directly modify a noun.\n\n**To modify a noun directly:** Add な (na) after the adjective, then the noun.\nExample: しずかなへや (shizuka na heya) - quiet room.\n\n**To use in a sentence "Noun is Adjective":** The な is dropped, and the adjective is followed directly by です (desu).\nExample: このへやはしずかです。 (Kono heya wa shizuka desu.) - This room is quiet.',
        exampleSentences: [
          { id: 'd17-na-adj-ex-0', japanese: 'きれいなはな', romaji: 'kirei na hana', meaning: 'beautiful flower' },
          { id: 'd17-na-adj-ex-1', japanese: 'あのひとはしんせつです。', romaji: 'Ano hito wa shinsetsu desu.', meaning: 'That person (over there) is kind.' },
          { id: 'd17-na-adj-ex-2', japanese: 'このまちはにぎやかですか。', romaji: 'Kono machi wa nigiyaka desu ka?', meaning: 'Is this town lively?' },
        ]
      },
      {
        id: 'd17-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Common Adjectives', items: [
          { id: 'd17-vocab-0', japanese: 'おおきい', romaji: 'ookii', meaning: 'big (い-adj)' },
          { id: 'd17-vocab-1', japanese: 'ちいさい', romaji: 'chiisai', meaning: 'small (い-adj)' },
          { id: 'd17-vocab-2', japanese: 'あたらしい', romaji: 'atarashii', meaning: 'new (い-adj)' },
          { id: 'd17-vocab-3', japanese: 'ふるい', romaji: 'furui', meaning: 'old (for things, い-adj)' },
          { id: 'd17-vocab-4', japanese: 'おいしい', romaji: 'oishii', meaning: 'delicious (い-adj)' },
          { id: 'd17-vocab-5', japanese: 'しずか（な）', romaji: 'shizuka (na)', meaning: 'quiet (な-adj)' },
          { id: 'd17-vocab-6', japanese: 'きれい（な）', romaji: 'kirei (na)', meaning: 'beautiful, clean (な-adj)' },
          { id: 'd17-vocab-7', japanese: 'しんせつ（な）', romaji: 'shinsetsu (na)', meaning: 'kind (な-adj)' },
          { id: 'd17-vocab-8', japanese: 'にぎやか（な）', romaji: 'nigiyaka (na)', meaning: 'lively, bustling (な-adj)' },
          { id: 'd17-vocab-9', japanese: 'へや', romaji: 'heya', meaning: 'room' },
          { id: 'd17-vocab-10', japanese: 'まち', romaji: 'machi', meaning: 'town, city' },
        ]
      },
      // ADD DAY 17 FACT HERE
    ],
  },
  // Day 18: Telling Time
  {
    day: 18,
    title: 'What Time Is It? (Telling Time)',
    category: 'Vocabulary & Grammar',
    overview: 'Learn how to ask for and tell the time, including hours (～時 -ji) and minutes (～分 -fun/pun).',
    contentBlocks: [
      { id: 'd18-intro', type: ContentBlockType.TEXT, title: 'Let\'s Learn to Tell Time!', markdownContent: 'Knowing how to tell time is essential for daily conversations and making plans.' },
      {
        id: 'd18-kanji-ji', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji for Time: 時 (ji)',
        introduction: 'This Kanji means "time" or "hour". You\'ll see it often!',
        characters: kanji_Toki_Time
      },
      {
        id: 'd18-vocab-timeunits', type: ContentBlockType.VOCABULARY_LIST, title: 'Basic Time Vocabulary', items: [
          { id: 'd18-vocab-0', japanese: 'いま', romaji: 'ima', meaning: 'now' },
          { id: 'd18-vocab-1', japanese: 'なんじ', romaji: 'nanji', meaning: 'what time?' },
          { id: 'd18-vocab-2', japanese: '～じ', romaji: '-ji', meaning: 'o\'clock (hour marker)' },
          { id: 'd18-vocab-3', japanese: '～ふん / ～ぷん', romaji: '-fun / -pun', meaning: 'minute marker' },
          { id: 'd18-vocab-4', japanese: 'ごぜん', romaji: 'gozen', meaning: 'A.M. (morning)' },
          { id: 'd18-vocab-5', japanese: 'ごご', romaji: 'gogo', meaning: 'P.M. (afternoon/evening)' },
          { id: 'd18-vocab-6', japanese: 'はん', romaji: 'han', meaning: 'half (as in half past)' },
        ]
      },
      {
        id: 'd18-grammar-hours', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Hours (～時 -ji)',
        explanation: 'To say the hour, add ～じ (-ji) to the number. Most are regular, but note these exceptions:\n- 4時 (yo-ji) - 4 o\'clock (NOT yon-ji)\n- 7時 (shichi-ji) - 7 o\'clock (nana-ji is also sometimes heard but shichi-ji is common for time)\n- 9時 (ku-ji) - 9 o\'clock (NOT kyuu-ji)',
        exampleSentences: [
          { id: 'd18-hour-ex-0', japanese: 'いちじ', romaji: 'ichi-ji', meaning: '1 o\'clock' },
          { id: 'd18-hour-ex-1', japanese: 'よじ', romaji: 'yo-ji', meaning: '4 o\'clock' },
          { id: 'd18-hour-ex-2', japanese: 'しちじ', romaji: 'shichi-ji', meaning: '7 o\'clock' },
          { id: 'd18-hour-ex-3', japanese: 'くじ', romaji: 'ku-ji', meaning: '9 o\'clock' },
          { id: 'd18-hour-ex-4', japanese: 'じゅうじ', romaji: 'juu-ji', meaning: '10 o\'clock' },
        ]
      },
      {
        id: 'd18-grammar-minutes', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Minutes (～分 -fun/pun)',
        explanation: 'To say the minutes, add ～ふん (-fun) or ～ぷん (-pun) to the number. The pronunciation changes depending on the number preceding it. This requires some memorization.\n- Numbers ending in 1, 3, 4, 6, 8, 0 (as in 10, 20 etc.) often use ～ぷん (pun): e.g., いっぷん (ippun - 1 min), さんぷん (sanpun - 3 min), よんぷん (yonpun - 4 min), ろっぷん (roppun - 6 min), はっぷん (happun - 8 min), じゅっぷん (juppun - 10 min), にじゅっぷん (nijuppun - 20 min).\n- Numbers ending in 2, 5, 7, 9 often use ～ふん (fun): e.g., にふん (nifun - 2 min), ごふん (gofun - 5 min), ななふん (nanafun - 7 min), きゅうふん (kyuufun - 9 min).\n- **Half past:** Use ～じはん (-ji han), e.g., いちじはん (ichiji han - 1:30).',
        exampleSentences: [
          { id: 'd18-min-ex-0', japanese: 'ごふん', romaji: 'go-fun', meaning: '5 minutes' },
          { id: 'd18-min-ex-1', japanese: 'じゅっぷん', romaji: 'jup-pun', meaning: '10 minutes (note the sound change for 10)' },
          { id: 'd18-min-ex-2', japanese: 'じゅうごふん', romaji: 'juu-go-fun', meaning: '15 minutes' },
          { id: 'd18-min-ex-3', japanese: 'さんじゅっぷん', romaji: 'san-jup-pun', meaning: '30 minutes' },
          { id: 'd18-min-ex-4', japanese: 'にじ はん', romaji: 'ni-ji han', meaning: '2:30' },
        ]
      },
      {
        id: 'd18-grammar-asking', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Asking and Telling Time',
        explanation: 'To ask "What time is it?": いま なんじ ですか。 (Ima nanji desu ka?)\nTo state the time: [Hour]じ [Minutes]ふん/ぷん です。 ([Hour]-ji [Minutes]-fun/pun desu.)\nOr: ごぜん/ごご [Hour]じ [Minutes]ふん/ぷん です。 (Gozen/Gogo [Hour]-ji [Minutes]-fun/pun desu.)',
        exampleSentences: [
          { id: 'd18-ask-ex-0', japanese: 'いま なんじ ですか。', romaji: 'Ima nanji desu ka?', meaning: 'What time is it now?' },
          { id: 'd18-ask-ex-1', japanese: 'ごぜん くじ じゅっぷん です。', romaji: 'Gozen ku-ji jup-pun desu.', meaning: 'It is 9:10 A.M.' },
          { id: 'd18-ask-ex-2', japanese: 'ごご にじ はん です。', romaji: 'Gogo ni-ji han desu.', meaning: 'It is 2:30 P.M.' },
        ]
      },
      // ADD DAY 18 FACT HERE
    ],
  },
  // Day 19: Days of the Week & Months
  {
    day: 19,
    title: 'Calendar Basics: Days & Months',
    category: 'Vocabulary & Kanji',
    overview: 'Learn the days of the week and months of the year. Many involve Kanji we\'ve seen or will see soon!',
    contentBlocks: [
      { id: 'd19-intro', type: ContentBlockType.TEXT, title: 'Marking Your Calendar!', markdownContent: 'Let\'s learn how to talk about days and months. You\'ll see familiar Kanji here!' },
      {
        id: 'd19-kanji-review', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Relevant Kanji Review',
        introduction: 'Remember these Kanji? They are key to understanding days of the week and months!',
        characters: [
          getCharOrThrow(kanjiSet1_NumbersPeopleDay, '日', "Day 19 Kanji Review '日'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '月', "Day 19 Kanji Review '月'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '火', "Day 19 Kanji Review '火'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '水', "Day 19 Kanji Review '水'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '木', "Day 19 Kanji Review '木'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '金', "Day 19 Kanji Review '金'"),
          getCharOrThrow(kanjiSet2_ElementsTime, '土', "Day 19 Kanji Review '土'"),
        ].filter(Boolean) as KanaCharacter[] 
      },
      {
        id: 'd19-vocab-daysweek', type: ContentBlockType.VOCABULARY_LIST, title: 'Days of the Week (ようび - yōbi)', items: [
          { id: 'd19-vocab-0', japanese: 'げつようび (月曜日)', romaji: 'getsuyōbi', meaning: 'Monday' },
          { id: 'd19-vocab-1', japanese: 'かようび (火曜日)', romaji: 'kayōbi', meaning: 'Tuesday' },
          { id: 'd19-vocab-2', japanese: 'すいようび (水曜日)', romaji: 'suiyōbi', meaning: 'Wednesday' },
          { id: 'd19-vocab-3', japanese: 'もくようび (木曜日)', romaji: 'mokuyōbi', meaning: 'Thursday' },
          { id: 'd19-vocab-4', japanese: 'きんようび (金曜日)', romaji: 'kin\'yōbi', meaning: 'Friday' },
          { id: 'd19-vocab-5', japanese: 'どようび (土曜日)', romaji: 'doyōbi', meaning: 'Saturday' },
          { id: 'd19-vocab-6', japanese: 'にちようび (日曜日)', romaji: 'nichiyōbi', meaning: 'Sunday' },
          { id: 'd19-vocab-7', japanese: 'なんようび (何曜日)', romaji: 'nan\'yōbi', meaning: 'What day of the week?' },
        ]
      },
      {
        id: 'd19-vocab-months', type: ContentBlockType.VOCABULARY_LIST, title: 'Months of the Year (がつ - gatsu)', items: [
          { id: 'd19-vocab-m1', japanese: 'いちがつ (一月)', romaji: 'ichigatsu', meaning: 'January' },
          { id: 'd19-vocab-m2', japanese: 'にがつ (二月)', romaji: 'nigatsu', meaning: 'February' },
          { id: 'd19-vocab-m3', japanese: 'さんがつ (三月)', romaji: 'sangatsu', meaning: 'March' },
          { id: 'd19-vocab-m4', japanese: 'しがつ (四月)', romaji: 'shigatsu', meaning: 'April (note: し not よん)' },
          { id: 'd19-vocab-m5', japanese: 'ごがつ (五月)', romaji: 'gogatsu', meaning: 'May' },
          { id: 'd19-vocab-m6', japanese: 'ろくがつ (六月)', romaji: 'rokugatsu', meaning: 'June' },
          { id: 'd19-vocab-m7', japanese: 'しちがつ (七月)', romaji: 'shichigatsu', meaning: 'July (note: しち not なな)' },
          { id: 'd19-vocab-m8', japanese: 'はちがつ (八月)', romaji: 'hachigatsu', meaning: 'August' },
          { id: 'd19-vocab-m9', japanese: 'くがつ (九月)', romaji: 'kugatsu', meaning: 'September (note: く not きゅう)' },
          { id: 'd19-vocab-m10', japanese: 'じゅうがつ (十月)', romaji: 'jūgatsu', meaning: 'October' },
          { id: 'd19-vocab-m11', japanese: 'じゅういちがつ (十一月)', romaji: 'jūichigatsu', meaning: 'November' },
          { id: 'd19-vocab-m12', japanese: 'じゅうにがつ (十二月)', romaji: 'jūnigatsu', meaning: 'December' },
          { id: 'd19-vocab-mnan', japanese: 'なんがつ (何月)', romaji: 'nangatsu', meaning: 'What month?' },
        ]
      },
      {
        id: 'd19-vocab-othercal', type: ContentBlockType.VOCABULARY_LIST, title: 'Other Calendar Words', items: [
          { id: 'd19-vocab-c1', japanese: 'きょう (今日)', romaji: 'kyō', meaning: 'today' },
          { id: 'd19-vocab-c2', japanese: 'きのう (昨日)', romaji: 'kinō', meaning: 'yesterday' },
          { id: 'd19-vocab-c3', japanese: 'あした (明日)', romaji: 'ashita', meaning: 'tomorrow' },
          { id: 'd19-vocab-c4', japanese: 'せんしゅう (先週)', romaji: 'senshū', meaning: 'last week' },
          { id: 'd19-vocab-c5', japanese: 'こんしゅう (今週)', romaji: 'konshū', meaning: 'this week' },
          { id: 'd19-vocab-c6', japanese: 'らいしゅう (来週)', romaji: 'raishū', meaning: 'next week' },
        ]
      },
      // ADD DAY 19 FACT HERE
    ],
  },
  // Day 20: Past Tense (Noun/Adj でした, Verb ました/ませんでした)
  {
    day: 20,
    title: 'Looking Back: Past Tense Basics',
    category: 'Grammar',
    overview: 'Learn how to form the polite past tense for nouns, な-adjectives (でした - deshita), and verbs (ました - mashita / ませんでした - masen deshita).',
    contentBlocks: [
      { id: 'd20-intro', type: ContentBlockType.TEXT, title: 'Talking About Yesterday', markdownContent: 'Let\'s learn how to express things that have already happened using the past tense.' },
      {
        id: 'd20-grammar-past-noun-na', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Past Tense: Nouns & な-Adjectives',
        explanation: 'To make a polite sentence with a noun or な-adjective into the past tense, change です (desu) to でした (deshita).\nTo make it past negative, change ではありません (dewa arimasen) to ではありませんでした (dewa arimasen deshita).\n\nPresent: これはほんです。 (Kore wa hon desu.) - This is a book.\nPast: これはほんでした。 (Kore wa hon deshita.) - This was a book.\n\nPresent: へやはしずかです。 (Heya wa shizuka desu.) - The room is quiet.\nPast: へやはしずかでした。 (Heya wa shizuka deshita.) - The room was quiet.',
        exampleSentences: [
          { id: 'd20-past-ex-0', japanese: 'きのうはにちようびでした。', romaji: 'Kinō wa nichiyōbi deshita.', meaning: 'Yesterday was Sunday.' },
          { id: 'd20-past-ex-1', japanese: 'あのえいがはきれいでした。', romaji: 'Ano eiga wa kirei deshita.', meaning: 'That movie was beautiful. (えいが eiga - movie)' },
          { id: 'd20-past-ex-2', japanese: 'かれはがくせいではありませんでした。', romaji: 'Kare wa gakusei dewa arimasen deshita.', meaning: 'He was not a student. (かれ kare - he)' },
        ]
      },
      {
        id: 'd20-grammar-past-verb', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Past Tense: Verbs (ます-form)',
        explanation: 'For verbs in the polite ます (masu) form:\n- **Past Affirmative:** Change ます (masu) to ました (mashita).\n  Example: たべます (tabemasu - to eat) -> たべました (tabemashita - ate)\n- **Past Negative:** Change ません (masen) to ませんでした (masen deshita).\n  Example: たべません (tabemasen - do not eat) -> たべませんでした (tabemasen deshita - did not eat)',
        exampleSentences: [
          { id: 'd20-verb-ex-0', japanese: 'きのう すしをたべました。', romaji: 'Kinō sushi o tabemashita.', meaning: 'I ate sushi yesterday. (を o - object marker)' },
          { id: 'd20-verb-ex-1', japanese: 'わたしはきのう がっこうへいきました。', romaji: 'Watashi wa kinō gakkō e ikimashita.', meaning: 'I went to school yesterday. (がっこう gakkō - school; へ e - to/towards; いきます ikimasu - to go)' },
          { id: 'd20-verb-ex-2', japanese: 'かれはコーヒーをのみませんでした。', romaji: 'Kare wa koohii o nomimasen deshita.', meaning: 'He did not drink coffee. (のみます nomimasu - to drink)' },
        ]
      },
      {
        id: 'd20-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Related Verbs (Dictionary form / ます-form)', items: [
          { id: 'd20-vocab-0', japanese: 'たべる / たべます', romaji: 'taberu / tabemasu', meaning: 'to eat' },
          { id: 'd20-vocab-1', japanese: 'のむ / のみます', romaji: 'nomu / nomimasu', meaning: 'to drink' },
          { id: 'd20-vocab-2', japanese: 'いく / いきます', romaji: 'iku / ikimasu', meaning: 'to go' },
          { id: 'd20-vocab-3', japanese: 'みる / みます', romaji: 'miru / mimasu', meaning: 'to see/watch' },
          { id: 'd20-vocab-4', japanese: 'する / します', romaji: 'suru / shimasu', meaning: 'to do' },
        ]
      },
      // ADD DAY 20 FACT HERE
    ],
  },
  // Day 21: Intro to Kanji & Basic Characters
  {
    day: 21,
    title: 'First Steps in Kanji (一, 二, 三, 人, 日)',
    category: 'Kanji',
    overview: 'Begin your journey into Kanji, the logographic characters borrowed from Chinese. Learn the first few basic and common Kanji representing numbers, people, and day.',
    contentBlocks: [
      { id: 'd21-intro', type: ContentBlockType.TEXT, title: 'Welcome to Kanji (漢字)!', markdownContent: 'Kanji are Chinese characters adapted into Japanese. Each Kanji has one or more meanings and usually multiple readings (pronunciations).\n- **Onyomi (音読み):** Chinese-derived readings, often used in compound words.\n- **Kunyomi (訓読み):** Native Japanese readings, often used when the Kanji stands alone or with Hiragana endings (okurigana).\nLearning Kanji is a marathon, not a sprint. We will start with some of Fthe most basic ones.' },
      {
        id: 'd21-kanji-set1', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 1: Numbers, People, Day',
        introduction: 'These are some of the simplest and most frequent Kanji. Pay attention to stroke order, meanings, and common readings.',
        characters: kanjiSet1_NumbersPeopleDay
      },
      {
        id: 'd21-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with New Kanji', items: [
          { id: 'd21-vocab-0', japanese: 'いち (一)', romaji: 'ichi', meaning: 'one' },
          { id: 'd21-vocab-1', japanese: 'ふたり (二人)', romaji: 'futari', meaning: 'two people' },
          { id: 'd21-vocab-2', japanese: 'さんにん (三人)', romaji: 'sannin', meaning: 'three people' },
          { id: 'd21-vocab-3', japanese: 'にほん (日本)', romaji: 'Nihon', meaning: 'Japan (sun origin)' },
          { id: 'd21-vocab-4', japanese: 'まいにち (毎日)', romaji: 'mainichi', meaning: 'every day (毎 - every)' },
          { id: 'd21-vocab-5', japanese: 'ひとりで (一人で)', romaji: 'hitori de', meaning: 'alone, by oneself' },
        ]
      },
      {
        id: 'd21-writing-practice-hito',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 人 (person)',
        characterToPractice: getCharOrThrow(kanjiSet1_NumbersPeopleDay, '人', "Day 21 '人' writing practice"),
        instructions: "Practice writing the Kanji for 'person' (ひと - hito, ジン - jin, ニン - nin). It has two simple strokes.",
        guidanceImageUrl: getCharOrThrow(kanjiSet1_NumbersPeopleDay, '人', "Day 21 '人' writing practice").strokeOrderDiagramUrl
      },
      // ADD DAY 21 FACT HERE
    ],
  },
  // Day 22: More Basic Kanji (Elements & Time)
  {
    day: 22,
    title: 'More Kanji (月, 火, 水, 木, 金, 土, 年)',
    category: 'Kanji',
    overview: 'Learn Kanji related to elements (moon, fire, water, wood, gold/metal, earth) which also form the days of the week, plus the Kanji for "year".',
    contentBlocks: [
      { id: 'd22-intro', type: ContentBlockType.TEXT, title: 'Kanji for Elements and Time', markdownContent: 'Many of these Kanji are fundamental building blocks for vocabulary related to nature, time, and the calendar.' },
      {
        id: 'd22-kanji-set2', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 2: Elements & Year',
        introduction: 'These Kanji are associated with celestial bodies, elements, and the concept of a year. You\'ll recognize them from the days of the week!',
        characters: kanjiSet2_ElementsTime
      },
      {
        id: 'd22-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with New Kanji', items: [
          { id: 'd22-vocab-0', japanese: 'げつようび (月曜日)', romaji: 'getsuyōbi', meaning: 'Monday' },
          { id: 'd22-vocab-1', japanese: 'かようび (火曜日)', romaji: 'kayōbi', meaning: 'Tuesday' },
          { id: 'd22-vocab-2', japanese: 'みず (水)', romaji: 'mizu', meaning: 'water' },
          { id: 'd22-vocab-3', japanese: 'き (木)', romaji: 'ki', meaning: 'tree, wood' },
          { id: 'd22-vocab-4', japanese: 'おかね (お金)', romaji: 'okane', meaning: 'money (金 - gold/metal)' },
          { id: 'd22-vocab-5', japanese: 'つち (土)', romaji: 'tsuchi', meaning: 'earth, soil' },
          { id: 'd22-vocab-6', japanese: 'ことし (今年)', romaji: 'kotoshi', meaning: 'this year (今 - now, 年 - year)' },
          { id: 'd22-vocab-7', japanese: 'らいねん (来年)', romaji: 'rainen', meaning: 'next year (来 - come, 年 - year)' },
        ]
      },
      {
        id: 'd22-writing-practice-tsuki',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 月 (moon/month)',
        characterToPractice: getCharOrThrow(kanjiSet2_ElementsTime, '月', "Day 22 '月' writing practice"),
        instructions: "Practice writing the Kanji for 'moon' or 'month' (つき - tsuki, ゲツ - getsu, ガツ - gatsu).",
        guidanceImageUrl: getCharOrThrow(kanjiSet2_ElementsTime, '月', "Day 22 '月' writing practice").strokeOrderDiagramUrl
      },
      // ADD DAY 22 FACT HERE
    ],
  },
  // Day 23: Particles で (Location of Action/Means) & と (And/With)
  {
    day: 23,
    title: 'Particles で (Location/Means) & と (And/With)',
    category: 'Grammar',
    overview: 'Learn the particle で (de) to indicate where an action takes place or the means by which it is done. Learn particle と (to) for "and" (connecting nouns) and "with" (accompaniment).',
    contentBlocks: [
      { id: 'd23-intro', type: ContentBlockType.TEXT, title: 'More Useful Particles: で and と', markdownContent: 'These particles add significant detail to your sentences, allowing you to specify locations, tools, and connections.' },
      {
        id: 'd23-grammar-de', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particle で (de): Location of Action / Means',
        explanation: '**1. Location of Action:** Indicates where an action takes place (dynamic actions, not just existence).\n   Example: レストランでたべます。 (Resutoran de tabemasu.) - I eat at the restaurant.\n   Compare with に (ni) for location of existence: へやにいます。 (Heya ni imasu.) - I am in the room.\n\n**2. Means/Tool:** Indicates the tool, method, or material used to perform an action.\n   Example: ペンでかきます。 (Pen de kakimasu.) - I write with a pen.\n   Example: でんしゃでいきます。 (Densha de ikimasu.) - I go by train.',
        exampleSentences: [
          { id: 'd23-de-ex-0', japanese: 'がっこうでべんきょうします。', romaji: 'Gakkō de benkyō shimasu.', meaning: 'I study at school. (べんきょうします benkyō shimasu - to study)' },
          { id: 'd23-de-ex-1', japanese: 'バスでかいしゃへいきます。', romaji: 'Basu de kaisha e ikimasu.', meaning: 'I go to the company by bus. (バス basu - bus)' },
          { id: 'd23-de-ex-2', japanese: 'はしでごはんをたべますか。', romaji: 'Hashi de gohan o tabemasu ka?', meaning: 'Do you eat rice with chopsticks? (はし hashi - chopsticks, ごはん gohan - rice/meal)' },
        ]
      },
      {
        id: 'd23-grammar-to', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particle と (to): And / With',
        explanation: '**1. Connecting Nouns (And):** Used to list nouns exhaustively (A and B, and C, etc.).\n   Example: パンとたまごをかいます。 (Pan to tamago o kaimasu.) - I buy bread and eggs.\n\n**2. Accompaniment (With):** Indicates doing something together with someone.\n   Example: ともだちとえいがをみました。 (Tomodachi to eiga o mimashita.) - I watched a movie with a friend.',
        exampleSentences: [
          { id: 'd23-to-ex-0', japanese: 'わたしはいぬとねこがすきです。', romaji: 'Watashi wa inu to neko ga suki desu.', meaning: 'I like dogs and cats. (すき suki - like, が ga - subject marker for likes/dislikes)' },
          { id: 'd23-to-ex-1', japanese: 'せんせいとはなしました。', romaji: 'Sensei to hanashimashita.', meaning: 'I talked with the teacher. (はなします hanashimasu - to talk)' },
          { id: 'd23-to-ex-2', japanese: 'コーヒーとケーキをください。', romaji: 'Koohii to keeki o kudasai.', meaning: 'Coffee and cake, please. (ください kudasai - please give me)' },
        ]
      },
      {
        id: 'd23-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Related Vocabulary', items: [
          { id: 'd23-vocab-0', japanese: 'レストラン', romaji: 'resutoran', meaning: 'restaurant' },
          { id: 'd23-vocab-1', japanese: 'でんしゃ (電車)', romaji: 'densha', meaning: 'train' },
          { id: 'd23-vocab-2', japanese: 'えいが (映画)', romaji: 'eiga', meaning: 'movie' },
          { id: 'd23-vocab-3', japanese: 'ともだち (友達)', romaji: 'tomodachi', meaning: 'friend' },
          { id: 'd23-vocab-4', japanese: 'かぞく (家族)', romaji: 'kazoku', meaning: 'family' },
          { id: 'd23-vocab-5', japanese: 'かきます (書きます)', romaji: 'kakimasu', meaning: 'to write' },
          { id: 'd23-vocab-6', japanese: 'かいます (買います)', romaji: 'kaimasu', meaning: 'to buy' },
        ]
      },
      {
        id: 'd23-fill-blank-de',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice (で)',
        sentenceParts: ["としょかん", "ほんをよみます。"], 
        correctAnswer: "で",
        explanation: "The particle で (de) is used here to mark としょかん (toshokan - library) as the location where the action of reading takes place."
      },
      {
        id: 'd23-fill-blank-to',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice (と)',
        sentenceParts: ["きのう、やまださん", "テニスをしました。"], 
        correctAnswer: "と",
        explanation: "The particle と (to) is used here to indicate accompaniment - doing tennis *with* Yamada-san."
      },
      // ADD DAY 23 FACT HERE
    ],
  },
  // Day 24: More Kanji & Reading Practice
  {
    day: 24,
    title: 'More Kanji (Sizes/Position) & Reading',
    category: 'Kanji & Reading',
    overview: 'Learn Kanji for sizes (big, small, middle) and positions (up, down, left, right). Apply your knowledge in a short reading passage.',
    contentBlocks: [
      { id: 'd24-intro', type: ContentBlockType.TEXT, title: 'Descriptive Kanji & Reading Time!', markdownContent: 'Let\'s learn Kanji that help describe things and then try to read a short passage putting it all together!' },
      {
        id: 'd24-kanji-set3', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 3: Sizes & Position',
        introduction: 'These Kanji are very common for describing objects and their relative positions.',
        characters: kanjiSet3_SizesPosition
      },
      {
        id: 'd24-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary with New Kanji', items: [
          { id: 'd24-vocab-0', japanese: 'だいがく (大学)', romaji: 'daigaku', meaning: 'university (big learn)' },
          { id: 'd24-vocab-1', japanese: 'しょうがっこう (小学校)', romaji: 'shōgakkō', meaning: 'elementary school (small learn school)' },
          { id: 'd24-vocab-2', japanese: 'ちゅうごく (中国)', romaji: 'Chūgoku', meaning: 'China (middle country)' },
          { id: 'd24-vocab-3', japanese: 'うえ (上)', romaji: 'ue', meaning: 'up, above, on top' },
          { id: 'd24-vocab-4', japanese: 'した (下)', romaji: 'shita', meaning: 'down, below, under' },
          { id: 'd24-vocab-5', japanese: 'みぎ (右)', romaji: 'migi', meaning: 'right (direction)' },
          { id: 'd24-vocab-6', japanese: 'ひだり (左)', romaji: 'hidari', meaning: 'left (direction)' },
          { id: 'd24-vocab-7', japanese: 'ちゅうもん (注文)', romaji: 'chūmon', meaning: 'order (for food, items)' },
        ]
      },
      {
        id: 'd24-writing-practice-dai',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 大 (big)',
        characterToPractice: getCharOrThrow(kanjiSet3_SizesPosition, '大', "Day 24 '大' writing practice"),
        instructions: "Practice writing the Kanji for 'big' (おおきい - ookii, ダイ - dai, タイ - tai).",
        guidanceImageUrl: getCharOrThrow(kanjiSet3_SizesPosition, '大', "Day 24 '大' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd24-reading-practice', type: ContentBlockType.TEXT, title: 'Reading Practice!',
        markdownContent: '読んでみましょう！ (Yonde mimashou! - Let\'s try reading!)\n\nきのう、わたしはともだちとまちへいきました。\nわたしたちはあたらしいレストランでひるごはんをたべました。\nそのレストランのおおきいテーブルのうえにきれいなはながありました。\nわたしはちいさいパンとコーヒーをちゅうもんしました。\nともだちはさかなをたべました。\nとてもおいしかったです。\n\n**Vocabulary Help:**\nひるごはん (hirugohan) - lunch\nテーブル (teeburu) - table\nありました (arimashita) - there was (existence, past)\nさかな (sakana) - fish\nとても (totemo) - very'
      },
      // ADD DAY 24 FACT HERE
    ],
  },
  // Day 25: Particle に (Time, Location, Destination) & More Kanji
  {
    day: 25,
    title: 'Particle に (Time, Location, Destination)',
    category: 'Grammar & Kanji',
    overview: 'Deep dive into particle に (ni), covering its uses for specific time, location of existence, and destination. Learn more Kanji for directions and places.',
    contentBlocks: [
      { id: 'd25-intro', type: ContentBlockType.TEXT, title: 'Mastering Particle に (ni)', markdownContent: 'The particle に (ni) is incredibly versatile! Today we will explore its main uses for indicating time, where things exist, and where you are going.' },
      {
        id: 'd25-grammar-ni', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particle に (ni): Key Uses',
        explanation: '**1. Specific Point in Time:** Used with days of the week, specific dates, and times.\n   Example: にちようびにえいがをみます。 (Nichiyōbi ni eiga o mimasu.) - I watch a movie on Sunday.\n   Example: しちじにおきます。 (Shichi-ji ni okimasu.) - I wake up at 7 o\'clock. (おきます okimasu - to wake up)\n\n**2. Location of Existence (with います/あります):** Indicates where something or someone *exists*.\n   Example: つくえのうえにほんがあります。 (Tsukue no ue ni hon ga arimasu.) - There is a book on the desk. (あります arimasu - to exist for inanimate things)\n   Example: へやにねこがいます。 (Heya ni neko ga imasu.) - There is a cat in the room. (います imasu - to exist for animate things)\n\n**3. Destination of Movement:** Indicates the place one is going towards (used with verbs like 行きます ikimasu - to go, 来ます kimasu - to come, 帰ります kaerimasu - to return).\n   Example: わたしはにほんへ/にいきます。 (Watashi wa Nihon e/ni ikimasu.) - I am going to Japan. (へ (e) can also be used for destination, often interchangeably with に).\n\n**4. Indirect Object / Target:** Indicates the person or thing an action is directed towards.\n   Example: ともだちにプレゼントをあげます。 (Tomodachi ni purezento o agemasu.) - I give a present to my friend. (プレゼント purezento - present, あげます agemasu - to give)',
        exampleSentences: [
          { id: 'd25-ni-ex-0', japanese: 'ろくじはんにおきます。', romaji: 'Rokuji han ni okimasu.', meaning: 'I wake up at 6:30.' },
          { id: 'd25-ni-ex-1', japanese: 'つくえのしたにいぬがいます。', romaji: 'Tsukue no shita ni inu ga imasu.', meaning: 'There is a dog under the desk.' },
          { id: 'd25-ni-ex-2', japanese: 'あした きょうとへ/にいきます。', romaji: 'Ashita Kyōto e/ni ikimasu.', meaning: 'I will go to Kyoto tomorrow.' },
          { id: 'd25-ni-ex-3', japanese: 'ははにてがみをかきました。', romaji: 'Haha ni tegami o kakimashita.', meaning: 'I wrote a letter to my mother. (はは haha - mother, てがみ tegami - letter, かきました kakimashita - wrote)' },
        ]
      },
      {
        id: 'd25-kanji-set4', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 4: Directions & Places',
        introduction: 'These Kanji will help you describe locations and directions, often used with particles like に.',
        characters: kanjiSet4_DirectionsPlaces
      },
      {
        id: 'd25-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary for Particle に', items: [
          { id: 'd25-vocab-0', japanese: 'きます (来ます)', romaji: 'kimasu', meaning: 'to come' },
          { id: 'd25-vocab-1', japanese: 'かえります (帰ります)', romaji: 'kaerimasu', meaning: 'to return (home, to one\'s origin)' },
          { id: 'd25-vocab-2', japanese: 'おきます (起きます)', romaji: 'okimasu', meaning: 'to wake up, get up' },
          { id: 'd25-vocab-3', japanese: 'あります', romaji: 'arimasu', meaning: 'to exist, to be (inanimate things), to have' },
          { id: 'd25-vocab-4', japanese: 'います', romaji: 'imasu', meaning: 'to exist, to be (animate things)' },
          { id: 'd25-vocab-5', japanese: 'うち', romaji: 'uchi', meaning: 'home, house' },
          { id: 'd25-vocab-6', japanese: 'こうえん (公園)', romaji: 'kōen', meaning: 'park' },
        ]
      },
      {
        id: 'd25-writing-practice-higashi',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 東 (east)',
        characterToPractice: getCharOrThrow(kanjiSet4_DirectionsPlaces, '東', "Day 25 '東' writing practice"),
        instructions: "Practice writing the Kanji for 'east' (ひがし - higashi, トウ - tou).",
        guidanceImageUrl: getCharOrThrow(kanjiSet4_DirectionsPlaces, '東', "Day 25 '東' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd25-fill-blank-ni',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice (に)',
        sentenceParts: ["まいあさ、しちじ", "おきます。"], 
        correctAnswer: "に",
        explanation: "The particle に (ni) is used here to mark a specific point in time (7 o'clock) when the action of waking up occurs."
      },
      // ADD DAY 25 FACT HERE
    ],
  },
  // Day 26: Particles へ (Direction) & を (Object Marker)
  {
    day: 26,
    title: 'Particles へ (Direction) & を (Object Marker)',
    category: 'Grammar & Kanji',
    overview: 'Learn particle へ (e) for direction and particle を (o) for marking the direct object of a verb. Introduce more action-related Kanji.',
    contentBlocks: [
      { id: 'd26-intro', type: ContentBlockType.TEXT, title: 'Specifying Direction and Objects', markdownContent: 'Today we explore two more crucial particles: へ (e) for direction and を (o) to show what is being acted upon.' },
      {
        id: 'd26-grammar-e', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particle へ (e): Direction',
        explanation: 'The particle へ (written with Hiragana へ but pronounced "e") indicates the direction of movement. It is very similar to に (ni) when used with motion verbs like 行きます (ikimasu), 来ます (kimasu), 帰ります (kaerimasu).\n- **Nuance:** へ (e) often emphasizes the *direction towards* a place, while に (ni) can emphasize the *arrival point* or destination itself. In many cases, they are interchangeable for destination.\nExample: とうきょうへいきます。 (Tōkyō e ikimasu.) - I am going towards Tokyo / I am going to Tokyo.',
        exampleSentences: [
          { id: 'd26-e-ex-0', japanese: 'どこへいきますか。', romaji: 'Doko e ikimasu ka?', meaning: 'Where are you going?' },
          { id: 'd26-e-ex-1', japanese: 'スーパーへかいものにいきました。', romaji: 'Sūpā e kaimono ni ikimashita.', meaning: 'I went to the supermarket for shopping. (スーパー sūpā - supermarket, かいもの kaimono - shopping, に here shows purpose)' },
        ]
      },
      {
        id: 'd26-grammar-o', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Particle を (o): Direct Object Marker',
        explanation: 'The particle を (written with Hiragana を but pronounced "o") marks the direct object of a transitive verb. The direct object is the noun that directly receives the action of the verb.\nStructure: [Noun (Direct Object)] を [Verb]\nExample: パンをたべます。 (Pan o tabemasu.) - I eat bread. ("Bread" is what is being eaten.)',
        exampleSentences: [
          { id: 'd26-o-ex-0', japanese: 'みずをのみます。', romaji: 'Mizu o nomimasu.', meaning: 'I drink water.' },
          { id: 'd26-o-ex-1', japanese: 'えいがをみました。', romaji: 'Eiga o mimashita.', meaning: 'I watched a movie.' },
          { id: 'd26-o-ex-2', japanese: 'なにをしますか。', romaji: 'Nani o shimasu ka?', meaning: 'What will you do? (します shimasu - to do)' },
        ]
      },
      {
        id: 'd26-kanji-set5', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 5: Verbs & Actions',
        introduction: 'These Kanji are commonly found in verbs and words related to actions, often taking the particle を.',
        characters: kanjiSet5_VerbsActions
      },
      {
        id: 'd26-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary for Particles へ & を', items: [
          { id: 'd26-vocab-0', japanese: 'しんぶん (新聞)', romaji: 'shinbun', meaning: 'newspaper' },
          { id: 'd26-vocab-1', japanese: 'おんがく (音楽)', romaji: 'ongaku', meaning: 'music' },
          { id: 'd26-vocab-2', japanese: 'ききます (聞きます)', romaji: 'kikimasu', meaning: 'to listen, to hear, to ask' },
          { id: 'd26-vocab-3', japanese: 'よみます (読みます)', romaji: 'yomimasu', meaning: 'to read' },
          { id: 'd26-vocab-4', japanese: 'かきます (書きます)', romaji: 'kakimasu', meaning: 'to write, to draw' },
        ]
      },
      {
        id: 'd26-writing-practice-mi',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 見 (to see)',
        characterToPractice: getCharOrThrow(kanjiSet5_VerbsActions, '見', "Day 26 '見' writing practice"),
        instructions: "Practice writing the Kanji for 'to see' (みる - miru, ケン - ken).",
        guidanceImageUrl: getCharOrThrow(kanjiSet5_VerbsActions, '見', "Day 26 '見' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd26-fill-blank-o',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Particle Practice (を)',
        sentenceParts: ["まいにち、テレビ", "みます。"], 
        correctAnswer: "を",
        explanation: "The particle を (o) is used here to mark テレビ (terebi - TV) as the direct object of the verb みます (mimasu - to watch)."
      },
      // ADD DAY 26 FACT HERE
    ],
  },
  // Day 27: い-Adjectives (Past & Negative Conjugation)
  {
    day: 27,
    title: 'い-Adjectives: Past & Negative Forms',
    category: 'Grammar & Kanji',
    overview: 'Learn how to conjugate い-adjectives into past affirmative (～かったです -kattadesu), present negative (～くないです -kunaidesu), and past negative (～くなかったです -kunakattadesu). Introduce more descriptive Kanji.',
    contentBlocks: [
      { id: 'd27-intro', type: ContentBlockType.TEXT, title: 'Describing in More Detail: Adjective Conjugation', markdownContent: 'Today, we learn how to change い-adjectives to talk about past states or negate them. This greatly expands your descriptive power!' },
      {
        id: 'd27-grammar-i-adj-conj', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'い-Adjective Conjugation (Polite Form)',
        explanation: 'Remember い-adjectives end in い (e.g., たかい - takai).\n\n**1. Present Affirmative:** (No change from dictionary form before です)\n   高いです (takai desu) - It is expensive.\n\n**2. Present Negative:** Drop the final い and add くないです (-kunai desu).\n   高くないです (takakunai desu) - It is not expensive.\n\n**3. Past Affirmative:** Drop the final い and add かったです (-katta desu).\n   高かったです (takakatta desu) - It was expensive.\n\n**4. Past Negative:** Drop the final い and add くなかったです (-kunakatta desu).\n   高くなかったです (takakunakatta desu) - It was not expensive.\n\n**Special Case: いい (ii - good)**\nFor conjugation, いい (ii) changes to its alternative form よい (yoi):\n- Present Negative: よくないです (yokunai desu) - It is not good.\n- Past Affirmative: よかったです (yokatta desu) - It was good.\n- Past Negative: よくなかったです (yokunakatta desu) - It was not good.',
        exampleSentences: [
          { id: 'd27-iconj-ex-0', japanese: 'きのうのテストはむずかしかったです。', romaji: 'Kinō no tesuto wa muzukashikatta desu.', meaning: 'Yesterday\'s test was difficult. (テスト tesuto - test, むずかしい muzukashii - difficult)' },
          { id: 'd27-iconj-ex-1', japanese: 'このりんごはおいしくないです。', romaji: 'Kono ringo wa oishikunai desu.', meaning: 'This apple is not delicious. (りんご ringo - apple)' },
          { id: 'd27-iconj-ex-2', japanese: 'せんしゅうのてんきはよくなかったです。', romaji: 'Senshū no tenki wa yoku nakatta desu.', meaning: 'Last week\'s weather was not good. (てんき tenki - weather)' },
          { id: 'd27-iconj-ex-3', japanese: 'そのえいがはとてもおもしかったです。', romaji: 'Sono eiga wa totemo omoshirokatta desu.', meaning: 'That movie was very interesting. (おもしろい omoshiroi - interesting)' },
        ]
      },
      {
        id: 'd27-kanji-set6', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Set 6: Descriptive Adjectives',
        introduction: 'These Kanji are often found in adjectives that describe qualities like newness, age, quantity, and price.',
        characters: kanjiSet6_Adjectives
      },
      {
        id: 'd27-vocab', type: ContentBlockType.VOCABULARY_LIST, title: 'More い-Adjectives', items: [
          { id: 'd27-vocab-0', japanese: 'たのしい (楽しい)', romaji: 'tanoshii', meaning: 'fun, enjoyable' },
          { id: 'd27-vocab-1', japanese: 'いそがしい (忙しい)', romaji: 'isogashii', meaning: 'busy' },
          { id: 'd27-vocab-2', japanese: 'さむい (寒い)', romaji: 'samui', meaning: 'cold (weather)' },
          { id: 'd27-vocab-3', japanese: 'あつい (暑い/熱い)', romaji: 'atsui', meaning: 'hot (weather/object)' },
          { id: 'd27-vocab-4', japanese: 'やさしい (易しい/優しい)', romaji: 'yasashii', meaning: 'easy / kind' },
          { id: 'd27-vocab-5', japanese: 'むずかしい (難しい)', romaji: 'muzukashii', meaning: 'difficult' },
        ]
      },
      {
        id: 'd27-writing-practice-atarashii',
        type: ContentBlockType.WRITING_PRACTICE,
        title: 'Writing Practice: 新 (new)',
        characterToPractice: getCharOrThrow(kanjiSet6_Adjectives, '新', "Day 27 '新' writing practice"),
        instructions: "Practice writing the Kanji for 'new' (あたらしい - atarashii, シン - shin).",
        guidanceImageUrl: getCharOrThrow(kanjiSet6_Adjectives, '新', "Day 27 '新' writing practice").strokeOrderDiagramUrl
      },
      {
        id: 'd27-fill-blank-i-adj',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Adjective Conjugation Practice',
        sentenceParts: ["きのうはとても", "でした。 (さむい)"], 
        correctAnswer: "さむかった",
        explanation: "For the い-adjective さむい (samui - cold), the past affirmative is さむかったです (samukatta desu). Drop い, add かったです."
      },
      // ADD DAY 27 FACT HERE
    ],
  },
  // Day 28: Combining Sentences (～て form introduction - for listing actions)
  {
    day: 28,
    title: 'Connecting Actions: Verb て-form (Listing)',
    category: 'Grammar & Kanji',
    overview: 'Introduction to the verb て-form (te-form), focusing on its use for listing sequential actions (e.g., "I woke up, ate breakfast, and went to school."). Basic te-form conjugation.',
    contentBlocks: [
      { id: 'd28-intro', type: ContentBlockType.TEXT, title: 'The Versatile Te-Form: Linking Actions', markdownContent: 'The て-form of verbs is one of the most useful and common conjugations in Japanese. It allows you to connect multiple actions or states in a sequence, among many other uses. Today, we\'ll focus on using it to list actions one after another.' },
      {
        id: 'd28-grammar-what-is-te', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'What is the Te-Form?',
        explanation: 'The te-form (て形 - tekei) helps link clauses. When used to list actions, it generally implies a sequence: "do A, then do B, then do C."\nFor example: 朝起きて、ご飯を食べて、学校へ行きました。(Asa okite, gohan o tabete, gakkou e ikimashita.) - I woke up in the morning, ate a meal, and went to school.',
        exampleSentences: [] 
      },
      {
        id: 'd28-grammar-te-conjugation', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Basic Te-Form Conjugation Rules',
        explanation: 'Verbs are generally divided into three groups for conjugation:\n\n**Group 2 (る-verbs / Ichidan verbs):** Verbs ending in -eru or -iru (e.g., 食べる taberu, 見る miru).\n   - Rule: Drop the final る (ru) and add て (te).\n   - Example: 食べる (taberu) -> 食べて (tabete)\n   - Example: 見る (miru) -> 見て (mite)\n\n**Group 3 (Irregular verbs):**\n   - する (suru - to do) -> して (shite)\n   - 来る (くる - kuru - to come) -> 来て (きて - kite)\n\n**Group 1 (う-verbs / Godan verbs):** These have more varied endings.\n   - Verbs ending in -u, -tsu, -ru (e.g., 買う kau, 持つ motsu, 作る tsukuru):\n     Drop -u, -tsu, -ru and add って (-tte).\n     Example: 買う (kau) -> 買って (katte)\n     Example: 持つ (motsu) -> 持って (motte)\n     Example: 作る (tsukuru) -> 作って (tsukutte)\n   - Verbs ending in -mu, -bu, -nu (e.g., 飲む nomu, 遊ぶ asobu, 死ぬ shinu):\n     Drop -mu, -bu, -nu and add んで (-nde).\n     Example: 飲む (nomu) -> 飲んで (nonde)\n     Example: 遊ぶ (asobu) -> 遊んで (asonde)\n   - Verbs ending in -ku (e.g., 書く kaku):\n     Drop -ku and add いて (-ite).\n     Example: 書く (kaku) -> 書いて (kaite)\n   - Verbs ending in -gu (e.g., 急ぐ isogu):\n     Drop -gu and add いで (-ide).\n     Example: 急ぐ (isogu) -> 急いで (isoide)\n   - Verbs ending in -su (e.g., 話す hanasu):\n     Drop -su and add して (-shite).\n     Example: 話す (hanasu) -> 話して (hanashite)\n   - **Exception:** 行く (いく - iku - to go) -> 行って (いって - itte)',
        exampleSentences: [
          { id: 'd28-te-ex-g2', japanese: '寝る (neru - to sleep) -> 寝て (nete)', romaji: '', meaning: '' },
          { id: 'd28-te-ex-g1u', japanese: '歌う (utau - to sing) -> 歌って (utatte)', romaji: '', meaning: '' },
          { id: 'd28-te-ex-g1mu', japanese: '読む (yomu - to read) -> 読んで (yonde)', romaji: '', meaning: '' },
          { id: 'd28-te-ex-g1ku', japanese: '聞く (kiku - to listen) -> 聞いて (kiite)', romaji: '', meaning: '' },
        ]
      },
      {
        id: 'd28-grammar-te-sequential', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Using Te-Form for Sequential Actions',
        explanation: 'To list actions in order, conjugate each verb (except the last one in the sequence) into its te-form. The final verb determines the tense of the whole sequence.\nPattern: [Action 1]-て, [Action 2]-て, [Action 3]-ました/ます。',
        exampleSentences: [
          { id: 'd28-seq-ex-0', japanese: '朝起きて、顔を洗って、朝ご飯を食べました。', romaji: 'Asa okite, kao o aratte, asagohan o tabemashita.', meaning: 'In the morning, I woke up, washed my face, and ate breakfast. (顔 kao - face, 洗う arau - to wash)' },
          { id: 'd28-seq-ex-1', japanese: 'うちに帰って、宿題をして、寝ます。', romaji: 'Uchi ni kaette, shukudai o shite, nemasu.', meaning: 'I will return home, do my homework, and sleep. (宿題 shukudai - homework, 寝ます nemasu - to sleep)' },
        ]
      },
      {
        id: 'd28-kanji-set-iku', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Spotlight: 行 (to go)',
        introduction: 'The Kanji 行 is very common and means "to go", "journey", or "carry out". Its te-form is an exception: 行って (itte).',
        characters: [getCharOrThrow(kanjiSet7_ActionsMisc, '行', "Day 28 Kanji Spotlight '行'")].filter(Boolean) as KanaCharacter[]
      },
      {
        id: 'd28-vocab-verbs', type: ContentBlockType.VOCABULARY_LIST, title: 'Common Verbs for Te-Form Practice', items: [
          { id: 'd28-vocab-0', japanese: 'おきる (起きます)', romaji: 'okiru (okimasu)', meaning: 'to wake up, get up (Group 2)' },
          { id: 'd28-vocab-1', japanese: 'ねる (寝ます)', romaji: 'neru (nemasu)', meaning: 'to sleep, go to bed (Group 2)' },
          { id: 'd28-vocab-2', japanese: 'あらう (洗います)', romaji: 'arau (araimasu)', meaning: 'to wash (Group 1, -u)' },
          { id: 'd28-vocab-3', japanese: 'まつ (持ちます)', romaji: 'matsu (mochimasu)', meaning: 'to wait (Group 1, -tsu)' },
          { id: 'd28-vocab-4', japanese: 'つくる (作ります)', romaji: 'tsukuru (tsukurimasu)', meaning: 'to make, create (Group 1, -ru)' },
          { id: 'd28-vocab-5', japanese: 'あそぶ (遊びます)', romaji: 'asobu (asobimasu)', meaning: 'to play, hang out (Group 1, -bu)' },
          { id: 'd28-vocab-6', japanese: 'いそぐ (急ぎます)', romaji: 'isogu (isogimasu)', meaning: 'to hurry (Group 1, -gu)' },
        ]
      },
      {
        id: 'd28-fill-blank-te',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Te-Form Conjugation',
        sentenceParts: ["ほんを (よむ)", "、おんがくをききました。"], 
        correctAnswer: "よんで",
        explanation: "よむ (yomu) is a Group 1 verb ending in -mu. Its te-form is よんで (yonde)."
      },
      // ADD DAY 28 FACT HERE
    ],
  },
  // Day 29: Expressing "Want" (～たいです) & Hobby
  {
    day: 29,
    title: 'Wants & Hobbies (～たいです, しゅみ)',
    category: 'Grammar & Vocabulary',
    overview: 'Learn how to express what you want to do using ～たいです (tai desu). Learn vocabulary for common hobbies (しゅみ shumi) and how to talk about them. Introduce relevant Kanji.',
    contentBlocks: [
      { id: 'd29-intro', type: ContentBlockType.TEXT, title: 'Expressing Desires and Interests', markdownContent: 'Today, you\'ll learn how to say "I want to do..." and how to talk about your hobbies. This will make your conversations much more personal!' },
      {
        id: 'd29-grammar-tai-desu', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Expressing "Want to do": ～たいです (-tai desu)',
        explanation: 'To express that you want to perform an action, you use the ～たい (-tai) form of a verb.\nRule: Take the verb stem (the ます-form minus ます) and add たいです (-tai desu).\nExample: 食べます (tabemasu - to eat) -> 食べ (tabe-) -> 食べたいです (tabetai desu - I want to eat).\n\nWhen using ～たいです, the direct object of the verb (what you want to act upon) is often marked by が (ga) instead of を (o), though を (o) is also commonly used and generally acceptable.\nExample: すしが食べたいです。 (Sushi ga tabetai desu.) - I want to eat sushi.\nExample: すしを食べたいです。 (Sushi o tabetai desu.) - Also acceptable.\n\nLike い-adjectives, the たい ending can be conjugated:\n- Want to: ～たいです (tabetai desu)\n- Don\'t want to: ～た<0xE3><0x81><0x8F><0xE3><0x81><0xAA><0xE3><0x81><0x84>です (tabetakunai desu)\n- Wanted to: ～たかったです (tabetakatta desu)\n- Didn\'t want to: ～た<0xE3><0x81><0x8F><0xE3><0x81><0xAA><0xE3><0x81><0x8B>ったです (tabetakunakatta desu)',
        exampleSentences: [
          { id: 'd29-tai-ex-0', japanese: 'わたしはにほんへいきたいです。', romaji: 'Watashi wa Nihon e ikitai desu.', meaning: 'I want to go to Japan.' },
          { id: 'd29-tai-ex-1', japanese: 'あたらしいカメラが/をかいたいです。', romaji: 'Atarashii kamera ga/o kaitai desu.', meaning: 'I want to buy a new camera.' },
          { id: 'd29-tai-ex-2', japanese: 'きのうはえいがをみたかったです。', romaji: 'Kinō wa eiga o mitakatta desu.', meaning: 'I wanted to watch a movie yesterday.' },
          { id: 'd29-tai-ex-3', japanese: 'なにもたべたくないです。', romaji: 'Nani mo tabetakunai desu.', meaning: 'I don\'t want to eat anything. (なにも nani mo - anything/nothing with negative)' },
        ]
      },
      {
        id: 'd29-grammar-shumi', type: ContentBlockType.GRAMMAR_EXPLANATION, title: 'Talking About Hobbies (しゅみ - shumi)',
        explanation: 'The word for hobby is しゅみ (shumi).\nTo say "My hobby is [X]":\nわたしのしゅみは [Hobby] です。 (Watashi no shumi wa [Hobby] desu.)\n\nFor verb-based hobbies, you often use the dictionary form of the verb + こと (koto - thing, act of doing).\nExample: わたしのしゅみはえいがをみることです。 (Watashi no shumi wa eiga o miru koto desu.) - My hobby is watching movies.',
        exampleSentences: [
          { id: 'd29-shumi-ex-0', japanese: 'あなたのしゅみはなんですか。', romaji: 'Anata no shumi wa nan desu ka?', meaning: 'What is your hobby?' },
          { id: 'd29-shumi-ex-1', japanese: 'わたしのしゅみはどくしょです。', romaji: 'Watashi no shumi wa dokusho desu.', meaning: 'My hobby is reading books. (どくしょ dokusho - reading)' },
          { id: 'd29-shumi-ex-2', japanese: 'わたしのしゅみはおんがくをきくことです。', romaji: 'Watashi no shumi wa ongaku o kiku koto desu.', meaning: 'My hobby is listening to music.' },
        ]
      },
      {
        id: 'd29-kanji-set-actions', type: ContentBlockType.KANA_INFO, kanaSet: 'katakana', title: 'Kanji Spotlight: Likes & Actions',
        introduction: 'These Kanji relate to desires and common hobby actions.',
        characters: [
          getCharOrThrow(kanjiSet7_ActionsMisc, '買', "Day 29 Kanji Spotlight '買'"),
          getCharOrThrow(kanjiSet7_ActionsMisc, '旅', "Day 29 Kanji Spotlight '旅'"),
          getCharOrThrow(kanjiSet7_ActionsMisc, '好', "Day 29 Kanji Spotlight '好'"),
        ].filter(Boolean) as KanaCharacter[]
      },
      {
        id: 'd29-vocab-hobbies', type: ContentBlockType.VOCABULARY_LIST, title: 'Hobbies & Related Verbs', items: [
          { id: 'd29-vocab-0', japanese: 'しゅみ (趣味)', romaji: 'shumi', meaning: 'hobby' },
          { id: 'd29-vocab-1', japanese: 'スポーツをすること', romaji: 'supootsu o suru koto', meaning: 'playing sports' },
          { id: 'd29-vocab-2', japanese: 'りょこう (旅行)', romaji: 'ryokou', meaning: 'travel' },
          { id: 'd29-vocab-3', japanese: 'どくしょ (読書)', romaji: 'dokusho', meaning: 'reading books' },
          { id: 'd29-vocab-4', japanese: 'ゲームをすること', romaji: 'geemu o suru koto', meaning: 'playing games' },
          { id: 'd29-vocab-5', japanese: 'えをかくこと (絵を描くこと)', romaji: 'e o kaku koto', meaning: 'drawing pictures (絵 e - picture)' },
          { id: 'd29-vocab-6', japanese: 'うたう (歌います)', romaji: 'utau (utaimasu)', meaning: 'to sing' },
          { id: 'd29-vocab-7', japanese: 'およぐ (泳ぎます)', romaji: 'oyogu (oyogimasu)', meaning: 'to swim' },
        ]
      },
      {
        id: 'd29-fill-blank-tai',
        type: ContentBlockType.FILL_IN_THE_BLANK_EXERCISE,
        title: 'Expressing Desire',
        sentenceParts: ["ラーメンが", "です。 (たべます)"], 
        correctAnswer: "たべたい",
        explanation: "To say 'want to eat ramen', take the stem of 食べます (tabemasu) which is 食べ (tabe-), and add たい (tai)."
      },
      // ADD DAY 29 FACT HERE
    ],
  },
  // Day 30: Grand Review & Next Steps
  {
    day: 30,
    title: 'Grand Review & Your Journey Forward',
    category: 'Review & Future Learning',
    overview: 'Comprehensive review of all grammar, vocabulary, Hiragana, Katakana, and basic Kanji learned over 30 days. Discussion of next steps for continued Japanese study.',
    contentBlocks: [
      { id: 'd30-congrats', type: ContentBlockType.TEXT, title: '🎉 おめでとうございます！Congratulations! 🎉', markdownContent: 'You\'ve completed the 30-Day Japanese Challenge! This is a fantastic achievement. You\'ve built a solid foundation in Japanese pronunciation, writing systems, basic grammar, and essential vocabulary. 素晴らしい (subarashii - wonderful)!' },
      { id: 'd30-review-kana', type: ContentBlockType.TEXT, title: '振り返り (Furikaeri) - Review: Kana', markdownContent: '**Hiragana & Katakana:**\n- Go through all the Kana charts from Days 1-14.\n- Practice writing each character from memory.\n- Read words and short sentences using only Kana.\n- Ensure you know voiced sounds (dakuten), p-sounds (handakuten), and combined sounds (yōon) for both scripts.\n- Remember the Katakana long vowel mark (ー) and small tsu (ッ).' },
      { id: 'd30-review-grammar', type: ContentBlockType.TEXT, title: 'Review: Grammar Essentials', markdownContent: '**Key Grammar Points Covered:**\n- Basic sentence structure: A は B です (A is B).\n- Particles: は, も, か, の, を, に, へ, で, と.\n- Demonstratives: これ/それ/あれ, この/その/あの.\n- Adjectives: い-adjectives & な-adjectives (present tense).\n- Tenses: Polite past tense (でした, ました, ませんでした), い-adjective past & negative conjugations.\n- Verb て-form for listing actions.\n- Expressing desire: ～たいです.\n\nRevisit the relevant lesson days to refresh your understanding of each concept. Try making new example sentences for each grammar point.' },
      { id: 'd30-review-kanji', type: ContentBlockType.TEXT, title: 'Review: Basic Kanji', markdownContent: '**Kanji Introduced:**\n- Numbers, People, Day (一, 二, 三, 人, 日) - Day 21\n- Elements, Time (月, 火, 水, 木, 金, 土, 年) - Day 22\n- Sizes, Position (大, 小, 中, 上, 下, 右, 左) - Day 24\n- Directions, Places (東, 西, 南, 北, 口, 出, 入, 本) - Day 25\n- Verbs, Actions (見, 聞, 言, 話, 食, 飲) - Day 26\n- Descriptive Adjectives (新, 古, 多, 少, 安, 高) - Day 27\n- Action Verbs (行, 買, 旅, 好) - Days 28 & 29\n- Time (時) - Day 18\n\nPractice reading words containing these Kanji. Practice writing each Kanji, paying attention to stroke order and balance.' },
      {
        id: 'd30-vocab-review', type: ContentBlockType.VOCABULARY_LIST, title: 'Vocabulary Checkpoint', items: [
          { id: 'd30-vocab-0', japanese: 'すべて', romaji: 'subete', meaning: 'all, everything' },
          { id: 'd30-vocab-1', japanese: 'ふくしゅう (復習)', romaji: 'fukushuu', meaning: 'review (noun)' },
          { id: 'd30-vocab-2', japanese: 'つづける (続けます)', romaji: 'tsuzukeru (tsuzukemasu)', meaning: 'to continue' },
          { id: 'd30-vocab-3', japanese: 'べんきょう (勉強)', romaji: 'benkyou', meaning: 'study' },
          { id: 'd30-vocab-4', japanese: 'みらい (未来)', romaji: 'mirai', meaning: 'future' },
        ]
      },
      { id: 'd30-next-steps', type: ContentBlockType.TEXT, title: 'これからの道 (Korekara no Michi) - The Road Ahead', markdownContent: 'Your Japanese learning journey has just begun! Here are some suggestions for what to do next:\n\n**1. Deepen Your Grammar:**\n   - Explore more verb conjugations (dictionary form, nai-form, ta-form, conditional forms like ば, たら, なら).\n   - Learn about different levels of politeness (plain form vs. polite form vs. honorific/humble).\n   - Study more complex sentence structures and connecting particles.\n\n**2. Expand Your Kanji:**\n   - Aim to learn the Jōyō Kanji (常用漢字 - around 2000 characters taught in Japanese schools).\n   - Use resources like WaniKani, Anki decks, or Kanji textbooks.\n\n**3. Build Your Vocabulary:**\n   - Continue learning new words daily. Use flashcards (Anki) and context (reading, listening).\n\n**4. Practice, Practice, Practice:**\n   - **Reading:** Start with graded readers, children\'s books, simple manga, or news articles for learners.\n   - **Listening:** Japanese music, podcasts for learners, anime (with/without subtitles), Japanese TV shows.\n   - **Speaking:** Find a language exchange partner, a tutor, or join a conversation group. Don\'t be afraid to make mistakes!\n   - **Writing:** Keep a simple journal in Japanese, try writing short stories or essays.\n\n**5. Recommended Resources:**\n   - Textbooks: Genki, Minna no Nihongo, Japanese From Zero!\n   - Apps: Anki (flashcards), Duolingo (supplementary), Bunpro (grammar SRS), WaniKani (Kanji SRS), Lingodeer.\n   - Websites: Tae Kim\'s Guide to Learning Japanese, Maggie Sensei, Jisho.org (dictionary).\n\n**6. Set Goals & Stay Consistent:**\n   - Decide what you want to achieve (e.g., pass JLPT N5/N4, watch anime without subtitles, travel to Japan).\n   - Make learning a regular habit, even if it\'s just for 15-30 minutes a day.' },
      { id: 'd30-culture', type: ContentBlockType.CULTURAL_NOTE, title: '生涯学習 (Shōgai Gakushū) - Lifelong Learning', note: 'In Japan, there is a strong emphasis on 生涯学習 (shōgai gakushū), or lifelong learning. The pursuit of knowledge and new skills is valued throughout one\'s life. Embrace this spirit as you continue your Japanese studies! The journey is long but incredibly rewarding.' },
      // ADD DAY 30 FACT HERE
    ],
  }
];


export const thirtyDayPlan: LessonDay[] = thirtyDayPlan_Unprocessed.map(lessonDay => {
  const contentBlocksWithoutOldPractice = lessonDay.contentBlocks.filter(block => 
    block.type !== ContentBlockType.GEMINI_PRACTICE && 
    block.type !== ContentBlockType.PRONUNCIATION_PRACTICE
  );

  // Separate InterestingFact blocks
  const interestingFactBlocks = contentBlocksWithoutOldPractice.filter(b => b.type === ContentBlockType.INTERESTING_FACT);
  let regularBlocks = contentBlocksWithoutOldPractice.filter(b => b.type !== ContentBlockType.INTERESTING_FACT);


  const aiTutorBlock: AiTutorStreamContentBlock = {
    id: `d${lessonDay.day}-ai-tutor-stream`,
    type: ContentBlockType.AI_TUTOR_STREAM,
    title: 'Talk to Sensei Live',
    initialSystemPrompt: generateAiTutorPrompt(lessonDay.day, lessonDay.title, lessonDay.overview),
    placeholderText: "Ask Sakura Sensei anything or practice your Japanese...",
  };

  let insertionIndex = regularBlocks.length;
  const culturalNoteIndex = regularBlocks.findIndex(b => b.type === ContentBlockType.CULTURAL_NOTE);
  if (culturalNoteIndex !== -1) {
    insertionIndex = culturalNoteIndex; // Insert AI Tutor before Cultural Note if it exists
  } else {
    // If no cultural note, find the last "learning" block to insert AI Tutor after
    const learningBlockTypes = [
        ContentBlockType.KANA_INFO, ContentBlockType.VOCABULARY_LIST, 
        ContentBlockType.GRAMMAR_EXPLANATION, ContentBlockType.FILL_IN_THE_BLANK_EXERCISE, 
        ContentBlockType.WRITING_PRACTICE, ContentBlockType.TEXT
    ];
    let lastLearningBlockIndex = -1;
    regularBlocks.forEach((block, index) => {
      if (learningBlockTypes.includes(block.type)) {
        lastLearningBlockIndex = index;
      }
    });
    if (lastLearningBlockIndex !== -1) {
      insertionIndex = lastLearningBlockIndex + 1;
    }
  }
  
  const processedContentBlocks = [...regularBlocks];
  processedContentBlocks.splice(insertionIndex, 0, aiTutorBlock);

  // Add InterestingFact blocks at the very end
  processedContentBlocks.push(...interestingFactBlocks);


  return {
    ...lessonDay,
    contentBlocks: processedContentBlocks,
  };
}).sort((a, b) => a.day - b.day);