import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance, { setImageUrl, setNickName, setTier } from '../../api/axiosInstance';

export default function AuthLoader({ children }: { children: React.ReactNode }) {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await axiosInstance.post('/auth/refresh');
        setAccessToken(res.data.accessToken);
        setNickName(res.data.nickName);
        setImageUrl(res.data.imageUrl.imageUrl);
        setTier(res.data.tier);
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
