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
    console.error('사용자 프로필 조회 실패:', error);
    throw error;
  }
};
