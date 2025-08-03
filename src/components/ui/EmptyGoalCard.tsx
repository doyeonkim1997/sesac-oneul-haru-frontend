import React from 'react';

const EmptyGoalCard: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-sky-200 dark:hover:border-gray-600 transition-transform duration-200 cursor-pointer transform hover:scale-[1.01]"
    >
      <div className="flex flex-col items-center justify-center text-center text-gray-900 dark:text-gray-400">
        <span className="material-icons !text-3xl text-sky-400 dark:text-sky-400 mb-2">
          add_circle_outline
        </span>
        <p className="text-lg font-medium">오늘 하루 목표는 무엇인가요?</p>
      </div>
    </div>
  );
};

export default EmptyGoalCard;