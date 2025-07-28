import React, { useState, useRef } from 'react';
import Header from '../../../components/ui/Header';
import ProfileSection from '../../../components/ui/ProfileSection';
import MenuSection from '../../../components/ui/MenuSection';
import DarkModeToggle from '../../../components/ui/DarkModeToggle';
import CalendarSection from '../../../components/ui/Calendar';
import Footer from '../../../components/ui/Footer';
import { useUser } from '../../../contexts/UserContext';

const Settings: React.FC = () => {
  const { user, updateNickname, updatePassword, updateProfileImage, withdrawUser } = useUser();
  const [nickname, setNickname] = useState(user.nickname);
  const [tempProfileImage, setTempProfileImage] = useState(user.profileImage);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임 수정 핸들러
  const handleNicknameUpdate = () => {
    updateNickname(nickname);
  };

  // 비밀번호 수정 핸들러
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const success = await updatePassword(currentPassword, newPassword);
    if (success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setTempProfileImage(imageUrl); // 임시 상태로 저장
      };
      reader.readAsDataURL(file);
    }
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    await withdrawUser(withdrawPassword);
  };

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
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-8 justify-center">
                      {/* 프로필 이미지 영역 */}
                      <div className="flex flex-col items-center space-y-4 mt-16 -ml-8">
                        <div className="w-24 h-24 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-hidden">
                          {tempProfileImage ? (
                            <img
                              src={tempProfileImage}
                              alt="프로필"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm">이미지</span>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                          aria-label="프로필 이미지 선택"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
                        >
                          프로필 이미지 설정
                        </button>
                      </div>

                      {/* 설정 폼 */}
                      <div className="flex flex-col items-center space-y-6 flex-1 max-w-md">
                        {/* 닉네임 설정 */}
                        <div className="w-full">
                          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                            닉네임 설정
                          </h3>
                          <div className="flex items-center">
                            <input
                              type="text"
                              placeholder="닉네임을 입력해 주세요."
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                              className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
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
                            <input
                              type="password"
                              placeholder="새 비밀번호를 다시 입력해 주세요."
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full h-8 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 전체 박스 중앙에 저장 버튼 */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => {
                          // 프로필 이미지가 변경된 경우에만 업데이트
                          if (tempProfileImage !== user.profileImage) {
                            updateProfileImage(tempProfileImage);
                          }
                          handleNicknameUpdate();
                          if (currentPassword && newPassword) {
                            handlePasswordUpdate();
                          }
                        }}
                        className="w-32 py-2 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg transition-colors text-sm"
                      >
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
                            <button
                              onClick={handleWithdraw}
                              className="w-32 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-colors text-sm font-medium"
                            >
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
