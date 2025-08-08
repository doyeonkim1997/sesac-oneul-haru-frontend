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
    const response = await instance.get(`/goals/calender?year=${year}&month=${month}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
