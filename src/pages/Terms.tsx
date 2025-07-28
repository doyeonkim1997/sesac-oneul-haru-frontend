import React from 'react';
import Header from '../componets/ui/Header';
import CalendarSection from '../componets/ui/Calendar';
import DarkModeToggle from '../componets/ui/DarkModeToggle';
import MenuSection from '../componets/ui/MenuSection';
import ProfileSection from '../componets/ui/ProfileSection';
import Footer from '../componets/ui/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="pt-16"></div>
                {/* ProfileSection 컴포넌트 - 프로필 이미지, 닉네임, 팔로워 정보 */}
                <ProfileSection />
                <div className="mt-6"></div>
                {/* MenuSection 컴포넌트 - 내 목표 관리, 친구 관리, 설정 메뉴 */}
                <MenuSection />
                <div className="h-[12rem]"></div>
                <div className="relative pt-8">
                  {/* DarkModeToggle 컴포넌트 - 다크모드/라이트모드 토글 버튼 (절대 위치) */}
                  <div className="absolute -top-4 right-0">
                    <DarkModeToggle />
                  </div>
                  {/* CalendarSection 컴포넌트 - 월간 캘린더 */}
                  <CalendarSection />
                </div>
              </div>
            </aside>
            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <div className="pt-16 space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-15.5rem)] overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                      이용약관 및 정책
                    </h1>
                    <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed space-y-6">
                      {/* 서비스 이용약관 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          제1조 (서비스 이용약관)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            본 약관은 Haru 서비스(이하 "서비스")의 이용과 관련하여 서비스 제공자와
                            이용자 간의 권리, 의무 및 책임사항을 규정합니다.
                          </p>
                          <p>
                            서비스 이용자는 본 약관에 동의함으로써 서비스 이용에 필요한 모든 권한을
                            부여받습니다.
                          </p>
                          <p>
                            서비스 제공자는 서비스의 안정성과 보안을 위해 최선을 다하며, 이용자의
                            개인정보 보호를 위해 적절한 조치를 취합니다.
                          </p>
                        </div>
                      </section>

                      {/* 개인정보 처리방침 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          제2조 (개인정보 처리방침)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            <strong>수집하는 개인정보:</strong> 이메일 주소, 닉네임, 프로필 이미지,
                            목표 데이터, 북마크 정보
                          </p>
                          <p>
                            <strong>개인정보 보관 기간:</strong> 서비스 이용 종료 후 1년간 보관
                            (관련 법령에 따라 필요한 경우 더 오래 보관)
                          </p>
                          <p>
                            <strong>개인정보 이용 목적:</strong> 서비스 제공, 목표 관리, 친구 기능,
                            서비스 개선
                          </p>
                          <p>
                            <strong>개인정보 제3자 제공:</strong> 법령에 따른 경우를 제외하고는
                            이용자의 동의 없이 제3자에게 제공하지 않습니다.
                          </p>
                        </div>
                      </section>

                      {/* 목표 관리 정책 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제3조 (목표 관리 정책)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            이용자는 개인 목표를 설정하고 관리할 수 있으며, 목표 데이터는 서버에
                            안전하게 저장됩니다.
                          </p>
                          <p>
                            목표 완료 여부, 카테고리, 생성일시 등의 정보가 기록되며, 이용자가
                            언제든지 수정하거나 삭제할 수 있습니다.
                          </p>
                          <p>
                            친구와 목표를 공유할 수 있으며, 공유된 목표는 해당 친구에게만
                            표시됩니다.
                          </p>
                        </div>
                      </section>

                      {/* 친구 기능 정책 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제4조 (친구 기능 정책)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            이용자는 다른 사용자와 친구 관계를 맺을 수 있으며, 친구 요청은 상호
                            동의를 통해 이루어집니다.
                          </p>
                          <p>
                            친구의 목표를 북마크할 수 있으며, 북마크된 목표는 개인 북마크 목록에서
                            확인할 수 있습니다.
                          </p>
                          <p>
                            친구 관계 해제는 언제든지 가능하며, 해제 시 상호 접근 권한이 즉시
                            중단됩니다.
                          </p>
                        </div>
                      </section>

                      {/* 서비스 이용 제한 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제5조 (서비스 이용 제한)
                        </h2>
                        <div className="space-y-3">
                          <p>다음과 같은 경우 서비스 이용이 제한될 수 있습니다:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>타인의 권리를 침해하는 행위</li>
                            <li>서비스의 안정성을 해치는 행위</li>
                            <li>불법적인 목적으로 서비스를 이용하는 행위</li>
                            <li>다른 이용자에게 피해를 주는 행위</li>
                          </ul>
                        </div>
                      </section>

                      {/* 계정 관리 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제6조 (계정 관리)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            이용자는 자신의 계정 정보를 안전하게 관리해야 하며, 계정 도용이나 무단
                            사용에 대한 책임은 이용자에게 있습니다.
                          </p>
                          <p>
                            계정 탈퇴 시 모든 개인정보와 데이터는 즉시 삭제되며, 복구할 수 없습니다.
                          </p>
                          <p>
                            비밀번호 변경은 정기적으로 권장되며, 안전한 비밀번호 사용을 권장합니다.
                          </p>
                        </div>
                      </section>

                      {/* 서비스 변경 및 중단 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제7조 (서비스 변경 및 중단)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            서비스 제공자는 서비스 개선을 위해 서비스 내용을 변경할 수 있으며, 변경
                            시 사전 공지합니다.
                          </p>
                          <p>
                            정기 점검, 시스템 장애, 천재지변 등으로 인한 서비스 중단 시 최대한 빠른
                            복구를 위해 노력합니다.
                          </p>
                          <p>
                            서비스 종료 시 이용자에게 사전 통지하며, 개인정보는 법령에 따라
                            처리합니다.
                          </p>
                        </div>
                      </section>

                      {/* 책임 제한 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제8조 (책임 제한)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            서비스 제공자는 천재지변, 전쟁, 테러, 해킹 등 불가항력적 사유로 인한
                            서비스 중단에 대해 책임지지 않습니다.
                          </p>
                          <p>
                            이용자가 서비스를 통해 설정한 목표의 달성 여부에 대해서는 서비스
                            제공자가 책임지지 않습니다.
                          </p>
                          <p>
                            이용자 간의 분쟁은 당사자 간에 해결하며, 서비스 제공자는 중재 역할만
                            수행합니다.
                          </p>
                        </div>
                      </section>

                      {/* 약관 변경 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          제9조 (약관 변경)
                        </h2>
                        <div className="space-y-3">
                          <p>
                            본 약관은 서비스의 변경사항을 반영하여 수정될 수 있으며, 수정 시 서비스
                            내 공지사항을 통해 고지합니다.
                          </p>
                          <p>
                            약관 변경 후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로
                            간주합니다.
                          </p>
                          <p>중대한 변경사항의 경우 이메일을 통한 개별 통지도 함께 진행합니다.</p>
                        </div>
                      </section>

                      {/* 기타 */}
                      <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (기타)</h2>
                        <div className="space-y-3">
                          <p>
                            본 약관에 명시되지 않은 사항은 관련 법령 및 서비스 제공자가 정한
                            운영정책에 따릅니다.
                          </p>
                          <p>
                            본 약관과 관련된 분쟁이 발생할 경우, 서비스 제공자의 주소지를 관할하는
                            법원을 관할법원으로 합니다.
                          </p>
                          <p>본 약관은 2025년 8월 6일부터 시행됩니다.</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
