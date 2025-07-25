import React from 'react';
import CalendarSection from '../../componets/ui/Calendar';
import DarkModeToggle from '../../componets/ui/DarkModeToggle';
import MenuSection from '../../componets/ui/MenuSection';
import ProfileSection from '../../componets/ui/ProfileSection';

const MainHome: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800 overflow-hidden">
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a className="flex items-center space-x-2" href="#">
                <span className="material-icons text-blue-500 text-3xl">task_alt</span>
                <span className="text-xl font-bold text-gray-900">Haru</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">people</span>
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">favorite_border</span>
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <span className="material-icons text-2xl">refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            <aside className="col-span-3 flex flex-col">
              <div className="flex flex-col h-full space-y-6">
                <div className="pt-8"></div>
                <ProfileSection />
                <MenuSection />
                <div className="flex-grow"></div>
                <div className="flex justify-end mb-2">
                  <DarkModeToggle />
                </div>
                <CalendarSection />
              </div>
            </aside>
            <div className="col-span-9 flex flex-col overflow-hidden">
              <div className="bg-gray-50 flex-shrink-0">
                <div className="flex justify-center">
                  <nav className="flex">
                    <button className="relative px-6 py-4 text-base font-medium transition-colors text-gray-500 hover:text-gray-900 hover:bg-white">
                      전체
                    </button>
                    <button className="relative px-6 py-4 text-base font-bold transition-colors text-gray-900">
                      나<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                    </button>
                    <button className="relative px-6 py-4 text-base font-medium transition-colors text-gray-500 hover:text-gray-900 hover:bg-white">
                      친구
                    </button>
                  </nav>
                </div>
                <div className="border-b-2 border-gray-300 mx-6"></div>
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 검색바 공간 - 여백으로 대체 */}
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex justify-end">
                    <div className="relative">
                      {/* 검색창 제거하고 여백만 유지 */}
                      <div className="w-64 h-10"></div>
                    </div>
                  </div>
                </div>

                {/* 목표 목록 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-300">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user1 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJeSEHLf3AGAymfO0jRLhPhT6_Gf9bWxHc4AikLOBUGfgUobtBnAWz-dbumuqmgOJUOAj2pGwuoSDoCmfA18IOKqYAmtcpXAs0GIbeC912h6OuLKzerIYUA9SD0hrEROKTADA5ZAC3gaxiO0NOR7PHbU5Zqf43FRpsXBJ0hQw1U9XXvRmaZmxem-tjuz1vUTI7KmxzN7ZlRLkmhunSyqt0lznaE34Zl7ABqTnz0lgUDXfoVjFTZVGSEtDYwQi7tbkFJaAVff2k6mg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user1</span>
                                <span className="text-xs text-gray-400">2025-07-15 (화)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                멋진 웹 앱 만들기
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #공부
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #업무
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">미완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user2 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuATqzzJMmW73tf3mUq8vaPtD4FlBblyAvMtWfGJ_28G853nQD-g70wK3XKs1VHvUI4kxORxgRKV6gEgVL3V2fxc8-4R-K3Svu2W4aAtGgWyaLIStaXqgPsEOcqqTQPjAgIIGSN0IrYJIOu4Me7vMXjA1bXjHExIZ2DrGzd-VQpHaFZQHyDvuQB6X42Wohje63cev01mRsJ49pbrymvfbCBYY0jPmXz61svdkZzwIcdSAVRCuO4K3zsOuGlMgyWg0rgC-l8nk_z-LRI"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user2</span>
                                <span className="text-xs text-gray-400">2025-07-15 (화)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                매일 30분 운동하기
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #운동
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #건강
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user3 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK_Xt2kNT79FCayzaGQbyBSypaezXfXCOKhos2hzPLt_I2rzJIgw5TGnQlSsLfQEAYGjAJzWw78bUnifXSdFTVg916X94fzvnV2d90S8eAE1PHmIyHWjIdmnHLNQJQ6Xy_cRCu98hOyoxeF8nVZbWvbo9Vz_A3k9ccx6FsKzs_1bEVVgV-KQttOF8SN7oNYvsi6bJWr4R-a0hML7cT5THVHxtsZB75zMUpl_XxzaoUvKUCSws2GmKldKvZpySFAQUCKqlyDEwM-sE"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user3</span>
                                <span className="text-xs text-gray-400">2025-07-15 (화)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                책 1권 읽기
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #공부
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #취미
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">미완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user3 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHvQpJwngVCAEbF2HoAad5vPMI9wMKIMqljvuo8ncLRFkfXfdYzCNF5QNCIoERR5KQE2lJ8QAxr8_4JX4nODKBLAfkb2VZuk1TPsvYlqQg9WFqR3Y0kmhStgCGHNytAQZhwD10m6nBJy6HyIzJizOI2Stk532gdYqnUcHryEADj4p7rt-YxrskPVlNT4PpQb5sfE0Eq4wBQ4y8Br9gWbPh1hn-ppExZZYZOaBj5atOCl3s5oq1hX35n1zR8vaAa8BYT4B8g6mUQdI"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user4</span>
                                <span className="text-xs text-gray-400">2025-07-14 (월)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                블로그 포스팅 1개 작성
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #공부
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #업무
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">미완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user4 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxXs7vDKXMRvI3IZHHf5Ual3o0KgDnebg8JGYnS3N0bRmgVIPTB7HoOTX5ZkkKi1Hz3JMwW7WDKIcVbl3pO-tMjQrV8_8jJnB-MpiCl_wXTrc8adxUAF-7NE2m2-GOF88PNtm4xA_5RqMzvRMPgMwCXr2-VdePIbvy0qZ9aWcRAWZfR0_DYpHJzgZPB-wW5EklI___Z1ePt2SfQvrvEVcNsVQaV_-6naKmZ523fItMRU6mLabXPoPUGQZBDS3OdHUFqA_ov8DiNdE"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user5</span>
                                <span className="text-xs text-gray-400">2025-07-13 (일)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                일본어 공부하기
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #공부
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #취미
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">미완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-blue-50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                      <div className="flex items-start space-x-6 pl-2">
                        <img
                          alt="user5 프로필 이미지"
                          className="h-16 w-16 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJeSEHLf3AGAymfO0jRLhPhT6_Gf9bWxHc4AikLOBUGfgUobtBnAWz-dbumuqmgOJUOAj2pGwuoSDoCmfA18IOKqYAmtcpXAs0GIbeC912h6OuLKzerIYUA9SD0hrEROKTADA5ZAC3gaxiO0NOR7PHbU5Zqf43FRpsXBJ0hQw1U9XXvRmaZmxem-tjuz1vUTI7KmxzN7ZlRLkmhunSyqt0lznaE34Zl7ABqTnz0lgUDXfoVjFTZVGSEtDYwQi7tbkFJaAVff2k6mg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">@user6</span>
                                <span className="text-xs text-gray-400">2025-07-12 (토)</span>
                              </div>
                              <p className="text-xl font-medium text-gray-800 mt-4 mb-6">
                                요리 레시피 10개 만들기
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #취미
                                </span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                  #재정
                                </span>
                              </div>
                            </div>
                            <div className="relative flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-yellow-500">
                                <span className="material-icons">bookmark_border</span>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                <span className="material-icons">more_horiz</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-base font-medium text-gray-700">미완료</span>
                          <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1"></span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <span className="material-icons">favorite_border</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-gray-500">
            <span className="font-bold">(로고) Haru</span> |{' '}
            <a className="hover:underline" href="#">
              Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainHome;
