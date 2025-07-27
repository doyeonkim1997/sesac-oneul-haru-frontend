import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Signup: React.FC = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-12 pb-16">

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
      
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="mb-8 flex justify-center">
          <span className="text-xl font-bold text-gray-800 leading-none">회원가입</span>
        </div>

        <form className="space-y-4">
          
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
    />
    <button
      className="bg-sky-400 text-white rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-sky-600 focus:outline-none focus:border-sky-400 flex-shrink-0 w-20 h-10 text-nowrap text-center flex items-center justify-center"
      type="button"
    >
      인증
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
    />
    <button
      className="bg-white border border-gray-300 text-gray-600 rounded-r-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:border-sky-400 flex-shrink-0 w-20 h-10 text-nowrap text-center flex items-center justify-center"
      type="button"
    >
      확인
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
                />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <label
                className="w-16 "
                htmlFor="password-confirm"
              ></label>
              <div className="flex flex-grow">
                <input
                  className="flex-grow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:border-sky-400 h-10 bg-gray-50"
                  id="password-confirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                />
              </div>
            </div>

          <button
            className="w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition h-10"
            type="submit"
          >
            회원가입
          </button>
          <Link to="/login" className="w-full block text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md transition h-10">
            뒤로가기
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
