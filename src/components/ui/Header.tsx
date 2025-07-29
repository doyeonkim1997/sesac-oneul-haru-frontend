import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from "react";
import FriendModal from '../modals/FriendModal';
import HeartModal from '../modals/HeartModal';

const Header = () => {
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
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

          <div className="flex items-center space-x-6 text-gray-900">
            <button className="hover:text-sky-400" onClick={() => setShowFriendModal(true)}>
              <span className="material-icons !text-[28px] translate-y-[3px]">people</span>
            </button>
            {showFriendModal && <FriendModal onClose={() => setShowFriendModal(false)} />}

            <button
              className="hover:text-sky-400"
              onClick={() => setShowHeartModal(true)}>
              <span className="material-icons !text-[28px] translate-y-[2.5px]">favorite_border</span>
            </button>
            {showHeartModal && <HeartModal onClose={() => setShowHeartModal(false)} />}

            <button
              className="hover:text-sky-400"
              onClick={() => {
                // 임시
                localStorage.removeItem('authToken');
                // 로그인 페이지 이동
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
  )
}

export default Header;