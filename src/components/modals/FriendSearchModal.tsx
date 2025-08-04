import { useEffect, useState } from 'react';
import { fetchFriends, fetchSentFriendRequests, sendFriendRequest } from '../../api/Friend';
import { type User } from '../friends/UserItem';
import { getUsersByEmail } from '../../api/getUsersByEmail';
import Toast from '../ui/Toast';

type Props = {
  onClose: () => void;
  isStandalone?: boolean;
  requestedUserIds: number[];
  setRequestedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const FriendSearchModal = ({
  onClose,
  isStandalone = false,
  requestedUserIds,
  setRequestedUserIds,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [friendIds, setFriendIds] = useState<number[]>([]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const loadFriendIdsAndRequests = async () => {
      try {
        const friends = await fetchFriends();
        setFriendIds(friends.map(f => f.userId));

        const sentRequests = await fetchSentFriendRequests();
        const sentUserIds = sentRequests.map((req: any) => req.receiverId);
        setRequestedUserIds(sentUserIds);
      } catch (err) {
        console.error('친구 목록 또는 요청 목록 불러오기 실패:', err);
      }
    };

    loadFriendIdsAndRequests();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const result = await getUsersByEmail(searchTerm);

      const formattedResults: User[] = result.map(user => ({
        userId: Number(user.userId),
        requestId: Number(user.requestId),
        nickName: user.nickName,
        email: user.email,
        image: {
          imageUrl: user.image?.imageUrl || '',
        },
        unreadCount: user.unreadCount,
      }));

      const filteredResults = formattedResults.filter(user => {
        const emailPrefix = user.email.split('@')[0];
        return emailPrefix.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setResults(filteredResults);
    } catch (err) {
      alert('사용자 검색에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  const handleSelect = async (user: User) => {
    try {
      await sendFriendRequest(user.userId);
      setRequestedUserIds(prev => [...prev, user.userId]);
    } catch (error) {
      showToast('이미 친구 요청 중인 사용자입니다.', 'error');
      console.error(error);
    }
  };

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

      {results.length > 0 ? (
        <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
          {results.map((user) => {
            const isRequested = requestedUserIds.includes(user.userId);
            const isFriend = friendIds.includes(user.userId);

            return (
              <li
                key={user.userId}
                className="cursor-default px-4 py-2 w-full h-24 text-left hover:bg-sky-100 flex items-center justify-between"
                role="listitem"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                    {user.image?.imageUrl ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_ADDRESS}${user.image.imageUrl}`}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        이미지
                      </div>
                    )}
                  </div>
                  <div className="h-16 flex flex-col justify-start">
                    <div className="font-semibold text-gray-800">{user.nickName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(user)}
                  className={`ml-4 text-sm font-semibold py-1 px-3 rounded-lg transition
                    ${
                      isFriend
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : isRequested
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-sky-400 text-white hover:bg-sky-600'
                    }
                  `}
                  disabled={isFriend || isRequested}
                  type="button"
                >
                  {isFriend ? '친구' : isRequested ? '요청 완료' : '친구 요청'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        searchTerm.trim() !== '' && (
          <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
        )
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
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