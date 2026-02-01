// src/components/AuthGate.tsx
import { FC } from 'hono/jsx';
import { SimpleLayout } from './SimpleLayout';
import { getHospitalInfo } from '../data/access-codes';

interface AuthGateProps {
  hospitalId: string;
  error?: boolean;
}

export const AuthGate: FC<AuthGateProps> = ({ hospitalId, error }) => {
  const hospital = getHospitalInfo(hospitalId);
  
  if (!hospital) {
    return (
      <SimpleLayout title="잘못된 접근">
        <div class="max-w-md mx-auto px-4 py-12 text-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">잘못된 접근입니다</h1>
          <a href="/" class="text-blue-600 hover:text-blue-800">홈으로 돌아가기</a>
        </div>
      </SimpleLayout>
    );
  }
  
  return (
    <SimpleLayout title={`${hospital.hospitalName} - 인증`}>
      <div class="min-h-screen flex items-center justify-center px-4 py-12">
        <div class="max-w-md w-full">
          {/* 뒤로가기 버튼 */}
          <a 
            href="/" 
            class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <i class="fas fa-arrow-left"></i>
            병원 선택으로 돌아가기
          </a>

          {/* 카드 */}
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            {/* 병원명 */}
            <div class="text-center mb-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-hospital text-blue-600 text-2xl"></i>
              </div>
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {hospital.hospitalName}
              </h1>
              <p class="text-sm text-gray-600">
                {hospital.description}
              </p>
            </div>

            {/* 안내문 */}
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-700 leading-relaxed">
                인증코드는 현장 OT에서 안내됩니다.<br/>
                코드를 입력하면 해당 병원 안내 페이지를 확인할 수 있어요.
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div class="flex items-start gap-2">
                  <i class="fas fa-exclamation-circle text-red-600 mt-0.5"></i>
                  <div>
                    <p class="text-sm font-semibold text-red-900">코드가 올바르지 않습니다</p>
                    <p class="text-xs text-red-700 mt-1">현장 안내 코드를 확인해주세요.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 폼 */}
            <form method="POST" action={`/auth/${hospitalId}`}>
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-900 mb-2">
                  인증코드 입력
                </label>
                <input
                  type="text"
                  name="code"
                  id="code-input"
                  placeholder="예: UJB2026"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  autofocus
                />
              </div>

              <button
                type="submit"
                class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                입장하기
              </button>
            </form>

            {/* 도움말 */}
            <div class="mt-6 text-center text-xs text-gray-500">
              <p>코드를 분실하셨나요? 현장 담당자에게 문의하세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 자동 대문자 변환 및 공백 제거 스크립트 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('DOMContentLoaded', function() {
          const input = document.getElementById('code-input');
          
          if (input) {
            input.addEventListener('input', function(e) {
              // 대문자 변환 및 공백 제거
              this.value = this.value.toUpperCase().replace(/\\s/g, '');
            });
          }
        });
      `}} />
    </SimpleLayout>
  );
};
