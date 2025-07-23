// src/pages/Auth/Signup.tsx
import React from 'react';

const Signup: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center text-3xl font-bold text-blue-600">
            <span className="material-symbols-outlined text-4xl mr-2">check_circle</span>
            <span>Haru</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">회원가입</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="username">
              아이디
            </label>
            <div className="flex">
              <input
                className="flex-grow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
                id="username"
                type="text"
              />
              <button
                className="bg-white border border-l-0 border-gray-300 text-gray-600 rounded-r-md px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus:outline-none"
                type="button"
              >
                중복체크
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">
              이메일
            </label>
            <div className="flex">
              <input
                className="flex-grow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
                id="email"
                type="email"
              />
              <button
                className="bg-blue-600 text-white rounded-r-md px-4 py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none"
                type="button"
              >
                메일인증
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="auth-code">
              인증번호
            </label>
            <div className="flex">
              <input
                className="flex-grow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
                id="auth-code"
                type="text"
              />
              <button
                className="bg-white border border-l-0 border-gray-300 text-gray-600 rounded-r-md px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus:outline-none"
                type="button"
              >
                확인
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="nickname">
              닉네임
            </label>
            <input
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
              id="nickname"
              type="text"
            />
            <p className="text-xs text-gray-500 mt-1">8자 이상: 특수문자 포함</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="password-confirm"
            >
              비밀번호 확인
            </label>
            <input
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
              id="password-confirm"
              type="password"
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
