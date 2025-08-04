import axiosInstance from './axiosInstance';

export const updateTier = async (): Promise<string> => {
  try {
    const response = await axiosInstance.patch('/user/tier');
    return response.data;
  } catch (error) {
    console.error('티어 업데이트 실패:', error);
    throw error;
  }
};
