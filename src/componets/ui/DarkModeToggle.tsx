// 다크모드 토글 컴포넌트
import { useDarkMode } from '../../contexts/DarkModeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    console.log('다크모드 토글 클릭됨, 현재 상태:', isDarkMode);
    toggleDarkMode();
    console.log('토글 후 상태:', !isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
      title="라이트/다크모드 토글"
    >
      <span className="material-icons text-sm text-gray-600 dark:text-gray-300">
        {isDarkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
