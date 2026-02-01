import { FC } from 'hono/jsx';

/**
 * 긴급 공지 배너 (상단 고정) - 모바일 최적화
 * 현재 긴급 공지 없음
 */
export const UrgentNoticeBanner: FC = () => {
  // 긴급 공지가 없는 경우 렌더링하지 않음
  return null;
};

/**
 * 포털 헤더 (공식 시스템 스타일) - 모바일 최적화
 */
export const PortalHeader: FC<{ currentPath?: string }> = ({ currentPath = '/' }) => {
  return (
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-6xl mx-auto">
        {/* 상단: 로고 + 타이틀 */}
        <div class="px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-100">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
              <img 
                src="/images/snjc-logo.png" 
                alt="SWCN" 
                class="h-7 sm:h-9 object-contain flex-shrink-0"
              />
              <div class="min-w-0">
                <div class="text-xs sm:text-sm font-bold text-gray-900 truncate">서울여자간호대학교</div>
                <div class="text-xs text-gray-600 hidden sm:block">Clinical Practice Portal</div>
              </div>
            </div>
            <a 
              href="/login" 
              class="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
            >
              <i class="fas fa-sign-in-alt"></i>
              <span class="hidden sm:inline">병원 OT</span>
              <span class="sm:hidden">로그인</span>
            </a>
          </div>
        </div>
        
        {/* 하단: 네비게이션 - 모바일 3개 균등 분할 */}
        <nav class="px-0 sm:px-4">
          <div class="flex">
            <a 
              href="/" 
              class={`flex-1 px-2 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transition-colors text-center ${
                currentPath === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-home sm:mr-2"></i>
              <span class="hidden sm:inline">홈</span>
            </a>
            <a 
              href="/notices" 
              class={`flex-1 px-2 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transition-colors text-center ${
                currentPath === '/notices' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-bullhorn sm:mr-2"></i>
              <span class="hidden sm:inline">공지사항</span>
            </a>
            <a 
              href="/calendar" 
              class={`flex-1 px-2 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transition-colors text-center ${
                currentPath === '/calendar' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <i class="far fa-calendar-alt sm:mr-2"></i>
              <span class="hidden sm:inline">학사일정</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

/**
 * 공지사항 카드 (중요도 라벨 포함) - 모바일 최적화
 */
export const NoticeCard: FC<{
  noticeId: string;
  title: string;
  priority: 'urgent' | 'important' | 'normal';
  department: string;
  date: string;
  viewCount: number;
  isNew?: boolean;
}> = ({ noticeId, title, priority, department, date, viewCount, isNew = false }) => {
  const priorityConfig = {
    urgent: {
      label: '긴급',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-300',
      icon: 'fas fa-exclamation-triangle'
    },
    important: {
      label: '중요',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-300',
      icon: 'fas fa-exclamation-circle'
    },
    normal: {
      label: '일반',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      icon: 'fas fa-info-circle'
    }
  };

  const config = priorityConfig[priority];

  return (
    <a 
      href={`/notices/${noticeId}`}
      class="block bg-white border border-gray-200 rounded-lg hover:border-blue-300 active:bg-gray-50 transition-all touch-manipulation"
    >
      <div class="p-3 sm:p-4">
        <div class="flex items-start justify-between mb-2 gap-2">
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span class={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 ${config.bgColor} ${config.textColor} text-xs font-semibold rounded border ${config.borderColor}`}>
              <i class={`${config.icon} text-xs`}></i>
              <span>{config.label}</span>
            </span>
            {isNew && (
              <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                NEW
              </span>
            )}
          </div>
          <span class="text-xs text-gray-500 whitespace-nowrap">{date}</span>
        </div>
        
        <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span class="truncate">
            <i class="fas fa-building mr-1"></i>
            {department}
          </span>
          <span class="flex-shrink-0 ml-2">
            <i class="fas fa-eye mr-1"></i>
            {viewCount}
          </span>
        </div>
      </div>
    </a>
  );
};

/**
 * 학사일정 미니 캘린더 (홈페이지용)
 */
export const MiniCalendar: FC = () => {
  return (
    <div class="bg-white border border-gray-200 rounded-lg">
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-gray-900">
            <i class="far fa-calendar-alt mr-2 text-blue-600"></i>
            주요 일정
          </h2>
          <a href="/calendar" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
            전체 보기 →
          </a>
        </div>
      </div>
      
      <div class="p-4 space-y-3">
        {/* 일정 아이템 */}
        <div class="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div class="flex-shrink-0 w-12 text-center">
            <div class="text-xl font-bold text-blue-600">2</div>
            <div class="text-xs text-blue-700">2월</div>
          </div>
          <div class="flex-1">
            <div class="text-sm font-semibold text-gray-900">전체 OT</div>
            <div class="text-xs text-gray-600 mt-0.5">3학년 13:30 / 4학년 10:00</div>
          </div>
        </div>

        <div class="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <div class="flex-shrink-0 w-12 text-center">
            <div class="text-xl font-bold text-red-600">20</div>
            <div class="text-xs text-red-700">2월</div>
          </div>
          <div class="flex-1">
            <div class="text-sm font-semibold text-gray-900">실습지 교환 마감</div>
            <div class="text-xs text-gray-600 mt-0.5">10:00 마감</div>
          </div>
        </div>

        <div class="flex items-start space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
          <div class="flex-shrink-0 w-12 text-center">
            <div class="text-xl font-bold text-purple-600">28</div>
            <div class="text-xs text-purple-700">2월</div>
          </div>
          <div class="flex-1">
            <div class="text-sm font-semibold text-gray-900">고대구로병원 OT</div>
            <div class="text-xs text-gray-600 mt-0.5">1차시 14:00-15:30</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 빠른 링크 카드 - 모바일 최적화
 */
export const QuickLinkCard: FC<{
  icon: string;
  title: string;
  description: string;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}> = ({ icon, title, description, href, color }) => {
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      hover: 'hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-900',
      hover: 'hover:bg-green-100 hover:border-green-300 active:bg-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      title: 'text-purple-900',
      hover: 'hover:bg-purple-100 hover:border-purple-300 active:bg-purple-200'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      title: 'text-orange-900',
      hover: 'hover:bg-orange-100 hover:border-orange-300 active:bg-orange-200'
    }
  };

  const config = colorConfig[color];

  return (
    <a 
      href={href}
      class={`block ${config.bg} border ${config.border} rounded-lg p-3 sm:p-4 ${config.hover} transition-all touch-manipulation`}
    >
      <div class="flex items-center gap-2 sm:gap-3">
        <div class="flex-shrink-0">
          <i class={`${icon} text-xl sm:text-2xl ${config.icon}`}></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class={`text-xs sm:text-sm font-bold ${config.title} mb-0.5 truncate`}>
            {title}
          </h3>
          <p class="text-xs text-gray-600 truncate">
            {description}
          </p>
        </div>
        <div class="flex-shrink-0">
          <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
        </div>
      </div>
    </a>
  );
};

/**
 * 포털 푸터
 */
export const PortalFooter: FC = () => {
  return (
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">문의</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              산학협력처<br/>
              <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:text-blue-800">
                sanhak@snjc.ac.kr
              </a>
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">안내</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              본 포털은 실습학생 편의를 위한 시스템입니다.<br/>
              최종 기준은 학교 공식 포털을 확인하세요.
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">시스템 정보</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Clinical Practice Portal v2.0<br/>
              최종 업데이트: 2026.01.18
            </p>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-6 text-center">
          <p class="text-xs text-gray-500">
            © 2026 Seoul Women's College of Nursing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
