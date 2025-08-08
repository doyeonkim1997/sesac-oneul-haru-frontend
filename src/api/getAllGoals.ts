import axiosInstance from './axiosInstance';

// 실제 백엔드 API 응답 타입 정의 (DB 테이블 구조 기반)
export interface GoalApiResponse {
  userId: number; // (백엔드 수정 전제) 추가
  goalId: number; // goal_id (PK)
  nickName: string; // user_id로 조인해서 가져온 닉네임
  imageUrl: string; // user_id로 조인해서 가져온 프로필 이미지
  isBookmarked: boolean; // 북마크 여부 (별도 테이블 조인)
  content: string; // content (TEXT)
  category: string; // category (VARCHAR) - STUDY, EXERCISE, WORK, HEALTH, HOBBY, FINANCE, ETC
  createdAt: string; // created_at (DATETIME)
  updatedAt: string; // updated_at (DATETIME)
  isCompleted: boolean; // is_completed (TINYINT) - 0: false, 1: true
  cheerCount: number; // cheer_count (INT)
  isDeleted?: number; // is_deleted (TINYINT) - 0: false, 1: true
}

export const getAllGoals = async (): Promise<GoalApiResponse[]> => {
  try {
    const res = await axiosInstance.get('/goals/all');
    return res.data;
  } catch (err) {
    throw err;
  }
};
