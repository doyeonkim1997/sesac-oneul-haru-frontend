import React, { useState, useMemo } from 'react';
import Header from '../../../componets/ui/Header';
import ProfileSection from '../../../componets/ui/ProfileSection';
import MenuSection from '../../../componets/ui/MenuSection';
import DarkModeToggle from '../../../componets/ui/DarkModeToggle';
import CalendarSection from '../../../componets/ui/Calendar';
import Footer from '../../../componets/ui/Footer';
import GoalCard from '../../../componets/ui/GoalCard';
import { useGoals } from '../../../contexts/GoalContext';

const GoalList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'incomplete' | 'completed'>('all');
  const { goals: allGoals } = useGoals();

  // 필터에 따른 목표 데이터 (내 목표만)
  const goals = useMemo(() => {
    // 내 목표만 필터링 (user_id === 1)
    let filteredGoals = allGoals.filter((goalWithUser) => goalWithUser.goal.user_id === 1);

    // 완료 상태에 따른 필터링
    switch (activeFilter) {
      case 'all':
        // 전체: 내 목표 모두 (변경 없음)
        break;
      case 'incomplete':
        // 미완료: 완료되지 않은 목표만
        filteredGoals = filteredGoals.filter((goalWithUser) => !goalWithUser.goal.is_completed);
        break;
      case 'completed':
        // 완료: 완료된 목표만
        filteredGoals = filteredGoals.filter((goalWithUser) => goalWithUser.goal.is_completed);
        break;
      default:
        break;
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
            <div className="col-span-9 flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-900 flex-shrink-0">
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
                      onClick={() => setActiveFilter('incomplete')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeFilter === 'incomplete'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      미완료
                      {activeFilter === 'incomplete' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveFilter('completed')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white dark:hover:bg-gray-800 ${
                        activeFilter === 'completed'
                          ? 'text-gray-900 dark:text-white font-bold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      완료
                      {activeFilter === 'completed' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 dark:border-gray-600 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 검색바 공간 */}
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex justify-end">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="목표 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 h-10 px-4 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons text-sky-400 text-sm">search</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 목표 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 max-h-[calc(100vh-20rem)]">
                  <div className="space-y-4 pt-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-300">
                    {/* GoalCard 컴포넌트들 - 개별 목표 카드들 */}
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

export default GoalList;
