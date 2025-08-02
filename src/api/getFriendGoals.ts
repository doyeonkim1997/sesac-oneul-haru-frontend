import axiosInstance from './axiosInstance';
import type { GoalApiResponse } from './getAllGoals';

// 친구 목표 조회 API
export const getFriendGoals = async (friendId: number): Promise<GoalApiResponse[]> => {
  try {
    console.log('🌐 친구 목표 API 호출:', `/friend/goals/${friendId}`);
    const res = await axiosInstance.get(`/friend/goals/${friendId}`);
    console.log('✅ 친구 목표 API 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ 친구 목표 조회 실패:', err);
    throw err;
  }
};

// 모든 친구들의 목표 조회 (여러 친구가 있을 경우)
export const getAllFriendsGoals = async (friendIds: number[]): Promise<GoalApiResponse[]> => {
  try {
    console.log('🔄 모든 친구 목표 조회 시작:', friendIds);
    const promises = friendIds.map((friendId) => getFriendGoals(friendId));
    const results = await Promise.all(promises);
    // 모든 친구들의 목표를 하나의 배열로 합치기
    const allGoals = results.flat();
    console.log('✅ 모든 친구 목표 조회 완료:', allGoals.length, '개');
    return allGoals;
  } catch (err) {
    console.error('❌ 모든 친구 목표 조회 실패:', err);
    throw err;
  }
};
