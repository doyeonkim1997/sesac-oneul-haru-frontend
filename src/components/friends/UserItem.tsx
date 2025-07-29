interface User {
  id: string;
  nickname: string;
  email: string;
  imageUrl?: string;
  unreadCount?: number; // 읽지 않은 알림 수
}

const UserItem: React.FC<{ user: User; onDelete: (id: string) => void; onNicknameClick?: (user: User) => void }> = ({
  user,
  onDelete,
  onNicknameClick,
}) => {
  return (
    <div className="m-2 flex items-center p-2 border-b border-gray-200 last:border-b-0 h-[80px]">
      {/* 이미지 */}
      <div className="mb-4 relative w-15 h-15 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={`${user.nickname} 프로필`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-600">이미지</span>
        )}
        {user.unreadCount && user.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {user.unreadCount}
          </span>
        )}
      </div>

      {/* 사용자 정보 */}
      <div className="mb-8 ml-4 flex-grow">
        <div className="flex items-center text-gray-800 font-semibold text-base">
          {/* 닉네임 클릭 시 이벤트 */}
          <button
            onClick={() => onNicknameClick?.(user)}
            className="hover:underline hover:text-sky-400"
          >
            {user.nickname}
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete(user.id)}
            className="ml-2 px-2 py-0.5 text-xs bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            삭제
          </button>
        </div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
};

export default UserItem;