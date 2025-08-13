import axiosInstance from './axiosInstance';

export const toggleGoalComplete = async (goalId: string) => {
  try {
    const res = await axiosInstance.patch(`/goals/${goalId}/toggle`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
