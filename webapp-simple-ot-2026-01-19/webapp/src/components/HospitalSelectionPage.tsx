import { FC } from 'hono/jsx';

/**
 * 병원 선택 페이지 (첫 화면)
 * 모바일 퍼스트, 큰 터치 영역, 병원 포털 느낌
 */
export const HospitalSelectionPage: FC = () => {
  const hospitals = [
    {
      slug: 'uijeongbu',
      name: '가톨릭대학교',
      subName: '의정부성모병원',
      logo: '/images/uijeongbu.png',
      practiceDate: '실습 3/4 ~ 3/15',
      otDate: 'OT 3/3(월) 10:00',
      color: 'blue'
    },
    {
      slug: 'ilsan',
      name: '국민건강보험공단',
      subName: '일산병원',
      logo: '/images/ilsan.png',
      practiceDate: '실습 3/18 ~ 3/29',
      otDate: 'OT 미정',
      color: 'green'
    },
    {
      slug: 'gangdong',
      name: '강동경희대학교병원',
      subName: '',
      logo: '/images/gangdong.png',
      practiceDate: '실습 4/1 ~ 4/12',
      otDate: 'OT 3/31(월) 09:30',
      color: 'purple'
    }
  ];

  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-2xl mx-auto px-4 py-4 sm:py-5">
          <div class="text-center">
            <img 
              src="/images/snjc-logo.png" 
              alt="서울여자간호대학교" 
              class="h-10 sm:h-12 mx-auto mb-2"
            />
            <div class="text-sm sm:text-base font-bold text-gray-900">실습 오리엔테이션 포털</div>
            <div class="text-xs text-gray-600 mt-1">Clinical Practice Portal</div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main class="flex-1 max-w-2xl mx-auto w-full px-4 py-6 sm:py-8">
        {/* 안내 문구 */}
        <div class="mb-6 sm:mb-8 text-center">
          <div class="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 border border-blue-200">
            <i class="fas fa-user-graduate mr-2"></i>
            민수 전용 실습 포털
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            이번 학기 실습 병원 선택
          </h1>
          <p class="text-sm sm:text-base text-gray-600">
            본인의 실습 병원을 선택하세요
          </p>
        </div>

        {/* 병원 카드 그리드 */}
        <div class="space-y-4 sm:space-y-5">
          {hospitals.map(hospital => (
            <a
              href={`/hospital/${hospital.slug}/login`}
              class="block bg-white border-2 border-gray-200 rounded-xl p-5 sm:p-6 hover:border-blue-400 hover:shadow-lg active:scale-[0.98] transition-all touch-manipulation"
            >
              {/* 상단: 병원명 + 로고 */}
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1 min-w-0">
                  <h2 class="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-0.5">
                    {hospital.name}
                  </h2>
                  {hospital.subName && (
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      {hospital.subName}
                    </h3>
                  )}
                </div>
                <div class="flex-shrink-0 ml-4">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                    <img
                      src={hospital.logo}
                      alt={hospital.name}
                      class="max-w-full max-h-full object-contain p-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* 중단: 실습 정보 */}
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-700">
                  <i class="fas fa-calendar-alt w-5 text-gray-400"></i>
                  <span class="ml-2">{hospital.practiceDate}</span>
                </div>
                <div class="flex items-center text-sm text-gray-700">
                  <i class="fas fa-clock w-5 text-gray-400"></i>
                  <span class="ml-2">{hospital.otDate}</span>
                </div>
              </div>

              {/* 하단: 선택 버튼 */}
              <div class="pt-3 border-t border-gray-200">
                <div class="flex items-center justify-center text-blue-600 font-medium text-sm sm:text-base">
                  <span>선택하기</span>
                  <i class="fas fa-chevron-right ml-2 text-sm"></i>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 하단 안내 */}
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-xs sm:text-sm text-blue-900 leading-relaxed text-center">
            <i class="fas fa-info-circle mr-2"></i>
            병원 선택 후 접속 코드를 입력하시면 해당 병원의 OT 자료를 확인하실 수 있습니다.
          </p>
        </div>
      </main>

      {/* 푸터 */}
      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-2xl mx-auto px-4 py-6 text-center">
          <div class="text-xs text-gray-500 space-y-1">
            <p>서울여자간호대학교 산학협력처</p>
            <p>
              문의: <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:underline">sanhak@snjc.ac.kr</a>
            </p>
            <p class="text-gray-400 mt-2">© 2026 SWCN Clinical Practice Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
