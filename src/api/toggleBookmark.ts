import axiosInstance from './axiosInstance';

export const toggleBookmark = async (goalId: number): Promise<string> => {
  try {
    const res = await axiosInstance.get(`/bookmarks/${goalId}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};
