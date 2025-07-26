import React, { useState } from 'react';
import type { GoalWithUser } from '../../data/goals';
import { CATEGORY_DISPLAY_NAMES } from '../../data/goals';

interface GoalCardProps {
  goalWithUser: GoalWithUser;
  isBookmarkMode?: boolean; // 북마크 모드 여부
}

const GoalCard: React.FC<GoalCardProps> = ({ goalWithUser, isBookmarkMode = false }) => {
  const { goal, user } = goalWithUser;

  // 현재 로그인한 사용자 ID (임시로 1로 설정, 나중에 실제 로그인 상태에서 가져올 예정)
  const currentUserId = 1;

  // 내가 작성한 목표인지 확인
  const isMyGoal = goal.user_id === currentUserId;

  // 드롭다운 메뉴 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
      <div className="flex items-start space-x-6 pl-2">
        <img
          alt={`${user.nickname} 프로필 이미지`}
          className="h-16 w-16 rounded-full object-cover"
          src={user.profileImage || ''}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">@{user.nickname}</span>
                <span className="text-xs text-gray-400">{goal.created_at}</span>
              </div>
              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">{goal.content}</p>
            </div>
            <div className="relative flex items-center space-x-2">
              {!isBookmarkMode && (
                <button className="text-gray-400 hover:text-yellow-500">
                  <span className="material-icons">bookmark_border</span>
                </button>
              )}
              {isMyGoal && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <span className="material-icons">more_horiz</span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('수정:', goal.goal_id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('삭제:', goal.goal_id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
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
      <div className="mt-4">
        {/* 키워드 영역 */}
        <div className="flex flex-wrap gap-2 mb-4 pl-24">
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
            #{CATEGORY_DISPLAY_NAMES[goal.category as keyof typeof CATEGORY_DISPLAY_NAMES]}
          </span>
        </div>
        {/* 하단 버튼 영역 */}
        <div className="flex justify-end items-center space-x-4">
          {isBookmarkMode ? (
            // 북마크 모드: 북마크 아이콘만 표시 (높이 맞추기 위해 빈 공간 추가)
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-base font-medium text-gray-700 opacity-0">완료</span>
                <div className="h-8 w-14"></div>
              </div>
              <button
                className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
                title="북마크 해제하기"
              >
                <span className="material-icons">bookmark</span>
              </button>
            </div>
          ) : (
            // 일반 모드: 토글 + 하트 표시
            <>
              <div className="flex items-center space-x-3">
                <span className="text-base font-medium text-gray-700">
                  {goal.is_completed ? '완료' : '미완료'}
                </span>
                <button
                  title={goal.is_completed ? '완료 토글' : '미완료 토글'}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                    goal.is_completed ? 'bg-sky-400' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      goal.is_completed ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <span className="material-icons">favorite_border</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
