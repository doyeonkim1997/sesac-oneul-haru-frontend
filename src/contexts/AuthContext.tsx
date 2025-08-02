import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  setAccessToken as setTokenHelper,
  setAuthType as setAxiosAuthType,
} from '../api/axiosInstance';

interface TokenPayload {
  email: string;
}

type AuthContextType = {
  accessToken: string | null;
  email: string | null;
  nickName: string | null;
  imageUrl: string | null;
  tier: string | null;
  authType: string | null;
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

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(accessToken);
        setEmail(decoded.email);
      } catch (e) {
        console.error('AccessToken 디코딩 실패:', e);
        setEmail(null);
      }
    } else {
      setEmail(null);
    }
  }, [accessToken]);

  const updateAccessToken = (
    token: string | null,
    info?: { nickName?: string; imageUrl?: string; tier?: string; authType?: string },
  ) => {
    setAccessToken(token);
    setTokenHelper(token || '');

    if (info) {
      setNickName(info.nickName || null);
      setImageUrl(info.imageUrl || null);
      setTier(info.tier || null);
      setAuthType(info.authType || null);
      setAxiosAuthType(info.authType || null); // axiosInstance와 동기화
    } else if (token === null) {
      // 로그아웃 시 초기화
      setNickName(null);
      setImageUrl(null);
      setTier(null);
      setAuthType(null);
      setAxiosAuthType(null); // axiosInstance와 동기화
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
