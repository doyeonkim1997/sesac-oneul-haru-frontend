// 프로필 섹션 컴포넌트
import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getImageUrl, getNickName } from '../../api/axiosInstance';

const ProfileSection: React.FC = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(getImageUrl());
  const [nickName, setNickName] = useState(getNickName());

  // 실시간 상태 동기화
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedImageUrl = getImageUrl();
      const updatedNickName = getNickName();

      if (updatedImageUrl && updatedImageUrl !== imageUrl) {
        setImageUrl(updatedImageUrl);
      }
      if (updatedNickName && updatedNickName !== nickName) {
        setNickName(updatedNickName);
      }
    }, 1000); // 1초마다 체크

    return () => clearInterval(interval);
  }, [imageUrl, nickName]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
      <img
        alt="프로필 이미지"
        className="h-32 w-32 rounded-full object-cover"
        src={import.meta.env.VITE_BACKEND_ADDRESS + imageUrl}
      />
      <p className="mt-4 text-xl font-bold text-gray-800 dark:text-white">{nickName}</p>
    </div>
  );
};

export default ProfileSection;
