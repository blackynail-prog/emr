import { FC } from 'hono/jsx';

/**
 * 병원별 접속 코드 입력 페이지
 * 모바일 퍼스트, 한 손 조작 가능
 */
export const HospitalLoginPage: FC<{
  hospitalSlug: string;
  hospitalName: string;
  hospitalLogo: string;
  errorMessage?: string;
}> = ({ hospitalSlug, hospitalName, hospitalLogo, errorMessage }) => {
  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 헤더 */}
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-2xl mx-auto px-4 py-4">
          <div class="flex items-center gap-3">
            <a
              href="/"
              class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            >
              <i class="fas fa-arrow-left text-gray-600 text-lg"></i>
            </a>
            <div class="flex-1 text-center pr-10">
              <div class="text-sm font-bold text-gray-900">실습 오리엔테이션</div>
              <div class="text-xs text-gray-600">접속 코드 입력</div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main class="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* 병원 정보 카드 */}
        <div class="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={hospitalLogo}
                alt={hospitalName}
                class="max-w-full max-h-full object-contain p-2"
              />
            </div>
            <div class="flex-1">
              <div class="text-xs text-blue-600 font-medium mb-1">선택된 실습 병원</div>
              <h1 class="text-lg font-bold text-gray-900 leading-tight whitespace-pre-line">
                {hospitalName}
              </h1>
            </div>
          </div>
        </div>

        {/* 접속 코드 입력 폼 */}
        <form method="POST" action="/auth/login" class="space-y-4">
          {/* 숨겨진 필드: hospitalSlug */}
          <input type="hidden" name="hospitalSlug" value={hospitalSlug} />

          {/* 에러 메시지 */}
          {errorMessage && (
            <div class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div class="flex items-start gap-3">
                <i class="fas fa-exclamation-circle text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
                <div class="flex-1">
                  <p class="text-sm font-bold text-red-900 mb-1">접속 코드가 올바르지 않습니다</p>
                  <p class="text-xs text-red-700">본인의 실습 병원 접속 코드를 다시 확인하세요.</p>
                </div>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p class="text-sm text-blue-900 leading-relaxed">
              <i class="fas fa-info-circle mr-2"></i>
              담당 교수님께 전달받은 <strong>{hospitalName}</strong> 전용 접속 코드를 입력하세요.
            </p>
          </div>

          {/* 입력 필드 */}
          <div>
            <label for="accessCode" class="block text-sm font-bold text-gray-900 mb-2">
              접속 코드
            </label>
            <input
              type="text"
              id="accessCode"
              name="accessCode"
              required
              autofocus
              autocomplete="off"
              placeholder="예: SWCN_CMC2026"
              class="w-full h-14 px-4 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all touch-manipulation"
            />
            <p class="mt-2 text-xs text-gray-500">
              <i class="fas fa-lock mr-1"></i>
              접속 코드는 대소문자를 구분합니다
            </p>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            class="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold rounded-xl transition-all shadow-sm hover:shadow-md touch-manipulation"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            접속하기
          </button>
        </form>

        {/* 하단 안내 */}
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p class="text-xs text-yellow-900 leading-relaxed">
            <i class="fas fa-shield-alt mr-2"></i>
            접속 코드는 타 병원 학생과 공유하지 마세요. 부정 접속 시 실습 평가에 불이익이 있을 수 있습니다.
          </p>
        </div>
      </main>

      {/* 푸터 */}
      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-2xl mx-auto px-4 py-4 text-center">
          <p class="text-xs text-gray-500">
            문의: <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:underline">sanhak@snjc.ac.kr</a>
          </p>
        </div>
      </footer>
    </div>
  );
};
