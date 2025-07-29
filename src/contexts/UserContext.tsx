import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  user_id: number;
  nickname: string;
  email: string;
  profileImage: string;
  password: string;
  auth_type: 'EMAIL' | 'GOOGLE' | 'KAKAO' | 'NAVER';
}

interface UserContextType {
  user: User;
  updateNickname: (newNickname: string) => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  updateProfileImage: (file: File) => Promise<boolean>;
  withdrawUser: (password: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return {
      user_id: 1,
      nickname: '닉네임',
      email: 'user@example.com',
      profileImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE',
      password: 'password123',
      auth_type: 'EMAIL', // 개발용: 이메일 가입 사용자로 설정 (테스트 후 'GOOGLE'로 변경)
    };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateNickname = (newNickname: string) => {
    if (user.auth_type !== 'EMAIL') {
      alert('소셜 로그인 사용자는 닉네임을 변경할 수 없습니다.');
      return;
    }

    if (newNickname.trim()) {
      setUser((prev) => ({ ...prev, nickname: newNickname.trim() }));
      alert('회원 정보가 정상적으로 수정되었습니다');
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (user.auth_type !== 'EMAIL') {
      alert('소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.');
      return false;
    }

    if (currentPassword !== user.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (newPassword.length < 6) {
      alert('새 비밀번호는 6자 이상이어야 합니다.');
      return false;
    }

    setUser((prev) => ({ ...prev, password: newPassword }));
    alert('회원 정보가 정상적으로 수정되었습니다');
    return true;
  };

  const updateProfileImage = async (file: File): Promise<boolean> => {
    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('profileImage', file);

      // Axios를 사용하여 이미지 업로드
      const response = await axios.post('/api/user/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const imageUrl = response.data.imageUrl;
        setUser((prev) => ({ ...prev, profileImage: imageUrl }));
        alert('프로필 이미지가 성공적으로 변경되었습니다');
        return true;
      } else {
        alert('이미지 업로드에 실패했습니다');
        return false;
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);

      // 개발 환경에서는 로컬 스토리지에 저장하는 방식으로 fallback
      if (import.meta.env.DEV) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setUser((prev) => ({ ...prev, profileImage: imageUrl }));
        };
        reader.readAsDataURL(file);
        return true;
      }

      alert('이미지 업로드 중 오류가 발생했습니다');
      return false;
    }
  };

  const withdrawUser = async (password: string): Promise<boolean> => {
    if (password !== user.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (window.confirm('정말로 회원 탈퇴하시겠습니까? 모든 데이터가 영구적으로 삭제됩니다.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('darkMode');
      localStorage.removeItem('goals');
      localStorage.removeItem('bookmarks');

      window.location.href = '/login';
      return true;
    }
    return false;
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
