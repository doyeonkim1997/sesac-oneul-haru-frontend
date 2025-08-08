import axiosInstance from './axiosInstance';
import type { GoalApiResponse } from './getAllGoals';

// 친구 목표 조회 API
export const getFriendGoals = async (friendId: number): Promise<GoalApiResponse[]> => {
  try {
    const res = await axiosInstance.get(`/friend/goals/${friendId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 모든 친구들의 목표 조회 (여러 친구가 있을 경우)
export const getAllFriendsGoals = async (friendIds: number[]): Promise<GoalApiResponse[]> => {
  try {
    const promises = friendIds.map((friendId) => getFriendGoals(friendId));
    const results = await Promise.all(promises);
    // 모든 친구들의 목표를 하나의 배열로 합치기
    const allGoals = results.flat();
    return allGoals;
  } catch (err) {
    throw err;
  }
};
