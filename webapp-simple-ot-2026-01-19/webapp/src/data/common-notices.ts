// src/data/common-notices.ts
// 전체 공지사항 (로그인 없이 누구나 볼 수 있음)

export type NoticeLevel = 'urgent' | 'important' | 'info';

export interface CommonNotice {
  id: string;
  title: string;
  date: string;
  level: NoticeLevel;
  summary: string;
  body: string;
  pinned: boolean;
}

export const COMMON_NOTICES: CommonNotice[] = [
  {
    id: 'notice-001',
    title: '[필수] 2026학년도 1학기 실습 오리엔테이션 일정 안내',
    date: '2026.01.20',
    level: 'urgent',
    summary: '실습 시작 전 필수 OT 일정을 확인하세요. 각 병원별 일정이 상이하니 반드시 확인 바랍니다.',
    body: `
      <h3>실습 오리엔테이션 일정</h3>
      <ul>
        <li><strong>의정부성모병원</strong>: 2026.03.03 (월) 09:00 / 본관 3층 간호교육실</li>
        <li><strong>일산병원</strong>: 2026.03.04 (화) 14:00 / 교육관 2층 대강당</li>
        <li><strong>강동경희대병원</strong>: 2026.03.05 (수) 10:00 / 별관 5층 세미나실</li>
      </ul>
      <p><strong>주의사항</strong>: OT 불참 시 실습 참여가 제한될 수 있습니다.</p>
      <p>준비물: 학생증, 필기구, 실습 동의서(출력)</p>
    `,
    pinned: true
  },
  {
    id: 'notice-002',
    title: '[공지] 실습 복장 및 준비물 안내',
    date: '2026.01.18',
    level: 'important',
    summary: '실습 시 착용해야 할 복장과 필수 준비물을 안내합니다.',
    body: `
      <h3>실습 복장</h3>
      <ul>
        <li>학교 지정 실습복 착용 필수</li>
        <li>명찰 착용 (학년, 이름 기재)</li>
        <li>흰색 운동화 (깨끗한 상태 유지)</li>
        <li>머리는 단정하게 정돈 (긴 머리는 묶기)</li>
      </ul>
      
      <h3>필수 준비물</h3>
      <ul>
        <li>학생증</li>
        <li>실습 동의서 (서명 완료)</li>
        <li>건강검진 결과지 (3개월 이내)</li>
        <li>필기구 (볼펜, 형광펜)</li>
        <li>개인 물품 (마스크, 손소독제)</li>
      </ul>
      
      <p><strong>중요</strong>: 복장 미준수 시 실습 참여가 제한됩니다.</p>
    `,
    pinned: true
  },
  {
    id: 'notice-003',
    title: '[공지] 실습 전 필수 제출 서류 안내',
    date: '2026.01.15',
    level: 'important',
    summary: '실습 시작 전 반드시 제출해야 할 서류 목록입니다.',
    body: `
      <h3>필수 제출 서류</h3>
      <ol>
        <li><strong>실습 동의서</strong> (학생/보호자 서명)</li>
        <li><strong>건강검진 결과지</strong> (3개월 이내)
          <ul>
            <li>B형간염 항체 검사</li>
            <li>흉부 X-ray</li>
            <li>일반 건강검진</li>
          </ul>
        </li>
        <li><strong>개인정보 활용 동의서</strong></li>
        <li><strong>서약서</strong> (실습 규정 준수)</li>
      </ol>
      
      <p><strong>제출 방법</strong>: OT 당일 지참 또는 산학협력처 제출</p>
      <p><strong>제출 기한</strong>: 실습 시작 1주일 전까지</p>
      
      <p class="text-red-600"><strong>미제출 시 실습 참여 불가</strong></p>
    `,
    pinned: false
  },
  {
    id: 'notice-004',
    title: '[참고] 실습 중 주의사항 및 금지사항',
    date: '2026.01.12',
    level: 'info',
    summary: '실습 기간 중 반드시 지켜야 할 사항들을 안내합니다.',
    body: `
      <h3>주의사항</h3>
      <ul>
        <li>환자 개인정보 보호 엄수</li>
        <li>휴대폰 사용 금지 (실습 중)</li>
        <li>사진/동영상 촬영 절대 금지</li>
        <li>시간 엄수 (지각 3회 시 경고)</li>
        <li>실습지도자 지시 사항 준수</li>
      </ul>
      
      <h3>금지사항</h3>
      <ul>
        <li>병원 내 음식물 섭취 (지정 장소 외)</li>
        <li>환자/보호자와 사적 접촉</li>
        <li>실습 내용 SNS 게시</li>
        <li>무단 이탈 및 조퇴</li>
      </ul>
      
      <p><strong>위반 시</strong>: 경고 → 실습 중단 → 학칙에 따른 처리</p>
    `,
    pinned: false
  },
  {
    id: 'notice-005',
    title: '[참고] 실습 평가 및 출석 안내',
    date: '2026.01.10',
    level: 'info',
    summary: '실습 평가 방법과 출석 인정 기준을 안내합니다.',
    body: `
      <h3>평가 항목</h3>
      <ul>
        <li>출석 및 태도 (30%)</li>
        <li>실습 수행 능력 (40%)</li>
        <li>과제 및 보고서 (20%)</li>
        <li>최종 평가 (10%)</li>
      </ul>
      
      <h3>출석 기준</h3>
      <ul>
        <li>지각: 10분 이내 도착</li>
        <li>결석: 무단 불참 또는 사전 승인 없는 결석</li>
        <li>조퇴: 실습지도자 승인 필요</li>
      </ul>
      
      <p><strong>출석 인정</strong>: 질병, 경조사 등 증빙 서류 제출 시</p>
      <p><strong>결석 허용</strong>: 총 실습 일수의 10% 이내</p>
      
      <h3>과제 제출</h3>
      <ul>
        <li>실습 일지: 매일 작성 및 제출</li>
        <li>케이스 스터디: 실습 종료 1주일 전</li>
        <li>최종 보고서: 실습 종료 후 3일 이내</li>
      </ul>
    `,
    pinned: false
  }
];

// 정렬된 공지사항 가져오기 (pinned 먼저, 최신순)
export function getSortedNotices(): CommonNotice[] {
  return [...COMMON_NOTICES].sort((a, b) => {
    // pinned 우선
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // 날짜 최신순
    return b.date.localeCompare(a.date);
  });
}

// 공지사항 레벨별 배지 색상
export function getNoticeLevelColor(level: NoticeLevel): string {
  switch (level) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'important':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'info':
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// 공지사항 레벨별 텍스트
export function getNoticeLevelText(level: NoticeLevel): string {
  switch (level) {
    case 'urgent':
      return '필수';
    case 'important':
      return '공지';
    case 'info':
      return '참고';
  }
}
