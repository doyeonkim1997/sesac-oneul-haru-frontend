import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoals } from './GoalContext';

interface ToastContextType {
  showToast: (message: string, type: 'warning' | 'error' | 'info') => void;
  hideToast: () => void;
  isVisible: boolean;
  currentMessage: string;
  currentType: 'warning' | 'error' | 'info';
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentType, setCurrentType] = useState<'warning' | 'error' | 'info'>('warning');
  const { goals } = useGoals();

  // 오늘 목표가 완료되지 않았는지 확인하는 함수
  const hasIncompleteTodayGoal = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayGoals = goals.filter((goalWithUser) => {
      const goalDate = goalWithUser.goal.created_at.split(' ')[0];
      return goalWithUser.goal.user_id === 1 && goalDate === today;
    });

    return (
      todayGoals.length > 0 && todayGoals.some((goalWithUser) => !goalWithUser.goal.is_completed)
    );
  };

  // 자동 알림 체크 함수
  const checkForNotifications = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // 오후 11시(23시)에 알림 표시
    if (currentHour === 23 && currentMinute === 0) {
      if (hasIncompleteTodayGoal()) {
        showToast('자정까지 1시간 남았습니다.', 'warning');
      }
    }
  };

  // 1분마다 알림 체크
  useEffect(() => {
    const interval = setInterval(checkForNotifications, 60000); // 1분마다 체크
    return () => clearInterval(interval);
  }, [goals]);

  // 컴포넌트 마운트 시에도 한 번 체크
  useEffect(() => {
    checkForNotifications();
  }, [goals]);

  const showToast = (message: string, type: 'warning' | 'error' | 'info') => {
    setCurrentMessage(message);
    setCurrentType(type);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        isVisible,
        currentMessage,
        currentType,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
