import React from 'react';
import CalendarSection from '../../../componets/ui/Calendar';
import DarkModeToggle from '../../../componets/ui/DarkModeToggle';
import MenuSection from '../../../componets/ui/MenuSection';
import ProfileSection from '../../../componets/ui/ProfileSection';
import Header from '../../../componets/ui/Header';
import UserItem from '../../../componets/friends/UserItem';

import { DUMMY_USERS } from '../../../data/users';

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
    <Header />
    
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

      {/* 메인 */}
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