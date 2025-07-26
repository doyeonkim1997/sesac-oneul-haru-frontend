import React, { useState } from 'react';
import ProfileSection from '../../../../componets/ui/ProfileSection';
import MenuSection from '../../../../componets/ui/MenuSection';
import DarkModeToggle from '../../../../componets/ui/DarkModeToggle';
import CalendarSection from '../../../../componets/ui/Calendar';
import Footer from '../../../../componets/ui/Footer';

const Settings: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');

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
                      <button className="w-32 py-2 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg transition-colors text-sm">
                        저장
                      </button>
                    </div>
                  </div>

                  {/* 회원 탈퇴 */}
                  <div className="bg-white p-8 pb-16 rounded-xl shadow-md border border-gray-200">
                    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto pt-4">
                      <div className="w-full">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">회원 탈퇴</h3>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                          회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                        </p>
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
                            <button className="w-32 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-colors text-sm font-medium">
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
      <Footer />
    </div>
  );
};

export default Settings;
