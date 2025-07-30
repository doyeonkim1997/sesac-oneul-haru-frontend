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
    if (!searchTerm.trim()) return; // 빈 입력은 검색x
  
    const filtered = DUMMY_USERS.filter(user => {
      const emailPrefix = user.email.split('@')[0];
      return emailPrefix.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setResults(filtered);
  };

  const handleSelect = (user: User) => {
    alert(`${user.nickname}님에게 친구 요청을 보냅니다!`);
  };

  // 박스 스타일 분리
  const containerClass = isStandalone
    ? "bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative transform hover:scale-[1.01] transition-transform duration-300 min-h-[230px] backdrop-blur-sm bg-opacity-95 hover:shadow-2xl"
    : "";

  const content = (
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
              className="cursor-default px-4 py-2 w-full h-24 text-left hover:bg-sky-100 flex items-center justify-between"
              role="listitem"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt="프로필" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">이미지</div>
                  )}
                </div>
                <div className="h-16 flex flex-col justify-start">
                  <div className="font-semibold text-gray-800">{user.nickname}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleSelect(user)}
                className="ml-4 bg-sky-400 hover:bg-sky-600 text-white text-sm font-semibold py-1 px-3 rounded-lg"
                type="button"
              >
                친구 요청
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <>
      {isStandalone ? (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center p-4">
          <div className={containerClass}>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="모달 닫기"
            >
              <span className="material-icons">close</span>
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">친구 찾기</h2>
            {content}
          </div>
        </div>
      ) : (
        content
      )}
    </>
  );
};

export default FriendSearchModal;