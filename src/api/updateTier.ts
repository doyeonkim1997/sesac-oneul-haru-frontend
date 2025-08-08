import axiosInstance from './axiosInstance';

export const updateTier = async (): Promise<string> => {
  try {
    const response = await axiosInstance.patch('/user/tier');
    return response.data;
  } catch (error) {
    throw error;
  }
};
