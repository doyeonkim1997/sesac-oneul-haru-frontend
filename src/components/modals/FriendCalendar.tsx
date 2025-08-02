import React, { useState, useEffect, useMemo } from 'react';
import { getFriendCalendar } from '../../api/Friend';
import { type CalendarGoal } from '../../api/getCalendarGoals';

type Props = {
  friendId: number;
};

const FriendCalendar: React.FC<Props> = ({ friendId }) => {
  const [calendarGoals, setCalendarGoals] = useState<CalendarGoal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    const fetchFriendCalendar = async () => {
      if (!friendId) return;
    
      setLoading(true);
      setError(null);
    
      try {
        const data = await getFriendCalendar(friendId, year, month);
        setCalendarGoals(data);
      } catch (err: any) {
        setError(err.message || '친구 캘린더 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
  
    fetchFriendCalendar();
  }, [friendId, year, month]);

  const completedGoalDates = useMemo(() => {
    const dates = new Set<string>();
    calendarGoals.forEach(goal => {
      if (goal.isCompleted && goal.year && goal.month && goal.day) {
        const dateString = `${goal.year}-${String(goal.month).padStart(2, '0')}-${String(goal.day).padStart(2, '0')}`;
        dates.add(dateString);
      }
    });

    return dates;
  }, [calendarGoals]);

  const firstDay = new Date(year, month - 1, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const isCompletedDate = (day: number) => {
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return completedGoalDates.has(dateString);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">에러: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm max-w-md">
      <h3 className="text-center text-lg font-semibold mb-4 dark:text-white">이달 목표 달성 현황</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-500 dark:text-gray-400">
        <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: firstWeekday }, (_, i) => (
          <div key={`empty-${i}`} className="text-gray-400">&nbsp;</div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const completed = isCompletedDate(day);

          return (
            <div key={day} className="relative">
              <span
                className={`inline-block w-8 h-8 leading-8 rounded-full select-none
                  ${completed ? 'bg-sky-400 text-white font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-default text-gray-900 dark:text-white'}
                  `}
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

export default FriendCalendar;