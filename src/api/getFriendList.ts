import axiosInstance from './axiosInstance';

export interface FriendGoalResponse {
  requestId: number;
  userId: number;
  nickName: string;
  email: string;
  tier: string;
  imageUrl: string;
}

// 사용자 친구 목록 불러오기
export const getFriendList = async (): Promise<FriendGoalResponse[]> => {
  try {
    const res = await axiosInstance.get('/friend/friends');
    return res.data;
  } catch (err) {
    throw err;
  }
};
