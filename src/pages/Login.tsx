import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('로그인 시도:', { email, password })
    // 로그인 처리 로직 연결 (예: API 호출)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <span className="material-icons text-blue-500 text-4xl mr-2">logo</span>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* 상단 로고 */}
        <div className="flex items-center justify-center mb-8">
          <span className="material-icons text-blue-500 text-4xl mr-2">logo</span>
          <h1 className="text-2xl font-bold text-gray-800">Haru</h1>
        </div>

        {/* 로그인 폼 */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
          >
            로그인
          </button>
        </form>


        {/* 다른 방법으로 로그인하기 */}
<div className="mt-8">
  <p className="text-center text-gray-500 mb-4">다른 방법으로 로그인하기</p>

  <div className="flex justify-center space-x-4">
    {/* 구글 로그인 버튼 */}
    <button
      type="button"
      className="flex items-center px-4 py-2 border rounded-lg shadow hover:bg-gray-100 transition"
      onClick={() => alert('구글 로그인 클릭')}
    >
      <img src="/icons/google.svg" alt="Google" className="w-6 h-6 mr-2" />
      구글
    </button>

    {/* 네이버 로그인 버튼 */}
    <button
      type="button"
      className="flex items-center px-4 py-2 border rounded-lg shadow hover:bg-green-50 text-green-600 transition"
      onClick={() => alert('네이버 로그인 클릭')}
    >
      <img src="/icons/naver.svg" alt="Naver" className="w-6 h-6 mr-2" />
      네이버
    </button>

    {/* 카카오 로그인 버튼 */}
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


        {/* 추가 링크 */}
        <div className="mt-6 text-sm text-center text-gray-500 space-y-1">
          <p>
            계정이 없으신가요? <a href="#" className="text-blue-500 hover:underline">회원가입</a>
          </p>
          <p>
            비밀번호를 잊으셨나요? <a href="#" className="text-blue-500 hover:underline">비밀번호 찾기</a>
          </p>
        </div>
      </div>
    </div>
  )
}
