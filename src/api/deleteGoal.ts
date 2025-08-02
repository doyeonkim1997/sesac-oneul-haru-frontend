import axiosInstance from './axiosInstance';

export const deleteGoal = async (goalId: string) => {
  try {
    const res = await axiosInstance.delete(`/goals/${goalId}`);
    return res.data;
  } catch (err) {
    console.error('목표 삭제 실패:', err);
    throw err;
  }
};
