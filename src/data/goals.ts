// 목표 데이터 타입 정의 (백엔드 스키마에 맞춤)
export interface Goal {
  goal_id: number;
  user_id: number;
  title: string;
  content: string;
  category: string;
  is_completed: boolean;
  is_deleted: boolean;
  cheer_count: number;
  created_at: string;
  updated_at?: string;
}

// 사용자 정보 타입 정의
export interface User {
  user_id: number;
  nickname: string;
  email: string;
  auth_type: string;
  image_id?: number;
  tier: string;
  created_at: string;
  updated_at?: string;
  profileImage?: string; // 임시로 추가 (실제로는 image_id로 관리)
}

// 북마크 정보 타입 정의
export interface Bookmark {
  bookmark_id: number;
  user_id: number;
  goal_id: number;
  is_bookmarked: boolean;
}

// 목표와 사용자 정보를 조합한 타입 (UI에서 사용)
export interface GoalWithUser {
  goal: Goal;
  user: User;
}

// 카테고리 상수 정의 (모달과 일치)
export const GOAL_CATEGORIES = {
  STUDY: 'STUDY',
  EXERCISE: 'EXERCISE',
  WORK: 'WORK',
  HEALTH: 'HEALTH',
  HOBBY: 'HOBBY',
  FINANCE: 'FINANCE',
  ETC: 'ETC',
} as const;

export type GoalCategory = (typeof GOAL_CATEGORIES)[keyof typeof GOAL_CATEGORIES];

// 카테고리 표시명 매핑
export const CATEGORY_DISPLAY_NAMES: Record<GoalCategory, string> = {
  [GOAL_CATEGORIES.STUDY]: '공부',
  [GOAL_CATEGORIES.EXERCISE]: '운동',
  [GOAL_CATEGORIES.WORK]: '업무',
  [GOAL_CATEGORIES.HEALTH]: '건강',
  [GOAL_CATEGORIES.HOBBY]: '취미',
  [GOAL_CATEGORIES.FINANCE]: '재정',
  [GOAL_CATEGORIES.ETC]: '기타',
};

// 더미 사용자 데이터
export const DUMMY_USERS: User[] = [
  {
    user_id: 1,
    nickname: 'user1',
    email: 'user1@example.com',
    auth_type: 'EMAIL',
    tier: 'BRONZE',
    created_at: '2025-07-01 10:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJeSEHLf3AGAymfO0jRLhPhT6_Gf9bWxHc4AikLOBUGfgUobtBnAWz-dbumuqmgOJUOAj2pGwuoSDoCmfA18IOKqYAmtcpXAs0GIbeC912h6OuLKzerIYUA9SD0hrEROKTADA5ZAC3gaxiO0NOR7PHbU5Zqf43FRpsXBJ0hQw1U9XXvRmaZmxem-tjuz1vUTI7KmxzN7ZlRLkmhunSyqt0lznaE34Zl7ABqTnz0lgUDXfoVjFTZVGSEtDYwQi7tbkFJaAVff2k6mg',
  },
  {
    user_id: 2,
    nickname: 'user2',
    email: 'user2@example.com',
    auth_type: 'EMAIL',
    tier: 'SILVER',
    created_at: '2025-07-02 11:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATqzzJMmW73tf3mUq8vaPtD4FlBblyAvMtWfGJ_28G853nQD-g70wK3XKs1VHvUI4kxORxgRKV6gEgVL3V2fxc8-4R-K3Svu2W4aAtGgWyaLIStaXqgPsEOcqqTQPjAgIIGSN0IrYJIOu4Me7vMXjA1bXjHExIZ2DrGzd-VQpHaFZQHyDvuQB6X42Wohje63cev01mRsJ49pbrymvfbCBYY0jPmXz61svdkZzwIcdSAVRCuO4K3zsOuGlMgyWg0rgC-l8nk_z-LRI',
  },
  {
    user_id: 3,
    nickname: 'user3',
    email: 'user3@example.com',
    auth_type: 'EMAIL',
    tier: 'GOLD',
    created_at: '2025-07-03 12:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_Xt2kNT79FCayzaGQbyBSypaezXfXCOKhos2hzPLt_I2rzJIgw5TGnQlSsLfQEAYGjAJzWw78bUnifXSdFTVg916X94fzvnV2d90S8eAE1PHmIyHWjIdmnHLNQJQ6Xy_cRCu98hOyoxeF8nVZbWvbo9Vz_A3k9ccx6FsKzs_1bEVVgV-KQttOF8SN7oNYvsi6bJWr4R-a0hML7cT5THVHxtsZB75zMUpl_XxzaoUvKUCSws2GmKldKvZpySFAQUCKqlyDEwM-sE',
  },
  {
    user_id: 4,
    nickname: 'user4',
    email: 'user4@example.com',
    auth_type: 'EMAIL',
    tier: 'BRONZE',
    created_at: '2025-07-04 13:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHvQpJwngVCAEbF2HoAad5vPMI9wMKIMqljvuo8ncLRFkfXfdYzCNF5QNCIoERR5KQE2lJ8QAxr8_4JX4nODKBLAfkb2VZuk1TPsvYlqQg9WFqR3Y0kmhStgCGHNytAQZhwD10m6nBJy6HyIzJizOI2Stk532gdYqnUcHryEADj4p7rt-YxrskPVlNT4PpQb5sfE0Eq4wBQ4y8Br9gWbPh1hn-ppExZZYZOaBj5atOCl3s5oq1hX35n1zR8vaAa8BYT4B8g6mUQdI',
  },
  {
    user_id: 5,
    nickname: 'user5',
    email: 'user5@example.com',
    auth_type: 'EMAIL',
    tier: 'SILVER',
    created_at: '2025-07-05 14:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE',
  },
  {
    user_id: 6,
    nickname: 'user6',
    email: 'user6@example.com',
    auth_type: 'EMAIL',
    tier: 'BRONZE',
    created_at: '2025-07-06 15:00:00',
    profileImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJeSEHLf3AGAymfO0jRLhPhT6_Gf9bWxHc4AikLOBUGfgUobtBnAWz-dbumuqmgOJUOAj2pGwuoSDoCmfA18IOKqYAmtcpXAs0GIbeC912h6OuLKzerIYUA9SD0hrEROKTADA5ZAC3gaxiO0NOR7PHbU5Zqf43FRpsXBJ0hQw1U9XXvRmaZmxem-tjuz1vUTI7KmxzN7ZlRLkmhunSyqt0lznaE34Zl7ABqTnz0lgUDXfoVjFTZVGSEtDYwQi7tbkFJaAVff2k6mg',
  },
];

// 더미 목표 데이터 (백엔드 스키마에 맞춤)
export const DUMMY_GOALS: Goal[] = [
  {
    goal_id: 1,
    user_id: 1,
    title: '멋진 웹 앱 만들기',
    content: '멋진 웹 앱 만들기',
    category: 'STUDY',
    is_completed: false,
    is_deleted: false,
    cheer_count: 5,
    created_at: '2025-07-15 10:00:00',
  },
  {
    goal_id: 2,
    user_id: 2,
    title: '매일 30분 운동하기',
    content: '매일 30분 운동하기',
    category: 'EXERCISE',
    is_completed: true,
    is_deleted: false,
    cheer_count: 12,
    created_at: '2025-07-15 11:00:00',
  },
  {
    goal_id: 3,
    user_id: 3,
    title: '책 1권 읽기',
    content: '책 1권 읽기',
    category: 'STUDY',
    is_completed: false,
    is_deleted: false,
    cheer_count: 3,
    created_at: '2025-07-15 12:00:00',
  },
  {
    goal_id: 4,
    user_id: 4,
    title: '블로그 포스팅 1개 작성',
    content: '블로그 포스팅 1개 작성',
    category: 'WORK',
    is_completed: false,
    is_deleted: false,
    cheer_count: 8,
    created_at: '2025-07-14 13:00:00',
  },
  {
    goal_id: 5,
    user_id: 5,
    title: '일본어 공부하기',
    content: '일본어 공부하기',
    category: 'STUDY',
    is_completed: false,
    is_deleted: false,
    cheer_count: 15,
    created_at: '2025-07-13 14:00:00',
  },
  {
    goal_id: 6,
    user_id: 6,
    title: '요리 레시피 10개 만들기',
    content: '요리 레시피 10개 만들기',
    category: 'HOBBY',
    is_completed: false,
    is_deleted: false,
    cheer_count: 7,
    created_at: '2025-07-12 15:00:00',
  },
  {
    goal_id: 7,
    user_id: 1,
    title: '매일 8시간 수면하기',
    content: '매일 8시간 수면하기',
    category: 'HEALTH',
    is_completed: false,
    is_deleted: false,
    cheer_count: 9,
    created_at: '2025-07-11 16:00:00',
  },
  {
    goal_id: 8,
    user_id: 2,
    title: '월 50만원 저축하기',
    content: '월 50만원 저축하기',
    category: 'FINANCE',
    is_completed: true,
    is_deleted: false,
    cheer_count: 20,
    created_at: '2025-07-10 17:00:00',
  },
  {
    goal_id: 9,
    user_id: 3,
    title: '새로운 취미 찾기',
    content: '새로운 취미 찾기',
    category: 'ETC',
    is_completed: false,
    is_deleted: false,
    cheer_count: 4,
    created_at: '2025-07-09 18:00:00',
  },
];

// 더미 북마크 데이터
export const DUMMY_BOOKMARKS: Bookmark[] = [
  {
    bookmark_id: 1,
    user_id: 1, // 현재 로그인한 사용자 (me)
    goal_id: 1,
    is_bookmarked: true,
  },
  {
    bookmark_id: 2,
    user_id: 2, // 친구 user2
    goal_id: 3,
    is_bookmarked: true,
  },
  {
    bookmark_id: 3,
    user_id: 1, // 현재 로그인한 사용자 (me)
    goal_id: 5,
    is_bookmarked: true,
  },
];

// 목표와 사용자 정보를 조합하는 헬퍼 함수
const combineGoalWithUser = (goal: Goal): GoalWithUser => {
  const user = DUMMY_USERS.find((u) => u.user_id === goal.user_id);
  if (!user) {
    throw new Error(`User not found for goal ${goal.goal_id}`);
  }
  return { goal, user };
};

// 데이터 필터링 함수들 (백엔드 연동 시 사용)
export const getAllGoals = (): GoalWithUser[] => {
  return DUMMY_GOALS.map(combineGoalWithUser);
};

export const getBookmarkedGoals = (): GoalWithUser[] => {
  const bookmarkedGoalIds = DUMMY_BOOKMARKS.filter((bookmark) => bookmark.is_bookmarked).map(
    (bookmark) => bookmark.goal_id,
  );

  return DUMMY_GOALS.filter((goal) => bookmarkedGoalIds.includes(goal.goal_id)).map(
    combineGoalWithUser,
  );
};

export const getMyBookmarkedGoals = (): GoalWithUser[] => {
  const currentUserId = 1; // 임시로 현재 사용자 ID를 1로 설정
  const myBookmarkedGoalIds = DUMMY_BOOKMARKS.filter(
    (bookmark) => bookmark.user_id === currentUserId && bookmark.is_bookmarked,
  ).map((bookmark) => bookmark.goal_id);

  return DUMMY_GOALS.filter((goal) => myBookmarkedGoalIds.includes(goal.goal_id)).map(
    combineGoalWithUser,
  );
};

export const getFriendsBookmarkedGoals = (): GoalWithUser[] => {
  const currentUserId = 1; // 임시로 현재 사용자 ID를 1로 설정
  const friendsBookmarkedGoalIds = DUMMY_BOOKMARKS.filter(
    (bookmark) => bookmark.user_id !== currentUserId && bookmark.is_bookmarked,
  ).map((bookmark) => bookmark.goal_id);

  return DUMMY_GOALS.filter((goal) => friendsBookmarkedGoalIds.includes(goal.goal_id)).map(
    combineGoalWithUser,
  );
};

export const getMyGoals = (): GoalWithUser[] => {
  const currentUserId = 1; // 임시로 현재 사용자 ID를 1로 설정
  return DUMMY_GOALS.filter((goal) => goal.user_id === currentUserId).map(combineGoalWithUser);
};

// 백엔드 연동 시 사용할 함수들 (현재는 더미 데이터 반환)
export const fetchAllGoals = async (): Promise<GoalWithUser[]> => {
  // TODO: 백엔드 API 호출로 교체
  // return await api.get('/goals');
  return getAllGoals();
};

export const fetchBookmarkedGoals = async (): Promise<GoalWithUser[]> => {
  // TODO: 백엔드 API 호출로 교체
  // return await api.get('/goals/bookmarked');
  return getBookmarkedGoals();
};

export const fetchMyGoals = async (): Promise<GoalWithUser[]> => {
  // TODO: 백엔드 API 호출로 교체
  // return await api.get('/goals/my');
  return getMyGoals();
};
