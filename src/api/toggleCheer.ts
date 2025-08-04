import axiosInstance from './axiosInstance';

export interface CheerResponse {
  message: string; // "응원 추가" 또는 "응원 삭제"
}

// 응원 토글 API (새로운 백엔드 API에 맞춤)
export const toggleCheer = async (goalId: number): Promise<CheerResponse> => {
  try {
    console.log('💖 응원 토글 API 호출:', goalId);
    const res = await axiosInstance.patch(`/cheer/${goalId}`);
    console.log('✅ 응원 토글 API 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ 응원 토글 실패:', err);
    throw err;
  }
};

// 기존 함수들은 호환성을 위해 유지하되 새로운 함수 사용
export const increaseCheer = async (goalId: number): Promise<CheerResponse> => {
  return toggleCheer(goalId);
};

export const decreaseCheer = async (goalId: number): Promise<CheerResponse> => {
  return toggleCheer(goalId);
};
