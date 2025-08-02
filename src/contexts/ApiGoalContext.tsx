import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllGoals, type GoalApiResponse } from '../api/getAllGoals';
import { getAllFriendsGoals } from '../api/getFriendGoals';
import { createGoal, type CreateGoalRequest } from '../api/createGoal';
import { updateGoal, type UpdateGoalRequest } from '../api/updateGoal';
import { deleteGoal } from '../api/deleteGoal';
import { toggleGoalComplete } from '../api/toggleGoalComplete';
import { getBookmarks, type BookmarkResponse } from '../api/getBookmarks';
import { toggleBookmark as apiToggleBookmark } from '../api/toggleBookmark';
import { increaseCheer, decreaseCheer, type CheerResponse } from '../api/toggleCheer';
import { getNickName, getImageUrl } from '../api/axiosInstance';

// API 기반 목표 타입 (실제 백엔드 응답과 동일)
export interface ApiGoal extends GoalApiResponse {
  // GoalApiResponse에 모든 필드가 포함되어 있음
}

interface ApiGoalContextType {
  goals: ApiGoal[]; // 모든 목표 (전체)
  myGoals: ApiGoal[]; // 내 목표만
  friendGoals: ApiGoal[]; // 친구 목표만
  myGoalIds: Set<number>; // 내 목표 ID들 (빠른 조회용)
  bookmarks: BookmarkResponse[];
  isLoadingGoals: boolean;
  isLoadingFriendGoals: boolean;
  isLoadingBookmarks: boolean;
  loadGoals: () => Promise<void>;
  loadFriendGoals: () => Promise<void>;
  loadBookmarks: () => Promise<void>;
  createNewGoal: (goalData: CreateGoalRequest) => Promise<void>;
  updateExistingGoal: (goalId: string, goalData: UpdateGoalRequest) => Promise<void>;
  deleteExistingGoal: (goalId: string) => Promise<void>;
  toggleGoalCompletion: (goalId: string) => Promise<void>;
  toggleBookmarkStatus: (goalId: number) => Promise<void>;
  toggleCheerStatus: (goalId: number) => Promise<void>;
}

const ApiGoalContext = createContext<ApiGoalContextType | undefined>(undefined);

export const useApiGoals = () => {
  const context = useContext(ApiGoalContext);
  if (context === undefined) {
    throw new Error('useApiGoals must be used within a ApiGoalProvider');
  }
  return context;
};

interface ApiGoalProviderProps {
  children: React.ReactNode;
}

export const ApiGoalProvider: React.FC<ApiGoalProviderProps> = ({ children }) => {
  const [goals, setGoals] = useState<ApiGoal[]>([]); // 모든 목표
  const [friendGoals, setFriendGoals] = useState<ApiGoal[]>([]); // 친구 목표
  const [myGoals, setMyGoals] = useState<ApiGoal[]>([]); // 내 목표
  const [myGoalIds, setMyGoalIds] = useState<Set<number>>(new Set()); // 내 목표 ID들
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [isLoadingFriendGoals, setIsLoadingFriendGoals] = useState(false);
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(false);

  // 친구 목표 로드
  const loadFriendGoals = async () => {
    try {
      console.log('🔄 친구 목표 로드 시작...');
      setIsLoadingFriendGoals(true);

      // TODO: 친구 기능 구현 후 실제 친구 목록 API 사용
      console.log('✅ 친구 목표 로드 완료 (친구 기능 구현 대기 중)');
      setFriendGoals([]);
    } catch (error) {
      console.error('❌ 친구 목표 로드 실패:', error);
      setFriendGoals([]); // 실패시 빈 배열
    } finally {
      setIsLoadingFriendGoals(false);
    }
  };

  // 목표 목록 로드 (전체)
  const loadGoals = async () => {
    try {
      console.log('🔄 API 목표 로드 시작...');
      setIsLoadingGoals(true);
      const goalData = await getAllGoals();
      console.log('✅ API 목표 로드 성공:', goalData);
      console.log('📊 목표 개수:', goalData?.length || 0);

      // Soft delete된 목표들 필터링 (isDeleted가 1인 목표 제외)
      const activeGoals = goalData.filter((goal) => goal.isDeleted !== 1);
      console.log('📊 활성 목표 개수 (삭제 제외):', activeGoals.length);

      setGoals(activeGoals);
    } catch (error) {
      console.error('❌ 목표 로드 실패:', error);
    } finally {
      setIsLoadingGoals(false);
    }
  };

  // 북마크 목록 로드
  const loadBookmarks = async () => {
    try {
      console.log('🔄 API 북마크 로드 시작...');
      setIsLoadingBookmarks(true);
      const bookmarkData = await getBookmarks();
      console.log('✅ API 북마크 로드 성공:', bookmarkData);
      console.log('📊 북마크 개수:', bookmarkData?.length || 0);

      setBookmarks(bookmarkData);
    } catch (error) {
      console.error('❌ 북마크 로드 실패:', error);
    } finally {
      setIsLoadingBookmarks(false);
    }
  };

  // 새 목표 생성 (Optimistic Update 적용)
  const createNewGoal = async (goalData: CreateGoalRequest) => {
    console.log('🔄 목표 생성 시작:', goalData);

    // 임시 목표 객체 생성 (API 응답으로 교체될 예정)
    const tempGoal: ApiGoal = {
      goalId: Date.now(), // 임시 ID
      nickName: getNickName() || '사용자',
      imageUrl: getImageUrl() || 'https://via.placeholder.com/150',
      isBookmarked: false,
      content: goalData.content,
      category: goalData.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCompleted: false,
      cheerCount: 0,
    };

    console.log('📝 임시 목표 생성:', tempGoal);

    // 즉시 UI에 추가
    setGoals([tempGoal, ...goals]);
    setMyGoals([tempGoal, ...myGoals]);
    setMyGoalIds(new Set([tempGoal.goalId, ...Array.from(myGoalIds)]));

    console.log('✅ UI 즉시 업데이트 완료');

    try {
      // API 호출
      await createGoal(goalData);
      console.log('✅ 목표 생성 API 성공');

      // API 성공 후 전체 목록 새로고침 (실제 DB 데이터로)
      console.log('🔄 목록 새로고침 시작...');
      await loadGoals();
      await loadFriendGoals();
      console.log('✅ 목록 새로고침 완료');
    } catch (error) {
      console.error('❌ 목표 생성 API 실패, 상태 되돌리기:', error);
      // 실패시 임시 목표 제거
      setGoals(goals.filter((goal) => goal.goalId !== tempGoal.goalId));
      setMyGoals(myGoals.filter((goal) => goal.goalId !== tempGoal.goalId));
      setMyGoalIds(new Set(Array.from(myGoalIds).filter((id) => id !== tempGoal.goalId)));
      throw error;
    }
  };

  // 목표 수정 (Optimistic Update 적용)
  const updateExistingGoal = async (goalId: string, goalData: UpdateGoalRequest) => {
    const goalIdNum = parseInt(goalId);

    // 1. 즉시 UI 업데이트 (Optimistic)
    const updateGoalInState = (goalsList: ApiGoal[]) => {
      return goalsList.map((goal) =>
        goal.goalId === goalIdNum
          ? {
              ...goal,
              content: goalData.content,
              category: goalData.category,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      );
    };

    // 모든 state 즉시 업데이트
    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;

    setGoals(updateGoalInState(goals));
    setMyGoals(updateGoalInState(myGoals));
    setFriendGoals(updateGoalInState(friendGoals));

    try {
      // 2. API 호출
      await updateGoal(goalId, goalData);
      console.log('✅ 목표 수정 API 성공');
    } catch (error) {
      console.error('❌ 목표 수정 API 실패, 상태 되돌리기:', error);
      // 3. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      throw error;
    }
  };

  // 목표 삭제 (Soft Delete - Optimistic Update 적용)
  const deleteExistingGoal = async (goalId: string) => {
    const goalIdNum = parseInt(goalId);

    // 1. 즉시 UI에서 제거 (Optimistic - Soft Delete이므로 필터링으로 처리)
    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;

    // Soft delete된 목표들을 필터링해서 제거
    setGoals(goals.filter((goal) => goal.goalId !== goalIdNum));
    setMyGoals(myGoals.filter((goal) => goal.goalId !== goalIdNum));
    setFriendGoals(friendGoals.filter((goal) => goal.goalId !== goalIdNum));
    setMyGoalIds(new Set(Array.from(myGoalIds).filter((id) => id !== goalIdNum)));

    try {
      // 2. API 호출 (백엔드에서 isDeleted = true로 설정)
      await deleteGoal(goalId);
      console.log('✅ 목표 Soft Delete API 성공');
    } catch (error) {
      console.error('❌ 목표 Soft Delete API 실패, 상태 되돌리기:', error);
      // 3. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      setMyGoalIds(new Set([...Array.from(myGoalIds), goalIdNum]));
      throw error;
    }
  };

  // 목표 완료 토글 (Optimistic Update 적용)
  const toggleGoalCompletion = async (goalId: string) => {
    const goalIdNum = parseInt(goalId);

    // 1. 즉시 UI 업데이트 (Optimistic)
    const updateGoalInState = (goalsList: ApiGoal[]) => {
      return goalsList.map((goal) =>
        goal.goalId === goalIdNum ? { ...goal, isCompleted: !goal.isCompleted } : goal,
      );
    };

    // 모든 state 즉시 업데이트
    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;

    setGoals(updateGoalInState(goals));
    setMyGoals(updateGoalInState(myGoals));
    setFriendGoals(updateGoalInState(friendGoals));

    try {
      // 2. API 호출
      await toggleGoalComplete(goalId);
      console.log('✅ 목표 완료 토글 API 성공');
    } catch (error) {
      console.error('❌ 목표 완료 토글 API 실패, 상태 되돌리기:', error);
      // 3. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      throw error;
    }
  };

  // 북마크 토글 (Optimistic Update 적용)
  const toggleBookmarkStatus = async (goalId: number) => {
    console.log('🔖 북마크 토글 시작:', goalId);
    // 1. 즉시 UI 업데이트 (Optimistic)
    const updateBookmarkInState = (goalsList: ApiGoal[]) => {
      return goalsList.map((goal) =>
        goal.goalId === goalId ? { ...goal, isBookmarked: !goal.isBookmarked } : goal,
      );
    };

    // 모든 state 즉시 업데이트
    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;
    const prevBookmarks = bookmarks;

    setGoals(updateBookmarkInState(goals));
    setMyGoals(updateBookmarkInState(myGoals));
    setFriendGoals(updateBookmarkInState(friendGoals));

    // 북마크 목록도 즉시 업데이트
    const isCurrentlyBookmarked = bookmarks.some((bookmark) => bookmark.goalId === goalId);
    console.log('🔖 현재 북마크 상태:', {
      goalId,
      isCurrentlyBookmarked,
      bookmarksCount: bookmarks.length,
    });

    if (isCurrentlyBookmarked) {
      // 북마크 제거
      console.log('🔖 북마크 제거 중...');
      setBookmarks(bookmarks.filter((bookmark) => bookmark.goalId !== goalId));
    } else {
      // 북마크 추가 (임시 데이터)
      console.log('🔖 북마크 추가 중...');
      const goal = goals.find((g) => g.goalId === goalId);
      if (goal) {
        const newBookmark: BookmarkResponse = {
          bookmarkId: Date.now(), // 임시 ID (API 응답으로 교체될 예정)
          userId: 0, // 임시 값
          goalId: goalId,
          goal: {
            content: goal.content,
            category: goal.category,
            isCompleted: goal.isCompleted,
          },
        };
        setBookmarks([...bookmarks, newBookmark]);
      }
    }

    try {
      // 2. API 호출
      await apiToggleBookmark(goalId);
      console.log('✅ 북마크 토글 API 성공');
    } catch (error) {
      console.error('❌ 북마크 토글 API 실패, 상태 되돌리기:', error);
      // 3. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      setBookmarks(prevBookmarks);
      throw error;
    }
  };

  // 응원 토글 (Optimistic Update 적용)
  const toggleCheerStatus = async (goalId: number) => {
    console.log('💖 응원 토글 시작:', goalId);

    // 현재 목표 찾기
    const currentGoal = goals.find((g) => g.goalId === goalId);
    if (!currentGoal) {
      console.error('❌ 목표를 찾을 수 없습니다:', goalId);
      return;
    }

    // 1. 즉시 UI 업데이트 (Optimistic)
    const updateCheerInState = (goalsList: ApiGoal[]) => {
      return goalsList.map((goal) =>
        goal.goalId === goalId ? { ...goal, cheerCount: goal.cheerCount + 1 } : goal,
      );
    };

    // 모든 state 즉시 업데이트
    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;

    setGoals(updateCheerInState(goals));
    setMyGoals(updateCheerInState(myGoals));
    setFriendGoals(updateCheerInState(friendGoals));

    try {
      // 2. API 호출 (응원 증가)
      await increaseCheer(goalId);
      console.log('✅ 응원 증가 API 성공');
    } catch (error) {
      console.error('❌ 응원 증가 API 실패, 상태 되돌리기:', error);
      // 3. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      throw error;
    }
  };

  // 초기 데이터 로드
  // 내 목표 계산 (현재 로그인한 사용자의 목표만)
  useEffect(() => {
    if (goals.length > 0) {
      // 현재는 친구 기능이 구현되지 않아서 모든 목표가 내 목표
      // 나중에 친구 기능 구현 시 현재 로그인한 사용자 ID로 필터링
      setMyGoals(goals);
      setMyGoalIds(new Set(goals.map((goal) => goal.goalId)));
      console.log('📝 내 목표 (현재 로그인한 사용자):', goals.length, '개');
    }
  }, [goals]);

  // 컴포넌트 마운트 시 자동으로 데이터 로드
  useEffect(() => {
    loadGoals();
    loadFriendGoals();
    loadBookmarks();
  }, []);

  return (
    <ApiGoalContext.Provider
      value={{
        goals,
        myGoals,
        friendGoals,
        myGoalIds,
        bookmarks,
        isLoadingGoals,
        isLoadingFriendGoals,
        isLoadingBookmarks,
        loadGoals,
        loadFriendGoals,
        loadBookmarks,
        createNewGoal,
        updateExistingGoal,
        deleteExistingGoal,
        toggleGoalCompletion,
        toggleBookmarkStatus,
        toggleCheerStatus,
      }}
    >
      {children}
    </ApiGoalContext.Provider>
  );
};
