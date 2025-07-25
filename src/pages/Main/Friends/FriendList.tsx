import React from 'react';
import CalendarSection from '../../../componets/ui/Calendar';
import DarkModeToggle from '../../../componets/ui/DarkModeToggle';
import MenuSection from '../../../componets/ui/MenuSection';
import ProfileSection from '../../../componets/ui/ProfileSection';

import { DUMMY_USERS } from '../../../data/users';

// 사용자 데이터 타입 정의
interface User {
  id: string;
  nickname: string;
  email: string;
  imageUrl?: string; // 프로필 이미지 URL (선택 사항)
  unreadCount?: number; // 읽지 않은 알림 수
}

// 개별 사용자 항목 컴포넌트
const UserItem: React.FC<{ user: User; onDelete: (id: string) => void; onNicknameClick?: (user: User) => void }> = ({
  user,
  onDelete,
  onNicknameClick,
}) => {
  return (
    <div className="m-2 flex items-center p-2 border-b border-gray-200 last:border-b-0 h-[66px]">
      {/* 이미지 */}
      <div className="mb-5 relative w-15 h-15 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={`${user.nickname} 프로필`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-600">이미지</span>
        )}
        {user.unreadCount && user.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {user.unreadCount}
          </span>
        )}
      </div>

      {/* 사용자 정보 */}
      <div className="mb-8 ml-4 flex-grow">
        <div className="flex items-center text-gray-800 font-semibold text-base">
          {/* 닉네임 클릭 시 이벤트 */}
          <button
            onClick={() => onNicknameClick?.(user)}
            className="hover:underline hover:text-blue-600"
          >
            {user.nickname}
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete(user.id)}
            className="ml-2 px-2 py-0.5 text-xs bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            삭제
          </button>
        </div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
};

const FriendList: React.FC = () => {
  const handleDeleteUser = (id: string) => {
    console.log(`(화면 구현용) 사용자 ID ${id} 삭제 요청`);
  };

  const half = Math.ceil(DUMMY_USERS.length / 2);
  const leftColumnUsers = DUMMY_USERS.slice(0, half);
  const rightColumnUsers = DUMMY_USERS.slice(half);

  const users = [...leftColumnUsers, ...rightColumnUsers];

return (
  <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a className="flex items-center space-x-2" href="#">
              <span className="material-icons text-blue-500 text-3xl">task_alt</span>
              <span className="text-xl font-bold text-gray-900">Haru</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-900">
              <span className="material-icons text-2xl">people</span>
            </button>
            <button className="text-gray-500 hover:text-gray-900">
              <span className="material-icons text-2xl">favorite_border</span>
            </button>
            <button className="text-gray-500 hover:text-gray-900">
              <span className="material-icons text-2xl">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <main className="flex-1 flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">

            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full space-y-6">
                <div className="mt-[32px]"></div>
                <ProfileSection />
                <MenuSection />
                <div className="flex-grow"></div>
                <div className="flex justify-end mb-2">
                  <DarkModeToggle />
                </div>
                <CalendarSection />
              </div>
            </aside>

      {/* 메인 콘텐츠 */}
      <div className="col-span-9 flex flex-col overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 ml-3 mt-[12px]">친구 목록</h2>
        <div className="overflow-hidden bg-white p-6 rounded-xl shadow-sm mt-[15px]">
        <div
          className="grid grid-cols-2 gap-4 h-[550px] overflow-y-auto
            [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {users.map(user => (
            <UserItem key={user.id} user={user} onDelete={handleDeleteUser} />
          ))}
        </div>
        </div>
      </div>
    </div>
  </div>
</main>

    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-500">
          <span className="font-bold">(로고) Haru</span> |{' '}
          <a className="hover:underline" href="#">
            Policy
          </a>
        </div>
      </div>
    </footer>
  </div>
);
};

export default FriendList;