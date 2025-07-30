import React, { useState } from 'react';
import Header from '../../../components/ui/Header';
import CalendarSection from '../../../components/ui/Calendar';
import MenuSection from '../../../components/ui/MenuSection';
import ProfileSection from '../../../components/ui/ProfileSection';
import Footer from '../../../components/ui/Footer';
import UserItem from '../../../components/friends/UserItem';
import type { User } from '../../../components/friends/UserItem';
import FriendProfileModal from '../../../components/modals/FriendProfileModal';

import { DUMMY_USERS } from '../../../data/users';

const FriendList: React.FC = () => {
  const handleDeleteUser = (id: string) => {
    console.log(`(화면 구현용) 사용자 ID ${id} 삭제 요청`);
  };

  const half = Math.ceil(DUMMY_USERS.length / 2);
  const leftColumnUsers = DUMMY_USERS.slice(0, half);
  const rightColumnUsers = DUMMY_USERS.slice(half);

  const users = [...leftColumnUsers, ...rightColumnUsers];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNicknameClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
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
                <div className="mt-6"></div>
                {/* CalendarSection 컴포넌트 - 월간 캘린더 */}
                <CalendarSection />
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
                    <UserItem
                      key={user.id}
                      user={user}
                      onDelete={handleDeleteUser}
                      onNicknameClick={handleNicknameClick}
                    />
                  ))}
                </div>
                {/* 모달 */}
                {isModalOpen && selectedUser && (
                  <FriendProfileModal user={selectedUser} onClose={closeModal} />
                )}
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
