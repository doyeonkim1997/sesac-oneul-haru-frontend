import React, { useState, useEffect } from "react";

interface FriendCalendarProps {
  userId: string;
}

const FriendCalendar: React.FC<FriendCalendarProps> = ({ userId }) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      // 연도나 월이 달라졌는지 확인
      if (
        now.getFullYear() !== today.getFullYear() ||
        now.getMonth() !== today.getMonth()
      ) {
        setToday(now);
      }
    }, 1000 * 60); // 1분마다 확인

    return () => clearInterval(timer);
  }, [today]);

  const year = today.getFullYear();
  const month = today.getMonth(); // 0부터 시작
  const currentDate = today.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const totalCells = firstDayOfMonth + lastDate;
  const calendarDates = Array.from({ length: totalCells }, (_, i) => {
    const date = i - firstDayOfMonth + 1;
    return date > 0 ? date : null;
  });

  return (
    <div className="mt-8 flex justify-center">
      <div className="grid grid-cols-7 gap-0 text-[13px] text-center text-gray-800 w-[252px] mx-auto">
        {calendarDates.map((date, index) => {
          if (date === null) {
            return <div key={index} className="w-6 h-6" />;
          }

          const isToday = date === currentDate;
          const checkedDates = [1, 2, 3, 4, 11, 12, 16, 17]; // 임시 데이터
          const isChecked = checkedDates.includes(date);

          return (
            <div
              key={index}
              className={`
                w-10 h-10 flex items-center justify-center
                ${isToday ? 'bg-sky-400 text-white rounded-full' : ''}
                ${isChecked ? 'bg-sky-200' : ''}
              `}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendCalendar;