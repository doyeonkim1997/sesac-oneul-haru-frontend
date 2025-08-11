import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { accessToken, setAccessToken } = useAuth();
  // 로딩 상태만 관리
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (accessToken) {
      setLoading(false);
      return;
    }

    // 토큰 없으면 refresh 시도
    axiosInstance.post('/auth/refresh')
      .then(res => {
        // 성공 시 Context 토큰 업데이트
        setAccessToken(res.data.accessToken, {
          nickName: res.data.nickName,
          imageUrl: res.data.imageUrl.imageUrl,
          tier: res.data.tier,
          authType: res.data.authType,
        });
      })
      .catch(() => {
        setAccessToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}