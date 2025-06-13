import React from 'react';
import { LessonDay } from '../types';
import { CheckIcon } from '../constants';

interface DayCardProps {
  dayInfo: LessonDay;
  isCompleted: boolean;
  onSelectDay: (day: LessonDay) => void;
  isLocked: boolean;
  isNextNewDay: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ dayInfo, isCompleted, onSelectDay, isLocked, isNextNewDay }) => {
  const cardBaseClasses = "p-5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between h-full shadow-xl font-sans";

  let stateClasses = "glassmorphic-unlocked";
  let textColor = "text-sky-300";
  let titleColor = "text-white";
  let overviewColor = "text-gray-300";
  let buttonStyle = "bg-sky-500/70 hover:bg-sky-600/80 border-sky-400/70 text-white focus:ring-sky-400";
  let buttonText = "Start Lesson";

  const getCardBackgroundColor = (): string => {
    if (isLocked) return 'rgba(17, 24, 39, 0.6)'; // From .glassmorphic-locked style in index.html
    if (isCompleted) return 'rgba(22, 101, 52, 0.6)'; // From .glassmorphic-completed style in index.html
    return 'rgba(255, 255, 255, 0.1)'; // From .glassmorphic-unlocked style in index.html
  };

  if (isLocked) {
    stateClasses = "glassmorphic-locked opacity-70";
    textColor = "text-gray-500";
    titleColor = "text-gray-400";
    overviewColor = "text-gray-600";
  } else if (isCompleted) {
    stateClasses = "glassmorphic-completed";
    textColor = "text-green-300";
    titleColor = "text-white";
    overviewColor = "text-green-200";
    buttonStyle = "bg-green-600/70 hover:bg-green-500/80 border-green-500/70 text-white focus:ring-green-500";
    buttonText = "Review Lesson";
  }


  return (
    <div
      className={`${cardBaseClasses} ${stateClasses} relative overflow-hidden group`}
      onClick={() => !isLocked && onSelectDay(dayInfo)}
      role={isLocked ? undefined : "button"}
      tabIndex={isLocked ? undefined : 0}
      aria-label={`Lesson ${dayInfo.day}: ${dayInfo.title}${isCompleted ? ' (Completed)' : ''}${isLocked ? ' (Locked)' : ''}`}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-semibold ${textColor}`}>
            Lesson {dayInfo.day}
          </span>
          {isCompleted && <CheckIcon className="h-7 w-7 text-green-300" />}
        </div>
        <h3 className={`text-xl lg:text-2xl font-bold mb-1.5 ${titleColor}`}>{dayInfo.title}</h3>
        <p className={`text-xs ${textColor} mb-3`}>{dayInfo.category}</p>
        
        {/* Overview Text with Fade */}
        <div className="relative flex-grow overflow-hidden" style={{ maxHeight: '4rem' /* max-h-16, approx 3 lines of text-sm (1.25rem line-height) + fade */ }}>
          <p className={`text-sm ${overviewColor} leading-normal`}> {/* Use leading-normal or leading-relaxed */}
            {dayInfo.overview}
          </p>
          {/* Fade Overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-8" // h-8 (2rem) for a smoother fade
            style={{
              background: `linear-gradient(to bottom, transparent, ${getCardBackgroundColor()})`
            }}
            aria-hidden="true"
          />
        </div>
      
        {!isLocked && (
          <button 
            className={`mt-auto w-full text-sm py-2.5 px-3 rounded-md font-semibold transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonStyle}`}
            onClick={(e) => { e.stopPropagation(); onSelectDay(dayInfo); }}
          >
            {buttonText}
          </button>
        )}
        {isLocked && (
          <p className="mt-auto text-center text-xs text-gray-500 p-2 bg-black/30 rounded-b-lg">Complete previous lessons to unlock.</p>
        )}
      </div>
      {isNextNewDay && !isLocked && !isCompleted && (
         <div className="absolute top-2 right-2 px-2 py-0.5 bg-sky-500 text-white text-xs font-bold rounded shadow-md">
           NEXT
         </div>
      )}
    </div>
  );
};

export default DayCard;