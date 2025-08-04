const HeartModal = ({ onClose, todayCount, totalCount }: { onClose: () => void; todayCount: number; totalCount: number; }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-95 hover:shadow-2xl w-full max-w-md p-6 relative transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">응원 현황</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <span className="material-icons text-[22px]">close</span>
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-200 space-y-2">
          <p>:하트2: 오늘 받은 응원: <strong>{todayCount}개</strong></p>
          <p>:하트2: 누적 응원: <strong>{totalCount}개</strong></p>
        </div>
      </div>
    </div>
  );
};
export default HeartModal;