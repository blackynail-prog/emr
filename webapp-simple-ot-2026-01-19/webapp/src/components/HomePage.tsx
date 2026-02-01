// src/components/HomePage.tsx
import { FC } from 'hono/jsx';
import { SimpleLayout } from './SimpleLayout';
import { getSortedNotices, getNoticeLevelColor, getNoticeLevelText } from '../data/common-notices';
import { ACCESS_CODES } from '../data/access-codes';

export const HomePage: FC = () => {
  const notices = getSortedNotices();
  
  return (
    <SimpleLayout title="2026학년도 실습 OT 안내">
      <div class="max-w-2xl mx-auto px-4 py-6">
        {/* 헤더 */}
        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            2026학년도 1학기 실습 오리엔테이션 안내
          </h1>
          <p class="text-sm sm:text-base text-gray-600">
            실습 시작 전 꼭 알아야 할 핵심만 정리했습니다.
          </p>
        </div>

        {/* 전체 공지 */}
        <div class="mb-8">
          <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fas fa-bullhorn text-blue-600"></i>
            전체 공지
          </h2>
          
          <div class="space-y-3">
            {notices.map(notice => (
              <div 
                key={notice.id}
                class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                {/* 상단: 배지 + 제목 + 날짜 */}
                <div class="mb-2">
                  <div class="flex items-start gap-2 mb-1">
                    <span class={`text-xs px-2 py-1 rounded border font-semibold ${getNoticeLevelColor(notice.level)}`}>
                      {getNoticeLevelText(notice.level)}
                    </span>
                    {notice.pinned && (
                      <span class="text-xs px-2 py-1 rounded border bg-yellow-50 text-yellow-800 border-yellow-200 font-semibold">
                        고정
                      </span>
                    )}
                    <span class="text-xs text-gray-500 ml-auto">{notice.date}</span>
                  </div>
                  <h3 class="text-base font-bold text-gray-900">{notice.title}</h3>
                </div>
                
                {/* 요약 */}
                <p class="text-sm text-gray-600 mb-3 leading-relaxed">
                  {notice.summary}
                </p>
                
                {/* 자세히 보기 버튼 */}
                <button 
                  class="notice-expand-btn text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  data-notice-id={notice.id}
                >
                  자세히 보기
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                
                {/* 본문 (기본 숨김) */}
                <div 
                  id={`notice-body-${notice.id}`}
                  class="notice-body hidden mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: notice.body }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 실습기관 선택 */}
        <div class="mb-8">
          <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fas fa-hospital text-blue-600"></i>
            실습기관 선택
          </h2>
          
          <div class="space-y-3">
            {ACCESS_CODES.map(hospital => (
              <a
                key={hospital.hospitalId}
                href={`/auth/${hospital.hospitalId}`}
                class="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="text-base font-bold text-gray-900 mb-1">
                      {hospital.hospitalName}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {hospital.description}
                    </p>
                  </div>
                  <div class="ml-4">
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
                      OT 안내 확인하기
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 하단 안내 */}
        <div class="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
          <p>본 페이지는 실습 오리엔테이션을 위한 임시 안내 자료입니다.</p>
          <p>외부 공유를 금하며, 내용은 변경될 수 있습니다.</p>
        </div>
      </div>

      {/* 공지 확장/축소 스크립트 */}
      <script dangerouslySetInnerHTML={{__html: `
        document.addEventListener('DOMContentLoaded', function() {
          const expandButtons = document.querySelectorAll('.notice-expand-btn');
          
          expandButtons.forEach(button => {
            button.addEventListener('click', function() {
              const noticeId = this.dataset.noticeId;
              const body = document.getElementById('notice-body-' + noticeId);
              const icon = this.querySelector('i');
              
              if (body.classList.contains('hidden')) {
                body.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.childNodes[0].textContent = '접기 ';
              } else {
                body.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.childNodes[0].textContent = '자세히 보기 ';
              }
            });
          });
        });
      `}} />
    </SimpleLayout>
  );
};
