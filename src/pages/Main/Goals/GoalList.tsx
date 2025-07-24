import React, { useState } from 'react';

const GoalList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['전체', '미완료', '완료'];

  // 더미 목표 데이터
  const goals = [
    {
      id: 1,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 5,
      isCompleted: false,
    },
    {
      id: 2,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 3,
      isCompleted: true,
    },
    {
      id: 3,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 7,
      isCompleted: false,
    },
    {
      id: 4,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 2,
      isCompleted: false,
    },
    {
      id: 5,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 4,
      isCompleted: true,
    },
    {
      id: 6,
      nickname: '닉네임',
      content: '텍스트를 입력해 주세요.',
      date: '2025-00-00 (월)',
      supporters: 6,
      isCompleted: false,
    },
  ];

  const filteredGoals = goals.filter((goal) => {
    if (activeTab === '전체') return true;
    if (activeTab === '완료') return goal.isCompleted;
    if (activeTab === '미완료') return !goal.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 탭 */}
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-1 py-2 text-base font-medium transition-colors ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* 검색바 */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400">search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 목표 목록 */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-6">
                {/* 프로필 이미지 */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">이미지</span>
                  </div>
                </div>

                {/* 목표 내용 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="font-semibold text-gray-800">@{goal.nickname} (ME)</span>
                  </div>

                  <p className="text-xl font-medium text-gray-800 mb-4">{goal.content}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{goal.date}</span>
                    <span className="text-sm text-gray-600">
                      @, @님 외 {goal.supporters}명이 응원합니다!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalList;
