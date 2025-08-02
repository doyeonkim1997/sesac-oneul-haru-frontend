import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

let accessToken: string | null = null;

let imageUrl: string | null = null;

let nickName: string | null = null;

let tier: string | null = null;

let authType: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function setImageUrl(image: string | null): void {
  imageUrl = image;
}

export function getImageUrl(): string | null {
  return imageUrl;
}

export function setNickName(name: string | null): void {
  nickName = name;
}

export function getNickName(): string | null {
  return nickName;
}

export function setTier(userTier: string | null): void {
  tier = userTier;
}

export function getTier(): string | null {
  return tier;
}

export function setAuthType(type: string | null): void {
  authType = type;
}

export function getAuthType(): string | null {
  return authType;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
  withCredentials: true, // 쿠키 전송 허용
});

// 요청 인터셉터: 요청 시 토큰 자동 삽입
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401일 때 토큰 재발급 시도
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { accessToken: newToken, nickName, imageUrl, tier, authType } = res.data;

        setAccessToken(newToken);
        setNickName(nickName);
        setImageUrl(imageUrl.imageUrl);
        setTier(tier);
        setAuthType(authType);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return instance(originalRequest); // 재요청
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리 or 에러 반환
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
