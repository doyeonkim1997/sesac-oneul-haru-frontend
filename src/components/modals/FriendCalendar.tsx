import React from "react";

interface FriendCalendarProps {
  userId: string;
}

// 회색 일정 박스로 표시할 날짜들
const grayDates = [1, 2, 3, 4, 11, 12, 16, 17];

const FriendCalendar: React.FC<FriendCalendarProps> = ({ userId }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0~11 (주의!)
  const currentDate = today.getDate();

  // 이번 달의 1일 요일 (0: 일, 1: 월, ..., 6: 토)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // 이번 달 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 달력에 들어갈 전체 날짜 수 (빈 칸 포함)
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
      const isGray = grayDates.includes(date);

      return (
        <div
          key={index}
          className={`
            w-10 h-10 flex items-center justify-center
            ${isToday ? 'bg-gray-800 text-white rounded-full' : ''}
            ${isGray ? 'bg-gray-300' : ''}
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
