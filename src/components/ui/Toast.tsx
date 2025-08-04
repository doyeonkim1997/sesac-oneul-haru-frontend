import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
};

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className="text-white px-4 py-3 rounded
                   bg-sky-400 shadow-lg shadow-sky-400/50
                   text-sm font-medium"
      >
        {message}
      </div>
    </div>
  );
}