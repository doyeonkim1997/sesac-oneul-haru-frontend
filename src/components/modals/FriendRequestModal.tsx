type Props = {
  onClose: () => void;
  isStandalone?: boolean; // 기본 false
};

const FriendRequestModal = ({ onClose, isStandalone = false }: Props) => {
  const dummyRequests = [
    {
      id: 'r1',
      nickname: '요청자1',
      email: 'request1@example.com',
      imageUrl: 'https://via.placeholder.com/40?text=R1',
    },
    {
      id: 'r2',
      nickname: '요청자2',
      email: 'request2@example.com',
      imageUrl: 'https://via.placeholder.com/40?text=R2',
    },
  ];

  const handleAccept = (id: string) => {
    console.log(`수락: ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`거절: ${id}`);
  };

  const content = (
    <>
      {dummyRequests.length === 0 ? (
        <p className="text-gray-500 text-sm">친구 요청이 없습니다.</p>
      ) : (
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {dummyRequests.map((request) => (
            <li
              key={request.id}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-300 min-h-24"
            >
              <div className="flex items-center">
                <img
                  src={request.imageUrl}
                  alt="프로필"
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
                <div className="h-16 flex flex-col justify-start">
                  <p className="font-semibold text-gray-800">{request.nickname}</p>
                  <p className="text-sm text-gray-500">{request.email}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="text-sm bg-sky-400 text-white px-3 py-1 rounded hover:bg-sky-500"
                >
                  수락
                </button>
                <button
                  onClick={() => handleReject(request.id)}
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
    // 독립 모달일 때 - 오버레이 + 박스 + 닫기 버튼 포함
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

  // 탭 안에서 쓸 때 - 박스 없이 내용만 렌더링
  return <>{content}</>;
};

export default FriendRequestModal;
