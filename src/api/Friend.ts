import axiosInstance from './axiosInstance';
import { type User } from '../components/friends/UserItem';
import { type CalendarGoalsArrayResponse } from './getCalendarGoals';

export const fetchFriends = async (): Promise<User[]> => {
  const res = await axiosInstance.get<User[]>(`/friend/friends`);
  const friendList = res.data.map((friend: any) => ({
    userId: Number(friend.userId),
    requestId: Number(friend.requestId),
    nickName: friend.nickName,
    email: friend.email,
    image: {
      imageUrl: friend.imageUrl || '',
    },
  }));
  return friendList;
};

export const sendFriendRequest = async (receiverId: number): Promise<User[]> => {
  try {
    const res = await axiosInstance.get<User[]>(`/friend/request/${receiverId}`);
    return res.data;
  } catch (err) {
    console.error('친구 요청 실패:', err);
    throw err;
  }
};

export const acceptFriendRequest = async (requestId: number): Promise<User> => {
  try {
    const res = await axiosInstance.get<User>(`/friend/accept/${requestId}`);
    return res.data;
  } catch (err) {
    console.error('친구 수락 실패:', err);
    throw err;
  }
};

export const rejectFriendRequest = async (requestId: number): Promise<User[]> => {
  try {
    const res = await axiosInstance.delete<User[]>(`/friend/reject/${requestId}`);
    return res.data;
  } catch (err) {
    console.error('친구 거절 실패:', err);
    throw err;
  }
};

export const deleteFriend = async (requestId: number): Promise<User> => {
  try {
    console.log('친구 삭제 요청:', requestId);
    const res = await axiosInstance.delete<User>(`/friend/friends/${requestId}`);
    console.log('친구 삭제 응답:', res.data);
    return res.data;
  } catch (err: any) {
    console.error('친구 삭제 실패:', err.response?.data || err.message || err);
    throw err;
  }
};

export const getFriendProfile = async (friendId: number): Promise<User> => {
  try {
    const res = await axiosInstance.get<User>(`/friend/friends/${friendId}`);
    return res.data;
  } catch (err) {
    console.error('친구 프로필 조회 실패:', err);
    throw err;
  }
};

export const getFriendCalendar = async (
  friendId: number,
  year: number,
  month: number
): Promise<CalendarGoalsArrayResponse> => {
  const res = await axiosInstance.get(`/goals/calender/${friendId}?year=${year}&month=${month}`);
  return res.data;
};

export const fetchSentFriendRequests = async () => {
  const res = await axiosInstance.get('/friend/requests/sent');
  return res.data;
};