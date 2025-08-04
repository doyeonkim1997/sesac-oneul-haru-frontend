import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { GoalWithUser } from '../../data/goals';
import { CATEGORY_DISPLAY_NAMES, CATEGORY_COLORS } from '../../data/goals';
import { useApiGoals } from '../../contexts/ApiGoalContext';
import CreateGoalModal from '../modals/CreateGoalModal';

interface GoalCardProps {
  goalWithUser: GoalWithUser;
  isBookmarkMode?: boolean; // 북마크 여부
  onEditClick?: () => void; // 수정 버튼 클릭 핸들러
  disableExpiredEffect?: boolean; // 만료 효과 비활성화 여부
}

const GoalCard: React.FC<GoalCardProps> = ({
  goalWithUser,
  isBookmarkMode = false,
  onEditClick,
  disableExpiredEffect = false,
}) => {
  const { goal, user } = goalWithUser;
  const {
    toggleGoalCompletion,
    toggleBookmarkStatus,
    deleteExistingGoal,
    bookmarks,
    myGoalIds,
    toggleCheerStatus,
    cheeredGoals,
  } = useApiGoals();

  // 내 목표인지 여부
  const isMyGoal = myGoalIds.has(goal.goal_id);

  // 드롭다운 메뉴 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 북마크 상태 확인 (API 기반)
  const isBookmarked = useMemo(() => {
    const bookmarked = bookmarks.some((bookmark) => bookmark.goalId === goal.goal_id);
    console.log('🔖 GoalCard 내부 isBookmarked 계산:', {
      goalId: goal.goal_id,
      bookmarked,
      bookmarksCount: bookmarks.length,
    });
    return bookmarked;
  }, [bookmarks, goal.goal_id]); // bookmarks와 goal.goal_id가 변경될 때만 재계산
  // 디버깅용
  console.log('🔖 북마크 상태 확인:', {
    goalId: goal.goal_id,
    bookmarks: bookmarks.map((b) => b.goalId),
    isBookmarked,
  });

  // 오늘 작성된 목표인지 확인 (자정 처리)
  const isTodayGoal = () => {
    const toKSTDateString = (date: Date) =>
      new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];

    const goalDate = new Date(goal.created_at);
    const now = new Date();

    return toKSTDateString(goalDate) === toKSTDateString(now);
  };

  const isExpired = !isTodayGoal();
  const canToggleCompletion = isMyGoal && isTodayGoal();

  // 드롭다운 메뉴 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 응원 상태 확인
  const hasCheered = cheeredGoals.has(goal.goal_id);

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-lg hover:border-sky-200 dark:hover:border-gray-600 transition-transform duration-200 cursor-pointer transform hover:scale-[1.01] ${
        isExpired && !disableExpiredEffect ? 'opacity-60 blur-[0.5px]' : ''
      }`}
    >
      <div className="flex items-start space-x-6">
        <img
          alt={`${user.nickname} 프로필 이미지`}
          className="h-20 w-20 rounded-full object-cover flex-shrink-0"
          src={user.profileImage || ''}
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  @{user.nickname}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canToggleCompletion) {
                      toggleGoalCompletion(goal.goal_id.toString());
                    }
                  }}
                  disabled={!canToggleCompletion}
                  title={
                    canToggleCompletion
                      ? '완료 상태 변경'
                      : '오늘 작성된 목표만 완료 상태를 변경할 수 있습니다'
                  }
                  className={`w-7 h-7 rounded border-2 transition-colors flex-shrink-0 flex items-center justify-center ${
                    goal.is_completed
                      ? 'bg-sky-400 border-sky-400'
                      : canToggleCompletion
                        ? 'bg-white border-gray-300 dark:border-gray-600 hover:border-sky-400'
                        : 'bg-gray-100 border-gray-200 dark:bg-gray-700 dark:border-gray-600 cursor-not-allowed'
                  }`}
                >
                  {goal.is_completed && (
                    <span className="text-white font-bold text-lg leading-none">✓</span>
                  )}
                </button>
              </div>
              <p
                className={`text-xl font-medium text-gray-800 dark:text-white mt-4 mb-6 ${
                  goal.is_completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
              >
                {goal.content}
              </p>
            </div>
            <div className="relative flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarkStatus(goal.goal_id);
                }}
                className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
              >
                <span className="material-icons !text-3xl">
                  {isBookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
              {isMyGoal && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <span className="material-icons !text-3xl">more_horiz</span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isTodayGoal()) {
                            onEditClick?.();
                          }
                          setIsDropdownOpen(false);
                        }}
                        disabled={!isTodayGoal()}
                        title={
                          isTodayGoal() ? '목표 수정' : '오늘 작성된 목표만 수정할 수 있습니다'
                        }
                        className={`w-full px-3 py-2 text-left text-sm rounded-t-lg ${
                          isTodayGoal()
                            ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('목표를 삭제하시겠습니까?')) {
                            deleteExistingGoal(goal.goal_id.toString());
                          }
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-26">
        {/* 키워드 영역 */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span
            className={`text-base px-4 py-2 rounded-full ${
              CATEGORY_COLORS[goal.category as keyof typeof CATEGORY_COLORS] ||
              'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            #{CATEGORY_DISPLAY_NAMES[goal.category as keyof typeof CATEGORY_DISPLAY_NAMES]}
          </span>
        </div>
        {/* 날짜 표시 및 하트 */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {goal.updated_at && goal.updated_at !== goal.created_at
              ? `수정됨 ${new Date(goal.updated_at).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : new Date(goal.created_at).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isMyGoal) {
                // 자신의 목표는 응원할 수 없음
                toggleCheerStatus(goal.goal_id);
              }
            }}
            disabled={isMyGoal}
            title={
              isMyGoal ? '자신의 목표는 응원할 수 없습니다' : hasCheered ? '응원 취소' : '응원하기'
            }
            className={`flex items-center space-x-1 ${
              isMyGoal
                ? 'text-gray-300 cursor-not-allowed'
                : hasCheered
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <span className="material-icons !text-3xl">
              {hasCheered ? 'favorite' : 'favorite_border'}
            </span>
            {goal.cheer_count > 0 && (
              <span className="text-sm font-medium">{goal.cheer_count}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// 수정 모달을 최상위로 렌더링 (Portal 사용)
const GoalCardWithModal: React.FC<GoalCardProps> = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateExistingGoal } = useApiGoals();
  const { goalWithUser } = props;
  const { goal } = goalWithUser;

  return (
    <>
      <GoalCard {...props} onEditClick={() => setIsEditModalOpen(true)} />

      {isEditModalOpen &&
        createPortal(
          <CreateGoalModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            mode="edit"
            goalToEdit={{
              goal_id: goal.goal_id,
              content: goal.content,
              category: goal.category,
            }}
            onSubmit={(goalData) => {
              updateExistingGoal(goal.goal_id.toString(), {
                content: goalData.content,
                category: goalData.category,
                isCompleted: goal.is_completed,
              });
              setIsEditModalOpen(false);
            }}
          />,
          document.body,
        )}
    </>
  );
};

export default GoalCardWithModal;
