import { FC } from 'hono/jsx';
import { Notice } from '../data/notices';

/**
 * 산학처 공지사항 페이지 헤더
 */
export const NoticePageHeader: FC = () => {
  return (
    <div class="bg-white border-b border-gray-200 py-8 mb-8">
      <div class="max-w-4xl mx-auto px-4">
        <div class="mb-4 flex gap-2">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
            공통 공지
          </span>
          <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
            학교 기준
          </span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-3">
          산학처 공지사항
        </h1>
        <p class="text-gray-600 leading-relaxed">
          실습 운영, 출결, 공결 처리 등 모든 실습학생에게 공통 적용되는 공식 안내입니다.
        </p>
      </div>
    </div>
  );
};

/**
 * 공지사항 리스트
 */
export const NoticeList: FC<{ notices: Notice[] }> = ({ notices }) => {
  if (notices.length === 0) {
    return (
      <div class="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <i class="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
        <p class="text-gray-500 text-lg">현재 공지된 산학처 안내사항이 없습니다.</p>
      </div>
    );
  }

  return (
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* 테이블 헤더 */}
      <div class="hidden sm:grid sm:grid-cols-12 gap-4 bg-gray-50 border-b border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700">
        <div class="col-span-6">제목</div>
        <div class="col-span-2">작성부서</div>
        <div class="col-span-2">작성일</div>
        <div class="col-span-2 text-center">조회수</div>
      </div>

      {/* 공지 목록 */}
      <div class="divide-y divide-gray-200">
        {notices.map((notice) => (
          <a 
            href={`/notices/${notice.notice_id}`}
            class="block px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="sm:grid sm:grid-cols-12 gap-4 items-center">
              {/* 제목 */}
              <div class="col-span-6 mb-2 sm:mb-0">
                <h3 class="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                  {notice.title}
                </h3>
              </div>
              
              {/* 작성부서 */}
              <div class="col-span-2 text-sm text-gray-600 mb-1 sm:mb-0">
                <span class="sm:hidden font-semibold">작성부서: </span>
                {notice.department}
              </div>
              
              {/* 작성일 */}
              <div class="col-span-2 text-sm text-gray-600 mb-1 sm:mb-0">
                <span class="sm:hidden font-semibold">작성일: </span>
                {notice.created_at}
              </div>
              
              {/* 조회수 */}
              <div class="col-span-2 text-sm text-gray-600 sm:text-center">
                <span class="sm:hidden font-semibold">조회수: </span>
                <i class="fas fa-eye mr-1"></i>
                {notice.view_count.toLocaleString()}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

/**
 * 공지사항 상세 페이지
 */
export const NoticeDetail: FC<{ notice: Notice }> = ({ notice }) => {
  return (
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* 상단 정보 바 */}
      <div class="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">
          {notice.title}
        </h1>
        <div class="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <i class="fas fa-building mr-2 text-gray-400"></i>
            <span class="font-semibold">작성부서:</span> {notice.department}
          </div>
          <div>
            <i class="fas fa-calendar mr-2 text-gray-400"></i>
            <span class="font-semibold">작성일:</span> {notice.created_at}
          </div>
          <div>
            <i class="fas fa-eye mr-2 text-gray-400"></i>
            <span class="font-semibold">조회수:</span> {notice.view_count.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div 
        class="px-6 py-8 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: notice.content }}
      />
    </div>
  );
};

/**
 * 산학처 공지사항 안내 배너 (병원 OT 페이지 상단)
 */
export const NoticeBanner: FC = () => {
  return (
    <div class="mb-6">
      <a 
        href="/notices"
        class="block bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 hover:bg-blue-100 transition-colors"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <i class="fas fa-bullhorn text-blue-600"></i>
            <div>
              <span class="text-sm font-semibold text-blue-900">산학처 공지사항</span>
              <span class="hidden sm:inline text-sm text-blue-700 ml-2">
                - 실습 출결, 공결 처리 등 공통 안내를 확인하세요
              </span>
            </div>
          </div>
          <i class="fas fa-chevron-right text-blue-600"></i>
        </div>
      </a>
    </div>
  );
};

/**
 * 학사일정 캘린더 컴포넌트
 */
export const AcademicCalendar: FC = () => {
  const currentYear = 2026;
  const currentMonth = 2; // 2월로 초기 설정

  // 2월의 일 수 계산 (윤년 고려)
  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = currentMonth === 2 ? (isLeapYear(currentYear) ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][currentMonth - 1];
  
  // 2026년 2월 1일의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDay = new Date(2026, 1, 1).getDay(); // 일요일 = 0

  // 학사일정 데이터
  const academicEvents = [
    { date: 2, title: '전체 OT', description: '3학년 13:30 / 4학년 10:00', type: 'ot' },
    { date: 16, title: '실습지 교환 시작', description: '14:30 시작', type: 'exchange' },
    { date: 20, title: '실습지 교환 마감', description: '10:00 마감', type: 'deadline' },
    { date: 28, title: '고대구로병원 OT', description: '1차시 14:00-15:30', type: 'hospital' },
  ];

  // 날짜에 해당하는 이벤트 찾기
  const getEventForDay = (day: number) => academicEvents.find(e => e.date === day);

  // 캘린더 날짜 배열 생성
  const calendarDays = [];
  // 첫 주 빈 칸
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  // 실제 날짜
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">
            <i class="far fa-calendar-alt mr-2 text-blue-600"></i>
            실습 관련 학사일정
          </h2>
          <div class="flex items-center space-x-2">
            <select 
              id="year-select"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onchange="updateCalendar()"
            >
              <option value="2025">2025년</option>
              <option value="2026" selected>2026년</option>
              <option value="2027">2027년</option>
            </select>
            <select 
              id="month-select"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onchange="updateCalendar()"
            >
              <option value="1">1월</option>
              <option value="2" selected>2월</option>
              <option value="3">3월</option>
              <option value="4">4월</option>
              <option value="5">5월</option>
              <option value="6">6월</option>
              <option value="7">7월</option>
              <option value="8">8월</option>
              <option value="9">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>
          </div>
        </div>
        <p class="text-sm text-gray-600">
          2026년도 1학기 실습 관련 주요 일정을 안내드립니다. 자세한 내용은 공지사항을 확인해주세요.
        </p>
      </div>

      {/* 캘린더 */}
      <div id="calendar-container">
        {/* 요일 헤더 */}
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div class="text-center text-sm font-semibold text-red-600 py-2">일</div>
          <div class="text-center text-sm font-semibold text-gray-700 py-2">월</div>
          <div class="text-center text-sm font-semibold text-gray-700 py-2">화</div>
          <div class="text-center text-sm font-semibold text-gray-700 py-2">수</div>
          <div class="text-center text-sm font-semibold text-gray-700 py-2">목</div>
          <div class="text-center text-sm font-semibold text-gray-700 py-2">금</div>
          <div class="text-center text-sm font-semibold text-blue-600 py-2">토</div>
        </div>

        {/* 날짜 그리드 */}
        <div class="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const event = day ? getEventForDay(day) : null;
            const isWeekend = index % 7 === 0 || index % 7 === 6;
            const textColor = index % 7 === 0 ? 'text-red-600' : index % 7 === 6 ? 'text-blue-600' : 'text-gray-900';
            
            return (
              <div 
                class={`min-h-24 p-2 border rounded-lg ${
                  event 
                    ? event.type === 'ot' ? 'bg-blue-50 border-blue-300' 
                    : event.type === 'deadline' ? 'bg-red-50 border-red-300'
                    : event.type === 'exchange' ? 'bg-green-50 border-green-300'
                    : 'bg-purple-50 border-purple-300'
                  : 'bg-gray-50 border-gray-200'
                }`}
              >
                {day ? (
                  <>
                    <div class={`text-right text-sm font-medium ${textColor} mb-1`}>{day}</div>
                    {event && (
                      <div class="text-xs">
                        <div class={`font-semibold mb-1 ${
                          event.type === 'ot' ? 'text-blue-700' 
                          : event.type === 'deadline' ? 'text-red-700'
                          : event.type === 'exchange' ? 'text-green-700'
                          : 'text-purple-700'
                        }`}>
                          {event.title}
                        </div>
                        <div class="text-gray-600 leading-tight">
                          {event.description}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div class="text-right text-sm text-gray-300"> </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 범례 */}
      <div class="mt-6 flex flex-wrap gap-4 text-sm">
        <div class="flex items-center">
          <div class="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
          <span class="text-gray-700">오리엔테이션</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
          <span class="text-gray-700">실습지 교환</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
          <span class="text-gray-700">마감일</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-2"></div>
          <span class="text-gray-700">병원 OT</span>
        </div>
      </div>

      {/* 주요 일정 목록 */}
      <div class="mt-6 border-t border-gray-200 pt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          <i class="fas fa-list-ul mr-2 text-blue-600"></i>
          2026년 2월 주요 일정
        </h3>
        <div class="space-y-3">
          {academicEvents.map(event => (
            <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-12 text-center">
                <div class="text-2xl font-bold text-blue-600">{event.date}</div>
                <div class="text-xs text-gray-500">2월</div>
              </div>
              <div class="flex-1">
                <div class="font-semibold text-gray-900">{event.title}</div>
                <div class="text-sm text-gray-600">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p class="text-sm text-gray-700">
          <i class="fas fa-exclamation-circle text-yellow-600 mr-2"></i>
          <strong>안내:</strong> 위 일정은 2026년 1학기 기준이며, 변경될 수 있습니다. 최신 정보는 산학처 공지사항을 확인해주세요.
        </p>
      </div>
    </div>
  );
};

/**
 * 법적 고지 (페이지 하단)
 */
export const LegalNotice: FC = () => {
  return (
    <div class="mt-8 bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-center text-sm text-gray-600">
      <i class="fas fa-info-circle mr-2 text-gray-400"></i>
      본 페이지는 실습학생 편의를 위한 안내 페이지이며, 최종 기준은 학교 공식 포털 공지를 따릅니다.
    </div>
  );
};
