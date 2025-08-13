import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ToastNotification: React.FC = () => {
  const [sseMessage, setSseMessage] = useState<string>('');
  const [showSseToast, setShowSseToast] = useState(false);
  const { accessToken } = useAuth();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const connectSSE = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/notifications/sse`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'text/event-stream',
            },
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`SSE 연결 실패: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const message = line.slice(6);

              setSseMessage(message);
              setShowSseToast(true);

              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                setShowSseToast(false);
              }, 5000);
            }
          }
        }
      } catch (error) {
        if (signal.aborted) return; // 중단된 경우 무시
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowSseToast(false);

        // 3초 후 재연결 시도
        setTimeout(() => {
          connectSSE();
        }, 3000);
      }
    };

    connectSSE();

    return () => {
      abortControllerRef.current?.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowSseToast(false);
    };
  }, [accessToken]);

  const handleSseClose = () => {
    setShowSseToast(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <>
      {showSseToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-95 w-80 max-w-sm transform transition-all duration-300 translate-x-0 opacity-100 hover:scale-[1.02] hover:shadow-3xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 text-sky-500 dark:text-sky-400">
                  <span
                    className="material-icons !text-2xl"
                    style={{ fontSize: '1.5rem !important' }}
                  >
                    notifications
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    목표 미완료 알림
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    오늘의 목표가 완료되지 않았습니다.
                  </p>
                </div>
              </div>
              <button
                onClick={handleSseClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span
                  className="material-icons !text-xl"
                  style={{ fontSize: '1.25rem !important' }}
                >
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastNotification;