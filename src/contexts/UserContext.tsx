import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getNickName,
  getImageUrl,
  setNickName,
  setImageUrl,
  getAuthType,
} from '../api/axiosInstance';
import { updateUserProfile } from '../api/updateUserProfile';
import { updateUserPassword } from '../api/updateUserPassword';
import { withdrawUser as apiWithdrawUser } from '../api/withdrawUser';
import { uploadImage } from '../api/uploadImage';

interface User {
  user_id: number;
  nickname: string;
  email: string;
  profileImage: string;
  auth_type: 'EMAIL' | 'GOOGLE' | 'KAKAO' | 'NAVER';
}

interface UserContextType {
  user: User;
  updateNickname: (newNickname: string) => Promise<boolean>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  updateProfileImage: (file: File) => Promise<boolean>;
  withdrawUser: (password: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { useUser };

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { accessToken, email, nickName, imageUrl, authType } = useAuth();
  const [user, setUser] = useState<User>({
    user_id: 0,
    nickname: '',
    email: '',
    profileImage: '',
    auth_type: 'EMAIL',
  });

  useEffect(() => {
    if (accessToken && email) {
      const currentNickName = nickName || getNickName();
      const currentImageUrl = imageUrl || getImageUrl();

      // authType을 더 강력하게 가져오기
      let currentAuthType = authType;
      if (!currentAuthType) {
        currentAuthType = getAuthType();
      }
      // 여전히 없으면 기본값 설정
      if (!currentAuthType) {
        currentAuthType = 'EMAIL';
      }

      console.log('🔄 UserContext 사용자 정보 업데이트:', {
        email,
        nickName: currentNickName,
        imageUrl: currentImageUrl,
        authType: currentAuthType,
        authTypeFromContext: authType,
        authTypeFromAxios: getAuthType(),
        isSocialUser: currentAuthType !== 'EMAIL',
        accessToken: accessToken ? '있음' : '없음',
      });

      setUser({
        user_id: 0, // TODO: 백엔드에서 userId를 제공하는 경우 사용
        nickname: currentNickName || '사용자',
        email: email,
        profileImage: currentImageUrl || '',
        auth_type: currentAuthType as 'EMAIL' | 'GOOGLE' | 'KAKAO' | 'NAVER',
      });
    } else {
      setUser({
        user_id: 0,
        nickname: '사용자',
        email: '',
        profileImage: '',
        auth_type: 'EMAIL',
      });
    }
  }, [accessToken, email, nickName, imageUrl, authType]);

  const updateNickname = async (newNickname: string): Promise<boolean> => {
    if (user.auth_type !== 'EMAIL') {
      alert('소셜 로그인 사용자는 닉네임을 변경할 수 없습니다.');
      return false;
    }
    if (!newNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    try {
      await updateUserProfile({ nickName: newNickname.trim() });
      setUser((prev) => ({ ...prev, nickname: newNickname.trim() }));
      setNickName(newNickname.trim()); // axiosInstance 글로벌 상태 업데이트
      alert('닉네임이 성공적으로 변경되었습니다.');
      return true;
    } catch (error: any) {
      console.error('닉네임 업데이트 실패:', error);
      alert(error.response?.data?.message || '닉네임 변경 중 오류가 발생했습니다.');
      return false;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (user.auth_type !== 'EMAIL') {
      alert('소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.');
      return false;
    }
    if (!currentPassword || !newPassword) {
      alert('모든 필드를 입력해주세요.');
      return false;
    }
    if (newPassword.length < 6) {
      alert('새 비밀번호는 6자 이상이어야 합니다.');
      return false;
    }
    try {
      await updateUserPassword({
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      return true;
    } catch (error: any) {
      console.error('비밀번호 업데이트 실패:', error);
      alert(error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      return false;
    }
  };

  const updateProfileImage = async (file: File): Promise<boolean> => {
    try {
      const result = await uploadImage(file);
      const fullImageUrl = import.meta.env.VITE_BACKEND_ADDRESS + result.imageUrl;

      setUser((prev) => ({ ...prev, profileImage: fullImageUrl }));
      setImageUrl(result.imageUrl); // axiosInstance 글로벌 상태 업데이트 (백엔드 주소 제외)
      alert('프로필 이미지가 성공적으로 변경되었습니다.');
      return true;
    } catch (error: any) {
      console.error('프로필 이미지 업데이트 실패:', error);
      alert(error.response?.data?.message || '프로필 이미지 변경 중 오류가 발생했습니다.');
      return false;
    }
  };

  const withdrawUser = async (password: string): Promise<boolean> => {
    // 실시간으로 authType 다시 확인
    const realTimeAuthType = getAuthType() || user.auth_type;

    console.log('🔍 회원 탈퇴 시도:', {
      userAuthType: user.auth_type,
      realTimeAuthType: realTimeAuthType,
      password: password,
      passwordLength: password.length,
      isEmailUser: realTimeAuthType === 'EMAIL',
      needPassword: realTimeAuthType === 'EMAIL' && !password,
    });

    // 이메일 사용자는 비밀번호 필요
    if (realTimeAuthType === 'EMAIL' && !password) {
      alert('비밀번호를 입력해주세요.');
      return false;
    }

    if (!window.confirm('정말로 회원 탈퇴하시겠습니까? 모든 데이터가 영구적으로 삭제됩니다.')) {
      return false;
    }

    try {
      // 사용자 타입에 따라 다른 API 호출
      if (realTimeAuthType === 'EMAIL') {
        // 이메일 사용자 - 비밀번호와 함께 호출
        await apiWithdrawUser(password);
      } else {
        // 소셜 사용자 - 비밀번호 없이 호출
        await apiWithdrawUser();
      }

      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/login';
      return true;
    } catch (error: any) {
      console.error('회원 탈퇴 실패:', error);
      alert(error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.');
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateNickname,
        updatePassword,
        updateProfileImage,
        withdrawUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
