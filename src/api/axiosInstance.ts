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

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 수정
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

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

        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  },
);

export default instance;