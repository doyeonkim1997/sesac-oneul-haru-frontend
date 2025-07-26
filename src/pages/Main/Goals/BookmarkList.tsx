import React, { useState } from 'react';
import ProfileSection from '../../../componets/ui/ProfileSection';
import MenuSection from '../../../componets/ui/MenuSection';
import DarkModeToggle from '../../../componets/ui/DarkModeToggle';
import CalendarSection from '../../../componets/ui/Calendar';
import Footer from '../../../componets/ui/Footer';
import GoalCard from '../../../componets/ui/GoalCard';
import { getMyBookmarkedGoals, getFriendsBookmarkedGoals } from '../../../data/goals';

const BookmarkList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'my' | 'friends'>('friends'); // 기본값을 친구 북마크로 설정

  // 탭에 따른 북마크된 목표 데이터
  const goals = activeTab === 'my' ? getMyBookmarkedGoals() : getFriendsBookmarkedGoals();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden">
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a className="flex items-center space-x-2" href="#">
                <span className="material-icons text-blue-500 text-3xl">task_alt</span>
                <span className="text-xl font-bold text-gray-900">Haru</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">people</span>
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">favorite_border</span>
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>
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
              <div className="bg-gray-50 flex-shrink-0">
                <div className="flex justify-center">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab('my')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white ${
                        activeTab === 'my'
                          ? 'text-gray-900 font-bold'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      내 북마크
                      {activeTab === 'my' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('friends')}
                      className={`relative px-6 py-4 text-base font-medium transition-colors hover:bg-white ${
                        activeTab === 'friends'
                          ? 'text-gray-900 font-bold'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      친구 북마크
                      {activeTab === 'friends' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
                      )}
                    </button>
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 검색바 공간 */}
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex justify-end">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="북마크 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 h-10 px-4 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons text-sky-400 text-sm">search</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 북마크 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 max-h-[calc(100vh-20rem)]">
                  <div className="space-y-4 pt-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-300">
                    {/* GoalCard 컴포넌트들 - 북마크된 목표 카드들 */}
                    {goals.map((goalWithUser) => (
                      <GoalCard
                        key={goalWithUser.goal.goal_id}
                        goalWithUser={goalWithUser}
                        isBookmarkMode={true}
                      />
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

export default BookmarkList;
