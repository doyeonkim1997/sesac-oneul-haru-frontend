// 다크모드 토글 컴포넌트
import { useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
      title="라이트/다크모드 토글"
    >
      <span className="material-icons text-sm text-gray-600">
        {isDarkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
