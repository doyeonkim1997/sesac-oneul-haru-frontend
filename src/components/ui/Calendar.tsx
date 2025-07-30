import React, { useState, useMemo } from 'react';
import { useGoals } from '../../contexts/GoalContext';

// 캘린더 섹션 컴포넌트
const CalendarSection: React.FC = () => {
  const { goals } = useGoals();
  const [currentDate, setCurrentDate] = useState(new Date());

  // 완료된 목표의 날짜들을 추출
  const completedGoalDates = useMemo(() => {
    const completedDates = new Set<string>();

    goals.forEach((goalWithUser) => {
      const { goal } = goalWithUser;
      // 현재 사용자의 완료된 목표만 필터링 (user_id가 1인 경우)
      if (goal.user_id === 1 && goal.is_completed) {
        const goalDate = goal.created_at.split(' ')[0]; // YYYY-MM-DD 형식
        completedDates.add(goalDate);
      }
    });

    return completedDates;
  }, [goals]);

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // 월의 총 일수
  const daysInMonth = lastDayOfMonth.getDate();

  // 이전 월로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 월로 이동 (현재 월까지만 가능)
  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const currentMonth = new Date();

    // 현재 월까지만 이동 가능
    if (
      nextMonth.getMonth() <= currentMonth.getMonth() &&
      nextMonth.getFullYear() <= currentMonth.getFullYear()
    ) {
      setCurrentDate(nextMonth);
    }
  };

  // 다음 월 버튼이 비활성화되어야 하는지 확인
  const isNextMonthDisabled = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const currentMonth = new Date();
    return (
      nextMonth.getMonth() > currentMonth.getMonth() ||
      nextMonth.getFullYear() > currentMonth.getFullYear()
    );
  };

  // 날짜가 완료된 목표가 있는지 확인
  const isCompletedDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return completedGoalDates.has(dateString);
  };

  // 오늘 날짜인지 확인
  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // 월 이름 배열
  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goToPreviousMonth}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {monthNames[currentDate.getMonth()]} 목표 달성 현황
        </h3>
        <button
          onClick={goToNextMonth}
          disabled={isNextMonthDisabled()}
          className={`transition-colors ${
            isNextMonthDisabled()
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer'
          }`}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        <div className="text-gray-500 dark:text-gray-400">일</div>
        <div className="text-gray-500 dark:text-gray-400">월</div>
        <div className="text-gray-500 dark:text-gray-400">화</div>
        <div className="text-gray-500 dark:text-gray-400">수</div>
        <div className="text-gray-500 dark:text-gray-400">목</div>
        <div className="text-gray-500 dark:text-gray-400">금</div>
        <div className="text-gray-500 dark:text-gray-400">토</div>

        {/* 이전 월의 날짜들 (빈 칸) */}
        {Array.from({ length: firstDayWeekday }, (_, index) => (
          <div key={`empty-${index}`} className="text-gray-400"></div>
        ))}

        {/* 현재 월의 날짜들 */}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isCompleted = isCompletedDate(day);
          const isTodayDate = isToday(day);

          return (
            <div key={day} className="p-1">
              <span
                className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                  isCompleted
                    ? 'bg-sky-400 text-white font-bold'
                    : isTodayDate
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSection;