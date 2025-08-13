import React, { useState, useMemo } from 'react';
import Header from '../../../components/ui/Header';
import ProfileSection from '../../../components/ui/ProfileSection';
import MenuSection from '../../../components/ui/MenuSection';
import CalendarSection from '../../../components/ui/Calendar';
import Footer from '../../../components/ui/Footer';
import GoalCard from '../../../components/ui/GoalCard';
import { useApiGoals } from '../../../contexts/ApiGoalContext';

const BookmarkList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'friends'>('my'); // 기본값을 내 북마크로 설정
  const { myGoals, friendGoals, bookmarks } = useApiGoals();

  // 탭에 따른 북마크된 목표 데이터
  const goals = useMemo(() => {
    let filteredGoals: any[] = [];

    // 탭에 따른 필터링
    if (activeTab === 'my') {
      // 내 목표 중 북마크된 것들
      filteredGoals = myGoals.filter((goal) =>
        bookmarks.some((bookmark) => bookmark.goalId === goal.goalId),
      );
    } else {
      // 친구 목표 중 북마크된 것들
      filteredGoals = friendGoals.filter((goal) =>
        bookmarks.some((bookmark) => bookmark.goalId === goal.goalId),
      );
    }

    return filteredGoals;
  }, [activeTab, myGoals, friendGoals, bookmarks]);

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
                <div className="mt-2"></div>
                {/* CalendarSection 컴포넌트 - 월간 캘린더 */}
                <CalendarSection />
              </div>
            </aside>
            <div className="col-span-9 flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 flex-shrink-0 mt-2">
                <div className="flex justify-center">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab('my')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeTab === 'my'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      내 북마크
                      {activeTab === 'my' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('friends')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeTab === 'friends'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      친구 북마크
                      {activeTab === 'friends' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 dark:border-gray-600 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 북마크 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-[550px] max-h-[877px]">
                  <div className="space-y-4 pt-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {/* GoalCard 컴포넌트들 - 북마크된 목표 카드들 */}
                    {goals.map((goal) => {
                      const goalWithUser = {
                        goal: {
                          goal_id: goal.goalId,
                          user_id: goal.goalId, // 임시로 goalId 사용
                          title: goal.content,
                          content: goal.content,
                          category: goal.category,
                          is_completed: goal.isCompleted,
                          is_deleted: false,
                          cheer_count: goal.cheerCount || 0,
                          created_at: goal.createdAt,
                          updated_at: goal.updatedAt,
                        },
                        user: {
                          user_id: goal.goalId, // 임시로 goalId 사용
                          nickname: goal.nickName || '사용자',
                          email: 'user@example.com',
                          auth_type: 'EMAIL',
                          tier: 'BRONZE',
                          created_at: goal.createdAt,
                          profileImage: goal.imageUrl
                            ? import.meta.env.VITE_BACKEND_ADDRESS + goal.imageUrl
                            : 'https://via.placeholder.com/150',
                        },
                      };
                      return (
                        <GoalCard
                          key={goal.goalId}
                          goalWithUser={goalWithUser}
                          isBookmarkMode={true}
                          disableExpiredEffect={true}
                        />
                      );
                    })}
                  </div>
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

export default BookmarkList;
