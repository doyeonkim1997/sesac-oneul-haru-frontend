import React, { useState } from 'react';

// 프로필 섹션 컴포넌트
const ProfileSection: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
      <img
        alt="프로필 이미지"
        className="h-24 w-24 rounded-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE"
      />
      <p className="mt-4 text-xl font-bold text-gray-800">닉네임</p>
      <p className="mt-3 text-sm font-medium text-gray-600 text-center leading-relaxed">
        아침 햇살 + 따뜻한 커피 = 내 하루의 시작 🌞☕
      </p>
    </div>
  );
};

// 메뉴 섹션 컴포넌트
const MenuSection: React.FC = () => {
  const [isGoalMenuOpen, setIsGoalMenuOpen] = useState(false);
  const [isFriendMenuOpen, setIsFriendMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <nav className="space-y-1">
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-blue-500 hover:bg-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsGoalMenuOpen(!isGoalMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">list_alt</span>
              <span>내 목표 관리</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isGoalMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isGoalMenuOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>목표 목록 조회</span>
              </a>
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>북마크</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-blue-500 hover:bg-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsFriendMenuOpen(!isFriendMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">people</span>
              <span>친구 관리</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isFriendMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isFriendMenuOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>친구 목록</span>
              </a>
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>친구 요청 관리</span>
              </a>
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>친구 찾기</span>
              </a>
            </div>
          )}
        </div>
        <div>
          <button
            className="flex items-center justify-between w-full text-left space-x-3 text-white bg-blue-500 hover:bg-blue-600 px-3 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-lg">settings</span>
              <span>설정</span>
            </div>
            <span
              className={`material-icons transition-transform text-sm ${isSettingsMenuOpen ? 'rotate-180' : ''}`}
            >
              expand_more
            </span>
          </button>
          {isSettingsMenuOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <a
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors"
                href="#"
              >
                <span>회원 정보 수정</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

// 다크모드 토글 컴포넌트
const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
      title="라이트/다크모드 토글"
    >
      <span className="material-icons text-sm text-gray-600">
        {isDarkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

// 캘린더 섹션 컴포넌트
const CalendarSection: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button className="text-gray-500 hover:text-gray-900">
          <span className="material-icons">chevron_left</span>
        </button>
        <h3 className="text-sm font-semibold">7월 2025</h3>
        <button className="text-gray-500 hover:text-gray-900">
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        <div className="text-gray-500">일</div>
        <div className="text-gray-500">월</div>
        <div className="text-gray-500">화</div>
        <div className="text-gray-500">수</div>
        <div className="text-gray-500">목</div>
        <div className="text-gray-500">금</div>
        <div className="text-gray-500">토</div>
        <div className="text-gray-400"></div>
        <div className="text-gray-400"></div>
        <div className="p-1">
          <span className="cursor-pointer">1</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">2</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">4</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">5</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">6</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            7
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">8</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">9</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">10</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            11
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">12</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">13</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">14</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
            15
          </span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            16
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">17</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">18</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">19</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">20</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            21
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">22</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">23</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">24</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">25</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">26</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">27</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">28</span>
        </div>
        <div className="p-1">
          <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            29
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">30</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">31</span>
        </div>
      </div>
    </div>
  );
};

const GoalList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [goalStatuses, setGoalStatuses] = useState<{ [key: number]: boolean }>({
    0: false,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [openMoreMenu, setOpenMoreMenu] = useState<number | null>(null);

  const tabs = ['전체', '미완료', '완료'];

  const toggleGoalStatus = (goalId: number) => {
    setGoalStatuses((prev) => ({
      ...prev,
      [goalId]: !prev[goalId],
    }));
  };

  const toggleMoreMenu = (goalId: number) => {
    setOpenMoreMenu(openMoreMenu === goalId ? null : goalId);
  };

  // 더미 목표 데이터
  const goals = [
    {
      id: 1,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 5,
      isCompleted: false,
    },
    {
      id: 2,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 3,
      isCompleted: true,
    },
    {
      id: 3,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 7,
      isCompleted: false,
    },
    {
      id: 4,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 2,
      isCompleted: false,
    },
    {
      id: 5,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 4,
      isCompleted: true,
    },
    {
      id: 6,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 6,
      isCompleted: false,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden">
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
        <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full space-y-6">
                <div className="pt-8"></div>
                <ProfileSection />
                <MenuSection />
                <div className="flex-grow"></div>
                <div className="flex justify-end mb-2">
                  <DarkModeToggle />
                </div>
                <CalendarSection />
              </div>
            </aside>
            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="bg-gray-50 flex-shrink-0">
                <div className="flex justify-center">
                  <nav className="flex">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab}
                        className={`relative px-6 py-4 text-base font-medium transition-colors ${
                          index === 0
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        {tab}
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 검색바 공간 - 여백으로 대체 */}
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex justify-end">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="검색어를 입력해주세요."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 h-10 px-4 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons text-gray-400 text-sm">search</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 목표 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-300">
                    {goals.map((goal, index) => (
                      <div
                        key={goal.id}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                      >
                        <div className="flex items-start space-x-6 pl-2">
                          <img
                            alt={`${goal.nickname} 프로필 이미지`}
                            className="h-16 w-16 rounded-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJeSEHLf3AGAymfO0jRLhPhT6_Gf9bWxHc4AikLOBUGfgUobtBnAWz-dbumuqmgOJUOAj2pGwuoSDoCmfA18IOKqYAmtcpXAs0GIbeC912h6OuLKzerIYUA9SD0hrEROKTADA5ZAC3gaxiO0NOR7PHbU5Zqf43FRpsXBJ0hQw1U9XXvRmaZmxem-tjuz1vUTI7KmxzN7ZlRLkmhunSyqt0lznaE34Zl7ABqTnz0lgUDXfoVjFTZVGSEtDYwQi7tbkFJaAVff2k6mg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">@{goal.nickname}</span>
                                  <span className="text-xs text-gray-400">{goal.date}</span>
                                </div>
                                <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                  {goal.content}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                    #공부
                                  </span>
                                  <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                    #업무
                                  </span>
                                </div>
                              </div>
                              <div className="relative flex items-center space-x-2">
                                <button className="text-gray-400 hover:text-yellow-500">
                                  <span className="material-icons">bookmark_border</span>
                                </button>
                                <button
                                  onClick={() => toggleMoreMenu(index)}
                                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                >
                                  <span className="material-icons">more_horiz</span>
                                </button>
                                {openMoreMenu === index && (
                                  <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                      수정
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">
                                      삭제
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-base font-medium text-gray-700">
                              {goalStatuses[index] ? '완료' : '미완료'}
                            </span>
                            <button
                              onClick={() => toggleGoalStatus(index)}
                              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                goalStatuses[index] ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                  goalStatuses[index] ? 'translate-x-7' : 'translate-x-1'
                                }`}
                              ></span>
                            </button>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                            <span className="material-icons">favorite_border</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-gray-500">
            <span className="font-bold">(로고) Haru</span> |{' '}
            <a className="hover:underline" href="#">
              Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoalList;
