import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import CalendarSection from '../../components/ui/Calendar';
import MenuSection from '../../components/ui/MenuSection';
import ProfileSection from '../../components/ui/ProfileSection';
import GoalCard from '../../components/ui/GoalCard';
import Footer from '../../components/ui/Footer';
import { useApiGoals } from '../../contexts/ApiGoalContext';
import { useNavigate } from 'react-router-dom';

const MainHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'friends'>('all');
  const { goals: allGoals, myGoals, friendGoals } = useApiGoals();

  const navigate = useNavigate();

  // 필터에 따른 목표 데이터 (전체탭에서 내 오늘 목표 하나만 최상단 고정)
  const goals = useMemo(() => {
    let filteredGoals;

    switch (activeFilter) {
      case 'all': {
        const today = new Date().toDateString();

        const todayMyGoal = myGoals.find(
          (goal) => new Date(goal.createdAt).toDateString() === today
        );

        const otherGoals = [
          ...myGoals.filter((goal) => new Date(goal.createdAt).toDateString() !== today),
          ...friendGoals,
        ];

        const sortedOtherGoals = otherGoals.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        filteredGoals = todayMyGoal ? [todayMyGoal, ...sortedOtherGoals] : sortedOtherGoals;

        break;
      }
      case 'my':
        filteredGoals = [...myGoals].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'friends':
        filteredGoals = [...friendGoals].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        filteredGoals = myGoals;
    }

    if (searchTerm.trim()) {
      filteredGoals = filteredGoals.filter(
        (goal) =>
          goal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          goal.nickName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredGoals;
  }, [activeFilter, searchTerm, myGoals, friendGoals]);

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
                <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-[550px] max-h-[1096px]">
                  <div className="space-y-4 pt-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {goals.map((goal) => {
                      const goalWithUser = {
                        goal: {
                          goal_id: goal.goalId,
                          user_id: goal.userId ?? goal.goalId,
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
                          user_id: goal.userId ?? goal.goalId,
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
                      return <GoalCard key={goal.goalId} goalWithUser={goalWithUser} />;
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

export default MainHome;