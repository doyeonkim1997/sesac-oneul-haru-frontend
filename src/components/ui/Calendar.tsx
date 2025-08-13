import React, { useState, useMemo, useEffect, memo } from 'react';
// flushSync import 제거
import {
  getCalendarGoals,
  type CalendarGoalsResponse,
  type CalendarGoalsArrayResponse,
} from '../../api/getCalendarGoals';
import { useApiGoals } from '../../contexts/ApiGoalContext';
import { getNickName, getAccessToken } from '../../api/axiosInstance';

// 전역 캐시 (모든 캘린더 인스턴스가 공유)
const globalCalendarCache = new Map<string, CalendarGoalsResponse | CalendarGoalsArrayResponse>();
const globalLoadingCache = new Map<string, boolean>(); // 로딩 상태도 전역 관리
const globalCompletedDatesCache = new Map<string, Set<string>>(); // 완료 날짜 캐시 재추가

// 개별 날짜 컴포넌트 (메모화로 불필요한 리렌더링 방지)
const DateCell = memo(
  ({
    day,
    isCompleted,
    isTodayDate,
    goalCount,
  }: {
    day: number;
    isCompleted: boolean;
    isTodayDate: boolean;
    goalCount: number;
  }) => {
    return (
      <div className="p-1 relative">
        <span
          className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-full ${
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
  },
);

DateCell.displayName = 'DateCell';

// 캘린더 섹션 컴포넌트
const CalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 초기 상태를 캐시에서 가져오기 (번쩍거림 방지)
  const getInitialCalendarGoals = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const cacheKey = `${year}-${month}`;

    if (globalCalendarCache.has(cacheKey)) {
      return globalCalendarCache.get(cacheKey)!;
    }
    return []; // 빈 배열로 시작 (빈 객체 대신)
  };

  const [calendarGoals, setCalendarGoals] = useState<
    CalendarGoalsResponse | CalendarGoalsArrayResponse
  >(getInitialCalendarGoals);
  // 초기 로딩 상태를 전역 캐시에서 가져오기
  const getCurrentCacheKey = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}-${month}`;
  };

  const [loading, setLoading] = useState(() => {
    const cacheKey = getCurrentCacheKey();
    // 캐시된 데이터가 있으면 로딩하지 않음, 없으면 로딩 시작
    return !globalCalendarCache.has(cacheKey);
  });
  // 로컬 캐시 상태 제거 - 전역 캐시 사용
  const { refreshCalendar, calendarRefreshTrigger, myGoals } = useApiGoals(); // 실시간 목표 상태 추가

  // 완료된 목표가 있는 날짜들 계산 (안정적인 캐싱)
  const completedGoalDates = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const cacheKey = `${year}-${month}`;

    // myGoals가 변경되지 않았고 캐시에 있으면 기존 Set 객체 재사용
    const myGoalsString = JSON.stringify(
      myGoals.map((g) => ({ id: g.goalId, completed: g.isCompleted })).sort((a, b) => a.id - b.id),
    );
    const fullCacheKey = `${cacheKey}-${myGoalsString}`;

    if (globalCompletedDatesCache.has(fullCacheKey)) {
      return globalCompletedDatesCache.get(fullCacheKey)!;
    }

    // 새로 계산
    const completedDates = new Set<string>();

    if (Array.isArray(calendarGoals)) {
      // 배열 형태의 응답 처리
      calendarGoals.forEach((goal) => {
        if (goal && goal.year && goal.month && goal.day) {
          const dateString = `${goal.year}-${String(goal.month).padStart(2, '0')}-${String(goal.day).padStart(2, '0')}`;

          // myGoals에서 실시간 완료 상태 확인 (오늘 목표만)
          const today = new Date();
          const isToday =
            goal.year === today.getFullYear() &&
            goal.month === today.getMonth() + 1 &&
            goal.day === today.getDate();

          if (isToday) {
            // 오늘 목표는 myGoals에서 실시간 상태 확인
            const liveGoal = myGoals.find((mg) => mg.goalId === goal.goalId);
            if (liveGoal && liveGoal.isCompleted) {
              completedDates.add(dateString);
            }
          } else {
            // 과거 목표는 캐시된 데이터 사용
            if (goal.isCompleted === true) {
              completedDates.add(dateString);
            }
          }
        }
      });
    } else {
      // 객체 형태의 응답 처리 (fallback)
      Object.entries(calendarGoals).forEach(([date, goals]) => {
        if (Array.isArray(goals)) {
          const hasCompletedGoal = goals.some((goal) => {
            return goal && goal.isCompleted === true;
          });
          if (hasCompletedGoal) {
            completedDates.add(date);
          }
        }
      });
    }

    // 캐시에 저장 (이전 캐시 정리)
    globalCompletedDatesCache.clear();
    globalCompletedDatesCache.set(fullCacheKey, completedDates);
    return completedDates;
  }, [calendarGoals, currentDate, myGoals]);

  // 캘린더 데이터 로드 (전역 캐싱 적용)
  const loadCalendarGoals = async (year: number, month: number, forceRefresh = false) => {
    const cacheKey = `${year}-${month}`;

    // 전역 캐시된 데이터가 있고 강제 새로고침이 아닌 경우
    if (!forceRefresh && globalCalendarCache.has(cacheKey)) {
      const cachedGoals = globalCalendarCache.get(cacheKey)!;
      setCalendarGoals(cachedGoals);
      setLoading(false); // 캐시 로드 시에도 명시적으로 로딩 완료
      return;
    }

    setLoading(true);
    globalLoadingCache.set(cacheKey, true); // 전역 로딩 상태 저장

    try {
      // 로그인 상태 확인
      const currentUser = getNickName();
      const currentToken = getAccessToken();

      const data = await getCalendarGoals(year, month);

      // 데이터가 배열이거나 객체인지 확인하고 안전하게 설정
      if (data && (Array.isArray(data) || typeof data === 'object')) {
        // 전역 캐시에 저장
        globalCalendarCache.set(cacheKey, data);
        setCalendarGoals(data);
      } else {
        console.warn('⚠️ 캘린더 API 응답이 예상과 다릅니다:', data);
        setCalendarGoals([]);
      }
    } catch (error) {
      setCalendarGoals([]);
    } finally {
      setLoading(false);
      globalLoadingCache.set(cacheKey, false); // 전역 로딩 완료 상태 저장
    }
  };

  // 컴포넌트 마운트 및 현재 월이 변경될 때마다 데이터 로드 (동기적 처리)
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const cacheKey = `${year}-${month}`;

    // 전역 캐시에 있으면 setTimeout으로 다음 tick에서 설정 (번쩍거림 방지)
    if (globalCalendarCache.has(cacheKey)) {
      const cachedData = globalCalendarCache.get(cacheKey)!;
      // setTimeout으로 React 렌더링 사이클과 충돌 방지
      setTimeout(() => {
        setCalendarGoals(cachedData);
        setLoading(false);
      }, 0);
    } else {
      // 캐시가 없는 경우에만 비동기 로딩
      setLoading(true);
      loadCalendarGoals(year, month, false);
    }
  }, [currentDate]);

  // refreshCalendar 함수가 호출될 때만 강제 새로고침
  useEffect(() => {
    if (calendarRefreshTrigger > 0) {
      // 0보다 클 때만 실행
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const cacheKey = `${year}-${month}`;

      // 현재 월 캐시 무효화 (데이터 + 로딩 상태 + 완료 날짜)
      globalCalendarCache.delete(cacheKey);
      globalLoadingCache.delete(cacheKey);
      globalCompletedDatesCache.clear(); // 완료 날짜 캐시 전체 정리
      loadCalendarGoals(year, month, true); // 강제 새로고침
    }
  }, [calendarRefreshTrigger]);

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // 월의 총 일수
  const daysInMonth = lastDayOfMonth.getDate();

  // 이전 월로 이동
  const goToPreviousMonth = () => {
    if (loading) return; // 로딩 중이면 이동 방지
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 월로 이동 (현재 월까지만 가능)
  const goToNextMonth = () => {
    if (loading) return; // 로딩 중이면 이동 방지
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

    return isCompleted;
  };

  // 날짜별 목표 개수 메모화 (안정적인 처리)
  const goalCountsByDate = useMemo(() => {
    const counts = new Map<string, number>();

    // calendarGoals가 유효한지 확인
    if (!calendarGoals) {
      return counts; // 빈 Map 반환
    }

    if (Array.isArray(calendarGoals)) {
      // 배열 형태의 응답 처리 (빈 배열도 안전하게 처리)
      calendarGoals.forEach((goal) => {
        if (goal && goal.year && goal.month && goal.day) {
          const dateString = `${goal.year}-${String(goal.month).padStart(2, '0')}-${String(goal.day).padStart(2, '0')}`;
          counts.set(dateString, (counts.get(dateString) || 0) + 1);
        }
      });
    } else if (typeof calendarGoals === 'object') {
      // 객체 형태의 응답 처리
      Object.entries(calendarGoals).forEach(([dateString, goals]) => {
        if (Array.isArray(goals)) {
          counts.set(dateString, goals.length);
        }
      });
    }

    return counts;
  }, [calendarGoals, currentDate]);

  // 특정 날짜의 목표 개수 확인 (메모화된 데이터 사용)
  const getGoalCount = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return goalCountsByDate.get(dateString) || 0;
  };

  // 오늘 날짜 메모화 (불필요한 계산 방지)
  const todayInfo = useMemo(() => {
    const today = new Date();
    return {
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    };
  }, []);

  // 오늘 날짜인지 확인 (메모화된 데이터 사용)
  const isToday = (day: number) => {
    return (
      todayInfo.date === day &&
      todayInfo.month === currentDate.getMonth() &&
      todayInfo.year === currentDate.getFullYear()
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
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {`${monthNames[currentDate.getMonth()]} 목표 달성 현황`}
          </h3>
          {loading && (
            <div className="animate-spin rounded-full h-3 w-3 border border-sky-500 border-t-transparent"></div>
          )}
        </div>
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
            <DateCell
              key={day}
              day={day}
              isCompleted={isCompleted}
              isTodayDate={isTodayDate}
              goalCount={goalCount}
            />
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
            <span>미완료</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
