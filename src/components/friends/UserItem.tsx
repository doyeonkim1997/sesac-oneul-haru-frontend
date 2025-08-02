export interface User {
  userId: number;
  requestId: number;
  nickName: string;
  email: string;
  image?: {
    imageUrl: string;
  };
  unreadCount?: number; // 읽지 않은 알림 수?
}

const UserItem: React.FC<{ user: User; onDelete: (requestId: number) => void; onNickNameClick?: (user: User) => void }> = ({
  user,
  onDelete,
  onNickNameClick,
}) => {
  return (
  <div className="m-3 flex items-center p-4 border-b border-gray-300 last:border-b-0 h-[100px]">
    {/* 이미지 */}
    <div className="mb-4 relative w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
      {user.image?.imageUrl ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_ADDRESS}${user.image.imageUrl}`}
          alt={`${user.nickName} 프로필`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-base text-gray-600">이미지</span>
      )}

      {user.unreadCount && user.unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {user.unreadCount}
        </span>
      )}
    </div>

    {/* 사용자 정보 */}
    <div className="mb-8 ml-6 flex-grow">
      <div className="flex items-center text-gray-800 font-semibold text-lg">
        <button
          onClick={() => onNickNameClick?.(user)}
          className="hover:underline hover:text-sky-500"
        >
          {user.nickName}
        </button>

        <button
          onClick={() => onDelete(user.requestId)}
          className="ml-3 px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
        >
          삭제
        </button>
      </div>
    <div className="text-base text-gray-600">{user.email}</div>
  </div>
</div>
);
};

export default UserItem;