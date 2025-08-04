import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import type { User } from '../friends/UserItem';
import { acceptFriendRequest, rejectFriendRequest } from '../../api/Friend';

type Props = {
  onClose: () => void;
  isStandalone?: boolean;
};

const FriendRequestModal = ({ onClose, isStandalone = false }: Props) => {
  const [requests, setRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/friend/requests');

        // imageUrl 문자열 → image 객체로 변환
        const formattedRequests: User[] = res.data.map((user: any) => ({
          ...user,
          image: user.imageUrl ? { imageUrl: user.imageUrl } : undefined,
        }));

        setRequests(formattedRequests);
        setError(null);
      } catch (err) {
        setError('친구 요청을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId: number) => {
    try {
      await acceptFriendRequest(requestId);
      setRequests((prev) => prev.filter((req) => req.requestId !== requestId));
    } catch (err) {
      alert('친구 요청 수락에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await rejectFriendRequest(requestId);
      setRequests((prev) => prev.filter((req) => req.requestId !== requestId));
    } catch (err) {
      alert('친구 요청 거절에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
  };

  const content = (
    <>
      {loading ? (
        <p className="text-gray-500 text-sm">로딩 중...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-sm">친구 요청이 없습니다.</p>
      ) : (
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {requests.map((request) => (
            <li
              key={request.userId}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-300 min-h-24"
            >
              <div className="flex items-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND_ADDRESS}${request.image?.imageUrl || ''}`}
                  alt="프로필"
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
                <div className="h-16 flex flex-col justify-start">
                  <p className="font-semibold text-gray-800">{request.nickName}</p>
                  <p className="text-sm text-gray-500">{request.email}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleAccept(request.requestId)}
                  className="text-sm bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-500"
                >
                  수락
                </button>
                <button
                  onClick={() => handleReject(request.requestId)}
                  className="text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  거절
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  if (isStandalone) {
    return (
      <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative transform hover:scale-[1.01] transition-transform duration-300">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            <span className="material-icons">close</span>
          </button>

          <h2 className="text-xl font-bold mb-4 text-gray-800">친구 요청</h2>
          {content}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default FriendRequestModal;