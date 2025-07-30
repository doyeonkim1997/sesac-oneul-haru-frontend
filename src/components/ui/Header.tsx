import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FriendModal from '../modals/FriendModal';
import HeartModal from '../modals/HeartModal';

const MAX_CHEER_COUNT: number = 15;

const getHeartColor = (count: number): string => {
  if (count === 0) {
    return 'rgb(0, 0, 0)'; // cheerCount 0일 땐 검정색
  }

  const intensity = Math.min(count / MAX_CHEER_COUNT, 1);

  const start = { r: 255, g: 180, b: 190 };
  const end = { r: 255, g: 60, b: 158 };

  const r = Math.round(start.r + (end.r - start.r) * intensity);
  const g = Math.round(start.g + (end.g - start.g) * intensity);
  const b = Math.round(start.b + (end.b - start.b) * intensity);

  return `rgb(${r}, ${g}, ${b})`;
};

const Header = () => {
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  // 테스트용 (실제론 props나 context에서)
  const [cheerCount, setCheerCount] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/main" className="flex items-baseline space-x-2">
              <img
                src={logo}
                alt="logo"
                className="w-[23px] h-[23px] object-contain translate-y-[0.25px]"
              />
              <span className="ml-[2px] text-[32px] font-bold leading-none font-stretch-expanded text-gray-900 dark:text-white hover:!text-sky-400 dark:hover:!text-sky-400">
                Haru
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-gray-900 dark:text-white">
            {/* 임시 버튼 */}
            <button onClick={() => setCheerCount(prev => Math.min(prev + 1, 100))}>
              임시 버튼 (+1)
            </button>

            <button className="hover:text-sky-400" onClick={() => setShowFriendModal(true)}>
              <span className="material-icons !text-[28px] translate-y-[3px]">people</span>
            </button>
            {showFriendModal && <FriendModal onClose={() => setShowFriendModal(false)} />}

            <button
              className="hover:text-sky-400"
              onClick={() => setShowHeartModal(true)}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
            >
              <span
                className="material-icons !text-[28px] translate-y-[2.5px]"
                style={{ color: isHeartHovered ? 'rgb(56, 189, 248)' : getHeartColor(cheerCount) }}
              >
                {cheerCount === 0 ? 'favorite_border' : 'favorite'}
              </span>
            </button>
            {showHeartModal && <HeartModal onClose={() => setShowHeartModal(false)} />}

            <button
              className="hover:text-sky-400"
              onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
              }}
              aria-label="로그아웃 버튼"
            >
              <span className="material-icons !text-[28px] translate-y-[2.5px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;