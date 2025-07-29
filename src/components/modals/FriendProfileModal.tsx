import React from "react";
import FriendCalendar from "./FriendCalendar";

interface User {
  id: string;
  nickname: string;
  email: string;
  imageUrl?: string;
}

interface FriendProfileModalProps {
  user: User;
  onClose: () => void;
}

const FriendProfileModal: React.FC<FriendProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 ">
      <div className="bg-white p-6 pr-10 rounded-xl w-full max-w-sm overflow-y-auto shadow-lg relative flex flex-col gap-6 shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 hover:text-black text-2xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* 프로필 정보 */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="프로필" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-600">이미지</div>
            )}
          </div>
          <div>
            <div className="text-lg font-bold">{user.nickname}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <FriendCalendar userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default FriendProfileModal;
