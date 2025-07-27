import { useState } from 'react';
import { DUMMY_USERS } from '../../data/users';

type User = {
  id: string;
  nickname: string;
  email: string;
  imageUrl?: string;
};

type Props = {
  onClose: () => void;
  isStandalone?: boolean;
};

const FriendSearchModal = ({ onClose, isStandalone = false }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = () => {
    const filtered = DUMMY_USERS.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSelect = (user: User) => {
    alert(`${user.nickname}님에게 친구 요청을 보냅니다!`);
  };

  // 박스 스타일을 조건에 따라 분리
  const containerClass = isStandalone
    ? "bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
    : "";

  return (
    <>
      {isStandalone ? (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className={containerClass}>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="모달 닫기"
            >
              <span className="material-icons">close</span>
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">친구 찾기</h2>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-3 focus:ring-sky-200 focus:border-sky-400"
              placeholder="이메일로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              aria-label="친구 검색 입력창"
            />

            <button
              onClick={handleSearch}
              className="w-full bg-sky-400 text-white font-semibold rounded-lg py-2 hover:bg-sky-600 transition mb-4"
            >
              검색
            </button>

            {results.length > 0 && (
              <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                {results.map((user) => (
                  <li
                    key={user.id}
                    className="cursor-pointer px-4 py-2 w-full text-left hover:bg-sky-100 flex items-center"
                    onClick={() => handleSelect(user)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSelect(user);
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt="프로필" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">이미지</div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user.nickname}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        // 탭 내 렌더 시는 제목/박스 없이 검색 input + 결과 리스트만
        <>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-3 focus:ring-sky-200 focus:border-sky-400"
            placeholder="이메일로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            aria-label="친구 검색 입력창"
          />

          <button
            onClick={handleSearch}
            className="w-full bg-sky-400 text-white font-semibold rounded-lg py-2 hover:bg-sky-600 transition mb-4"
          >
            검색
          </button>

          {results.length > 0 && (
            <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
              {results.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer px-4 py-2 w-full text-left hover:bg-sky-100 flex items-center"
                  onClick={() => handleSelect(user)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelect(user);
                  }}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                    {user.imageUrl ? (
                      <img src={user.imageUrl} alt="프로필" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">이미지</div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{user.nickname}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default FriendSearchModal;