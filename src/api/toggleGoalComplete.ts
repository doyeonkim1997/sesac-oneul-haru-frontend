import axiosInstance from './axiosInstance';

export const toggleGoalComplete = async (goalId: string) => {
  try {
    const res = await axiosInstance.patch(`/goals/${goalId}/toggle`);
    return res.data;
  } catch (err) {
    console.error('목표 완료 토글 실패:', err);
    throw err;
  }
};
