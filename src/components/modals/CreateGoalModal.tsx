import React, { useState, useEffect } from 'react';
import { GOAL_CATEGORIES, CATEGORY_DISPLAY_NAMES, type GoalCategory } from '../../data/goals';
import { getImageUrl, getNickName } from '../../api/axiosInstance';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goalData: { title: string; content: string; category: string }) => void;
  mode?: 'create' | 'edit';
  goalToEdit?: {
    goal_id: number;
    content: string;
    category: string;
  };
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = 'create',
  goalToEdit,
}) => {
  const [goalContent, setGoalContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | ''>('');

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (mode === 'edit' && goalToEdit) {
      setGoalContent(goalToEdit.content);
      setSelectedCategory(goalToEdit.category as GoalCategory);
    }
  }, [mode, goalToEdit]);

  const categories = Object.entries(GOAL_CATEGORIES).map(([key, value]) => ({
    id: value,
    name: CATEGORY_DISPLAY_NAMES[value],
    tag: `#${CATEGORY_DISPLAY_NAMES[value]}`,
  }));

  const handleSubmit = () => {
    if (goalContent.trim() && selectedCategory) {
      onSubmit({
        title: goalContent.trim(), // title과 content를 동일하게 설정
        content: goalContent.trim(),
        category: selectedCategory,
      });
      // 수정 모드가 아닐 때만 초기화
      if (mode !== 'edit') {
        setGoalContent('');
        setSelectedCategory('');
      }
      onClose();
    }
  };

  const handleCancel = () => {
    // 수정 모드가 아닐 때만 초기화
    if (mode !== 'edit') {
      setGoalContent('');
      setSelectedCategory('');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-95 hover:shadow-2xl transition-transform duration-300 w-full max-w-lg mx-4 transform hover:scale-[1.01]">
        {/* User 정보 및 입력 박스 */}
        <div className="flex items-start space-x-6 pl-2">
          {/* 이미지 */}
          <img
            alt="프로필 이미지"
            className="h-18 w-18 rounded-full object-cover"
            src={import.meta.env.VITE_BACKEND_ADDRESS + (getImageUrl() || '')}
          />

          {/* 텍스트 + 입력 박스 */}
          <div className="flex-1 ml-1 ">
            {/* 닉네임 */}
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                @{getNickName() || '사용자'}
              </span>
              <span className="text-gray-400 dark:text-gray-500">(ME)</span>
            </div>

            {/* 입력 박스 */}
            <textarea
              value={goalContent}
              onChange={(e) => setGoalContent(e.target.value)}
              placeholder="오늘 하루 목표는 무엇인가요?"
              className="mt-3 w-full h-28 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 resize-none text-xl font-medium text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Tag Selection Section */}
        <div className="mt-6 mb-6 pl-[108px]">
          <p className="text-gray-900 dark:text-white font-semibold mb-3">태그를 선택하세요!</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-sky-400 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center space-x-4 pl-24">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!goalContent.trim() || !selectedCategory}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              goalContent.trim() && selectedCategory
                ? 'bg-sky-400 hover:bg-sky-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {mode === 'edit' ? '수정' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;
