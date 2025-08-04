// 프로필 섹션 컴포넌트
import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getImageUrl, getNickName, getTier } from '../../api/axiosInstance';
import { getUserProfile } from '../../api/getUserProfile';
import TierMedal from './TierMedal';

const ProfileSection: React.FC = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(getImageUrl());
  const [nickName, setNickName] = useState(getNickName());
  const [userTier, setUserTier] = useState(getTier());

  // 사용자 프로필 정보 가져오기
  const fetchUserProfile = async () => {
    if (!user?.user_id) return;

    try {
      const profileData = await getUserProfile(user.user_id);
      console.log('🔍 ProfileSection - 프로필 데이터:', profileData);

      // 티어 업데이트
      if (profileData.tier && profileData.tier !== userTier) {
        console.log('🔍 ProfileSection - 티어 업데이트:', { old: userTier, new: profileData.tier });
        setUserTier(profileData.tier);
      }

      // 닉네임 업데이트
      if (profileData.nickName && profileData.nickName !== nickName) {
        setNickName(profileData.nickName);
      }

      // 이미지 업데이트
      if (profileData.image?.imageUrl && profileData.image.imageUrl !== imageUrl) {
        setImageUrl(profileData.image.imageUrl);
      }
    } catch (error) {
      console.error('🔍 ProfileSection - 프로필 조회 실패:', error);
    }
  };

  // 초기 로드 시 프로필 정보 가져오기
  useEffect(() => {
    fetchUserProfile();
  }, [user?.user_id]);

  // 실시간 상태 동기화 (기존 방식과 함께 사용)
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
    }, 5000); // 5초마다 체크 (API 호출과 함께 사용하므로 간격을 늘림)

    return () => clearInterval(interval);
  }, [imageUrl, nickName, userTier]);

  // 목표 완료 시 티어 업데이트를 위한 추가 폴링
  useEffect(() => {
    const tierUpdateInterval = setInterval(() => {
      fetchUserProfile();
    }, 10000); // 10초마다 프로필 정보 새로고침

    return () => clearInterval(tierUpdateInterval);
  }, [user?.user_id]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm flex flex-col items-center w-full">
      <img
        alt="프로필 이미지"
        className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
        src={import.meta.env.VITE_BACKEND_ADDRESS + imageUrl}
      />
      <div className="mt-3 sm:mt-4 flex flex-col items-center gap-2 w-full">
        <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white text-center">
          {nickName}
        </p>
        <div className="flex justify-center">
          <TierMedal tier={userTier || 'BRONZE'} size="sm" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
