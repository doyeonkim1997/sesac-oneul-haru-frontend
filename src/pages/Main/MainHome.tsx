import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CalendarSection from '../../components/ui/Calendar';
import MenuSection from '../../components/ui/MenuSection';
import ProfileSection from '../../components/ui/ProfileSection';
import GoalCard from '../../components/ui/GoalCard';
import Footer from '../../components/ui/Footer';
import { useGoals } from '../../contexts/GoalContext';
import axiosInstance, { setAccessToken } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MainHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'friends'>('all');
  const { goals: allGoals } = useGoals();

  const navigate = useNavigate();

  // 필터에 따른 목표 데이터
  const goals = useMemo(() => {
    let filteredGoals;
    switch (activeFilter) {
      case 'all':
        // 전체 탭: 내 목표를 맨 위에, 친구 목표를 그 아래에 배치
        const myGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id === 1);
        const friendsGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id !== 1);
        filteredGoals = [...myGoals, ...friendsGoals];
        break;
      case 'my':
        filteredGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id === 1);
        break;
      case 'friends':
        // 친구들의 목표 (내가 작성하지 않은 목표)
        filteredGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id !== 1);
        break;
      default:
        filteredGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id === 1);
    }

    // 검색어 필터링
    if (searchTerm.trim()) {
      filteredGoals = filteredGoals.filter(
        (goalWithUser) =>
          goalWithUser.goal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          goalWithUser.user.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filteredGoals;
  }, [activeFilter, searchTerm, allGoals]);

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
                      onClick={() => setActiveFilter('all')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeFilter === 'all'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      전체
                      {activeFilter === 'all' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveFilter('my')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeFilter === 'my'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      나
                      {activeFilter === 'my' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveFilter('friends')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeFilter === 'friends'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      친구
                      {activeFilter === 'friends' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 dark:border-gray-600 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 목표 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-[550px] max-h-[1096px]">
                  <div className="space-y-4 pt-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {/* GoalCard 컴포넌트들 - 개별 목표 카드들 (프로필, 내용, 태그, 완료 상태 등) */}
                    {goals.map((goalWithUser) => (
                      <GoalCard key={goalWithUser.goal.goal_id} goalWithUser={goalWithUser} />
                    ))}
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

export default MainHome;
