import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  setAccessToken as setTokenHelper,
  setAuthType as setAxiosAuthType,
} from '../api/axiosInstance';

interface TokenPayload {
  email: string;
  userId: number;
}

type AuthContextType = {
  accessToken: string | null;
  email: string | null;
  nickName: string | null;
  imageUrl: string | null;
  tier: string | null;
  authType: string | null;
  userId: number | null;
  setAccessToken: (
    token: string | null,
    info?: { nickName?: string; imageUrl?: string; tier?: string; authType?: string },
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [nickName, setNickName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [authType, setAuthType] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(accessToken);

        setEmail(decoded.email);
        setUserId(decoded.userId);
      } catch (e) {
        setEmail(null);
        setUserId(null);
      }
    } else {
      setEmail(null);
      setUserId(null);
    }
  }, [accessToken]);

  const updateAccessToken = (
    token: string | null,
    info?: { nickName?: string; imageUrl?: string; tier?: string; authType?: string },
  ) => {
    // 토큰 새로 들어왔을 경우 (로그인 또는 토큰 갱신)
    if (token) {
      setAccessToken(token);
      setTokenHelper(token);
      localStorage.setItem('isLoggedIn', 'true'); // 로컬스토리지 저장

      if (info) {
        setNickName(info.nickName || null);
        setImageUrl(info.imageUrl || null);
        setTier(info.tier || null);
        setAuthType(info.authType || null);
        setAxiosAuthType(info.authType || null);
      }
    } 
    // 로그아웃 시
    else {
      setAccessToken(null);
      setTokenHelper(''); 
      localStorage.removeItem('isLoggedIn'); // 제거

      setNickName(null);
      setImageUrl(null);
      setTier(null);
      setAuthType(null);
      setAxiosAuthType(null);
    }
  };

  const logout = () => updateAccessToken(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        email,
        nickName,
        imageUrl,
        tier,
        authType,
        userId,
        setAccessToken: updateAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}