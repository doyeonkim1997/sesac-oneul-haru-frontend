// 프로필 섹션 컴포넌트
import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { getImageUrl, getNickName } from '../../api/axiosInstance';

const ProfileSection: React.FC = () => {
  const { user } = useUser();

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center">
      <img
        alt="프로필 이미지"
        className="h-32 w-32 rounded-full object-cover"
        src={import.meta.env.VITE_BACKEND_ADDRESS + imageUrl}
      />
      <p className="mt-4 text-xl font-bold text-gray-800 dark:text-white">{getNickName()}</p>
    </div>
  );
};

export default ProfileSection;
