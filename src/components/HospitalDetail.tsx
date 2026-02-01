// src/components/HospitalDetail.tsx
import { FC } from 'hono/jsx';
import { SimpleLayout } from './SimpleLayout';
import { getHospitalDetail } from '../data/simple-hospitals';

interface HospitalDetailProps {
  hospitalId: string;
}

export const HospitalDetail: FC<HospitalDetailProps> = ({ hospitalId }) => {
  const hospital = getHospitalDetail(hospitalId);
  
  if (!hospital) {
    return (
      <SimpleLayout title="병원을 찾을 수 없습니다">
        <div class="max-w-md mx-auto px-4 py-12 text-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">병원을 찾을 수 없습니다</h1>
          <a href="/" class="text-blue-600 hover:text-blue-800">홈으로 돌아가기</a>
        </div>
      </SimpleLayout>
    );
  }
  
  return (
    <SimpleLayout title={`${hospital.name} - OT 안내`}>
      {/* 상단 고정 헤더 */}
      <div class="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-hospital text-blue-600 text-lg"></i>
            </div>
            <div>
              <h1 class="text-base font-bold text-gray-900 leading-tight">{hospital.name}</h1>
              <p class="text-xs text-gray-600">{hospital.description}</p>
            </div>
          </div>
          <a 
            href="/" 
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            다른 병원
          </a>
        </div>
      </div>

      <div class="max-w-2xl mx-auto px-4 py-6 pb-20">
        {/* 오늘 꼭 확인 */}
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-200">
          <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i class="fas fa-check-circle text-blue-600"></i>
            오늘 꼭 확인
          </h2>
          <div class="space-y-2">
            {hospital.todayChecklist.map((item, index) => (
              <div key={index} class="text-sm font-medium text-gray-800">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 아코디언 섹션들 */}
        <div class="space-y-3">
          {/* OT 일정/시간 */}
          <div class="accordion-item bg-white rounded-lg border border-gray-200">
            <button class="accordion-header w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <i class="fas fa-calendar-alt text-blue-600"></i>
                <span class="font-bold text-gray-900">{hospital.sections.schedule.title}</span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 accordion-icon"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4">
              <ul class="space-y-2">
                {hospital.sections.schedule.items.map((item, index) => (
                  <li key={index} class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 출근/집합 장소 */}
          <div class="accordion-item bg-white rounded-lg border border-gray-200">
            <button class="accordion-header w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <i class="fas fa-map-marker-alt text-blue-600"></i>
                <span class="font-bold text-gray-900">{hospital.sections.location.title}</span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 accordion-icon"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4">
              <ul class="space-y-2">
                {hospital.sections.location.items.map((item, index) => (
                  <li key={index} class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 복장/준비물 */}
          <div class="accordion-item bg-white rounded-lg border border-gray-200">
            <button class="accordion-header w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <i class="fas fa-user-tie text-blue-600"></i>
                <span class="font-bold text-gray-900">{hospital.sections.dressCode.title}</span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 accordion-icon"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4">
              <ul class="space-y-2">
                {hospital.sections.dressCode.items.map((item, index) => (
                  <li key={index} class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 유의사항 */}
          <div class="accordion-item bg-white rounded-lg border border-gray-200">
            <button class="accordion-header w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
                <span class="font-bold text-gray-900">{hospital.sections.warnings.title}</span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 accordion-icon"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4">
              <ul class="space-y-2">
                {hospital.sections.warnings.items.map((item, index) => (
                  <li key={index} class="text-sm text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div class="accordion-item bg-white rounded-lg border border-gray-200">
            <button class="accordion-header w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <i class="fas fa-question-circle text-blue-600"></i>
                <span class="font-bold text-gray-900">자주 묻는 질문 (FAQ)</span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 accordion-icon"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4">
              <div class="space-y-4">
                {hospital.sections.faq.map((faq, index) => (
                  <div key={index} class="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <p class="text-sm font-semibold text-gray-900 mb-1">Q. {faq.question}</p>
                    <p class="text-sm text-gray-700">A. {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 문의 안내 */}
        <div class="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <i class="fas fa-phone text-blue-600"></i>
            문의 안내
          </h3>
          <p class="text-sm text-gray-700 mb-3">{hospital.contact.message}</p>
          {hospital.contact.phone && (
            <p class="text-sm text-gray-600">
              <strong>전화:</strong> {hospital.contact.phone}
            </p>
          )}
          {hospital.contact.email && (
            <p class="text-sm text-gray-600">
              <strong>이메일:</strong> {hospital.contact.email}
            </p>
          )}
        </div>

        {/* 하단 안내 */}
        <div class="text-center text-xs text-gray-500 py-6 mt-6 border-t border-gray-200">
          <p>본 안내는 실습 시작 전까지 변경될 수 있습니다.</p>
          <p>최종 일정은 현장 OT에서 확인하세요.</p>
        </div>
      </div>

      {/* 아코디언 토글 스크립트 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('DOMContentLoaded', function() {
          const headers = document.querySelectorAll('.accordion-header');
          
          headers.forEach(header => {
            header.addEventListener('click', function() {
              const item = this.parentElement;
              const content = item.querySelector('.accordion-content');
              const icon = this.querySelector('.accordion-icon');
              
              if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
              } else {
                content.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
              }
            });
          });
        });
      `}} />
    </SimpleLayout>
  );
};
