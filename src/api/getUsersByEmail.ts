import axiosInstance from './axiosInstance';
import type { User } from '../components/friends/UserItem';

export const getUsersByEmail = async (keyword: string): Promise<User[]> => {
  try {
    const res = await axiosInstance.get<User[]>(`/user/email`, {
      params: { search: keyword },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
