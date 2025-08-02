import axiosInstance from './axiosInstance';

export interface CheerResponse {
  goalId: number;
  cheerCount: number;
}

// 응원 증가 API
export const increaseCheer = async (goalId: number): Promise<CheerResponse> => {
  try {
    console.log('💖 응원 증가 API 호출:', goalId);
    const res = await axiosInstance.get(`/goals/${goalId}/cheer`);
    console.log('✅ 응원 증가 API 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ 응원 증가 실패:', err);
    throw err;
  }
};

// 응원 감소 API
export const decreaseCheer = async (goalId: number): Promise<CheerResponse> => {
  try {
    console.log('💔 응원 감소 API 호출:', goalId);
    const res = await axiosInstance.delete(`/goals/${goalId}/cheer`);
    console.log('✅ 응원 감소 API 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ 응원 감소 실패:', err);
    throw err;
  }
};
