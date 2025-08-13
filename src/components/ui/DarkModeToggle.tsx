// 다크모드 토글 컴포넌트
import { useDarkMode } from '../../contexts/DarkModeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
      title="라이트/다크모드 토글"
    >
      {/* 토글 스위치 배경 */}
      <div className="absolute inset-0 rounded-full transition-colors duration-200"></div>

      {/* 토글 스위치 핸들 */}
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 flex items-center justify-center ${
          isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      >
        <span className="material-icons text-xs text-gray-600 dark:text-gray-300">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </div>
    </button>
  );
};

export default DarkModeToggle;
