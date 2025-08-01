import axiosInstance from './axiosInstance';
import type { User } from '../components/friends/UserItem';

export const getUsersByEmail = async (keyword: string): Promise<User[]> => {
  try {
    const res = await axiosInstance.get(`/user/email`, {
      params: { search: keyword },
    });

    // 백엔드 응답 [{ userId: '1', nickName: '홍길동', email: 'a@a.com', imageUrl: '...' }]
    return res.data;
  } catch (err) {
    console.error('이메일 검색 실패:', err);
    throw err;
  }
};