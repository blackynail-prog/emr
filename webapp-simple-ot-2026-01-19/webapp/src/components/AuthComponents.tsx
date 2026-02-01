import { FC } from 'hono/jsx';

/**
 * 공식 대학 포털 스타일 로그인 페이지
 */
export const LoginPage: FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  return (
    <div class="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* 로딩 스플래시 */}
      <div 
        id="loading-splash" 
        class="fixed inset-0 bg-white z-50 flex items-center justify-center"
        style="display: none;"
      >
        <div class="text-center">
          <div class="flex justify-center mb-6">
            <img 
              id="splash-logo"
              src="/images/snjc-logo.png" 
              alt="병원 로고" 
              class="h-16 object-contain"
            />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            병원 확인 중<span id="loading-dots">...</span>
          </h2>
          <p class="text-sm text-gray-600">잠시만 기다려주세요</p>
          <div class="mt-6 flex justify-center space-x-2">
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
            <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
          </div>
        </div>
      </div>

      {/* 상단 헤더 - 공식 시스템 느낌 */}
      <header class="bg-white border-b border-gray-200 py-4">
        <div class="max-w-5xl mx-auto px-6 flex items-center">
          <img 
            src="/images/snjc-logo.png" 
            alt="Seoul Women's College of Nursing" 
            class="h-10 object-contain mr-4"
          />
          <div>
            <div class="text-sm font-semibold text-gray-900">Seoul Women's College of Nursing</div>
            <div class="text-xs text-gray-600">Clinical Practice Orientation System</div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="w-full max-w-md">
          {/* 중앙 카드 */}
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div class="px-8 py-8">
              {/* 제목 */}
              <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                  실습 오리엔테이션 안내
                </h1>
                <div class="w-12 h-1 bg-blue-600 mx-auto mb-4"></div>
                <p class="text-sm text-gray-600 leading-relaxed">
                  본 시스템은 서울여자간호대학교 병원 실습 학생 전용입니다.<br/>
                  인가되지 않은 접근은 제한됩니다.
                </p>
              </div>

              {/* 병원명 표시 영역 (동적) */}
              <div id="hospital-name-container" class="mb-4" style="display: none;">
                <div class="bg-green-50 border border-green-200 rounded-md px-4 py-3 flex items-center space-x-2">
                  <i class="fas fa-check-circle text-green-600"></i>
                  <div class="flex-1">
                    <div class="text-xs text-green-700 font-medium">실습 병원 확인됨</div>
                    <div id="hospital-name" class="text-sm font-bold text-green-800"></div>
                  </div>
                </div>
              </div>

              {/* 로그인 폼 */}
              <form method="POST" action="/auth/login" id="login-form">
                {/* 에러 메시지 */}
                {errorMessage && (
                  <div class="mb-4 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                    <div class="flex items-start space-x-2">
                      <i class="fas fa-exclamation-circle text-red-600 mt-0.5"></i>
                      <div class="flex-1">
                        <p class="text-sm text-red-800 font-medium">접속코드가 올바르지 않습니다.</p>
                        <p class="text-xs text-red-700 mt-1">본인의 실습 병원 접속코드를 다시 확인하세요.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 입력창 */}
                <div class="mb-4">
                  <label for="access-code" class="block text-sm font-medium text-gray-700 mb-2">
                    접속 코드
                  </label>
                  <input
                    type="text"
                    id="access-code"
                    name="accessCode"
                    placeholder="접속코드를 입력하세요"
                    required
                    autofocus
                    autocomplete="off"
                    autocapitalize="off"
                    class="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                  <p class="mt-2 text-xs text-gray-500">
                    영문/숫자만 입력 가능하며, 대소문자는 자동으로 처리됩니다.
                  </p>
                </div>

                {/* 보안 안내 */}
                <div class="mb-6 flex items-start space-x-2 text-sm text-gray-600">
                  <i class="fas fa-lock text-gray-400 mt-0.5"></i>
                  <span>접속 코드는 타 병원 학생과 공유하지 마세요.</span>
                </div>

                {/* 버튼 */}
                <button
                  type="submit"
                  id="submit-button"
                  class="w-full h-12 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  접속하기
                </button>
              </form>

              {/* 하단 보안 안내 */}
              <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="flex items-start space-x-2 text-xs text-gray-500">
                  <i class="fas fa-shield-alt text-gray-400 mt-0.5"></i>
                  <p class="leading-relaxed">
                    본 접속 기록은 자동 저장되며, 실습 관리 목적으로 활용됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 저작권 */}
          <div class="text-center mt-6 text-xs text-gray-500">
            © Seoul Women's College of Nursing. All rights reserved.
          </div>
        </div>
      </main>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // 병원 매핑 데이터
        const hospitalMap = {
          'SWCN_CMC2026': {
            name: '가톨릭대학교 의정부성모병원',
            logo: '/images/uijeongbu.png'
          },
          'SWCN_KHUH2026': {
            name: '강동경희대학교병원',
            logo: '/images/gangdong.png'
          },
          'SWCN_NHIS2026': {
            name: '국민건강보험공단 일산병원',
            logo: '/images/ilsan.png'
          }
        };

        let currentHospital = null;

        // 요소 참조
        const accessCodeInput = document.getElementById('access-code');
        const hospitalNameContainer = document.getElementById('hospital-name-container');
        const hospitalNameText = document.getElementById('hospital-name');
        const submitButton = document.getElementById('submit-button');

        // 입력 보정 함수
        function sanitizeInput(value) {
          let sanitized = value.replace(/[^a-zA-Z0-9_]/g, '');
          return sanitized.toUpperCase();
        }

        // 병원 인식 함수
        function updateHospital(code) {
          const upperCode = code.trim();
          const matchedHospital = hospitalMap[upperCode];
          
          if (matchedHospital && currentHospital !== upperCode) {
            // 병원 매칭됨
            currentHospital = upperCode;
            hospitalNameText.textContent = matchedHospital.name;
            hospitalNameContainer.style.display = 'block';
          } else if (!matchedHospital && currentHospital !== null) {
            // 매칭 안됨
            currentHospital = null;
            hospitalNameContainer.style.display = 'none';
          }
        }

        // 입력 이벤트 리스너
        if (accessCodeInput) {
          accessCodeInput.addEventListener('input', (e) => {
            const cursorPosition = e.target.selectionStart;
            const oldValue = e.target.value;
            const oldLength = oldValue.length;
            
            // 입력 보정
            const sanitizedValue = sanitizeInput(e.target.value);
            
            if (e.target.value !== sanitizedValue) {
              e.target.value = sanitizedValue;
              const newLength = sanitizedValue.length;
              const removedChars = oldLength - newLength;
              const newCursorPosition = Math.max(0, cursorPosition - removedChars);
              e.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }
            
            updateHospital(sanitizedValue);
          });

          // 페이지 로드 시 기존 값 확인
          if (accessCodeInput.value) {
            const sanitized = sanitizeInput(accessCodeInput.value);
            accessCodeInput.value = sanitized;
            updateHospital(sanitized);
          }

          // Enter 키 처리
          accessCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submitButton.click();
            }
          });
        }

        // 폼 제출 시 로딩 스플래시
        const loginForm = document.getElementById('login-form');
        const loadingSplash = document.getElementById('loading-splash');
        const splashLogo = document.getElementById('splash-logo');
        
        if (loginForm && loadingSplash) {
          loginForm.addEventListener('submit', (e) => {
            const code = accessCodeInput ? accessCodeInput.value.trim() : '';
            
            if (code && currentHospital) {
              const matched = hospitalMap[currentHospital];
              if (matched && splashLogo) {
                splashLogo.src = matched.logo;
                splashLogo.alt = matched.name;
              }
              loadingSplash.style.display = 'flex';
            }
          });
        }
      `}} />
    </div>
  );
};

/**
 * 병원 페이지 상단 고정 헤더
 */
export const HospitalBadge: FC<{ hospitalName: string; hospitalSlug: string }> = ({ hospitalName, hospitalSlug }) => {
  const logoMap: Record<string, string> = {
    'uijeongbu': '/images/uijeongbu.png',
    'gangdong': '/images/gangdong.png',
    'ilsan': '/images/ilsan.png'
  };
  
  const logoUrl = logoMap[hospitalSlug] || '/images/snjc-logo.png';
  
  return (
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow">
      <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 좌측: 병원 로고 + 병원명 */}
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={logoUrl}
            alt={`${hospitalName} 로고`}
            class="w-8 h-8 object-contain flex-shrink-0"
          />
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-bold text-gray-900 truncate leading-tight">
              {hospitalName}
            </span>
            <span class="text-xs text-gray-500 leading-tight">
              실습 오리엔테이션 안내
            </span>
          </div>
        </div>
        
        {/* 우측: 점 3개 메뉴 */}
        <div class="relative flex-shrink-0">
          <button 
            onclick="toggleHeaderMenu()"
            class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition"
            aria-label="메뉴"
            type="button"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          
          <div 
            id="header-menu"
            class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            <a 
              href="/auth/logout"
              class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <i class="fas fa-sign-out-alt mr-2 text-gray-500"></i>
              로그아웃
            </a>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        window.toggleHeaderMenu = function() {
          const menu = document.getElementById('header-menu');
          if (menu) {
            menu.classList.toggle('hidden');
          }
        };
        
        document.addEventListener('click', function(e) {
          const menu = document.getElementById('header-menu');
          const button = e.target.closest('button[onclick="toggleHeaderMenu()"]');
          if (menu && !menu.contains(e.target) && !button) {
            menu.classList.add('hidden');
          }
        });
        
        window.addEventListener('scroll', function() {
          const header = document.querySelector('header.sticky');
          if (header) {
            if (window.scrollY > 10) {
              header.classList.add('shadow-sm');
            } else {
              header.classList.remove('shadow-sm');
            }
          }
        });
      `}} />
    </header>
  );
};
