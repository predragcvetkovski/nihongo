
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DayCard from './components/DayCard';
import LessonModal from './components/LessonModal';
import ProgressBar from './components/ProgressBar';
import SRSReviewModal from './components/SRSReviewModal';
import WritingPracticeModal from './components/WritingPracticeModal'; 
import IntroStreamModal from './components/IntroStreamModal'; // Import new Intro Modal
import GitHubStarSection from './components/GitHubStarSection'; // Import the new GitHubStarSection
import { thirtyDayPlan } from './services/lessonData';
import { LessonDay, ContentBlockType, VocabularyListContentBlock, UserVocabularySrsData, SrsLevel, VocabularyItem, KanaCharacter } from './types'; 
import { LESSON_DAYS_TOTAL, BookOpenIcon } from './constants'; 

const ALL_LESSONS_STORAGE_KEY = 'allNihongoLessons'; 
const COMPLETED_DAYS_STORAGE_KEY = 'completedJapanDays';
const SRS_DATA_STORAGE_KEY = 'nihongoSrsData';
const HAS_SEEN_INTRO_KEY = 'hasSeenIntroNihonGO30'; // Key for intro stream


// Create placeholder days if thirtyDayPlan is shorter than LESSON_DAYS_TOTAL
const allLessonDaysInitial: LessonDay[] = [...thirtyDayPlan];
const existingDaysCount = thirtyDayPlan.length;
if (existingDaysCount < LESSON_DAYS_TOTAL) {
  for (let i = existingDaysCount + 1; i <= LESSON_DAYS_TOTAL; i++) {
    allLessonDaysInitial.push({
      day: i,
      title: `Day ${i}: Future Lesson`,
      category: "To Be Unveiled",
      overview: "This lesson is currently under development. Stay tuned!",
      contentBlocks: [{ 
        id: `placeholder-${i}`, 
        type: ContentBlockType.TEXT,
        markdownContent: 'Content coming soon for Day ' + i + '.' 
      }]
    });
  }
}


const App: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonDay | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [userSrsData, setUserSrsData] = useState<UserVocabularySrsData>({});
  const [showSrsModal, setShowSrsModal] = useState(false);
  const [practiceChar, setPracticeChar] = useState<KanaCharacter | null>(null);
  const [showIntroStream, setShowIntroStream] = useState<boolean>(false); // State for intro

  // Load data from localStorage
  useEffect(() => {
    const storedCompletedDays = localStorage.getItem(COMPLETED_DAYS_STORAGE_KEY);
    if (storedCompletedDays) {
      try {
        setCompletedDays(JSON.parse(storedCompletedDays));
      } catch (error) {
        console.error("Failed to parse completed days from localStorage. Resetting to default.", error);
        setCompletedDays([]); 
      }
    }

    const storedSrsData = localStorage.getItem(SRS_DATA_STORAGE_KEY);
    if (storedSrsData) {
      try {
        setUserSrsData(JSON.parse(storedSrsData));
      } catch (error) {
        console.error("Failed to parse SRS data from localStorage. Resetting to default.", error);
        setUserSrsData({}); 
      }
    }
    
    // Check if intro has been seen
    const hasSeenIntro = localStorage.getItem(HAS_SEEN_INTRO_KEY);
    if (!hasSeenIntro) {
      setShowIntroStream(true);
    }
  }, []);

  // Save SRS data to localStorage
  useEffect(() => {
    localStorage.setItem(SRS_DATA_STORAGE_KEY, JSON.stringify(userSrsData));
  }, [userSrsData]);

  const handleSelectDay = useCallback((day: LessonDay) => {
    const firstUncompletedDay = allLessonDaysInitial.find(d => !completedDays.includes(d.day))?.day || 1;
    const isDayCompleted = completedDays.includes(day.day);

    if (day.day <= firstUncompletedDay || isDayCompleted || day.day === 1) {
        setSelectedLesson(day);
    } else {
        console.log(`Day ${day.day} is locked. Complete previous days.`);
    }
  }, [completedDays]);

  const handleCloseModal = useCallback(() => {
    setSelectedLesson(null);
  }, []);

  const handleMarkComplete = useCallback((dayNumber: number) => {
    if (!completedDays.includes(dayNumber)) {
      const newCompletedDays = [...completedDays, dayNumber].sort((a, b) => a - b);
      setCompletedDays(newCompletedDays);
      localStorage.setItem(COMPLETED_DAYS_STORAGE_KEY, JSON.stringify(newCompletedDays));

      const lesson = allLessonDaysInitial.find(d => d.day === dayNumber);
      if (lesson) {
        const newSrsEntries: UserVocabularySrsData = {};
        lesson.contentBlocks.forEach(block => {
          if (block.type === ContentBlockType.VOCABULARY_LIST) {
            (block as VocabularyListContentBlock).items.forEach(item => {
              if (!userSrsData[item.id]) { 
                newSrsEntries[item.id] = {
                  srsLevel: SrsLevel.NEW,
                  lastReviewed: undefined,
                };
              }
            });
          }
        });
        if (Object.keys(newSrsEntries).length > 0) {
          setUserSrsData(prevSrsData => ({ ...prevSrsData, ...newSrsEntries }));
        }
      }
    }
  }, [completedDays, userSrsData]);

  const vocabularyForReview = useMemo(() => {
    const collectedVocab: VocabularyItem[] = [];
    completedDays.forEach(dayNum => {
      const lesson = allLessonDaysInitial.find(d => d.day === dayNum);
      if (lesson) {
        lesson.contentBlocks.forEach(block => {
          if (block.type === ContentBlockType.VOCABULARY_LIST) {
            collectedVocab.push(...(block as VocabularyListContentBlock).items);
          }
        });
      }
    });
    return collectedVocab.filter(item => userSrsData[item.id]);
  }, [completedDays, userSrsData]);


  const handleUpdateSrsData = useCallback((itemId: string, knewIt: boolean) => {
    setUserSrsData(prevSrsData => {
      const currentEntry = prevSrsData[itemId] || { srsLevel: SrsLevel.NEW };
      let newLevel = currentEntry.srsLevel;

      if (knewIt) {
        newLevel = Math.min(SrsLevel.MASTERED, currentEntry.srsLevel + 1);
      } else {
        newLevel = Math.max(SrsLevel.NEW, currentEntry.srsLevel -1); 
        if (newLevel === SrsLevel.KNOWN && currentEntry.srsLevel === SrsLevel.KNOWN) newLevel = SrsLevel.LEARNING;
        else if (newLevel === SrsLevel.MASTERED && currentEntry.srsLevel === SrsLevel.MASTERED) newLevel = SrsLevel.KNOWN;
      }
      
      return {
        ...prevSrsData,
        [itemId]: {
          ...currentEntry,
          srsLevel: newLevel,
          lastReviewed: new Date().toISOString(),
        }
      };
    });
  }, []);

  const handleOpenWritingPractice = useCallback((character: KanaCharacter) => {
    setPracticeChar(character);
  }, []);

  const handleCloseWritingPractice = useCallback(() => {
    setPracticeChar(null);
  }, []);

  const handleCloseIntroStream = useCallback(() => {
    setShowIntroStream(false);
    localStorage.setItem(HAS_SEEN_INTRO_KEY, 'true');
  }, []);

  const highestUnlockableDay = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {showIntroStream && <IntroStreamModal onClose={handleCloseIntroStream} />}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <p className="text-center text-2xl text-gray-100 mb-2 font-semibold">
          Your 30-Day Journey into Japanese!
        </p>
        <p className="text-center text-sm text-gray-400 mb-6">
          Follow structured daily lessons, AI challenges, and vocabulary quests.
        </p>
        
        <ProgressBar completedDays={completedDays.length} totalDays={LESSON_DAYS_TOTAL} />

        {vocabularyForReview.length > 0 && (
           <div className="my-8 text-center"> 
            <button
              onClick={() => setShowSrsModal(true)}
              className="bg-purple-600/70 hover:bg-purple-500/80 backdrop-filter backdrop-blur-md border border-purple-500/50 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center text-lg transition-all duration-300 shadow-lg hover:shadow-purple-400/40 transform hover:scale-105"
              aria-expanded={showSrsModal}
              aria-controls="srs-review-modal"
            >
              <BookOpenIcon className="h-6 w-6 mr-3" /> Review Vocabulary ({vocabularyForReview.length} items)
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {allLessonDaysInitial.map((day) => {
            const isCompleted = completedDays.includes(day.day);
            const isLocked = day.day > 1 && day.day > highestUnlockableDay && !isCompleted;
            const isNextNewDay = !isLocked && !isCompleted && day.day === highestUnlockableDay;
            
            return (
              <DayCard
                key={day.day}
                dayInfo={day}
                isCompleted={isCompleted}
                onSelectDay={handleSelectDay}
                isLocked={isLocked}
                isNextNewDay={isNextNewDay} 
              />
            );
          })}
        </div>
      </main>
      <GitHubStarSection />
      <Footer />
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={handleCloseModal}
          onMarkComplete={handleMarkComplete}
          isCompleted={completedDays.includes(selectedLesson.day)}
          onStartWritingPractice={handleOpenWritingPractice} 
        />
      )}
      {showSrsModal && vocabularyForReview.length > 0 && (
        <SRSReviewModal
          isOpen={showSrsModal}
          onClose={() => setShowSrsModal(false)}
          vocabularyToReview={vocabularyForReview}
          srsData={userSrsData}
          updateSrsData={handleUpdateSrsData}
        />
      )}
      {practiceChar && ( 
        <WritingPracticeModal
          character={practiceChar}
          onClose={handleCloseWritingPractice}
        />
      )}
    </div>
  );
};

export default App;