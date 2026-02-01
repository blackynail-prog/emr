import { html } from 'hono/html';
import { FC } from 'hono/jsx';

interface LayoutProps {
  title?: string;
  children: any;
}

export const Layout: FC<LayoutProps> = ({ title = '실습 오리엔테이션 자료', children }) => {
  return html`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  
  <!-- PWA Meta Tags -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#3B82F6">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="실습 OT">
  <link rel="apple-touch-icon" href="/icon-192.png">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
      background: #F9FAFB;
      min-height: 100vh;
      color: #1F2937;
    }
    .hospital-card {
      transition: all 0.2s ease;
      background: white;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
    }
    .hospital-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .accordion-content.active {
      max-height: 2000px;
    }
    .section-card {
      border-radius: 8px;
      border: 1px solid #E5E7EB;
      background: white;
    }
    .btn-primary {
      background: #3B82F6;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      transition: background 0.2s ease;
    }
    .btn-primary:hover {
      background: #2563EB;
    }
    .text-primary {
      color: #3B82F6;
    }
  </style>
</head>
<body class="bg-gray-50">
  ${children}
</body>
</html>`;
};

// Header 컴포넌트
export const Header: FC<{ showHomeButton?: boolean }> = ({ showHomeButton = false }) => {
  return (
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 py-3">
        {/* 네비게이션 메뉴만 표시 */}
        <nav class="flex gap-1 text-sm">
          <a href="/" class="px-3 py-1.5 rounded hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors">
            <i class="fas fa-home mr-1.5"></i>
            홈
          </a>
          <a href="/notices" class="px-3 py-1.5 rounded hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors">
            <i class="fas fa-bullhorn mr-1.5"></i>
            산학처 공지사항
          </a>
        </nav>
      </div>
    </header>
  );
};

// Footer 컴포넌트
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 class="font-semibold text-gray-900 mb-3 text-sm">문의</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              담당자: 산학협력처<br />
              이메일: <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:text-blue-700 underline">sanhak@snjc.ac.kr</a>
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-3 text-sm">안내</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              본 페이지는 LMS 게시 전 임시 안내 페이지입니다.<br />
              최종 공지 사항은 반드시 LMS를 확인하세요.
            </p>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6 text-center">
          <div class="flex justify-center items-center mb-3">
            <a href="https://www.snjc.ac.kr/public_2017/job/index.jsp" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity">
              <img 
                src="/images/snjc-logo.png" 
                alt="서울여자간호대학교" 
                class="h-8 object-contain"
              />
            </a>
          </div>
          <p class="text-sm text-gray-600 mb-2">
            서울여자간호대학교 • 김민수 교수
          </p>
          <div class="flex justify-center items-center mb-3">
            <a 
              href="https://www.instagram.com/sop.mskim" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
            >
              <i class="fab fa-instagram"></i>
              sop.mskim
            </a>
          </div>
          <p class="text-xs text-gray-500">
            본 페이지는 널코칭 오티를 위한 김민수 교수의 공지 페이지입니다.<br />
            공식 LMS 공지를 꼭 확인하세요!
          </p>
          <p class="text-xs text-gray-400 mt-2">
            &copy; ${currentYear} mskim.online
          </p>
        </div>
      </div>
    </footer>
  );
};

// 홈페이지 Hero 섹션
export const HeroSection: FC = () => {
  return (
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="max-w-2xl">
          <div class="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs font-medium mb-4">
            김민수 교수 | 실습·수업 공지 페이지
          </div>
          
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            임상실습 오리엔테이션 안내
          </h1>
          
          <p class="text-gray-600 mb-4 leading-relaxed">
            본 페이지는 LMS 게시 전, 실습학생을 위한 공식 안내 페이지입니다.
          </p>
          
          <p class="text-sm text-gray-500">
            아래에서 본인의 실습 병원을 선택하여 오리엔테이션 자료를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

// 병원 선택 카드 컴포넌트
export const HospitalCard: FC<{ slug: string; name: string; description: string }> = ({ slug, name, description }) => {
  const hospitalLogos = {
    uijeongbu: '/images/uijeongbu.png',
    gangdong: '/images/gangdong.png',
    ilsan: '/images/ilsan.png'
  };
  
  const logo = hospitalLogos[slug as keyof typeof hospitalLogos] || hospitalLogos.uijeongbu;
  
  // 병원명에 "|"가 있으면 줄바꿈 처리
  const nameParts = name.split(' | ');
  
  return (
    <a 
      href={`/hospital/${slug}`}
      class="hospital-card block p-6 transition group flex flex-col h-full"
    >
      {/* 로고 영역 - 고정 높이 */}
      <div class="flex justify-center items-center mb-6" style="height: 100px;">
        <div class="w-full h-full flex items-center justify-center">
          <img 
            src={logo} 
            alt={`${name} 로고`}
            class="max-w-full max-h-full object-contain"
            style="max-width: 140px; max-height: 100px;"
          />
        </div>
      </div>
      
      {/* 병원명 - 최대 2줄 */}
      <div class="mb-4 text-center" style="min-height: 3rem;">
        {nameParts.length > 1 ? (
          <div class="space-y-1">
            <div class="text-xs text-gray-500 leading-tight">{nameParts[0]}</div>
            <div class="text-base font-semibold text-gray-900 leading-tight">{nameParts[1]}</div>
          </div>
        ) : (
          <div class="text-base font-semibold text-gray-900 leading-tight">{name}</div>
        )}
      </div>
      
      {/* 설명 문구 - 고정 */}
      <p class="text-sm text-gray-600 text-center mb-6">
        실습 오리엔테이션 자료 안내
      </p>
      
      {/* 여백 자동 확장 */}
      <div class="flex-grow"></div>
      
      {/* CTA 버튼 - 하단 고정 */}
      <div class="w-full">
        <div class="px-4 py-3 bg-blue-600 text-white text-center rounded text-sm font-medium group-hover:bg-blue-700 transition">
          자료 보기
        </div>
      </div>
    </a>
  );
};

// 공지 섹션
export const NoticeSection: FC = () => {
  return (
    <div class="section-card bg-blue-50 border-l-4 border-blue-400 p-4">
      <p class="text-sm text-gray-700 leading-relaxed">
        자료는 수시 업데이트 됩니다. 방문 전 최신 업데이트 날짜를 확인하세요.
      </p>
    </div>
  );
};

// 2월 달력 및 학사일정 컴포넌트
export const CalendarSection: FC = () => {
  // 2024년 2월 달력 데이터
  const currentMonth = "2024년 2월";
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  
  // 2024년 2월은 목요일부터 시작 (앞에 빈 칸 3개)
  const emptyDays = [null, null, null]; // 일, 월, 화 빈칸
  const calendarDays = [
    ...emptyDays,
    1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29
  ];
  
  // 학사일정
  // 📝 일정 추가 방법:
  // 1. schedules 배열에 새 항목 추가
  // 2. type: 'holiday'(공휴일-빨강), 'event'(행사-파랑), 'exam'(시험-보라), 'deadline'(마감-오렌지)
  // 3. dateRange: "MM-DD" 또는 "MM-DD ~ DD" 형식
  // 예시: { dateRange: "02-20", title: "실습 OT", type: "event" }
  const schedules = [
    { dateRange: "02-09 ~ 12", title: "설날", type: "holiday" },
    { dateRange: "02-14", title: "제68회 학위수여식", type: "event" }
    // 여기에 새 일정 추가
  ];
  
  return (
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      {/* 달력 */}
      <div class="section-card bg-white p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">{currentMonth}</h3>
        </div>
        
        {/* 요일 헤더 */}
        <div class="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day, index) => (
            <div class={`text-center text-xs font-semibold py-2 ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* 날짜 그리드 */}
        <div class="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div class="py-2"></div>;
            }
            
            const dayOfWeek = index % 7;
            const isSunday = dayOfWeek === 0;
            const isSaturday = dayOfWeek === 6;
            
            // 설날 기간: 2월 9~12일
            const isHoliday = day >= 9 && day <= 12;
            // 학위수여식: 2월 14일
            const isEvent = day === 14;
            
            return (
              <div class={`
                text-center py-2 text-sm rounded
                ${isHoliday ? 'bg-red-50 font-bold text-red-600' : ''}
                ${isEvent ? 'bg-blue-50 font-semibold text-blue-600' : ''}
                ${isSunday && !isHoliday && !isEvent ? 'text-red-600' : ''}
                ${isSaturday && !isHoliday && !isEvent ? 'text-blue-600' : ''}
                ${!isSunday && !isSaturday && !isHoliday && !isEvent ? 'text-gray-700' : ''}
              `}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 학사일정 */}
      <div class="section-card bg-white p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">실습 관련 학사일정</h3>
        <div class="space-y-3">
          {schedules.map((schedule) => {
            const typeColors = {
              event: 'bg-blue-50 border-blue-200 text-blue-700',
              holiday: 'bg-red-50 border-red-200 text-red-700',
              exam: 'bg-purple-50 border-purple-200 text-purple-700',
              deadline: 'bg-orange-50 border-orange-200 text-orange-700'
            };
            
            return (
              <div class={`flex items-start gap-3 p-3 rounded-lg border ${typeColors[schedule.type]}`}>
                <div class="flex-shrink-0 text-xs font-bold whitespace-nowrap">
                  {schedule.dateRange}
                </div>
                <div class="text-sm font-medium">
                  {schedule.title}
                </div>
              </div>
            );
          })}
        </div>
        
        <div class="mt-4 pt-4 border-t border-gray-200">
          <p class="text-xs text-gray-500">
            * 학사일정은 변경될 수 있으니 LMS 공지를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
};
