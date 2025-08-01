import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { setAccessToken as setTokenHelper } from '../api/axiosInstance';

interface TokenPayload {
  userId: string;
}

type AuthContextType = {
  accessToken: string | null;
  userId: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<TokenPayload>(accessToken);
        setUserId(decoded.userId);
      } catch (e) {
        console.error('AccessToken 디코딩 실패:', e);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, [accessToken]);

  const updateAccessToken = (token: string | null) => {
    setAccessToken(token);
    setTokenHelper(token || '');
  };

  const logout = () => updateAccessToken(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
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