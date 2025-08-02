import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';

import Header from '../../../components/ui/Header';
import CalendarSection from '../../../components/ui/Calendar';
import MenuSection from '../../../components/ui/MenuSection';
import ProfileSection from '../../../components/ui/ProfileSection';
import Footer from '../../../components/ui/Footer';
import UserItem, { type User } from '../../../components/friends/UserItem';
import FriendProfileModal from '../../../components/modals/FriendProfileModal';

import { useAuth } from '../../../contexts/AuthContext';

const FriendList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { email: userId } = useAuth();

  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/friend/friends`);
        // API 응답 구조에 맞게
        const friendList = res.data.map((friend: any) => ({
          userId: String(friend.userId),
          nickName: friend.nickName,
          email: friend.email,
          imageUrl: friend.image?.imageUrl,
        }));
        setUsers(friendList);

        console.log(res.data)

      } catch (err) {
        setError('친구 목록을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFriends();
  }, [userId]);

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

  const handleDeleteUser = (id: string) => {
    console.log(`사용자 ID ${id} 삭제 요청`);
    // TODO: 삭제 API 호출 후 상태 갱신 처리
    setUsers(users.filter(user => user.userId !== id));
    // 모달 닫기
    closeModal();
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="pt-16"></div>
                <ProfileSection />
                <div className="mt-6"></div>
                <MenuSection />
                <div className="mt-2"></div>
                <CalendarSection />
              </div>
            </aside>

            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mt-16 h-[803px]">
                <div
                  className="grid grid-cols-2 h-[100%] overflow-y-auto
                    [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {users.map(user => (
                    <UserItem
                      key={user.userId}
                      user={user}
                      onDelete={handleDeleteUser}
                      onNickNameClick={handleNicknameClick}
                    />
                  ))}
                </div>

                {isModalOpen && selectedUser && (
                  <FriendProfileModal
                    user={selectedUser}
                    onClose={closeModal}
                    onDelete={handleDeleteUser}
                  />
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