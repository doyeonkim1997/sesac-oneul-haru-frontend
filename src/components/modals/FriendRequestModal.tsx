import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

type FriendRequest = {
  userId: number;
  nickName: string;
  email: string;
  imageUrl: string;
};

type Props = {
  onClose: () => void;
  isStandalone?: boolean;
};

const FriendRequestModal = ({ onClose, isStandalone = false }: Props) => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<FriendRequest[]>('/friend/requests');
        setRequests(res.data);
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

  const handleAccept = (userId: number) => {
    console.log(`수락: ${userId}`);
  };

  const handleReject = (userId: number) => {
    console.log(`거절: ${userId}`);
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
                  src={request.imageUrl}
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
                  onClick={() => handleAccept(request.userId)}
                  className="text-sm bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-500"
                >
                  수락
                </button>
                <button
                  onClick={() => handleReject(request.userId)}
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