import { FC } from 'hono/jsx';

/**
 * '홈 화면에 추가' 안내 컴포넌트 - iOS 스타일
 */
export const AddToHomeScreenPrompt: FC = () => {
  return (
    <>
      {/* 하단 슬라이드 안내 바 */}
      <div 
        id="a2hs-prompt" 
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-2xl shadow-2xl transform translate-y-full transition-transform duration-300 z-50"
        style="display: none;"
      >
        <div class="px-6 py-4">
          <div class="flex items-start space-x-3 mb-3">
            <div class="flex-shrink-0 mt-1">
              <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-mobile-alt text-blue-600 text-xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold text-gray-900 mb-1">
                홈 화면에 추가하면
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                실습 기간 동안 더 편하게 확인할 수 있어요
              </p>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button 
              id="a2hs-show-guide" 
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              홈 화면에 추가 방법 보기
            </button>
            <button 
              id="a2hs-close" 
              class="px-4 py-2.5 text-gray-600 font-medium text-sm hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 안내 모달 */}
      <div 
        id="a2hs-modal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
        style="display: none;"
      >
        <div class="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          {/* 모달 헤더 */}
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900">
                홈 화면에 추가하는 방법
              </h2>
              <button 
                id="a2hs-modal-close" 
                class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <i class="fas fa-times text-gray-600"></i>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">iPhone (Safari)</p>
          </div>

          {/* 모달 본문 */}
          <div class="px-6 py-6 space-y-6">
            {/* STEP 1 */}
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 class="font-semibold text-gray-900">공유 버튼 누르기</h3>
              </div>
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p class="text-sm text-gray-700 leading-relaxed mb-3">
                  Safari 하단 중앙의 <strong>공유 버튼 (⬆️)</strong>을 누르세요
                </p>
                <div class="flex items-center justify-center bg-white rounded-lg p-4 border border-gray-200">
                  <div class="text-center">
                    <div class="text-4xl mb-2">⬆️</div>
                    <p class="text-xs text-gray-500">공유 버튼</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 class="font-semibold text-gray-900">메뉴에서 선택하기</h3>
              </div>
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p class="text-sm text-gray-700 leading-relaxed mb-3">
                  나타난 메뉴에서 <strong>"홈 화면에 추가"</strong>를 찾아 선택하세요
                </p>
                <div class="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-plus-square text-blue-600 text-xl"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-900">홈 화면에 추가</span>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 class="font-semibold text-gray-900">추가 완료하기</h3>
              </div>
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p class="text-sm text-gray-700 leading-relaxed mb-3">
                  이름을 확인한 후 우측 상단의 <strong>"추가"</strong> 버튼을 누르세요
                </p>
                <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                  <p class="text-sm font-medium text-gray-900">실습 OT</p>
                  <p class="text-xs text-gray-500 mt-1">앱 이름 예시</p>
                </div>
              </div>
            </div>

            {/* 하단 안내 */}
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div class="flex items-start space-x-2">
                <i class="fas fa-info-circle text-blue-600 text-sm mt-0.5 flex-shrink-0"></i>
                <p class="text-xs text-blue-800 leading-relaxed">
                  실습 기간 동안 빠른 접속을 위해 권장합니다.<br/>
                  앱처럼 빠르게 접속할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 스크립트: iOS 감지 및 표시 로직 */}
      <script dangerouslySetInnerHTML={{__html: `
        // iOS Safari 감지
        function isIOSSafari() {
          const ua = navigator.userAgent;
          const isIOS = /iPhone|iPad|iPod/.test(ua);
          const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury/.test(ua);
          return isIOS && isSafari;
        }

        // 이미 홈 화면에 추가되었는지 확인
        function isStandalone() {
          return window.matchMedia('(display-mode: standalone)').matches ||
                 window.navigator.standalone === true;
        }

        // 로컬스토리지 키
        const A2HS_DISMISSED_KEY = 'a2hs_dismissed';
        const A2HS_DISMISS_TIMESTAMP = 'a2hs_dismiss_time';

        // 30일 = 30 * 24 * 60 * 60 * 1000
        const DISMISS_DURATION = 30 * 24 * 60 * 60 * 1000;

        // 안내 표시 가능 여부 확인
        function shouldShowPrompt() {
          // iOS Safari가 아니면 표시 안함
          if (!isIOSSafari()) return false;
          
          // 이미 홈 화면에 추가되어 있으면 표시 안함
          if (isStandalone()) return false;
          
          // 이전에 닫았는지 확인
          const dismissed = localStorage.getItem(A2HS_DISMISSED_KEY);
          if (dismissed === 'true') {
            const dismissTime = parseInt(localStorage.getItem(A2HS_DISMISS_TIMESTAMP) || '0', 10);
            const now = Date.now();
            
            // 30일이 지나지 않았으면 표시 안함
            if (now - dismissTime < DISMISS_DURATION) {
              return false;
            } else {
              // 30일이 지났으면 초기화
              localStorage.removeItem(A2HS_DISMISSED_KEY);
              localStorage.removeItem(A2HS_DISMISS_TIMESTAMP);
            }
          }
          
          return true;
        }

        // 안내 표시
        function showPrompt() {
          const prompt = document.getElementById('a2hs-prompt');
          if (prompt) {
            prompt.style.display = 'block';
            // 애니메이션을 위한 약간의 지연
            setTimeout(() => {
              prompt.style.transform = 'translateY(0)';
            }, 100);
          }
        }

        // 안내 숨기기
        function hidePrompt() {
          const prompt = document.getElementById('a2hs-prompt');
          if (prompt) {
            prompt.style.transform = 'translateY(100%)';
            setTimeout(() => {
              prompt.style.display = 'none';
            }, 300);
          }
        }

        // 모달 표시
        function showModal() {
          const modal = document.getElementById('a2hs-modal');
          if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }

        // 모달 숨기기
        function hideModal() {
          const modal = document.getElementById('a2hs-modal');
          if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
          }
        }

        // 이벤트 리스너 등록
        document.addEventListener('DOMContentLoaded', () => {
          // iOS Safari 체크 및 안내 표시
          if (shouldShowPrompt()) {
            // 로그인 성공 후 3초 뒤 표시
            setTimeout(() => {
              showPrompt();
            }, 3000);
          }

          // '닫기' 버튼
          const closeBtn = document.getElementById('a2hs-close');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              hidePrompt();
              // 30일간 표시 안함
              localStorage.setItem(A2HS_DISMISSED_KEY, 'true');
              localStorage.setItem(A2HS_DISMISS_TIMESTAMP, Date.now().toString());
            });
          }

          // '방법 보기' 버튼
          const showGuideBtn = document.getElementById('a2hs-show-guide');
          if (showGuideBtn) {
            showGuideBtn.addEventListener('click', () => {
              hidePrompt();
              showModal();
              // 방법 봤으면 더 이상 표시 안함
              localStorage.setItem(A2HS_DISMISSED_KEY, 'true');
              localStorage.setItem(A2HS_DISMISS_TIMESTAMP, Date.now().toString());
            });
          }

          // 모달 닫기 버튼
          const modalCloseBtn = document.getElementById('a2hs-modal-close');
          if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
              hideModal();
            });
          }

          // 모달 배경 클릭 시 닫기
          const modal = document.getElementById('a2hs-modal');
          if (modal) {
            modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                hideModal();
              }
            });
          }
        });
      `}} />
    </>
  );
};
