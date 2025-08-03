import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateGoalModal from '../modals/CreateGoalModal';
import FriendRequestModal from '../modals/FriendRequestModal';
import FriendSearchModal from '../modals/FriendSearchModal';
import DarkModeToggle from './DarkModeToggle';
import { useApiGoals } from '../../contexts/ApiGoalContext';

const MenuSection: React.FC = () => {
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { createNewGoal } = useApiGoals();

  const [requestedUserIds, setRequestedUserIds] = useState<number[]>([]);

  const handleCreateGoal = async (goalData: {
    title: string;
    content: string;
    category: string;
  }) => {
    console.log('🎯 MenuSection - 목표 생성 요청:', goalData);
    try {
      await createNewGoal({ content: goalData.content, category: goalData.category });
      console.log('✅ MenuSection - 목표 생성 성공');
    } catch (error) {
      console.error('❌ MenuSection - 목표 생성 실패:', error);
      alert('오늘의 목표가 이미 존재합니다!');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-4">
      <nav className="space-y-1">
        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-sky-400 px-3 py-3 font-extrabold border-b-2 border-sky-400">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">list_alt</span>
              <span>내 목표 관리</span>
            </div>
          </div>
          <div className="mt-1 ml-9 space-y-1">
            <button
              onClick={() => setIsCreateGoalModalOpen(true)}
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors w-full text-left cursor-pointer"
            >
              <span>새 목표 작성</span>
            </button>
            <Link
              to="/goals"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors"
            >
              <span>목표 조회</span>
            </Link>
            <Link
              to="/bookmarks"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors"
            >
              <span>북마크</span>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-sky-400 px-3 py-3 font-extrabold border-b-2 border-sky-400">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">people</span>
              <span>친구 관리</span>
            </div>
          </div>
          <div className="mt-1 ml-9 space-y-1">
            <Link
              to="/friends"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors"
            >
              <span>친구 목록</span>
            </Link>

            <a
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsRequestOpen(true);
              }}
            >
              <span>친구 요청</span>
            </a>
            {isRequestOpen && (
              <FriendRequestModal onClose={() => setIsRequestOpen(false)} isStandalone={true} />
            )}

            <a
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsSearchOpen(true);
              }}
            >
              <span>친구 찾기</span>
            </a>

            {isSearchOpen && (
              <FriendSearchModal
                onClose={() => setIsSearchOpen(false)}
                isStandalone={true}
                requestedUserIds={requestedUserIds}
                setRequestedUserIds={setRequestedUserIds}
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-sky-400 px-3 py-3 font-extrabold border-b-2 border-sky-400">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">settings</span>
              <span>설정</span>
            </div>
          </div>
          <div className="mt-1 ml-9 space-y-1">
            <Link
              to="/settings"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors"
            >
              <span>회원 정보 수정</span>
            </Link>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 px-3 py-2.5 rounded-lg font-medium">
              <span>다크모드</span>
              <div className="ml-auto">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 새 목표 작성 모달 */}
      <CreateGoalModal
        isOpen={isCreateGoalModalOpen}
        onClose={() => setIsCreateGoalModalOpen(false)}
        onSubmit={handleCreateGoal}
      />
    </div>
  );
};

export default MenuSection;