import React, { useState, useMemo, useEffect } from 'react';
import {
  getCalendarGoals,
  type CalendarGoalsResponse,
  type CalendarGoalsArrayResponse,
} from '../../api/getCalendarGoals';
import { useApiGoals } from '../../contexts/ApiGoalContext';
import { getNickName, getAccessToken } from '../../api/axiosInstance';

// 캘린더 섹션 컴포넌트
const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarGoals, setCalendarGoals] = useState<
    CalendarGoalsResponse | CalendarGoalsArrayResponse
  >({});
  const [loading, setLoading] = useState(false);
  const { refreshCalendar, calendarRefreshTrigger } = useApiGoals(); // 캘린더 새로고침 함수 가져오기

  // 완료된 목표가 있는 날짜들 계산
  const completedGoalDates = useMemo(() => {
    const completedDates = new Set<string>();

    if (Array.isArray(calendarGoals)) {
      // 배열 형태의 응답 처리
      calendarGoals.forEach((goal) => {
        console.log('📅 캘린더 목표 확인:', {
          goalId: goal.goalId,
          content: goal.content,
          isCompleted: goal.isCompleted,
          isCompletedType: typeof goal.isCompleted,
          year: goal.year,
          month: goal.month,
          day: goal.day,
        });

        // isCompleted가 true인 경우만 완료된 것으로 처리
        if (goal && goal.isCompleted === true && goal.year && goal.month && goal.day) {
          const dateString = `${goal.year}-${String(goal.month).padStart(2, '0')}-${String(goal.day).padStart(2, '0')}`;
          completedDates.add(dateString);
          console.log('✅ 완료된 날짜 추가:', dateString);
        } else if (goal && goal.isCompleted === false) {
          console.log('⏳ 미완료 목표:', goal.content);
        }
      });
    } else {
      // 객체 형태의 응답 처리 (fallback)
      Object.entries(calendarGoals).forEach(([date, goals]) => {
        if (Array.isArray(goals)) {
          const hasCompletedGoal = goals.some((goal) => {
            console.log('📅 캘린더 목표 확인 (객체):', {
              date,
              goal,
              isCompleted: goal?.isCompleted,
            });
            return goal && goal.isCompleted === true;
          });
          if (hasCompletedGoal) {
            completedDates.add(date);
            console.log('✅ 완료된 날짜 추가 (객체):', date);
          }
        }
      });
    }

    console.log('📅 최종 완료된 날짜들:', Array.from(completedDates));
    return completedDates;
  }, [calendarGoals]);

  // 캘린더 데이터 로드
  const loadCalendarGoals = async (year: number, month: number) => {
    setLoading(true);
    try {
      // 로그인 상태 확인
      const currentUser = getNickName();
      const currentToken = getAccessToken();
      console.log('🔐 캘린더 API 호출 전 로그인 상태:', {
        currentUser,
        hasToken: !!currentToken,
        year,
        month,
      });

      const data = await getCalendarGoals(year, month);
      console.log('📅 캘린더 API 응답:', data);
      console.log('📅 캘린더 API 응답 타입:', typeof data);
      console.log('📅 캘린더 API 응답이 배열인가?', Array.isArray(data));

      // 데이터가 배열이거나 객체인지 확인하고 안전하게 설정
      if (data && (Array.isArray(data) || typeof data === 'object')) {
        // 캘린더 데이터가 현재 사용자의 것인지 확인
        if (Array.isArray(data) && data.length > 0) {
          console.log('📅 캘린더 데이터 검증:', {
            데이터개수: data.length,
            첫번째목표: data[0],
            현재사용자: currentUser,
            완료된목표수: data.filter((goal) => goal.isCompleted === true).length,
            미완료목표수: data.filter((goal) => goal.isCompleted === false).length,
          });

          // 각 목표의 isCompleted 상태 확인
          data.forEach((goal, index) => {
            console.log(`📅 목표 ${index + 1}:`, {
              goalId: goal.goalId,
              content: goal.content,
              isCompleted: goal.isCompleted,
              year: goal.year,
              month: goal.month,
              day: goal.day,
            });
          });
        }

        setCalendarGoals(data);
        console.log('✅ 캘린더 데이터 설정 완료');
      } else {
        console.warn('⚠️ 캘린더 API 응답이 예상과 다릅니다:', data);
        setCalendarGoals([]);
      }
    } catch (error) {
      console.error('❌ 캘린더 데이터 로드 실패:', error);
      setCalendarGoals([]);
    } finally {
      setLoading(false);
    }
  };

  // 현재 월이 변경될 때마다 데이터 로드
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    loadCalendarGoals(year, month);
  }, [currentDate]);

  // refreshCalendar 함수가 호출될 때마다 현재 월 데이터 다시 로드
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    console.log('🔄 캘린더 새로고침 트리거됨:', {
      calendarRefreshTrigger,
      year,
      month,
      currentDate: currentDate.toISOString(),
      현재시간: new Date().toISOString(),
    });
    loadCalendarGoals(year, month);
  }, [calendarRefreshTrigger, currentDate]);

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
    const isCompleted = completedGoalDates.has(dateString);
    if (isCompleted) {
      console.log('완료된 날짜 확인:', dateString);
    }
    return isCompleted;
  };

  // 특정 날짜의 목표 개수 확인 (백엔드 API 데이터 사용)
  const getGoalCount = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // calendarGoals가 배열인 경우 (실제 API 응답 형태)
    if (Array.isArray(calendarGoals)) {
      return calendarGoals.filter((goal) => {
        if (goal && goal.year && goal.month && goal.day) {
          const goalDateString = `${goal.year}-${String(goal.month).padStart(2, '0')}-${String(goal.day).padStart(2, '0')}`;
          return goalDateString === dateString;
        }
        return false;
      }).length;
    } else {
      // 기존 객체 형태 처리 (혹시 모를 경우)
      const goals = calendarGoals[dateString];
      return Array.isArray(goals) ? goals.length : 0;
    }
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
          disabled={loading}
          className={`transition-colors ${
            loading
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {loading ? '로딩 중...' : `${monthNames[currentDate.getMonth()]} 목표 달성 현황`}
        </h3>
        <button
          onClick={goToNextMonth}
          disabled={isNextMonthDisabled() || loading}
          className={`transition-colors ${
            isNextMonthDisabled() || loading
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
          const goalCount = getGoalCount(day);

          return (
            <div key={day} className="p-1 relative">
              <span
                className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                  isCompleted
                    ? 'bg-sky-400 text-white font-bold'
                    : isTodayDate
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {day}
              </span>
              {/* 목표가 있는 날짜에 작은 점 표시 */}
              {goalCount > 0 && !isCompleted && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-sky-400 rounded-full"></div>
            <span>완료</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>목표 있음</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
