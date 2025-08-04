import React, { useState, useEffect } from 'react';
import Header from '../../../components/ui/Header';
import CalendarSection from '../../../components/ui/Calendar';
import MenuSection from '../../../components/ui/MenuSection';
import ProfileSection from '../../../components/ui/ProfileSection';
import Footer from '../../../components/ui/Footer';
import UserItem, { type User } from '../../../components/friends/UserItem';
import FriendProfileModal from '../../../components/modals/FriendProfileModal';
import { useAuth } from '../../../contexts/AuthContext';
import { deleteFriend, fetchFriends, getFriendProfile } from '../../../api/Friend'; // 👈 getFriendProfile 추가
import Toast from '../../../components/ui/Toast';

const FriendList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { email: userId } = useAuth();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
      console.log('토스트 호출:', message);

    setToast({ message, type });
  };

  useEffect(() => {
    async function loadFriends() {
      setLoading(true);
      try {
        const friendList = await fetchFriends();
        setUsers(friendList);
        setError(null);
      } catch (err) {
        setError('친구 목록을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFriends();
  }, [userId]);

  const handleNicknameClick = async (user: User) => {
    try {
      const latestUser = await getFriendProfile(user.userId);
      if (!latestUser.requestId) {
        latestUser.requestId = user.requestId;  // 기존 requestId 복사
      }
      setSelectedUser(latestUser);
      setIsModalOpen(true);
    } catch (err) {
      console.error('프로필 불러오기 실패:', err);
      alert('프로필 정보를 불러오는 데 실패했습니다.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (requestId: number) => {
      console.log('삭제 요청 requestId:', requestId);

    try {
      await deleteFriend(requestId); // API 호출
      showToast('친구가 삭제되었습니다.', 'success');
      setUsers(prev => prev.filter(user => user.requestId !== requestId));
      closeModal(); // 모달 닫기
    } catch (err) {
      showToast('친구 삭제에 실패했습니다. 다시 시도해주세요.', 'error');
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
              <div className="overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mt-16 h-[878px]">
                {users.length === 0 ? (
                  <div className="text-center text-gray-600 text-lg whitespace-pre-line p-6">
                    {`아직 친구가 없어요.\n친구 찾기 기능을 이용해 새로운 친구를 만나 보세요!`}
                  </div>
                ) : (
                  <>
                    <div
                      className="grid grid-cols-2 gap-x-4 gap-y-4 overflow-y-auto
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
                  </>
                )}
                {toast && (
                  <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
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