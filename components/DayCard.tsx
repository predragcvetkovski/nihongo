import React from 'react';
import { LessonDay } from '../types';
import { CheckIcon } from '../constants';

interface DayCardProps {
  dayInfo: LessonDay;
  isCompleted: boolean;
  onSelectDay: (day: LessonDay) => void;
  isLocked: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ dayInfo, isCompleted, onSelectDay, isLocked }) => {
  // Base classes are now part of the conditional classes for simplicity with custom CSS
  const cardBaseClasses = "p-5 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between h-full"; // Tailwind base structure

  let stateClasses = "glassmorphic-unlocked"; // Default for active, non-completed
  if (isLocked) {
    stateClasses = "glassmorphic-locked";
  } else if (isCompleted) {
    stateClasses = "glassmorphic-completed";
  }

  return (
    <div
      className={`${cardBaseClasses} ${stateClasses} font-sans`} // Apply stateful glassmorphic class
      onClick={() => !isLocked && onSelectDay(dayInfo)}
      role={isLocked ? undefined : "button"}
      tabIndex={isLocked ? undefined : 0}
      aria-label={`Day ${dayInfo.day}: ${dayInfo.title}${isCompleted ? ' (Completed)' : ''}${isLocked ? ' (Locked)' : ''}`}
    >
      <div className="text-gray-100"> {/* Default text color for unlocked cards */}
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-semibold ${isCompleted ? 'text-green-300' : 'text-sky-300'}`}>
            Day {dayInfo.day}
          </span>
          {isCompleted && <CheckIcon className="h-7 w-7 text-green-300" />}
        </div>
        <h3 className={`text-xl font-bold mb-1.5 ${isCompleted ? 'text-white' : 'text-gray-50'}`}>{dayInfo.title}</h3>
        <p className={`text-xs ${isCompleted ? 'text-green-200' : 'text-gray-300'} mb-3`}>{dayInfo.category}</p>
        <p className={`text-sm ${isCompleted ? 'text-green-100' : 'text-gray-200'} line-clamp-3`}>{dayInfo.overview}</p>
      </div>
      {!isLocked && (
        <button 
          className={`mt-5 w-full text-sm py-2.5 px-3 rounded-lg font-semibold transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isCompleted 
            ? 'bg-green-500/50 hover:bg-green-400/60 border border-green-400/60 text-white focus:ring-green-400' 
            : 'bg-sky-500/50 hover:bg-sky-400/60 border border-sky-400/60 text-white focus:ring-sky-400'
          }`}
          onClick={(e) => { e.stopPropagation(); onSelectDay(dayInfo); }}
        >
          {isCompleted ? 'Review Lesson' : 'Start Lesson'}
        </button>
      )}
      {isLocked && (
         <p className="mt-5 text-center text-xs text-gray-400">Complete previous days to unlock.</p>
      )}
    </div>
  );
};

export default DayCard;