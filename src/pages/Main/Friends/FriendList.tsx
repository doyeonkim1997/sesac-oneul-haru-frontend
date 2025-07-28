import React from 'react';
import Header from '../../../componets/ui/Header';
import CalendarSection from '../../../componets/ui/Calendar';
import DarkModeToggle from '../../../componets/ui/DarkModeToggle';
import MenuSection from '../../../componets/ui/MenuSection';
import ProfileSection from '../../../componets/ui/ProfileSection';
import Footer from '../../../componets/ui/Footer';
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="pt-16"></div>
                {/* ProfileSection 컴포넌트 - 프로필 이미지, 닉네임, 팔로워 정보 */}
                <ProfileSection />
                <div className="mt-6"></div>
                {/* MenuSection 컴포넌트 - 내 목표 관리, 친구 관리, 설정 메뉴 */}
                <MenuSection />
                <div className="h-[12rem]"></div>
                <div className="relative pt-8">
                  {/* DarkModeToggle 컴포넌트 - 다크모드/라이트모드 토글 버튼 (절대 위치) */}
                  <div className="absolute -top-4 right-0">
                    <DarkModeToggle />
                  </div>
                  {/* CalendarSection 컴포넌트 - 월간 캘린더 */}
                  <CalendarSection />
                </div>
              </div>
            </aside>

            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mt-16 h-[752px]">
                <div
                  className="grid grid-cols-2 h-[706px] overflow-y-auto
                    [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {users.map((user) => (
                    <UserItem key={user.id} user={user} onDelete={handleDeleteUser} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FriendList;
