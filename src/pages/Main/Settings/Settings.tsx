import React, { useState, useRef } from 'react';
import Header from '../../../components/ui/Header';
import ProfileSection from '../../../components/ui/ProfileSection';
import MenuSection from '../../../components/ui/MenuSection';
import CalendarSection from '../../../components/ui/Calendar';
import Footer from '../../../components/ui/Footer';
import { useUser } from '../../../contexts/UserContext';

const Settings: React.FC = () => {
  const { user, updateNickname, updatePassword, updateProfileImage, withdrawUser } = useUser();
  const isSocialUser = user.auth_type !== 'EMAIL';
  const [nickname, setNickname] = useState(user.nickname);
  const [tempProfileImage, setTempProfileImage] = useState(user.profileImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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
      // 파일 크기 검증 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setSelectedFile(file);

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
                <div className="mt-2"></div>
                {/* CalendarSection 컴포넌트 - 월간 캘린더 */}
                <CalendarSection />
              </div>
            </aside>

            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <div className="pt-16 space-y-6">
                  {/* 닉네임 및 비밀번호 설정 */}
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm ">
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
                        <div className={`w-full ${isSocialUser ? 'opacity-50' : ''}`}>
                          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                            닉네임 설정
                            {isSocialUser && (
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                소셜 로그인
                              </span>
                            )}
                          </h3>
                          {isSocialUser ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={nickname}
                                disabled
                                aria-label="닉네임 (변경 불가)"
                                className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              />
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                소셜 로그인 사용자는 닉네임을 변경할 수 없습니다.
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <input
                                type="text"
                                placeholder="닉네임을 입력해 주세요."
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                              />
                            </div>
                          )}
                        </div>

                        {/* 비밀번호 설정 */}
                        <div className={`w-full ${isSocialUser ? 'opacity-50' : ''}`}>
                          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                            비밀번호 설정
                            {isSocialUser && (
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                소셜 로그인
                              </span>
                            )}
                          </h3>
                          {isSocialUser ? (
                            <div className="space-y-2">
                              <div className="flex flex-col space-y-3">
                                <input
                                  type="password"
                                  value="••••••••"
                                  disabled
                                  aria-label="기존 비밀번호 (변경 불가)"
                                  className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                                <input
                                  type="password"
                                  value="••••••••"
                                  disabled
                                  aria-label="새 비밀번호 (변경 불가)"
                                  className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                                <input
                                  type="password"
                                  value="••••••••"
                                  disabled
                                  aria-label="새 비밀번호 확인 (변경 불가)"
                                  className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col space-y-3">
                              <input
                                type="password"
                                placeholder="기존 비밀번호를 입력해 주세요."
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                              />
                              <input
                                type="password"
                                placeholder="새 비밀번호를 입력해 주세요."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                              />
                              <input
                                type="password"
                                placeholder="새 비밀번호를 다시 입력해 주세요."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 전체 박스 중앙에 저장 버튼 */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={async () => {
                          setIsUploading(true);
                          try {
                            // 프로필 이미지가 선택된 경우에만 업데이트
                            if (selectedFile) {
                              const success = await updateProfileImage(selectedFile);
                              if (success) {
                                setSelectedFile(null);
                              }
                            }

                            // 소셜 로그인 사용자가 아닌 경우에만 닉네임/비밀번호 업데이트
                            if (!isSocialUser) {
                              handleNicknameUpdate();
                              if (currentPassword && newPassword) {
                                await handlePasswordUpdate();
                              }
                            }
                          } catch (error) {
                            console.error('저장 중 오류:', error);
                            alert('저장 중 오류가 발생했습니다.');
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        disabled={isUploading}
                        className={`w-32 py-2 font-medium rounded-lg transition-colors text-sm ${
                          isUploading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-sky-400 hover:bg-sky-500 text-white'
                        }`}
                      >
                        {isUploading ? '업로드 중...' : '저장'}
                      </button>
                    </div>
                  </div>

                  {/* 회원 탈퇴.. */}
                  <div className="bg-white dark:bg-gray-800 p-8 pb-16 rounded-xl shadow-sm">
                    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto pt-4">
                      <div className="w-full">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                          회원 탈퇴
                        </h3>
                        
                        <div className="flex flex-col space-y-4 items-center">
                          <input
                            type="password"
                            placeholder="비밀번호를 입력해 주세요."
                            value={withdrawPassword}
                            onChange={(e) => setWithdrawPassword(e.target.value)}
                            className="w-[450px] h-8 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                          *회원 탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                          </p>
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => setWithdrawPassword('')}
                              className="w-32 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
                            >
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
