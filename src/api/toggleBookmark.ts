import axiosInstance from './axiosInstance';

export const toggleBookmark = async (goalId: number): Promise<string> => {
  try {
    console.log('🔖 북마크 토글 API 호출:', goalId);
    const res = await axiosInstance.get(`/bookmarks/${goalId}`);
    console.log('✅ 북마크 토글 API 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ 북마크 토글 실패:', err);
    throw err;
  }
};
