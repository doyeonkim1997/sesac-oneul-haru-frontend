import axiosInstance from './axiosInstance';
import type { User } from '../components/friends/UserItem';

export const getUsersByEmail = async (keyword: string): Promise<User[]> => {
  try {
    const res = await axiosInstance.get<User[]>(`/user/email`, {
      params: { search: keyword },
    });
        console.log('🔍 getUsersByEmail 응답 데이터:', res.data);

    return res.data;
  } catch (err) {
    console.error('이메일 검색 실패:', err);
    throw err;
  }
};