import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  user_id: number;
  nickname: string;
  email: string;
  profileImage: string;
  password: string;
}

interface UserContextType {
  user: User;
  updateNickname: (newNickname: string) => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  updateProfileImage: (imageUrl: string) => void;
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
    };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateNickname = (newNickname: string) => {
    if (newNickname.trim()) {
      setUser((prev) => ({ ...prev, nickname: newNickname.trim() }));
      alert('회원 정보가 정상적으로 수정되었습니다');
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
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

  const updateProfileImage = (imageUrl: string) => {
    setUser((prev) => ({ ...prev, profileImage: imageUrl }));
    alert('프로필 이미지가 변경되었습니다');
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

      window.location.href = '/';
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
