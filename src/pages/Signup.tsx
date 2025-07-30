import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const Signup: React.FC = () => {
  // 상태 관리
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authCode, setAuthCode] = useState('');

  // 인증 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 이메일 중복 확인 및 인증 코드 전송
  const handleEmailCheck = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 이메일 중복 확인
      const checkRes = await axios.post('/auth/check/email', { email });
      if (checkRes.data === true) {
        // 인증 코드 전송
        await axios.post('/mail/send', { email });
        setIsEmailVerified(true);
        alert('인증 코드가 이메일로 전송되었습니다.');
      } else {
        alert('이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 확인 실패:', error);
      if (axios.isAxiosError(error)) {
        console.error('상세 에러:', error.response?.data);
        alert(`이메일 확인 실패: ${error.response?.data?.message || error.message}`);
      } else {
        alert('이메일 확인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!authCode) {
      alert('인증 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('/mail/verify', { email, validCode: authCode });
      if (res.data === true) {
        setIsCodeVerified(true);
        alert('인증이 완료되었습니다.');
      } else {
        alert('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('인증 코드 확인 실패:', error);
      if (axios.isAxiosError(error)) {
        console.error('상세 에러:', error.response?.data);
        alert(`인증 코드 확인 실패: ${error.response?.data?.message || error.message}`);
      } else {
        alert('인증 코드 확인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!isEmailVerified || !isCodeVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (!nickName.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('/auth/signup/email', {
        email,
        password,
        confirmPassword,
        nickName: nickName.trim(),
      });

      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (axios.isAxiosError(error)) {
        console.error('상세 에러:', error.response?.data);
        alert(`회원가입 실패: ${error.response?.data?.message || error.message}`);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-12 pb-16">
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

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="mb-8 flex justify-center">
          <span className="text-xl font-bold text-gray-800 leading-none">회원가입</span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label className="w-16 text-sm font-semibold text-gray-700" htmlFor="email">
              이메일
            </label>
            <div className="flex flex-grow">
              <input
                className="flex-grow appearance-none border border-gray-300 rounded-l-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-sky-200 focus:border-sky-400 h-10 bg-gray-50"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-sky-400 text-white rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-sky-600 focus:outline-none focus:border-sky-400 flex-shrink-0 w-20 h-10 text-nowrap text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={handleEmailCheck}
                disabled={isLoading}
              >
                {isLoading ? '처리중...' : '인증'}
              </button>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <label className="w-16 text-sm font-semibold text-gray-700" htmlFor="auth-code">
              인증번호
            </label>
            <div className="flex flex-grow">
              <input
                className="flex-grow appearance-none border border-gray-300 rounded-l-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-sky-400 h-10 bg-gray-50"
                id="auth-code"
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증 코드를 입력해주세요."
              />
              <button
                className="bg-white border border-gray-300 text-gray-600 rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:border-sky-400 flex-shrink-0 w-20 h-10 text-nowrap text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={handleVerifyCode}
                disabled={isLoading || !isEmailVerified}
              >
                {isLoading ? '처리중...' : '확인'}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-16 text-sm font-semibold text-gray-700" htmlFor="nickname">
              닉네임
            </label>
            <div className="flex flex-grow">
              <input
                className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-sky-400 h-10 bg-gray-50"
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-16 text-sm font-semibold text-gray-700" htmlFor="password">
              비밀번호
            </label>
            <div className="flex flex-grow">
              <input
                className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-sky-400 h-10 bg-gray-50"
                id="password"
                type="password"
                placeholder="8자 이상, 특수문자 포함"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <label className="w-16 " htmlFor="password-confirm"></label>
            <div className="flex flex-grow">
              <input
                className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-sky-400 h-10 bg-gray-50"
                id="password-confirm"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition h-10 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading || !isCodeVerified}
          >
            {isLoading ? '처리중...' : '회원가입'}
          </button>
          <Link
            to="/login"
            className="w-full block text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md transition h-10"
          >
            뒤로가기
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
