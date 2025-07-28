import React, { useState, useEffect } from 'react';
import { GOAL_CATEGORIES, CATEGORY_DISPLAY_NAMES, type GoalCategory } from '../../data/goals';

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-95 hover:shadow-3xl transition-all duration-300 w-full max-w-lg mx-4 transform hover:scale-[1.02]">
        {/* Header/User Section */}
        <div className="flex items-start space-x-6 pl-2 mb-6">
          <img
            alt="프로필 이미지"
            className="h-16 w-16 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-white">@닉네임</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">(ME)</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              | {mode === 'edit' ? '목표를 수정해주세요' : '오늘 하루 목표는 무엇인가요?'}
            </p>
          </div>
        </div>

        {/* Goal Content Input */}
        <div className="mb-6 pl-24">
          <textarea
            value={goalContent}
            onChange={(e) => setGoalContent(e.target.value)}
            placeholder="목표를 입력해주세요..."
            className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 resize-none text-xl font-medium text-gray-800 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Tag Selection Section */}
        <div className="mb-6 pl-24">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">태그를 선택하세요!</p>
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
