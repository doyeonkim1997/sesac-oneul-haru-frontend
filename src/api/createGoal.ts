import axiosInstance from './axiosInstance';

export interface CreateGoalRequest {
  content: string; // content (TEXT) - 목표 내용
  category: string; // category (VARCHAR) - STUDY, EXERCISE, WORK, HEALTH, HOBBY, FINANCE, ETC
}

export const createGoal = async (goalData: CreateGoalRequest) => {
  try {
    const res = await axiosInstance.post('/goals', goalData);
    return res.data;
  } catch (err) {
    throw err;
  }
};
