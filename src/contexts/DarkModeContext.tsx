import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  resetDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  // localStorage에서 다크모드 설정 불러오기
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // HTML 요소에 다크모드 클래스 추가/제거
    const html = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark-mode');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => {
      const newValue = !prev;
      // localStorage에 저장
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      return newValue;
    });
  };

  // 로그아웃 시 다크모드 해제 함수
  const resetDarkMode = () => {
    setIsDarkMode(false);
    localStorage.removeItem('darkMode');
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, resetDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { useDarkMode, DarkModeProvider };
