// 프로필 섹션 컴포넌트
import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getImageUrl, getNickName, getTier } from '../../api/axiosInstance';
import TierMedal from './TierMedal';

const ProfileSection: React.FC = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(getImageUrl());
  const [nickName, setNickName] = useState(getNickName());
  const [userTier, setUserTier] = useState(getTier());

  // 실시간 상태 동기화
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedImageUrl = getImageUrl();
      const updatedNickName = getNickName();
      const updatedTier = getTier();

      if (updatedImageUrl && updatedImageUrl !== imageUrl) {
        setImageUrl(updatedImageUrl);
      }
      if (updatedNickName && updatedNickName !== nickName) {
        setNickName(updatedNickName);
      }
      if (updatedTier && updatedTier !== userTier) {
        setUserTier(updatedTier);
      }
    }, 1000); // 1초마다 체크

    return () => clearInterval(interval);
  }, [imageUrl, nickName, userTier]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
      <img
        alt="프로필 이미지"
        className="h-32 w-32 rounded-full object-cover"
        src={import.meta.env.VITE_BACKEND_ADDRESS + imageUrl}
      />
      <div className="mt-4 flex items-center gap-2">
        <p className="text-xl font-bold text-gray-800 dark:text-white">{nickName}</p>
        <TierMedal tier={userTier || 'BRONZE'} size="sm" />
      </div>
    </div>
  );
};

export default ProfileSection;
