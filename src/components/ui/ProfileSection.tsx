// 프로필 섹션 컴포넌트
import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getImageUrl, getNickName, getTier } from '../../api/axiosInstance';
import { getUserProfile } from '../../api/getUserProfile';
import { updateTier } from '../../api/updateTier';
import TierMedal from './TierMedal';

const ProfileSection: React.FC = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState(getImageUrl());
  const [nickName, setNickName] = useState(getNickName());
  const [userTier, setUserTier] = useState(getTier());
  const [forceUpdate, setForceUpdate] = useState(0); // 강제 리렌더링용

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

  // 티어 업데이트 및 프로필 새로고침
  const refreshTierAndProfile = async () => {
    if (!user?.user_id) return;

    try {
      // 먼저 티어 업데이트 API 호출
      const tierUpdateResult = await updateTier();
      console.log('🔍 ProfileSection - 티어 업데이트 결과:', tierUpdateResult);

      // 티어 업데이트 후 프로필 정보 새로고침
      await fetchUserProfile();

      // UserContext의 tier 정보도 업데이트 (AuthContext를 통해)
      const updatedTier = getTier();
      if (updatedTier && updatedTier !== userTier) {
        console.log('🔍 ProfileSection - UserContext tier 업데이트:', {
          old: userTier,
          new: updatedTier,
        });
      }
    } catch (error) {
      console.error('🔍 ProfileSection - 티어 업데이트 실패:', error);
    }
  };

  // 초기 로드 시 프로필 정보 가져오기
  useEffect(() => {
    if (user?.user_id) {
      fetchUserProfile();
      // 초기 로드 시에도 등급 업데이트 시도
      updateTier()
        .then(() => {
          fetchUserProfile(); // 등급 업데이트 후 프로필 새로고침
        })
        .catch(console.error);
    }
  }, [user?.user_id]);

  // 실시간 상태 동기화 (닉네임, 이미지, 티어 변경 감지)
  useEffect(() => {
    const interval = setInterval(async () => {
      // DB 변경사항 감지를 위해 주기적으로 등급 업데이트 시도
      try {
        await updateTier();
        console.log('🔄 ProfileSection - 주기적 등급 업데이트 완료');

        // 등급 업데이트 후 프로필 정보 새로고침
        await fetchUserProfile();

        // 강제 리렌더링 트리거
        setForceUpdate((prev) => prev + 1);
      } catch (error) {
        console.log('🔄 ProfileSection - 등급 업데이트 실패 (정상)');
      }

      // UserContext에서 최신 정보 가져오기
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
        console.log('🔍 ProfileSection - 티어 업데이트 감지:', { old: userTier, new: updatedTier });
      }
    }, 2000); // 2초마다 체크 (적절한 간격)

    return () => clearInterval(interval);
  }, []); // 의존성 배열 제거 - 무한 루프 방지

  // 목표 완료 시 티어 업데이트를 위한 추가 폴링 (제거 - 이미 목표 완료 시 즉시 업데이트됨)
  // useEffect(() => {
  //   const tierUpdateInterval = setInterval(() => {
  //     refreshTierAndProfile();
  //   }, 10000); // 10초마다 티어 업데이트 및 프로필 정보 새로고침

  //   return () => clearInterval(tierUpdateInterval);
  // }, [user?.user_id]);

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
