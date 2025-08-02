import React from "react";
import FriendCalendar from "./FriendCalendar";
import { type User } from "../friends/UserItem";

interface FriendProfileModalProps {
  user: User;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const FriendProfileModal: React.FC<FriendProfileModalProps> = ({ user, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 ">
      <div className="bg-white p-6 pr-10 rounded-xl w-full max-w-sm overflow-y-auto shadow-lg relative flex flex-col gap-1 shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* 프로필 정보 */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="프로필" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-600">이미지</div>
            )}
          </div>
          <div className="flex flex-col -mt-1.5"> {/* flex-col 추가로 세로 배치 */}
            <div className="text-lg font-bold">{user.nickName}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <button
              onClick={() => onDelete(user.userId)}
              className="mt-2 px-2 py-0.5 text-xs bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors w-max"
            >
              삭제
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-0">
          <FriendCalendar userId={user.userId} />
        </div>
      </div>
    </div>
  );
};

export default FriendProfileModal;
