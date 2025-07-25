// src/pages/Auth/Signup.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-blue-600">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
            <span>Haru</span>
            <span className="text-gray-800 text-lg font-semibold ml-2">회원가입</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <div className="flex items-center">
              <label className="w-16 text-sm font-medium text-gray-700" htmlFor="username">
                아이디
              </label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-l-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="username"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                />
                <button
                  className="bg-white border border-l-0 border-gray-300 text-gray-600 rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 w-20 h-10 text-nowrap ml-1 text-center flex items-center justify-center"
                  type="button"
                >
                  중복 확인
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label className="w-16 text-sm font-medium text-gray-700" htmlFor="email">
                이메일
              </label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-l-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                />
                <button
                  className="bg-blue-500 text-white border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 w-20 h-10 text-nowrap ml-1 text-center flex items-center justify-center"
                  type="button"
                >
                  인증
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label className="w-16 text-sm font-medium text-gray-700" htmlFor="auth-code">
                인증번호
              </label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-l-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="auth-code"
                  type="text"
                />
                <button
                  className="bg-white border border-l-0 border-gray-300 text-gray-600 rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 w-20 h-10 text-nowrap ml-1 text-center flex items-center justify-center"
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label className="w-16 text-sm font-medium text-gray-700" htmlFor="nickname">
                닉네임
              </label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <label className="w-16 text-sm font-medium text-gray-700" htmlFor="password">
                비밀번호
              </label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="password"
                  type="password"
                  placeholder="8자 이상, 특수문자 포함"
                />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <label
                className="w-16 text-sm font-medium text-gray-700"
                htmlFor="password-confirm"
              ></label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-10 bg-gray-50"
                  id="password-confirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                />
              </div>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition h-10"
            type="submit"
          >
            회원가입
          </button>
          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md transition h-10"
            onClick={() => navigate('/login')}
          >
            뒤로가기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
