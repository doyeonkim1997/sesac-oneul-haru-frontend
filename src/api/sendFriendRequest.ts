import axiosInstance from './axiosInstance';

export const sendFriendRequest = async (receiverId: string) => {
  try {
    const res = await axiosInstance.get(`/friend/request/${receiverId}`);
    return res.data;
  } catch (err) {
    console.error('친구 요청 실패:', err);
    throw err;
  }
};