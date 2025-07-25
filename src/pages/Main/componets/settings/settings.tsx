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
  const [isGoalMenuOpen, setIsGoalMenuOpen] = useState(true);
  const [isFriendMenuOpen, setIsFriendMenuOpen] = useState(true);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(true);

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

const Settings: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');

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
              <div className="flex-1 overflow-y-auto">
                <div className="pt-32 space-y-6">
                  {/* 닉네임 및 비밀번호 설정 */}
                  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-start space-x-8 justify-center">
                      {/* 프로필 이미지 영역 */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 border-2 border-gray-300 border-dashed rounded-full flex items-center justify-center bg-gray-50">
                          <span className="text-gray-500 text-sm">이미지</span>
                        </div>
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
                          프로필 이미지 설정
                        </button>
                      </div>

                      {/* 설정 폼 */}
                      <div className="flex flex-col items-center space-y-6 flex-1 max-w-md">
                        {/* 닉네임 설정 */}
                        <div className="w-full">
                          <h3 className="text-base font-semibold text-gray-800 mb-3">
                            닉네임 설정
                          </h3>
                          <div className="flex items-center">
                            <input
                              type="text"
                              placeholder="닉네임을 입력해 주세요."
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                              className="flex-1 h-8 px-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg text-sm transition-colors">
                              수정
                            </button>
                          </div>
                        </div>

                        {/* 비밀번호 설정 */}
                        <div className="w-full">
                          <h3 className="text-base font-semibold text-gray-800 mb-3">
                            비밀번호 설정
                          </h3>
                          <div className="flex flex-col space-y-3">
                            <input
                              type="password"
                              placeholder="기존 비밀번호를 입력해 주세요."
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full h-8 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <input
                              type="password"
                              placeholder="새 비밀번호를 입력해 주세요."
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full h-8 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <div className="flex items-center">
                              <input
                                type="password"
                                placeholder="새 비밀번호를 다시 입력해 주세요."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="flex-1 h-8 px-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg text-sm transition-colors">
                                수정
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 전체 박스 중앙에 저장 버튼 */}
                    <div className="flex justify-center mt-6">
                      <button className="w-32 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm">
                        저장
                      </button>
                    </div>
                  </div>

                  {/* 회원 탈퇴 */}
                  <div className="bg-white p-8 pb-16 rounded-xl shadow-md border border-gray-200">
                    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto pt-4">
                      <div className="w-full">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">회원 탈퇴</h3>
                        <div className="flex flex-col space-y-4">
                          <input
                            type="password"
                            placeholder="비밀번호를 입력해 주세요."
                            value={withdrawPassword}
                            onChange={(e) => setWithdrawPassword(e.target.value)}
                            className="w-full h-8 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                          <div className="flex justify-center space-x-3">
                            <button className="w-32 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                              취소
                            </button>
                            <button className="w-32 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium">
                              탈퇴
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span className="font-bold">Haru</span>
            </div>
            <div className="flex space-x-6">
              <a className="hover:underline" href="#">
                연락처
              </a>
              <a className="hover:underline" href="#">
                정책
              </a>
              <a className="hover:underline" href="#">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
