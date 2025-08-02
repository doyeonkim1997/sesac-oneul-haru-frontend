import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance, {
  setImageUrl,
  setNickName,
  setTier,
  setAuthType,
} from '../../api/axiosInstance';

export default function AuthLoader({ children }: { children: React.ReactNode }) {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await axiosInstance.post('/auth/refresh');
        console.log('🔍 AuthLoader - 백엔드 응답:', res.data);
        console.log('🔍 AuthLoader - authType 값:', res.data.authType);

        setAccessToken(res.data.accessToken, {
          nickName: res.data.nickName,
          imageUrl: res.data.imageUrl.imageUrl,
          tier: res.data.tier,
          authType: res.data.authType,
        });
        setNickName(res.data.nickName);
        setImageUrl(res.data.imageUrl.imageUrl);
        setTier(res.data.tier);
        setAuthType(res.data.authType);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }
    refresh();
  }, []);

  if (loading) return <div>로딩중...</div>;

  return <>{children}</>;
}
