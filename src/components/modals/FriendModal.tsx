import { useState } from "react";
import FriendRequestModal from "./FriendRequestModal";
import FriendSearchModal from "./FriendSearchModal";

interface FriendModalProps {
  onClose: () => void;
}

const FriendModal: React.FC<FriendModalProps> = ({ onClose }) => {
  const [tab, setTab] = useState<'request' | 'search'>('request');

return (
  <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative">
      {/* 닫기 버튼 */}
      <button
        className="absolute top-[9px] right-3 text-gray-400 hover:text-gray-600 z-10"
        onClick={onClose}
        aria-label="닫기"
      >
        <span className="material-icons">close</span>
      </button>

      {/* 탭 영역 */}
      <div className="border-b border-gray-200">
        <nav className="flex justify-center">
          <button
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'request'
                ? 'text-sky-500 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTab('request')}
          >
            친구 요청
            {tab === 'request' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />
            )}
          </button>
          
          <button
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'search'
                ? 'text-sky-500 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTab('search')}
          >
            친구 찾기
            {tab === 'search' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />
            )}
          </button>
        </nav>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-6 pt-4">
        {tab === 'request' ? (
          <FriendRequestModal onClose={onClose} />
        ) : (
          <FriendSearchModal onClose={onClose} />
        )}
      </div>
    </div>
  </div>
);

};

export default FriendModal;