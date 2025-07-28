import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // 필요한 다른 상태들...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 회원가입 처리 로직 (예: API 호출)
    // 성공 시 아래처럼 페이지 이동
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 입력"
        required
        className="border p-2 rounded"
      />
      {/* 다른 입력들... */}

      <button
        type="submit"
        className="w-full bg-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition h-10"
      >
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;