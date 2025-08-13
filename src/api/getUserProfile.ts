import axiosInstance from './axiosInstance';

interface UserProfileResponse {
  nickName: string;
  email: string;
  tier: string;
  image: {
    imageUrl: string;
  } | null;
}

export const getUserProfile = async (userId: number): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
