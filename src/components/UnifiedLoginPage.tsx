import { FC } from 'hono/jsx';

/**
 * 통합 로그인 페이지 - 모바일 퍼스트 반응형
 * 병원 선택 드롭다운 + 접속 코드 입력
 */
export const UnifiedLoginPage: FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  const hospitals = [
    { value: 'uijeongbu', label: '가톨릭대학교 의정부성모병원' },
    { value: 'ilsan', label: '국민건강보험공단 일산병원' },
    { value: 'gangdong', label: '강동경희대병원' }
  ];

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>실습 포털 로그인 - 서울여자간호대학교</title>
        
        {/* Preconnect to CDNs for faster loading */}
        <link rel="preconnect" href="https://cdn.tailwindcss.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* Load resources with defer to prevent blocking */}
        <script src="https://cdn.tailwindcss.com" defer></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            background: #F7F8FA;
          }
          
          /* Bottom Sheet 스타일 */
          .bottom-sheet {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-radius: 20px 20px 0 0;
            transform: translateY(100%);
            transition: transform 0.3s ease-out;
            z-index: 1000;
            max-height: 70vh;
            overflow-y: auto;
          }
          
          .bottom-sheet.active {
            transform: translateY(0);
          }
          
          .bottom-sheet-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-out;
            z-index: 999;
          }
          
          .bottom-sheet-overlay.active {
            opacity: 1;
            pointer-events: auto;
          }
          
          /* 로딩 상태 */
          .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spinner 0.6s linear infinite;
          }
          
          @keyframes spinner {
            to { transform: rotate(360deg); }
          }
          
          /* 데스크톱에서는 일반 드롭다운 */
          @media (min-width: 768px) {
            .bottom-sheet {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              max-height: 300px;
              border-radius: 8px;
              margin-top: 4px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              transform: translateY(0);
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.2s ease-out;
            }
            
            .bottom-sheet.active {
              opacity: 1;
              pointer-events: auto;
              transform: translateY(0);
            }
            
            .bottom-sheet-overlay {
              display: none;
            }
          }
        `}</style>
      </head>
      <body class="min-h-screen flex flex-col">
        {/* 로딩 오버레이 */}
        <div id="loading-overlay" class="fixed inset-0 bg-white z-[2000] flex items-center justify-center" style="display: none;">
          <div class="text-center">
            <div class="loading-spinner w-12 h-12 border-4 border-blue-600 mx-auto mb-4"></div>
            <p class="text-base font-medium text-gray-900">권한 확인 중...</p>
            <p class="text-sm text-gray-600 mt-2">잠시만 기다려주세요</p>
          </div>
        </div>

        {/* Bottom Sheet Overlay */}
        <div id="bottom-sheet-overlay" class="bottom-sheet-overlay"></div>

        {/* 상단 헤더 */}
        <header class="bg-white border-b border-gray-200">
          <div class="max-w-xl mx-auto px-5 py-4">
            <div class="flex items-center gap-3">
              <img 
                src="/images/snjc-logo.png" 
                alt="SWCN" 
                class="h-8 object-contain"
              />
              <div class="flex-1">
                <div class="text-sm font-semibold text-gray-900">서울여자간호대학교</div>
                <div class="text-xs text-gray-600">Clinical Practice Portal</div>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <main class="flex-1 flex items-center justify-center px-5 py-8">
          <div class="w-full max-w-md">
            {/* 로그인 카드 */}
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              {/* 제목 */}
              <div class="mb-6">
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  병원 실습 안내 접속
                </h1>
                <p class="text-sm text-gray-600">
                  병원을 선택하고 접속 코드를 입력하세요.
                </p>
              </div>

              {/* 폼 */}
              <form id="login-form" class="space-y-5">
                {/* 병원 선택 드롭다운 */}
                <div>
                  <label for="hospital-select" class="block text-sm font-medium text-gray-900 mb-2">
                    병원 선택
                  </label>
                  <div class="relative">
                    <button
                      type="button"
                      id="hospital-select"
                      class="w-full h-[52px] px-4 bg-white border-2 border-gray-300 rounded-lg text-left text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all touch-manipulation flex items-center justify-between"
                    >
                      <span id="hospital-selected-text" class="text-gray-500">병원을 선택하세요</span>
                      <i class="fas fa-chevron-down text-gray-400"></i>
                    </button>
                    
                    {/* Hidden input for form submission */}
                    <input type="hidden" id="hospital-value" name="hospitalSlug" required />
                    
                    {/* Bottom Sheet / Dropdown */}
                    <div id="hospital-dropdown" class="bottom-sheet">
                      <div class="p-4 border-b border-gray-200 md:hidden">
                        <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
                        <h3 class="text-lg font-semibold text-gray-900">병원 선택</h3>
                      </div>
                      <div class="py-2">
                        {hospitals.map(hospital => (
                          <button
                            type="button"
                            class="hospital-option w-full px-5 py-4 text-left text-base text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation flex items-center justify-between"
                            data-value={hospital.value}
                            data-label={hospital.label}
                          >
                            <span>{hospital.label}</span>
                            <i class="fas fa-check text-blue-600 opacity-0 check-icon"></i>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 접속 코드 입력 */}
                <div>
                  <label for="access-code" class="block text-sm font-medium text-gray-900 mb-2">
                    접속 코드
                  </label>
                  <input
                    type="text"
                    id="access-code"
                    name="accessCode"
                    required
                    placeholder="예: SWCN_CMC2026"
                    autocomplete="off"
                    class="w-full h-[52px] px-4 text-base border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all touch-manipulation"
                  />
                  
                  {/* 보안 안내 */}
                  <p class="mt-2 text-xs text-gray-500 flex items-center">
                    <i class="fas fa-lock mr-1.5"></i>
                    접속 코드는 타인과 공유하지 마세요.
                  </p>
                  
                  {/* 에러 메시지 */}
                  {errorMessage && (
                    <p class="mt-2 text-sm text-red-600 flex items-start">
                      <i class="fas fa-exclamation-circle mr-1.5 mt-0.5"></i>
                      <span>코드가 올바르지 않습니다. 다시 확인해주세요.</span>
                    </p>
                  )}
                  <p id="error-message" class="mt-2 text-sm text-red-600 hidden"></p>
                </div>

                {/* 7일 유지 체크박스 */}
                <div class="flex items-start">
                  <input
                    type="checkbox"
                    id="remember-device"
                    name="rememberDevice"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                  />
                  <label for="remember-device" class="ml-3 text-sm text-gray-700">
                    이 기기에서 7일간 유지
                  </label>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  id="submit-button"
                  disabled
                  class="w-full h-[52px] bg-gray-300 text-white text-base font-semibold rounded-lg transition-all touch-manipulation disabled:cursor-not-allowed"
                >
                  확인하고 들어가기
                </button>
              </form>
            </div>

            {/* 하단 안내 */}
            <div class="mt-4 text-center text-xs text-gray-500">
              <p>문의: <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:underline">sanhak@snjc.ac.kr</a></p>
            </div>
          </div>
        </main>

        {/* JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: `
          // DOM 준비 대기
          document.addEventListener('DOMContentLoaded', function() {
          // DOM 요소
          const hospitalSelect = document.getElementById('hospital-select');
          const hospitalDropdown = document.getElementById('hospital-dropdown');
          const hospitalOverlay = document.getElementById('bottom-sheet-overlay');
          const hospitalValue = document.getElementById('hospital-value');
          const hospitalSelectedText = document.getElementById('hospital-selected-text');
          const hospitalOptions = document.querySelectorAll('.hospital-option');
          const accessCode = document.getElementById('access-code');
          const submitButton = document.getElementById('submit-button');
          const errorMessage = document.getElementById('error-message');
          const loginForm = document.getElementById('login-form');
          const loadingOverlay = document.getElementById('loading-overlay');

          // 병원 선택 드롭다운 열기
          hospitalSelect.addEventListener('click', () => {
            hospitalDropdown.classList.add('active');
            hospitalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
          });

          // 오버레이 클릭 시 닫기
          hospitalOverlay.addEventListener('click', () => {
            hospitalDropdown.classList.remove('active');
            hospitalOverlay.classList.remove('active');
            document.body.style.overflow = '';
          });

          // 병원 옵션 선택
          hospitalOptions.forEach(option => {
            option.addEventListener('click', () => {
              const value = option.dataset.value;
              const label = option.dataset.label;
              
              // 값 설정
              hospitalValue.value = value;
              hospitalSelectedText.textContent = label;
              hospitalSelectedText.classList.remove('text-gray-500');
              hospitalSelectedText.classList.add('text-gray-900');
              
              // 체크 아이콘 업데이트
              document.querySelectorAll('.check-icon').forEach(icon => {
                icon.classList.add('opacity-0');
              });
              option.querySelector('.check-icon').classList.remove('opacity-0');
              
              // 드롭다운 닫기
              hospitalDropdown.classList.remove('active');
              hospitalOverlay.classList.remove('active');
              document.body.style.overflow = '';
              
              // 버튼 상태 업데이트
              validateForm();
              
              // 로컬 스토리지 저장 (7일 유지용)
              if (document.getElementById('remember-device').checked) {
                localStorage.setItem('selectedHospital', value);
              }
            });
          });

          // 폼 검증
          function validateForm() {
            const hospitalSelected = hospitalValue.value;
            const codeEntered = accessCode.value.trim();
            
            if (hospitalSelected && codeEntered) {
              submitButton.disabled = false;
              submitButton.classList.remove('bg-gray-300');
              submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700', 'active:bg-blue-800');
            } else {
              submitButton.disabled = true;
              submitButton.classList.add('bg-gray-300');
              submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'active:bg-blue-800');
            }
            
            // 에러 메시지 숨기기
            errorMessage.classList.add('hidden');
          }

          // 접속 코드 입력 시 검증
          accessCode.addEventListener('input', validateForm);

          // 폼 제출 처리 (Worker API 사용)
          loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 검증
            if (!hospitalValue.value) {
              errorMessage.textContent = '병원을 선택해주세요.';
              errorMessage.classList.remove('hidden');
              return;
            }
            
            const code = accessCode.value.trim();
            if (!code) {
              errorMessage.textContent = '접속 코드를 입력해주세요.';
              errorMessage.classList.remove('hidden');
              return;
            }
            
            // 로딩 표시
            loadingOverlay.style.display = 'flex';
            submitButton.disabled = true;
            errorMessage.classList.add('hidden');
            
            try {
              // Worker API 호출
              const response = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
              });
              
              const data = await response.json();
              
              if (response.ok && data.success) {
                // 토큰 저장
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('hospital_info', JSON.stringify({
                  hospital_id: data.hospital_id,
                  hospital_name: data.hospital_name,
                  expires_at: data.expires_at
                }));
                
                // 1초 대기 후 리다이렉트
                setTimeout(() => {
                  window.location.href = '/hospital/' + data.hospital_id;
                }, 1000);
              } else {
                // 에러 처리
                loadingOverlay.style.display = 'none';
                submitButton.disabled = false;
                
                if (data.error === 'RATE_LIMIT_EXCEEDED') {
                  errorMessage.textContent = '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
                } else if (data.error === 'INVALID_CODE') {
                  errorMessage.textContent = '유효하지 않은 접속 코드입니다. 다시 확인해주세요.';
                } else {
                  errorMessage.textContent = data.message || '오류가 발생했습니다. 다시 시도해주세요.';
                }
                errorMessage.classList.remove('hidden');
              }
            } catch (err) {
              console.error('Login error:', err);
              loadingOverlay.style.display = 'none';
              submitButton.disabled = false;
              errorMessage.textContent = '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
              errorMessage.classList.remove('hidden');
            }
          });

          // 페이지 로드 시 저장된 병원 복원
          const savedHospital = localStorage.getItem('selectedHospital');
          if (savedHospital) {
            const option = document.querySelector(\`.hospital-option[data-value="\${savedHospital}"]\`);
            if (option) {
              hospitalValue.value = savedHospital;
              hospitalSelectedText.textContent = option.dataset.label;
              hospitalSelectedText.classList.remove('text-gray-500');
              hospitalSelectedText.classList.add('text-gray-900');
              option.querySelector('.check-icon').classList.remove('opacity-0');
              validateForm();
            }
          }

          // ESC 키로 드롭다운 닫기
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hospitalDropdown.classList.contains('active')) {
              hospitalDropdown.classList.remove('active');
              hospitalOverlay.classList.remove('active');
              document.body.style.overflow = '';
            }
          });
          }); // DOMContentLoaded 종료
        `}} />
      </body>
    </html>
  );
};
