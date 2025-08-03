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
import { useAuth } from './AuthContext';
import { getFriendList } from '../api/getFriendList';

// API 기반 목표 타입 (실제 백엔드 응답과 동일)
export interface ApiGoal extends GoalApiResponse {
  userId: number; // 추가
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
  refreshCalendar: () => void; // 캘린더 새로고침 함수
  calendarRefreshTrigger: number; // 캘린더 새로고침 트리거
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
  const { userId } = useAuth(); // 현재 로그인한 사용자 ID
  console.log('👤 현재 로그인 userId:', userId);
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

      // 1. 친구 목록 가져오기
      const friends = await getFriendList ();
      console.log('👥 친구 목록:', friends);

      if (friends.length === 0) {
        console.log('📝 친구가 없어서 친구 목표 없음');
        setFriendGoals([]);
        return;
      }

      // 2. 친구들의 ID 추출
      const friendIds = friends.map((friend) => friend.userId);
      console.log('🆔 친구 ID들:', friendIds);

      // 3. 모든 친구들의 목표 가져오기
      const friendGoalsData = await getAllFriendsGoals(friendIds);
      console.log('✅ 친구 목표 로드 성공:', friendGoalsData);
      console.log('📊 친구 목표 개수:', friendGoalsData?.length || 0);

      // Soft delete된 목표들 필터링 (isDeleted가 1인 목표 제외)
      const activeFriendGoals = friendGoalsData.filter((goal) => goal.isDeleted !== 1);
      console.log('📊 활성 친구 목표 개수 (삭제 제외):', activeFriendGoals.length);

      const friendGoalsWithUserId = activeFriendGoals.map((goal) => ({
        ...goal,
        userId: goal.userId  ?? 0, // 이미 포함되어 있으므로 복사만 함
      }));
      setFriendGoals(friendGoalsWithUserId); // ✅ 방법 2 (명시적 변환)
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
      setIsLoadingGoals(true);
      // getAllGoals()는 userId가 포함된 모든 목표를 반환해야 합니다.
      const goalData = await getAllGoals();
      console.log('✅ API 목표 로드 성공:', goalData);

      // Soft delete된 목표들 필터링
      const activeGoals = goalData.filter(goal => goal.isDeleted !== 1) as ApiGoal[];
      // goalData에 이미 userId가 포함되어 있어야 합니다. (백엔드 응답에 따라)

      console.log('📊 활성 목표 (원래 userId 유지):', activeGoals);
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
      goalId: Date.now(),
      userId: userId!, // 추가
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

      // 3. 캘린더 새로고침 트리거
      refreshCalendar();
    } catch (error) {
      console.error('❌ 목표 완료 토글 API 실패, 상태 되돌리기:', error);
      // 4. 실패시 원래 상태로 복원
      setGoals(prevGoals);
      setMyGoals(prevMyGoals);
      setFriendGoals(prevFriendGoals);
      throw error;
    }
  };

  // 북마크 토글 (Optimistic Update 적용)
  const toggleBookmarkStatus = async (goalId: number) => {
    console.log('🔖 북마크 토글 시작 (Goal ID):', goalId);

    const initialBookmarks = bookmarks;
    const isCurrentlyBookmarked = initialBookmarks.some((bookmark) => bookmark.goalId === goalId);
    console.log('🔖 현재 북마크 상태 확인 (initialBookmarks 기준):', {
      goalId,
      isCurrentlyBookmarked,
      initialBookmarksCount: initialBookmarks.length,
      initialBookmarkedIds: initialBookmarks.map(b => b.goalId)
    });

    const prevGoals = goals;
    const prevMyGoals = myGoals;
    const prevFriendGoals = friendGoals;
    const prevBookmarks = initialBookmarks;

    // UI 즉시 업데이트 (Optimistic)
    const updateGoalInCardState = (goalsList: ApiGoal[]) => {
      return goalsList.map((goal) =>
        goal.goalId === goalId ? { ...goal, isBookmarked: !isCurrentlyBookmarked } : goal,
      );
    };

    // goals, myGoals, friendGoals 모두 업데이트 시도 (해당 goalId 있다면 업데이트)
    setGoals(updateGoalInCardState(goals));
    setMyGoals(updateGoalInCardState(myGoals));
    setFriendGoals(updateGoalInCardState(friendGoals));

    let newBookmarksState: BookmarkResponse[];

    if (isCurrentlyBookmarked) {
      // 북마크 제거
      console.log('🔖 북마크 제거 로직 실행 (Goal ID):', goalId);
      newBookmarksState = initialBookmarks.filter((bookmark) => bookmark.goalId !== goalId);
    } else {
      // 북마크 추가
      console.log('🔖 북마크 추가 로직 실행 (Goal ID):', goalId);

      // goals와 friendGoals 모두에서 목표 찾기
      let targetGoal: ApiGoal | undefined;
      targetGoal = goals.find((g) => g.goalId === goalId); // 먼저 goals에서 찾기
      if (!targetGoal) {
        targetGoal = friendGoals.find((g) => g.goalId === goalId); // 없으면 friendGoals에서
      }
      console.log('🔖 북마크를 추가하려는 목표 탐색 결과 (targetGoal):', targetGoal);

      if (targetGoal) {
        const newBookmark: BookmarkResponse = {
          bookmarkId: Date.now(), // 임시 ID
          userId: targetGoal.userId, // 찾은 목표의 실제 userId 사용
          goalId: goalId,
          goal: { // 북마크 내부에 저장될 목표 정보 (targetGoal에서 추출)
            content: targetGoal.content,
            category: targetGoal.category,
            isCompleted: targetGoal.isCompleted,
          },
        };
        newBookmarksState = [...initialBookmarks, newBookmark];
        console.log('🔖 새로 생성된 북마크 객체:', newBookmark);
      } else {
        console.warn('⚠️ 북마크를 추가하려는 목표를 내 목표/친구 목표 배열에서 찾을 수 없습니다! Goal ID:', goalId);
        newBookmarksState = initialBookmarks; // 목표 못 찾으면 북마크 상태 변경 없음
      }
    }

    // 최종적으로 북마크 상태 업데이트
    setBookmarks(newBookmarksState);
    console.log('🔖 setBookmarks 호출 완료. 새로운 bookmarks 상태 길이 (다음 렌더링 반영):', newBookmarksState.length);
    console.log('🔖 새로운 bookmarks 상태 ID들 (다음 렌더링 반영):', newBookmarksState.map(b => b.goalId));


    try {
      await apiToggleBookmark(goalId);
      console.log('✅ 북마크 토글 API 성공 (Goal ID):', goalId);
      await loadBookmarks();
    } catch (error) {
      console.error('❌ 북마크 토글 API 실패, 상태 되돌리기 (Goal ID):', goalId, error);
      // 에러 발생 시 원래 상태로 복원
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

  // 캘린더 새로고침 함수
  const refreshCalendar = () => {
    console.log('🔄 캘린더 새로고침 트리거');
    // 캘린더 컴포넌트에서 이 함수를 호출하면 useEffect가 다시 실행되어 API를 호출
    // 강제로 상태를 변경하여 useEffect 트리거
    setCalendarRefreshTrigger((prev) => prev + 1);
  };

  // 캘린더 새로고침을 위한 트리거 상태
  const [calendarRefreshTrigger, setCalendarRefreshTrigger] = useState(0);

  // 초기 데이터 로드
  // 내 목표 계산 (현재 로그인한 사용자의 목표만)
  useEffect(() => {
    console.log('🔍 내 목표 필터링 시작, goals 길이:', goals.length);
    console.log('현재 userId:', userId, typeof userId);
    if (!userId || goals.length === 0) return;

  const myGoalsFiltered = goals.filter((goal) => goal.userId === Number(userId));
    console.log('🔍 필터링된 내 목표:', myGoalsFiltered);

    setMyGoals(myGoalsFiltered);
    setMyGoalIds(new Set(myGoalsFiltered.map((goal) => goal.goalId)));
  }, [goals, userId]);


  // 컴포넌트 마운트 시 자동으로 데이터 로드
  useEffect(() => {
    if (!userId) {
      console.log('⛔️ userId 없음 - loadGoals 실행 안 함');
      return;
    }

    console.log('✅ userId 준비됨, loadGoals 실행:', userId);
    loadGoals();
    loadFriendGoals();
    loadBookmarks();
  }, [userId]); // userId가 설정될 때만 실행

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
        refreshCalendar,
        calendarRefreshTrigger,
      }}
    >
      {children}
    </ApiGoalContext.Provider>
  );
};