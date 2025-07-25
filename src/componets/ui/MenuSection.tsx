// 메뉴 섹션 컴포넌트
import { useState } from 'react';

const MenuSection: React.FC = () => {
  const [isGoalMenuOpen, setIsGoalMenuOpen] = useState(false);
  const [isFriendMenuOpen, setIsFriendMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <nav className="space-y-1">
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 hover:bg-sky-500 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsGoalMenuOpen(!isGoalMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">list_alt</span>
              <span>내 목표 관리</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isGoalMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isGoalMenuOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>목표 목록 조회</span>
              </a>
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>북마크</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 hover:bg-sky-500 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsFriendMenuOpen(!isFriendMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">people</span>
              <span>친구 관리</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isFriendMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isFriendMenuOpen && (
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
          )}
        </div>
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-sky-400 hover:bg-sky-500 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">settings</span>
              <span>설정</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isSettingsMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isSettingsMenuOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>회원 정보 수정</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MenuSection;
