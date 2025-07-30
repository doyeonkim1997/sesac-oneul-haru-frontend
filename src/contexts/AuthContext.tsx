import { createContext, useContext, useState, type ReactNode } from 'react';
import { setAccessToken as setTokenHelper } from '../api/axiosInstance';

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateAccessToken = (token: string | null) => {
    setAccessToken(token);
    setTokenHelper(token || '');
  };

  const logout = () => updateAccessToken(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
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