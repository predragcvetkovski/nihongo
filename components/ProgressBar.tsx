import React from 'react';

interface ProgressBarProps {
  completedDays: number;
  totalDays: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedDays, totalDays }) => {
  const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <div className="my-8 glassmorphic-card font-sans"> {/* Use custom class */}
      <div className="flex justify-between mb-2">
        <span className="text-base font-medium text-sky-300">Progress</span>
        <span className="text-sm font-medium text-sky-300">{completedDays} / {totalDays} Days Completed</span>
      </div>
      <div className="w-full bg-black/20 rounded-full h-5 border border-white/10"> {/* Darker track, subtle border */}
        <div 
          className="bg-sky-500 h-5 rounded-full transition-all duration-500 ease-out shadow-md shadow-sky-500/30" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-right text-sky-300 text-sm mt-2">{percentage}% Complete</p>
    </div>
  );
};

export default ProgressBar;