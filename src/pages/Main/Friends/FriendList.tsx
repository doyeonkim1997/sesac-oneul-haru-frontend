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

import { deleteFriend } from '../../../api/Friend';

const FriendList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { email: userId } = useAuth();

  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      try {
        const res = await axiosInstance.get<User[]>(`/friend/friends`);
        console.log('친구 목록 응답:', res.data);
        const friendList = res.data.map((friend: any) => ({
          userId: Number(friend.userId),
          requestId: Number(friend.requestId),
          nickName: friend.nickName,
          email: friend.email,
          image: {
            imageUrl: friend.imageUrl || '',
          },
        }));
        setUsers(friendList);
        setError(null);
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

const handleDeleteUser = async (requestId: number) => {
  try {
    await deleteFriend(requestId);
    alert('친구가 삭제되었습니다.');
    setUsers((prevUsers) => prevUsers.filter(user => user.requestId !== requestId));
    closeModal();
  } catch (err) {
    alert('친구 삭제에 실패했습니다. 다시 시도해주세요.');
    console.error(err);
  }
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