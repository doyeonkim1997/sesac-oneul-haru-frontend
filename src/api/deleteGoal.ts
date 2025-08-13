import axiosInstance from './axiosInstance';

export const deleteGoal = async (goalId: string) => {
  try {
    const res = await axiosInstance.delete(`/goals/${goalId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
