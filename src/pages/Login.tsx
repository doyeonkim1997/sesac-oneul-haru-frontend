import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import axiosInstance, {
  getAuthType,
  getImageUrl,
  getNickName,
  getTier,
  setAuthType,
  setImageUrl,
  setNickName,
  setTier,
} from '../api/axiosInstance'; // API 요청 보낼 때 사용할 커스텀 axios 인스턴스

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        '/auth/login/email',
        { email, password },
        { withCredentials: true },
      );

      setAccessToken(res.data.accessToken);
      setImageUrl(res.data.imageUrl.imageUrl);
      setNickName(res.data.nickName);
      setTier(res.data.tier);
      setAuthType(res.data.authType);

      console.log('로그인 성공:', res.data.accessToken);
      console.log('로그인 이미지:', getImageUrl());
      console.log('로그인 닉네임:', getNickName());
      console.log('로그인 티어:', getTier());
      console.log('로그인 타입:', getAuthType());

      navigate('/main');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('로그인 실패:', error.response?.data?.message || error.message);
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        console.error('알 수 없는 에러 발생');
      }
    }
  };

  const checkLoginStatus = async () => {
    try {
      const res = await axiosInstance.post('/auth/refresh', null, {
        withCredentials: true,
      });
      const accessToken = res.data.accessToken;
      if (accessToken) {
        setAccessToken(accessToken);
        setImageUrl(res.data.imageUrl.imageUrl);
        setNickName(res.data.nickName);
        setTier(res.data.tier);
        setAuthType(res.data.authType);
        console.log('소셜 로그인 성공, accessToken:', accessToken);
        console.log('소셜 로그인 이미지:', getImageUrl());
        console.log('소셜 로그인 닉네임:', getNickName());
        console.log('소셜 로그인 티어:', getTier());
        console.log('소셜 로그인 타입:', getAuthType());
        navigate('/main');
      } else {
        console.warn('accessToken이 없습니다');
      }
    } catch (error) {
      console.error('소셜 로그인 실패:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const popup = window.open(
      `http://localhost:3000/auth/login/${provider}`,
      '_blank',
      'width=500,height=600',
    );

    if (!popup) {
      alert('팝업 차단됨. 브라우저 설정 확인하세요.');
      return;
    }

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        // 팝업 닫힌 뒤, 토큰 요청해서 로그인 상태 체크
        checkLoginStatus();
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-12 pb-16">
      {/* 로고 + 설명 */}
      <div className="text-center mb-7 px-2">
        <div className="flex items-baseline justify-center mb-3 ">
          <img src={logo} alt="logo" className="w-[43px] h-[43px] object-contain" />
          <h1 className="ml-4 text-6xl font-bold leading-none font-stretch-expanded">Haru</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          "거창한 계획 대신 오늘의 작은 성공을 모아요."
          <br />
          거창한 목표가 부담스러운 당신을 위해, <strong>Haru</strong>(하루)는 '작심일일'을
          제안합니다.
          <br />
          하루 하나의 목표 — 가볍게 세우고, 함께 응원하며
          <br />
          작은 성공을 차곡차곡 쌓아가는 공간에 함께해보세요.
        </p>
      </div>

      {/* 로그인 박스 */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-sky-200 focus:border-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-sky-200 focus:border-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
          >
            로그인
          </button>
        </form>

        {/* OAuth 로그인 */}
        <div className="mt-8">
          <p className="text-center text-gray-500 mb-4">다른 방법으로 로그인하기</p>

          <div className="flex justify-center flex-wrap gap-3">
            {/* Google */}
            <button
              type="button"
              className="w-[120px] flex items-center justify-center gap-2 h-16 px-4 rounded-lg shadow-md 
                         bg-[#4285F4] hover:bg-[#3367D6] transition text-white"
              onClick={() => handleSocialLogin('google')}
            >
              <img src="/google.svg" alt="Google" className="w-7 h-7 bg-white rounded-full p-1" />
              <span className="font-bold">Google</span>
            </button>

            {/* Naver */}
            <button
              type="button"
              className="w-[120px] flex items-center justify-center gap-2 h-16 px-4 rounded-lg shadow-md 
                         bg-[#03C75A] hover:bg-[#02b254] transition text-white"
              onClick={() => handleSocialLogin('naver')}
            >
              <img src="/naver.svg" alt="Naver" className="w-7 h-7 " />
              <span className="font-bold">Naver</span>
            </button>

            {/* Kakao */}
            <button
              type="button"
              className="w-[120px] flex items-center justify-center gap-2 h-16 px-4 rounded-lg shadow-md 
                         bg-[#FEE500] hover:bg-[#e5cc00] transition text-white"
              onClick={() => handleSocialLogin('kakao')}
            >
              <img src="/kakao.svg" alt="Kakao" className="w-7 h-7 " />
              <span className="font-bold text-[#3C1E1E]">Kakao</span>
            </button>
          </div>
        </div>

        {/* 회원가입 */}
        <div className="mt-6 text-center text-gray-500 space-y-1">
          <p>
            <em>계정이 없으신가요? </em>
            <Link to="/signup" className="text-sky-400 hover:underline ml-1 font-medium">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
