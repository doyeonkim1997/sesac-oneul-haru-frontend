// Footer 컴포넌트
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 flex-shrink-0">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-gray-500">
          {/* 왼쪽: Haru 로고 */}
          <div className="font-bold">Haru</div>

          {/* 오른쪽: 개발자 이메일과 이용약관 */}
          <div className="flex items-center space-x-4">
            <a href="mailto:developer@gmail.com" className="hover:underline">
              developer@gmail.com
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
