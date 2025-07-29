import React, { useState, useEffect } from 'react';
import { useGoals } from '../../contexts/GoalContext';

interface ToastNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type: 'warning' | 'error' | 'info';
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  isVisible,
  onClose,
  message,
  type = 'warning',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 완료 후 닫기
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-95 w-80 max-w-sm transform transition-all duration-300 ${
          isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`flex-shrink-0 ${getIconColor()}`}>
              <span className="material-icons !text-2xl" style={{ fontSize: '1.5rem !important' }}>
                {type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'info'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                목표 완료 알림
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{message}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="material-icons !text-xl" style={{ fontSize: '1.25rem !important' }}>
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
