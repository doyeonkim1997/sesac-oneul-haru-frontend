import axiosInstance from './axiosInstance';
import type { GoalApiResponse } from './getAllGoals';

export const getGoalById = async (goalId: string): Promise<GoalApiResponse> => {
  try {
    const res = await axiosInstance.get(`/goals/${goalId}`);
    return res.data;
  } catch (err) {
    console.error('목표 조회 실패:', err);
    throw err;
  }
};
