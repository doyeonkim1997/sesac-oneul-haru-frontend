import axiosInstance from './axiosInstance';

// 북마크 응답 타입 정의 (테이블 구조 및 API 명세에 따라)
export interface BookmarkResponse {
  bookmarkId: number; // bookmark_id (PK)
  userId: number; // user_id (FK -> User)
  goalId: number; // goal_id (FK -> Goal)
  goal: {
    content: string;
    category: string;
    isCompleted: boolean;
  };
}

export const getBookmarks = async (): Promise<BookmarkResponse[]> => {
  try {
    const res = await axiosInstance.get('/bookmarks/all');
    return res.data;
  } catch (err) {
    console.error('북마크 목록 조회 실패:', err);
    throw err;
  }
};
