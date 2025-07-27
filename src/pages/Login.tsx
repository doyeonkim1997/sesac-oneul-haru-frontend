import { useState } from 'react';
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('로그인 시도:', { email, password })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-12 pb-16">
      
      {/* 로고 + 설명 */}
      <div className="text-center mb-7 px-2">
        <div className="flex items-baseline justify-center mb-3 ">
        <img
          src={logo}
          alt="logo"
          className="w-[43px] h-[43px] object-contain"
        />
        <h1 className="ml-4 text-6xl font-bold leading-none font-stretch-expanded">Haru</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          "거창한 계획 대신 오늘의 작은 성공을 모아요."<br />
          거창한 목표가 부담스러운 당신을 위해, <strong>Haru</strong>(하루)는 '작심일일'을 제안합니다.<br />
          하루 하나의 목표 — 가볍게 세우고, 함께 응원하며<br />
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

        {/* 소셜 로그인 */}
        <div className="mt-8">
          <p className="text-center text-gray-500 mb-4">다른 방법으로 로그인하기</p>
          <div className="flex justify-center space-x-3 flex-wrap">
            <button
              type="button"
              className="flex items-center px-4 py-2 border rounded-lg shadow hover:bg-gray-100 transition"
              onClick={() => alert('구글 로그인 클릭')}
            >
              <img src="/icons/google.svg" alt="Google" className="w-6 h-6 mr-2" />
              구글
            </button>

            <button
              type="button"
              className="flex items-center px-4 py-2 border rounded-lg shadow hover:bg-green-50 text-green-600 transition"
              onClick={() => alert('네이버 로그인 클릭')}
            >
              <img src="/icons/naver.svg" alt="Naver" className="w-6 h-6 mr-2" />
              네이버
            </button>

            <button
              type="button"
              className="flex items-center px-4 py-2 border rounded-lg shadow hover:bg-yellow-50 text-yellow-600 transition"
              onClick={() => alert('카카오 로그인 클릭')}
            >
              <img src="/icons/kakao.svg" alt="Kakao" className="w-6 h-6 mr-2" />
              카카오
            </button>
          </div>
        </div>

        {/* 회원가입 */}
        <div className="mt-6 text-center text-gray-500 space-y-1">
          <p>
            <em>계정이 없으신가요? </em>
            <Link to="/signup" className="text-sky-400 hover:underline ml-1 font-medium">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  )
}