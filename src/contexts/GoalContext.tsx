import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Goal, User, GoalWithUser } from '../data/goals';
import { getAllGoals, getMyGoals } from '../data/goals';

interface GoalContextType {
  goals: GoalWithUser[];
  bookmarks: Set<number>;
  addGoal: (goalData: { title: string; content: string; category: string }) => void;
  updateGoal: (goalId: number, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: number) => void;
  toggleGoalCompletion: (goalId: number) => void;
  toggleBookmark: (goalId: number) => void;
  refreshGoals: () => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};

interface GoalProviderProps {
  children: React.ReactNode;
}

export const GoalProvider: React.FC<GoalProviderProps> = ({ children }) => {
  const [goals, setGoals] = useState<GoalWithUser[]>([]);
  const [customGoals, setCustomGoals] = useState<Goal[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set([1, 3, 5])); // 임시 북마크 데이터

  // 더미 데이터와 커스텀 목표를 합치는 함수
  const combineGoals = () => {
    const dummyGoals = getAllGoals();

    // 커스텀 목표로 덮어쓸 더미 목표 ID들
    const customGoalIds = new Set(customGoals.map((goal) => goal.goal_id));

    // 커스텀 목표로 덮어쓰지 않는 더미 목표들만 필터링
    const filteredDummyGoals = dummyGoals.filter(
      (goalWithUser) => !customGoalIds.has(goalWithUser.goal.goal_id),
    );

    const allGoals = [
      ...filteredDummyGoals,
      ...customGoals.map((goal) => {
        // 기존 더미 데이터에서 해당 사용자 정보를 찾기
        const originalGoal = dummyGoals.find((g) => g.goal.goal_id === goal.goal_id);
        const user = originalGoal?.user || {
          user_id: 1,
          nickname: '닉네임',
          email: 'user@example.com',
          auth_type: 'GOOGLE',
          tier: 'BRONZE',
          created_at: '2025-01-01 00:00:00',
          profileImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE',
        };

        return {
          goal,
          user,
        };
      }),
    ];

    // 삭제되지 않은 목표만 필터링
    const activeGoals = allGoals.filter((goalWithUser) => !goalWithUser.goal.is_deleted);

    // created_at 기준으로 최근에 작성한 순서로 정렬 (내림차순)
    const sortedGoals = activeGoals.sort((a, b) => {
      const dateA = new Date(a.goal.created_at);
      const dateB = new Date(b.goal.created_at);
      return dateB.getTime() - dateA.getTime(); // 최신 날짜가 먼저 오도록
    });

    setGoals(sortedGoals);
  };

  // 목표 완료 토글 함수 (더미 데이터와 커스텀 목표 모두 처리)
  const toggleGoalCompletion = (goalId: number) => {
    // 커스텀 목표인지 확인
    const isCustomGoal = customGoals.some((goal) => goal.goal_id === goalId);

    if (isCustomGoal) {
      // 커스텀 목표는 기존 로직 사용
      setCustomGoals((prev) =>
        prev.map((goal) =>
          goal.goal_id === goalId ? { ...goal, is_completed: !goal.is_completed } : goal,
        ),
      );
    } else {
      // 더미 데이터 목표는 기존 사용자 정보를 유지하면서 수정
      const dummyGoal = goals.find((g) => g.goal.goal_id === goalId);
      if (dummyGoal) {
        const updatedGoal = {
          ...dummyGoal.goal,
          is_completed: !dummyGoal.goal.is_completed,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        // 기존 사용자 정보를 유지하기 위해 user_id를 보존
        setCustomGoals((prev) => [...prev, updatedGoal]);
      }
    }
  };

  // 새 목표 추가 함수 (하루 1개 제한)
  const addGoal = (goalData: { title: string; content: string; category: string }) => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)

    // 오늘 작성된 목표가 있는지 확인 (더미 데이터 + 커스텀 데이터)
    const todayGoals = goals.filter((goalWithUser) => {
      const goalDate = goalWithUser.goal.created_at.split(' ')[0]; // YYYY-MM-DD
      return goalWithUser.goal.user_id === 1 && goalDate === today;
    });

    if (todayGoals.length > 0) {
      alert('오늘은 이미 목표를 작성했습니다. 하루에 하나의 목표만 작성할 수 있습니다.');
      return;
    }

    const newGoal: Goal = {
      goal_id: Date.now(), // 임시 ID 생성
      user_id: 1, // 현재 사용자 ID
      title: goalData.title,
      content: goalData.content,
      category: goalData.category,
      is_completed: false,
      is_deleted: false,
      cheer_count: 0,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    setCustomGoals((prev) => [...prev, newGoal]);
  };

  // 목표 수정 함수
  const updateGoal = (goalId: number, updates: Partial<Goal>) => {
    // 커스텀 목표인지 확인
    const isCustomGoal = customGoals.some((goal) => goal.goal_id === goalId);

    if (isCustomGoal) {
      // 커스텀 목표는 기존 로직 사용
      setCustomGoals((prev) =>
        prev.map((goal) =>
          goal.goal_id === goalId
            ? {
                ...goal,
                ...updates,
                updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
              }
            : goal,
        ),
      );
    } else {
      // 더미 데이터 목표는 새로운 커스텀 목표로 복사해서 수정
      const dummyGoal = goals.find((g) => g.goal.goal_id === goalId);
      if (dummyGoal) {
        const updatedGoal = {
          ...dummyGoal.goal,
          ...updates,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        setCustomGoals((prev) => [...prev, updatedGoal]);
      }
    }
  };

  // 목표 삭제 함수 (더미 데이터도 삭제 가능)
  const deleteGoal = (goalId: number) => {
    // 커스텀 목표인지 확인
    const isCustomGoal = customGoals.some((goal) => goal.goal_id === goalId);

    if (isCustomGoal) {
      // 커스텀 목표는 기존 로직 사용
      setCustomGoals((prev) => prev.filter((goal) => goal.goal_id !== goalId));
    } else {
      // 더미 데이터 목표는 삭제된 상태로 커스텀 목표에 추가
      const dummyGoal = goals.find((g) => g.goal.goal_id === goalId);
      if (dummyGoal) {
        const deletedGoal = {
          ...dummyGoal.goal,
          is_deleted: true,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        setCustomGoals((prev) => [...prev, deletedGoal]);
      }
    }
  };

  // 북마크 토글 함수
  const toggleBookmark = (goalId: number) => {
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(goalId)) {
        newBookmarks.delete(goalId);
      } else {
        newBookmarks.add(goalId);
      }
      return newBookmarks;
    });
  };

  // 목표 새로고침 함수
  const refreshGoals = () => {
    combineGoals();
  };

  // 초기 로드 및 customGoals 변경 시 목표 합치기
  useEffect(() => {
    combineGoals();
  }, [customGoals]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        bookmarks,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleGoalCompletion,
        toggleBookmark,
        refreshGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
