import axiosInstance from './axiosInstance';

export interface UpdateGoalRequest {
  content: string; // content (TEXT)
  category: string; // category (VARCHAR) - STUDY, EXERCISE, WORK, HEALTH, HOBBY, FINANCE, ETC
  isCompleted: boolean; // is_completed (TINYINT) - 0: false, 1: true
}

export const updateGoal = async (goalId: string, goalData: UpdateGoalRequest) => {
  try {
    const res = await axiosInstance.patch(`/goals/${goalId}`, goalData);
    return res.data;
  } catch (err) {
    throw err;
  }
};
