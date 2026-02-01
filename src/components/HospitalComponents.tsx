import { FC } from 'hono/jsx';
import { HospitalData } from '../data/types';

// 핵심 요약 카드
export const SummaryCard: FC<{ hospital: HospitalData }> = ({ hospital }) => {
  const hospitalLogos = {
    uijeongbu: '/images/uijeongbu.png',
    gangdong: '/images/gangdong.png',
    ilsan: '/images/ilsan.png'
  };
  
  const logo = hospitalLogos[hospital.slug as keyof typeof hospitalLogos] || hospitalLogos.ilsan;
  
  return (
    <div class="section-card bg-white p-6 mb-6">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div class="flex items-center gap-4">
          <div class="bg-gray-50 rounded-lg p-3">
            <img 
              src={logo} 
              alt={`${hospital.name} 로고`}
              class="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{hospital.name}</h1>
            <p class="text-sm text-gray-500">실습 오리엔테이션 안내</p>
          </div>
        </div>
        <span class="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded">
          업데이트: {hospital.updatedAt}
        </span>
      </div>
      
      {(hospital.period || hospital.location) && (
        <div class="grid sm:grid-cols-2 gap-4 mb-4">
          {hospital.period && (
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500 mb-1">실습기간</div>
              <div class="font-semibold text-gray-900">{hospital.period}</div>
            </div>
          )}
          {hospital.location && (
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-xs text-gray-500 mb-1">출근 위치</div>
              <div class="font-semibold text-gray-900">{hospital.location}</div>
            </div>
          )}
        </div>
      )}
      
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 class="font-semibold text-gray-900 mb-2 text-sm">⚠️ 안내</h3>
        <p class="text-sm text-gray-700 leading-relaxed">{hospital.highlight}</p>
      </div>
    </div>
  );
};

// 아코디언 섹션
export const AccordionSection: FC<{ 
  id: string; 
  title: string; 
  icon: string; 
  items: string[] | any[]; 
  defaultOpen?: boolean;
  emptyMessage?: string;
}> = ({ id, title, icon, items, defaultOpen = false, emptyMessage = "준비 중입니다." }) => {
  const isEmpty = !items || items.length === 0;
  
  return (
    <div class="section-card bg-white mb-3 overflow-hidden">
      <button 
        class="accordion-trigger w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
        onclick={`toggleAccordion('${id}')`}
      >
        <div class="flex items-center">
          <span class="text-gray-600 mr-3">{icon.includes('fa-') ? <i class={icon}></i> : icon}</span>
          <h3 class="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        <i class="fas fa-chevron-down text-gray-400 transition-transform accordion-icon" id={`icon-${id}`}></i>
      </button>
      
      <div 
        class={`accordion-content ${defaultOpen ? 'active' : ''} border-t border-gray-200`}
        id={id}
      >
        <div class="p-4">
          {isEmpty ? (
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600">{emptyMessage}</p>
              <p class="text-xs text-gray-400 mt-1">LMS 게시 전 임시 안내 페이지이며, 업데이트 예정입니다.</p>
            </div>
          ) : (
            <ul class="space-y-2">
              {items.map((item, index) => (
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span class="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// FAQ 아코디언 섹션
export const FAQSection: FC<{ 
  id: string; 
  faqs: { question: string; answer: string }[]; 
  defaultOpen?: boolean;
}> = ({ id, faqs, defaultOpen = false }) => {
  const isEmpty = !faqs || faqs.length === 0;
  
  return (
    <div class="section-card bg-white mb-3 overflow-hidden">
      <button 
        class="accordion-trigger w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
        onclick={`toggleAccordion('${id}')`}
      >
        <div class="flex items-center">
          <i class="fas fa-question-circle text-gray-600 mr-3"></i>
          <h3 class="text-base font-semibold text-gray-900">자주 묻는 질문 (FAQ)</h3>
        </div>
        <i class="fas fa-chevron-down text-gray-400 transition-transform accordion-icon" id={`icon-${id}`}></i>
      </button>
      
      <div 
        class={`accordion-content ${defaultOpen ? 'active' : ''} border-t border-gray-200`}
        id={id}
      >
        <div class="p-4">
          {isEmpty ? (
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600">준비 중입니다.</p>
              <p class="text-xs text-gray-400 mt-1">LMS 게시 전 임시 안내 페이지이며, 업데이트 예정입니다.</p>
            </div>
          ) : (
            <div class="space-y-3">
              {faqs.map((faq) => (
                <div class="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition">
                  <h4 class="font-semibold text-gray-900 mb-2 text-sm">
                    Q. {faq.question}
                  </h4>
                  <p class="text-sm text-gray-600 leading-relaxed">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 다운로드 섹션
export const DownloadSection: FC<{ 
  id: string; 
  downloads: { title: string; type: string; url: string; note?: string }[]; 
  defaultOpen?: boolean;
}> = ({ id, downloads, defaultOpen = false }) => {
  const isEmpty = !downloads || downloads.length === 0;
  
  return (
    <div class="section-card bg-white mb-3 overflow-hidden">
      <button 
        class="accordion-trigger w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
        onclick={`toggleAccordion('${id}')`}
      >
        <div class="flex items-center">
          <i class="fas fa-download text-gray-600 mr-3"></i>
          <h3 class="text-base font-semibold text-gray-900">첨부자료 다운로드</h3>
        </div>
        <i class="fas fa-chevron-down text-gray-400 transition-transform accordion-icon" id={`icon-${id}`}></i>
      </button>
      
      <div 
        class={`accordion-content ${defaultOpen ? 'active' : ''} border-t border-gray-200`}
        id={id}
      >
        <div class="p-4">
          {isEmpty ? (
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600">업로드 예정</p>
              <p class="text-xs text-gray-400 mt-1">첨부자료는 준비되는 대로 업데이트됩니다.</p>
            </div>
          ) : (
            <div class="grid sm:grid-cols-2 gap-3">
              {downloads.map((file) => (
                <a 
                  href={file.url}
                  class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="flex items-center">
                    <i class={`fas fa-file-${
                      file.type === 'pdf' ? 'pdf' : 
                      file.type === 'ppt' ? 'powerpoint' : 
                      file.type === 'image' ? 'image' : 
                      file.type === 'video' ? 'video' : 
                      'alt'
                    } text-xl mr-3 ${
                      file.type === 'pdf' ? 'text-red-600' : 
                      file.type === 'ppt' ? 'text-orange-600' : 
                      file.type === 'image' ? 'text-green-600' : 
                      file.type === 'video' ? 'text-purple-600' : 
                      'text-blue-600'
                    }`}></i>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">{file.title}</div>
                      {file.note && <div class="text-xs text-gray-500">{file.note}</div>}
                    </div>
                  </div>
                  <i class="fas fa-external-link-alt text-gray-400 text-sm"></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CTA 버튼 섹션
export const CTAButtons: FC<{ hospitalSlug: string }> = ({ hospitalSlug }) => {
  return (
    <div class="section-card bg-white p-4 mb-6">
      <div class="grid sm:grid-cols-3 gap-3">
        <a 
          href="/"
          class="btn-primary flex items-center justify-center text-center"
        >
          홈으로
        </a>
        <button 
          onclick={`copyLink()`}
          class="btn-primary flex items-center justify-center text-center"
        >
          링크 복사
        </button>
        <a 
          href="mailto:sanhak@snjc.ac.kr?subject=실습 OT 문의&body=안녕하세요.%0D%0A실습 OT 관련 문의드립니다.%0D%0A%0D%0A"
          class="btn-primary flex items-center justify-center text-center"
        >
          문의하기
        </a>
      </div>
    </div>
  );
};

// JavaScript 스크립트
export const HospitalPageScripts = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        // 아코디언 토글
        function toggleAccordion(id) {
          const content = document.getElementById(id);
          const icon = document.getElementById('icon-' + id);
          
          if (content.classList.contains('active')) {
            content.classList.remove('active');
            icon.style.transform = 'rotate(0deg)';
          } else {
            content.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
          }
        }
        
        // 링크 복사
        function copyLink() {
          const url = window.location.href;
          navigator.clipboard.writeText(url).then(() => {
            alert('페이지 링크가 복사되었습니다!\\n' + url);
          }).catch(() => {
            alert('링크 복사에 실패했습니다.');
          });
        }
        
        // 페이지 로드 시 기본 오픈 아코디언 설정
        document.addEventListener('DOMContentLoaded', () => {
          const defaultOpenIds = ['checklist', 'dressCode', 'summary'];
          defaultOpenIds.forEach(id => {
            const icon = document.getElementById('icon-' + id);
            if (icon) {
              icon.style.transform = 'rotate(180deg)';
            }
          });
        });
      `
    }} />
  );
};
