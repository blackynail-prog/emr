# 민수 전용 실습 포털 - 사용 메뉴얼

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [현재 구현된 기능](#현재-구현된-기능)
3. [사용자 가이드](#사용자-가이드)
4. [내용 수정/추가 방법](#내용-수정추가-방법)
5. [기술 정보](#기술-정보)
6. [배포 정보](#배포-정보)

---

## 프로젝트 개요

### 🎯 목적
서울여자간호대학교 김민수 교수 전용 실습 포털로, 3개 병원(의정부성모병원, 일산병원, 강동경희대병원)의 오리엔테이션 자료를 제공하는 모바일 우선 웹 애플리케이션입니다.

### 🔑 핵심 특징
- **병원별 접속코드 인증**: 각 병원마다 전용 접속코드로 보안 로그인
- **모바일 퍼스트**: 핸드폰에서 최적화된 UI/UX
- **공지사항 시스템**: 산학처 공지사항 독립 관리
- **민수 교수 브랜딩**: "민수 전용 실습 포털" 브랜드 강조

### 🌐 접속 URL
- **개발 환경**: https://3000-ibe99ya25l3zel576nxlh-82b888ba.sandbox.novita.ai
- **프로덕션** (예정): mskim.online

---

## 현재 구현된 기능

### 1️⃣ 통합 로그인 시스템 🔐

#### 로그인 페이지 (`/login`)
- **병원 선택 드롭다운**
  - 모바일: Bottom Sheet 방식 (하단에서 올라옴)
  - 데스크톱: 일반 드롭다운 (버튼 아래)
  - 3개 병원 선택 가능
    - 가톨릭대학교 의정부성모병원
    - 국민건강보험공단 일산병원
    - 강동경희대병원

- **접속 코드 입력**
  - Placeholder: `예: SWCN_CMC2026`
  - 보안 안내: "접속 코드는 타인과 공유하지 마세요"

- **7일 유지 옵션**
  - 체크 시 병원 선택값 로컬 스토리지 저장
  - 재방문 시 자동으로 병원 선택됨

- **버튼 활성화 로직**
  - 병원 선택 + 코드 입력 시 파란색 활성화
  - 하나라도 없으면 회색 비활성화

- **로딩 상태**
  - 제출 시 0.8초 로딩 화면
  - "권한 확인 중..." 메시지

#### 접속 코드 목록
| 병원 | 접속 코드 |
|------|----------|
| 의정부성모병원 | `SWCN_CMC2026` |
| 일산병원 | `SWCN_NHIS2026` |
| 강동경희대병원 | `SWCN_KHUH2026` |

#### 인증 시스템
- **토큰 방식**: JWT (HMAC-SHA256 서명)
- **유효기간**: 12시간
- **병원 간 접근 제한**: Hospital ID 검증으로 다른 병원 파일 접근 차단
- **로그아웃**: localStorage 토큰 삭제 후 `/login`으로 이동
- **레이트 리미팅**: 5회/분 (인증 엔드포인트)

### 6️⃣ 보호된 자산 관리 🔐

#### 보호된 파일 경로
```
public/protected/
├── UJB/                  # 의정부성모병원
│   ├── 2026-1-masterplan-ot.pdf
│   ├── uijeongbu-locker-guide.jpg
│   └── uijeongbu-locker-video.mp4
├── NHIS/                 # 일산병원
│   └── test.txt
└── KHU/                  # 강동경희대병원
    └── test.txt
```

#### 접근 방식
1. **사용자 로그인** → JWT 토큰 발급
2. **병원 페이지 접근** → 인증 확인
3. **파일 버튼 클릭** → Authorization: Bearer 헤더로 요청
4. **서버 검증** → Hospital ID 일치 확인
5. **파일 전송** → Blob으로 다운로드
6. **모달 표시** → PDF/Image/Video 뷰어

#### ProtectedAssetViewer 컴포넌트
- **PDF 뷰어**: iframe 임베드
- **이미지 뷰어**: 확대 가능한 이미지 표시
- **비디오 플레이어**: HTML5 video 컨트롤
- **새 창 열기**: Blob URL로 새 탭에서 열기
- **에러 처리**: 401/403/404 에러 메시지 표시

### 2️⃣ 병원 상세 페이지 🏥 (수정됨)

#### URL 구조
- 의정부성모병원: `/hospital/uijeongbu`
- 일산병원: `/hospital/ilsan`
- 강동경희대병원: `/hospital/gangdong`

#### 페이지 구성
1. **상단 요약 카드**
   - 병원명
   - 실습 기간
   - OT 일시
   - 장소
   - 지도 보기 버튼
   - 담당자 문의 버튼

2. **하단 탭 UI** (5개 탭)
   - **OT 안내**: 일정, 장소, 집결, 복장
   - **준비물 체크리스트**: 체크박스 + 진행률 (예: 3/6 완료)
   - **출결/규정**: 핵심 규정 요약 + 아코디언 상세
   - **자료실**: PDF 파일 목록 (최신 뱃지, 업데이트 날짜)
   - **문의**: 산학처 이메일/전화 + 병원 담당자 + "복사" 버튼

3. **보호된 자산 (인증 필요)** ⭐ 신규
   - **PDF 열기** 버튼: 마스터플랜 OT 자료 등
   - **영상 보기** 버튼: 오리엔테이션 영상
   - **사진 보기** 버튼: 라커 안내 등
   - 모달 팝업으로 파일 내용 표시
   - "새 창으로 열기" 버튼
   - 인증 실패 시 에러 메시지 표시

4. **모바일 최적화**
   - 가로 스와이프로 탭 전환 가능
   - 좌우 패딩 20px
   - 섹션 간격 16-20px
   - 제목 18-20px, 본문 14-16px

### 3️⃣ 산학처 공지사항 📢

#### 공지 목록 페이지 (`/notices`)
- 테이블 형식 목록
- 현재 1개 공지 표시:
  - "2026-1학기 마스터플랜 공개 및 OT안내" (2026.01.16)

#### 공지 상세 페이지 (`/notices/:noticeId`)
- HTML 콘텐츠 지원
- 표, 리스트, 강조 등 풍부한 서식
- 문의처 정보 표시

#### 긴급 공지 배너
- 현재 **비활성화** 상태 (긴급 공지 없음)

### 4️⃣ 메인 페이지 (`/`)

#### 포털 헤더
- 좌측: SWCN 로고 + 서울여자간호대학교
- 우측: "병원 OT 로그인" 버튼
- 네비게이션: 홈 | 공지사항 | 학사일정

#### 빠른 링크 (4개 카드)
1. **병원 OT 자료** (파란색)
2. **공지사항** (초록색)
3. **학사일정** (보라색)
4. **서류 다운로드** (주황색)

#### 최신 공지
- 최신 공지 1개 표시
- "자세히 보기" 링크

#### 주요 일정
- 달력 형식 일정 표시
- 예시: 전체 OT, 실습지 교환 마감

### 5️⃣ UI/UX 특징 🎨

#### 모바일 최적화
- **터치 영역**: 최소 48px
- **폰트 크기**: 최소 16px (iOS 자동 확대 방지)
- **카드 간격**: 좁은 간격으로 한 손 조작 최적화
- **색상**: 학교 블루 톤 (blue-600)
- **그림자**: 최소화된 그림자 (shadow-sm)

#### 반응형 디자인
- 모바일: 1열 레이아웃
- 태블릿: 768px 기준 전환
- 데스크톱: 중앙 정렬 카드 (최대 폭 420-520px)

#### 디자인 시스템
- **배경**: #F7F8FA (연한 회색)
- **카드**: 흰색 배경 + border-gray-200
- **버튼**: blue-600 (활성화), gray-300 (비활성화)
- **폰트**: Apple SD Gothic Neo, Noto Sans KR

---

## 사용자 가이드

### 🎓 학생 사용 흐름

1. **로그인**
   ```
   https://3000-ibe99ya25l3zel576nxlh-82b888ba.sandbox.novita.ai/login
   
   ↓ 병원 선택 (예: 의정부성모병원)
   ↓ 접속 코드 입력 (예: SWCN_CMC2026)
   ↓ "7일 유지" 체크 (선택)
   ↓ "확인하고 들어가기" 클릭
   ```

2. **병원 페이지 확인**
   ```
   /hospital/uijeongbu (자동 이동)
   
   ↓ 상단 요약 카드 확인
   ↓ 5개 탭 중 필요한 정보 확인
     - OT 안내
     - 준비물 체크리스트
     - 출결/규정
     - 자료실 (PDF 다운로드)
     - 문의
   ```

3. **공지사항 확인**
   ```
   헤더 네비게이션 > 공지사항 클릭
   
   ↓ /notices (공지 목록)
   ↓ 공지 제목 클릭
   ↓ /notices/2026-003 (공지 상세)
   ```

### 👨‍💼 교수/관리자 사용 흐름

교수님이나 관리자가 내용을 확인하고 수정하는 방법은 아래 "내용 수정/추가 방법" 섹션을 참고하세요.

---

## 내용 수정/추가 방법

### 📝 1. 공지사항 추가/수정/삭제

#### 파일 위치
```
/home/user/webapp/src/data/notices.ts
```

#### 공지 추가하기
```typescript
// notices.ts 파일 열기
export const notices: Notice[] = [
  {
    notice_id: "2026-004",           // 새 공지 ID (연도-순번)
    title: "새로운 공지 제목",        // 공지 제목
    department: "산학협력처",         // 작성 부서
    content: `
      <p>공지 내용을 HTML로 작성합니다.</p>
      <ul>
        <li>항목 1</li>
        <li>항목 2</li>
      </ul>
    `,
    created_at: "2026.01.20 10:00",  // 작성 일시
    view_count: 0,                    // 조회수 (초기값 0)
    original_link: "https://portal.snjc.ac.kr/..."  // 학교 포털 링크
  },
  // 기존 공지들...
];
```

#### 공지 수정하기
```typescript
// notices.ts에서 해당 notice_id 찾아서 수정
{
  notice_id: "2026-003",
  title: "수정된 제목",           // 제목 변경
  content: `<p>수정된 내용</p>`,  // 내용 변경
  // ... 나머지 필드
}
```

#### 공지 삭제하기
```typescript
// notices.ts에서 해당 공지 객체 전체를 배열에서 제거
export const notices: Notice[] = [
  // 삭제할 공지는 제외하고 나머지만 남김
  {
    notice_id: "2026-003",
    // ...
  }
  // 2025-002는 삭제됨 (배열에서 제거)
];
```

#### 긴급 공지 배너 추가하기
```typescript
// 파일: /home/user/webapp/src/components/PortalComponents.tsx

export const UrgentNoticeBanner: FC = () => {
  return (
    <div class="bg-red-50 border-l-4 border-red-500">
      <div class="max-w-6xl mx-auto px-3 py-2.5 sm:px-4 sm:py-3">
        <div class="flex items-start sm:items-center gap-2 sm:gap-3">
          <div class="flex-shrink-0 mt-0.5 sm:mt-0">
            <i class="fas fa-exclamation-triangle text-red-600 text-base sm:text-lg"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs sm:text-sm font-semibold text-red-900 leading-tight">
              [긴급] 새로운 긴급 공지 제목
            </p>
            <p class="text-xs text-red-800 mt-1 leading-tight hidden sm:block">
              부가 설명 문구
            </p>
          </div>
          <a 
            href="/notices/2026-004"  // 해당 공지 링크
            class="flex-shrink-0 text-xs font-medium text-red-700 hover:text-red-900 underline whitespace-nowrap"
          >
            보기 →
          </a>
        </div>
      </div>
    </div>
  );
};
```

### 🏥 2. 병원 정보 수정

#### 파일 위치
```
/home/user/webapp/src/data/hospitals.ts
```

#### 병원 기본 정보 수정
```typescript
export const hospitalData: Record<string, HospitalData> = {
  uijeongbu: {
    name: '가톨릭대학교 의정부성모병원',  // 병원명
    slug: 'uijeongbu',                      // URL slug (변경 금지)
    period: '실습 3/4 ~ 3/15',              // 실습 기간 수정
    location: '본관 3층 간호교육실',       // 장소 수정
    updatedAt: '2026.01.18',                // 업데이트 날짜
    highlight: '중요 공지 내용',            // 중요 공지
    
    sections: {
      // 아래 섹션별 내용 수정
    }
  }
};
```

#### 체크리스트 수정
```typescript
sections: {
  checklist: [
    '✅ 체크 항목 1',
    '✅ 체크 항목 2',
    '✅ 새로운 체크 항목 추가',  // 새 항목 추가
  ],
  // ...
}
```

#### FAQ 수정
```typescript
sections: {
  faq: [
    {
      question: '질문 내용',
      answer: '답변 내용'
    },
    // 새 FAQ 추가
  ],
  // ...
}
```

#### 다운로드 파일 수정
```typescript
sections: {
  downloads: [
    {
      title: '파일 제목',
      url: '/files/document.pdf',  // public/ 폴더의 파일 경로
      size: '2.5MB',
      date: '2026.01.18'
    },
  ],
  // ...
}
```

### 🔑 3. 접속 코드 수정

#### 파일 위치
```
/home/user/webapp/src/data/access-codes.ts
```

#### 접속 코드 추가/변경
```typescript
export const accessCodes: AccessCode[] = [
  {
    code: 'SWCN_CMC2026',        // 접속 코드
    hospitalSlug: 'uijeongbu',   // 병원 slug
    hospitalName: '가톨릭대학교 의정부성모병원'
  },
  // 새 병원 추가 시
  {
    code: 'SWCN_NEW2026',
    hospitalSlug: 'new-hospital',
    hospitalName: '새병원'
  }
];
```

### 🎨 4. 로고/이미지 변경

#### 병원 로고 변경
```typescript
// 파일: /home/user/webapp/src/index.tsx

app.get('/images/:filename', async (c) => {
  const imageUrls: Record<string, string> = {
    'uijeongbu.png': 'https://새로운-로고-URL',  // 로고 URL 변경
    'gangdong.png': 'https://...',
    'ilsan.png': 'https://...',
    'snjc-logo.png': 'https://...'  // 학교 로고
  };
  // ...
});
```

#### 정적 이미지 추가
```bash
# public/ 폴더에 이미지 파일 추가
/home/user/webapp/public/
├── hospital-map.jpg      # 병원 지도
├── guide-photo.png       # 안내 사진
└── document.pdf          # PDF 파일
```

### 🔄 5. 변경사항 반영하기

#### 빌드 및 재시작 (필수)
```bash
cd /home/user/webapp

# 1. 빌드
npm run build

# 2. 포트 정리
fuser -k 3000/tcp 2>/dev/null || true

# 3. PM2 재시작
pm2 restart webapp

# 4. 확인
curl http://localhost:3000
```

#### Git 커밋 (권장)
```bash
cd /home/user/webapp

# 변경사항 확인
git status

# 모든 변경사항 추가
git add .

# 커밋 (의미 있는 메시지 작성)
git commit -m "Update: 공지사항 추가 - 2026-1학기 실습 안내"

# 커밋 이력 확인
git log --oneline -5
```

### 📤 6. 프로덕션 배포 (Cloudflare Pages)

#### 배포 준비
```bash
cd /home/user/webapp

# Cloudflare API 설정 (최초 1회)
# 도구에게 요청: "Cloudflare 배포 설정해줘"
```

#### 배포 실행
```bash
# 빌드
npm run build

# Cloudflare Pages 배포
npm run deploy:prod
# 또는
npx wrangler pages deploy dist --project-name webapp

# 배포 후 URL 확인 (예시)
# https://webapp.pages.dev
```

---

## 기술 정보

### 📚 기술 스택
- **프레임워크**: Hono 4.0 (TypeScript)
- **런타임**: Cloudflare Workers
- **빌드**: Vite 6.4.1
- **스타일**: Tailwind CSS (CDN)
- **아이콘**: Font Awesome 6.4.0
- **배포**: Cloudflare Pages

### 📁 프로젝트 구조
```
webapp/
├── src/
│   ├── index.tsx                      # 메인 라우팅 + Worker API
│   ├── components/
│   │   ├── UnifiedLoginPage.tsx      # 통합 로그인 페이지
│   │   ├── ProtectedAssetViewer.tsx  # 보호된 자산 뷰어 ⭐ 신규
│   │   ├── PortalComponents.tsx      # 포털 컴포넌트
│   │   ├── HospitalComponents.tsx    # 병원 페이지 컴포넌트
│   │   └── NoticeComponents.tsx      # 공지사항 컴포넌트
│   ├── data/
│   │   ├── hospitals.ts               # 병원 데이터 ⭐ 자주 수정
│   │   ├── notices.ts                 # 공지사항 데이터 ⭐ 자주 수정
│   │   └── types.ts                   # TypeScript 타입 정의
│   ├── worker/                         # Worker 모듈 ⭐ 신규
│   │   ├── auth.ts                    # JWT 인증 (generateJWT, verifyJWT)
│   │   ├── kv-handler.ts              # KV 작업 (getAccessCode, rateLimit)
│   │   └── rate-limit.ts              # 레이트 리미팅
│   └── utils/
│       ├── auth.ts                    # 서버 인증 유틸리티
│       └── auth-client.ts             # 클라이언트 인증 유틸리티 ⭐ 신규
├── public/
│   ├── protected/                     # 보호된 자산 ⭐ 신규
│   │   ├── UJB/                      # 의정부성모병원
│   │   ├── NHIS/                     # 일산병원
│   │   └── KHU/                      # 강동경희대병원
│   ├── _routes.json                   # Cloudflare Pages 라우팅 설정
│   └── images/                        # 공개 이미지
├── scripts/                           # 헬퍼 스크립트 ⭐ 신규
│   ├── hash-code.mjs                 # 접속코드 해시 생성
│   ├── init-kv.cjs                   # KV 초기화
│   └── seed-kv.cjs                   # KV 데이터 시딩
├── dist/                              # 빌드 결과물
├── .dev.vars                          # 로컬 환경변수 (JWT_SECRET, PEPPER)
├── package.json                       # 의존성 및 스크립트
├── vite.config.ts                     # Vite 설정
├── wrangler.jsonc                     # Cloudflare 설정
└── README.md                          # 이 문서
```

### 🛠️ 개발 명령어
```bash
# 로컬 개발 서버 (Vite)
npm run dev

# 빌드
npm run build

# 샌드박스 개발 서버 (PM2)
pm2 start ecosystem.config.cjs

# PM2 로그 확인
pm2 logs webapp --nostream

# PM2 재시작
pm2 restart webapp

# 포트 정리 + 재시작
fuser -k 3000/tcp && pm2 restart webapp

# 프로덕션 배포
npm run deploy:prod
```

### 🗂️ 데이터 타입 정의

#### Notice (공지사항)
```typescript
interface Notice {
  notice_id: string;      // 공지 ID (예: "2026-003")
  title: string;          // 제목
  department: string;     // 작성부서
  content: string;        // HTML 본문
  created_at: string;     // 작성일시 (예: "2026.01.16 09:00")
  view_count: number;     // 조회수
  original_link: string;  // 학교 포털 원문 링크
}
```

#### HospitalData (병원 데이터)
```typescript
interface HospitalData {
  name: string;           // 병원명
  slug: string;           // URL slug
  period?: string;        // 실습기간
  location?: string;      // 출근 위치
  updatedAt: string;      // 업데이트 날짜
  highlight: string;      // 중요 공지
  sections: {
    checklist: string[];           // 체크리스트
    dressCode: string[];           // 복장 규정
    flow: string[];                // 출근 동선
    comm: string[];                // 커뮤니케이션
    safety: string[];              // 안전/감염관리
    assignment: string[];          // 과제/평가
    faq: FAQItem[];                // FAQ
    downloads: DownloadFile[];     // 다운로드
  };
}
```

---

## 배포 정보

### 🌐 현재 URL
- **개발 환경**: https://3000-ibe99ya25l3zel576nxlh-82b888ba.sandbox.novita.ai
- **프로덕션** (예정): mskim.online 또는 webapp.pages.dev

### 🚀 배포 상태
- ✅ 개발 환경: 실행 중
- ⏳ 프로덕션: 대기 중

### 📅 마지막 업데이트
- **날짜**: 2026-01-18
- **버전**: v3.0
- **주요 변경사항**: 
  - ✅ Worker API 기반 JWT 인증 시스템 구현
  - ✅ 보호된 자산 관리 시스템 추가
  - ✅ ProtectedAssetViewer 컴포넌트 (PDF/Image/Video 모달 뷰어)
  - ✅ hospital_id 매핑 추가 (uijeongbu→UJB, ilsan→NHIS, gangdong→KHU)
  - ✅ 통합 로그인 페이지 구현 (병원 선택 + 접속 코드)
  - ✅ 모바일 최적화 (Bottom Sheet, 터치 영역 확대)
  - ✅ 공지사항 1개 삭제 (2025-002)
  - ✅ 긴급 공지 배너 비활성화

### 🔄 업데이트 이력

#### 2026-01-18 v3.0 (최신) - Protected Assets
- ✅ Worker API 기반 JWT 인증 (12시간 만료)
- ✅ SHA-256 해시 기반 접속코드 검증 (PEPPER 사용)
- ✅ `/protected/:hospitalId/:filename` 엔드포인트
- ✅ Hospital ID 기반 접근 제어
- ✅ ProtectedAssetViewer 컴포넌트
  - PDF 모달 뷰어
  - 이미지 모달 뷰어
  - 비디오 플레이어
  - Blob 다운로드 with Authorization header
- ✅ 레이트 리미팅 (5회/분)
- ✅ 에러 처리 (401/403/404)

#### 2026-01-18 v2.0 - Unified Login
- ✅ 통합 로그인 페이지 구현
- ✅ PC/모바일 병원 선택 최적화
- ✅ 성능 최적화 (preconnect, defer)
- ✅ 공지사항 삭제 기능 구현
- ✅ 긴급 배너 비활성화

#### 2026-01-18 (이전)
- ✅ 병원별 접속코드 인증 시스템
- ✅ 산학처 공지사항 시스템
- ✅ 학사일정 캘린더
- ✅ 병원 선택 카드 디자인

---

## 📞 문의

### 담당자
- **이름**: 김민수 교수
- **소속**: 서울여자간호대학교
- **이메일**: sanhak@snjc.ac.kr
- **인스타그램**: @sop.mskim

### 기술 지원
- 시스템 오류, 데이터 수정, 배포 관련 문의는 개발자에게 연락하세요.

---

## 📝 자주 묻는 질문 (FAQ)

### Q1. 공지사항을 추가하려면?
**A**: `/home/user/webapp/src/data/notices.ts` 파일을 열어서 `notices` 배열에 새 공지 객체를 추가하고, 빌드 후 재시작하세요.

### Q2. 병원 정보를 수정하려면?
**A**: `/home/user/webapp/src/data/hospitals.ts` 파일에서 해당 병원의 `sections` 객체를 수정하고, 빌드 후 재시작하세요.

### Q3. 접속 코드를 변경하려면?
**A**: `/home/user/webapp/src/data/access-codes.ts` 파일에서 `code` 값을 수정하고, 빌드 후 재시작하세요.

### Q4. 로고를 변경하려면?
**A**: `/home/user/webapp/src/index.tsx` 파일의 이미지 프록시 섹션에서 URL을 변경하고, 빌드 후 재시작하세요.

### Q5. 빌드 후 변경사항이 반영 안 되면?
**A**: 
```bash
# 캐시 삭제
rm -rf dist/

# 재빌드
npm run build

# 포트 정리 후 재시작
fuser -k 3000/tcp && pm2 restart webapp
```

### Q6. Git 커밋은 필수인가요?
**A**: 필수는 아니지만 **강력 권장**합니다. 변경 이력을 추적하고, 문제 발생 시 이전 버전으로 복구할 수 있습니다.

### Q7. 보호된 자산 파일을 추가하려면?
**A**: 
```bash
# 1. 파일을 해당 병원 폴더에 추가
/home/user/webapp/public/protected/UJB/new-document.pdf

# 2. src/index.tsx에서 ProtectedAssetViewer 수정
<ProtectedAssetViewer
  hospitalId="UJB"
  pdfPath="new-document.pdf"  # 추가
  imagePath="uijeongbu-locker-guide.jpg"
  videoPath="uijeongbu-locker-video.mp4"
/>

# 3. 빌드 및 재시작
npm run build && pm2 restart webapp
```

### Q8. 보호된 자산이 403 에러가 나면?
**A**: 
- Hospital ID가 일치하는지 확인
- JWT 토큰이 만료되지 않았는지 확인 (12시간)
- 로그아웃 후 재로그인 시도
- 파일이 올바른 폴더에 있는지 확인 (예: /protected/UJB/)

---

## ⚠️ 중요 참고사항

1. **모든 데이터 수정 후 빌드 필수**: `npm run build` 실행 필수
2. **PM2 재시작 필수**: `pm2 restart webapp` 실행 필수
3. **Git 커밋 권장**: 변경 이력 관리를 위해 커밋 권장
4. **공식 LMS 확인**: 본 포털은 보조 자료이며, 공식 LMS 공지가 최종 기준
5. **접속 코드 보안**: 접속 코드는 학생들에게만 제공하고 외부 유출 금지

---

## 📜 라이선스
© 2026 mskim.online. All rights reserved.

**본 페이지는 김민수 교수의 실습 포털입니다.**
