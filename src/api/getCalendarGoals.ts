import instance from './axiosInstance';

export interface CalendarGoal {
  goalId: number;
  content: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  year: number;
  month: number;
  day: number;
}

export interface CalendarGoalsResponse {
  [date: string]: CalendarGoal[];
}

// 실제 API 응답 형태 (배열)
export type CalendarGoalsArrayResponse = CalendarGoal[];

export const getCalendarGoals = async (
  year: number,
  month: number,
): Promise<CalendarGoalsResponse | CalendarGoalsArrayResponse> => {
  try {
    console.log('📅 캘린더 API 호출:', `/goals/calender?year=${year}&month=${month}`);
    const response = await instance.get(`/goals/calender?year=${year}&month=${month}`);
    console.log('📅 캘린더 API 응답:', response.data);
    console.log('📅 캘린더 API 응답 타입:', typeof response.data);
    console.log('📅 캘린더 API 응답이 배열인가?', Array.isArray(response.data));
    return response.data;
  } catch (error) {
    console.error('캘린더 목표 조회 오류:', error);
    throw error;
  }
};
