// 캘린더 섹션 컴포넌트
const CalendarSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <span className="material-icons">chevron_left</span>
        </button>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">7월 2025</h3>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        <div className="text-gray-500 dark:text-gray-400">일</div>
        <div className="text-gray-500 dark:text-gray-400">월</div>
        <div className="text-gray-500 dark:text-gray-400">화</div>
        <div className="text-gray-500 dark:text-gray-400">수</div>
        <div className="text-gray-500 dark:text-gray-400">목</div>
        <div className="text-gray-500 dark:text-gray-400">금</div>
        <div className="text-gray-500 dark:text-gray-400">토</div>
        <div className="text-gray-400"></div>
        <div className="text-gray-400"></div>
        <div className="p-1">
          <span className="cursor-pointer">1</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">2</span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">4</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">5</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">6</span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
            7
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">8</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">9</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">10</span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
            11
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">12</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">13</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">14</span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
            15
          </span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
            16
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">17</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">18</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">19</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">20</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">21</span>
        </div>
        <div className="p-1">
          <span className="bg-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
            22
          </span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">23</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">24</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">25</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">26</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">27</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">28</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">29</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">30</span>
        </div>
        <div className="p-1">
          <span className="cursor-pointer">31</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;