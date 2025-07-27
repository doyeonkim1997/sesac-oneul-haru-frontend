// 메뉴 섹션 컴포넌트
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateGoalModal from '../modals/CreateGoalModal';

const MenuSection: React.FC = () => {
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);

  const handleCreateGoal = (goalData: { content: string; category: string }) => {
    console.log('새 목표 생성:', goalData);
    // 여기에 목표 생성 로직 추가
    // 예: API 호출, 상태 업데이트 등
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-4">
      <nav className="space-y-1">
        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 px-3 py-3 rounded-lg font-medium">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">list_alt</span>
              <span>내 목표 관리</span>
            </div>
            <span className="material-icons text-sm rotate-180">expand_more</span>
          </div>
          <div className="mt-1 ml-8 space-y-1">
            <button
              onClick={() => setIsCreateGoalModalOpen(true)}
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors w-full text-left"
            >
              <span>새 목표 작성</span>
            </button>
            <Link
              to="/goals"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              <span>목표 조회</span>
            </Link>
            <Link
              to="/bookmarks"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              <span>북마크</span>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 px-3 py-3 rounded-lg font-medium">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">people</span>
              <span>친구 관리</span>
            </div>
            <span className="material-icons text-sm rotate-180">expand_more</span>
          </div>
          <div className="mt-1 ml-8 space-y-1">
            <a
              className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
              href="#"
            >
              <span>친구 목록</span>
            </a>
            <a
              className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
              href="#"
            >
              <span>친구 요청 관리</span>
            </a>
            <a
              className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
              href="#"
            >
              <span>친구 찾기</span>
            </a>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 px-3 py-3 rounded-lg font-medium">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">settings</span>
              <span>설정</span>
            </div>
            <span className="material-icons text-sm rotate-180">expand_more</span>
          </div>
          <div className="mt-1 ml-8 space-y-1">
            <Link
              to="/settings"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              <span>회원 정보 수정</span>
            </Link>
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
