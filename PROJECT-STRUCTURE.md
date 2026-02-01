# 📁 EMR 프로젝트 구조

## 루트 디렉토리

```
webapp/
├── README.md                    # 프로젝트 메인 문서
├── PROJECT-STRUCTURE.md         # 이 파일 - 프로젝트 구조 설명
├── package.json                 # 의존성 및 스크립트
├── tsconfig.json                # TypeScript 설정
├── vite.config.ts               # Vite 빌드 설정
├── wrangler.jsonc               # Cloudflare Workers 설정
├── ecosystem.config.cjs         # PM2 프로세스 관리
│
├── docs/                        # 📚 문서 폴더
│   ├── README.md                # 문서 인덱스
│   ├── EMR-COMPLETE-UPGRADE.md  # 완전한 업그레이드 요약
│   ├── TABS-STATUS.md           # 차트 탭 구현 상태
│   ├── UI-IMPROVEMENTS.md       # UI 개선 가이드
│   ├── VISUAL-SUMMARY.md        # 시각적 요약
│   └── archive/                 # 아카이브 문서
│
├── public/                      # 정적 파일
│   ├── images/                  # 이미지 리소스
│   ├── protected/               # 보호된 파일 (병원별)
│   └── static/                  # CSS 등 정적 리소스
│
├── scripts/                     # 유틸리티 스크립트
│   ├── hash-code.mjs            # 코드 해싱
│   ├── init-kv.cjs              # KV 초기화
│   └── seed-kv.cjs              # KV 시드 데이터
│
└── src/                         # 소스 코드
    ├── index.tsx                # 메인 라우팅
    ├── renderer.tsx             # SSR 렌더러
    │
    ├── components/              # 공통 컴포넌트
    │   ├── charts/              # 차트 컴포넌트
    │   │   └── SvgLineChart.tsx # SVG 라인 차트 (Zero dependency)
    │   ├── Layout.tsx           # 메인 레이아웃
    │   ├── SimpleLayout.tsx     # 간단한 레이아웃
    │   └── [기타 UI 컴포넌트들]
    │
    ├── modules/                 # 기능 모듈
    │   ├── api/                 # API 서비스
    │   │   └── mockEmrService.ts  # Mock EMR 데이터 서비스
    │   │
    │   ├── auth/                # 인증 모듈
    │   │   ├── EmrLoginPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   └── authService.ts
    │   │
    │   ├── centers/             # 센터 선택 모듈
    │   │   ├── CenterSelectPage.tsx
    │   │   └── centersService.ts
    │   │
    │   ├── chart/               # 📊 차트 모듈 (핵심)
    │   │   ├── ChartLayout.tsx      # 차트 레이아웃 (환자 배너 + 사이드바 + Quick Panel)
    │   │   ├── SummaryPageClient.tsx # 요약 페이지
    │   │   ├── LabsPage.tsx         # 검사 결과 탭
    │   │   ├── MarPage.tsx          # 투약 기록 탭
    │   │   └── NotesPage.tsx        # 간호 기록 탭 (DAR)
    │   │
    │   └── patients/            # 환자 목록 모듈
    │       ├── PatientListPage.tsx
    │       └── patientService.ts
    │
    ├── data/                    # 정적 데이터
    │   ├── hospitals.ts         # 병원 데이터
    │   ├── notices.ts           # 공지사항
    │   └── types.ts             # 타입 정의
    │
    ├── utils/                   # 유틸리티
    │   ├── time.ts              # 시간 포맷팅
    │   ├── auth.ts              # 인증 유틸
    │   └── access.ts            # 접근 제어
    │
    └── worker/                  # Cloudflare Worker
        ├── auth.ts              # 인증 워커
        ├── kv-handler.ts        # KV 스토리지 핸들러
        └── rate-limit.ts        # Rate Limiting
```

---

## 핵심 파일 설명

### 🎯 메인 라우팅 (`src/index.tsx`)
- 모든 URL 라우팅 정의
- 환자 차트 라우팅: `/patients/:id`, `/patients/:id/labs`, `/patients/:id/mar`, `/patients/:id/notes`
- API 엔드포인트: `/api/emr/encounters/:id/chart`, `/api/emr/encounters/:id/notes`

### 🏥 차트 레이아웃 (`src/modules/chart/ChartLayout.tsx`)
**핵심 컴포넌트 - 병원급 EMR 레이아웃**

구조:
```
┌─────────────────────────────────────────────────────┐
│  Patient Banner (환자 배너)                          │
│  Name | MRN | Location | Dx | Alerts | Status       │
├──────────┬──────────────────────┬──────────────────┤
│ Sidebar  │  Main Content        │  Quick Panel     │
│ 요약      │  (Chart Tabs)        │  최신 활력징후     │
│ 검사      │                      │  이상 검사        │
│ 투약기록   │                      │  주요 약제        │
│ 간호기록   │                      │  안전 알림        │
└──────────┴──────────────────────┴──────────────────┘
```

주요 기능:
- 환자 배너: 고정 컬럼 레이아웃, 알림 배지, 상태 칩
- 사이드바: 한글 메뉴, 활성 탭 표시, 배지 카운트
- Quick Panel: 임상 의사결정 지원 패널
  - 최신 활력징후 (임계값 강조)
  - 이상 검사 Top 3 (우선순위 정렬)
  - 주요 약제 (카테고리 분류)
  - 안전 알림 (자동 경고 생성)

### 📊 차트 탭 페이지

#### 1. **검사 결과** (`src/modules/chart/LabsPage.tsx`)
- 이상 검사 요약 스트립
- 검사 결과 테이블 (시간, 검사명, 결과, 단위, 참고치, Flag)
- 추이 그래프 (SvgLineChart 사용)
- 드롭다운으로 검사 항목 선택

#### 2. **투약 기록** (`src/modules/chart/MarPage.tsx`)
- 활성 약물 테이블 (약물명, 경로, 빈도, 상태)
- 24시간 타임라인 (시간별 이벤트 칩)
- 중요 약제 필터 (승압제, 항생제, 이뇨제, 항응고제)
- 안전 경고 배너 (미투약, 승압제 주입)

#### 3. **간호 기록** (`src/modules/chart/NotesPage.tsx`)
- DAR (Data-Assessment-Response) 프레임워크
- 근거 선택기 (활력징후, 이상 검사, 약제, 알림)
- 3섹션 에디터 (관찰, 사정, 중재/계획)
- 노트 목록 (최근 10개, 확장 가능)
- **자동 생성 없음** - 학생이 직접 작성

### 🗄️ Mock 데이터 서비스 (`src/modules/api/mockEmrService.ts`)
**1,200+ 줄의 완전한 Mock EMR 데이터**

포함 내용:
- ChartBundle 인터페이스 정의
- 6명의 환자 데이터 (E1001-E3002)
  - 환자 정보 (이름, 성별, 나이, MRN)
  - 입원 정보 (병동, 병실, 침대, 입원일)
  - 문제 목록 (주 진단)
  - 알림 (알러지, 격리, 낙상위험)
  - 상태 (코드, NPO, 의료기기)
  - 활력징후 시계열 (BP, HR, Temp, RR, SpO2, Pain)
  - 검사 결과 (최신 + 시계열)
  - 활성 약물 및 MAR 이벤트
- DAR 노트 인메모리 스토리지

API 함수:
- `getChartBundle(encounterId)`: 완전한 차트 데이터 반환
- `getInpatientList(centerId)`: 입원 환자 목록
- `saveDarNote(encounterId, note)`: DAR 노트 저장
- `getNotes(encounterId)`: DAR 노트 목록

### 📈 차트 컴포넌트 (`src/components/charts/SvgLineChart.tsx`)
**Zero-dependency SVG 라인 차트**

특징:
- 순수 SVG 렌더링 (외부 라이브러리 없음)
- 호버 툴팁
- 동적 Y축 스케일링
- X축 시간 포맷팅 (HH:MM)
- 그리드 및 점 표시 옵션
- 400줄의 깔끔한 코드

### 🕐 시간 유틸리티 (`src/utils/time.ts`)
한글 로케일 시간 포맷팅:
- `formatTimeHHMM(isoString)`: "HH:MM" 형식
- 한국 표준시 (KST) 지원
- ISO 8601 문자열 파싱

---

## 데이터 흐름

### 차트 페이지 로딩
```
User: /patients/E1001
    ↓
SummaryPageClient
    ↓
GET /api/emr/encounters/E1001/chart
    ↓
mockEmrService.getChartBundle('E1001')
    ↓
ChartBundle {
  patient: {...},
  encounter: {...},
  alerts: {...},
  status: {...},
  vitals_series: [...],
  labs_latest: [...],
  labs_series: {...},
  meds_active: [...],
  mar_events: [...]
}
    ↓
Render: Banner + Sidebar + Content + Quick Panel
```

### DAR 노트 저장
```
User: NotesPage에서 "저장" 클릭
    ↓
POST /api/emr/encounters/E1001/notes
    ↓
mockEmrService.saveDarNote('E1001', noteData)
    ↓
notesByEncounter['E1001'].unshift(newNote)
    ↓
Response: Saved note
    ↓
UI: 노트 목록 최상단에 추가
```

---

## 주요 기술 스택

### Frontend
- **React** (via Hono JSX)
- **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (유틸리티 CSS)
- **순수 CSS** (커스텀 스타일)

### Backend (Cloudflare Workers)
- **Hono** (웹 프레임워크)
- **Cloudflare KV** (키-값 스토리지)
- **Cloudflare Pages** (호스팅)

### 개발 도구
- **PM2** (프로세스 관리)
- **ESLint** (린팅)
- **Git** (버전 관리)

---

## 디렉토리 네이밍 규칙

- **kebab-case**: 파일명 및 폴더명 (예: `chart-layout.tsx`)
- **PascalCase**: React 컴포넌트 파일 (예: `ChartLayout.tsx`)
- **camelCase**: 변수 및 함수명
- **UPPER_SNAKE_CASE**: 상수

---

## 문서 구조

### docs/
- **주요 문서**: 프로젝트 개요, 업그레이드 요약, 탭 상태, UI 가이드
- **archive/**: 과거 버전 및 개발 과정 문서

### 문서 네이밍
- `EMR-COMPLETE-UPGRADE.md`: 완전한 업그레이드 요약
- `TABS-STATUS.md`: 탭 구현 상태
- `UI-IMPROVEMENTS.md`: UI 개선 사항
- `VISUAL-SUMMARY.md`: 시각적 다이어그램

---

## 개발 워크플로우

### 1. 로컬 개발
```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 시작 (포트 5173)
```

### 2. 빌드
```bash
npm run build        # 프로덕션 빌드
```

### 3. 배포
```bash
npm run deploy       # Cloudflare Pages 배포
```

### 4. Git 워크플로우
```bash
git add .
git commit -m "feat: 기능 설명"
git push origin genspark_ai_developer
```

---

## 환경 설정

### 필수 파일
- `package.json`: 의존성 및 스크립트
- `tsconfig.json`: TypeScript 컴파일러 옵션
- `vite.config.ts`: Vite 빌드 설정
- `wrangler.jsonc`: Cloudflare Workers 설정

### 환경 변수
- 현재 환경 변수 없음 (모든 설정은 파일에 하드코딩)
- 향후 `.env` 파일 추가 가능

---

## 코드 스타일

### TypeScript
- Strict mode 활성화
- 명시적 타입 선언 권장
- Interface 우선, Type alias는 필요시

### React/JSX
- Functional components (Hono JSX)
- Props 인터페이스 정의
- 컴포넌트당 하나의 파일

### CSS
- Tailwind 유틸리티 클래스 우선
- 커스텀 CSS는 컴포넌트 내 `<style>` 태그
- EMR 스타일 가이드 준수 (12-13px, compact)

---

## 유지보수 가이드

### 새 차트 탭 추가
1. `src/modules/chart/` 에 새 페이지 생성 (예: `VitalsPage.tsx`)
2. `src/index.tsx` 에 라우트 추가
3. `ChartLayout.tsx` 사이드바 메뉴에 항목 추가
4. `mockEmrService.ts` 에 필요한 데이터 추가

### 새 환자 추가
1. `mockEmrService.ts` 의 `chartBundles` 에 새 encounter ID 추가
2. 모든 필수 필드 채우기 (patient, encounter, alerts, status, vitals, labs, meds, mar)
3. `inpatientsByCenter` 에도 추가

### UI 스타일 변경
1. `ChartLayout.tsx` 의 `<style>` 태그 수정
2. 또는 개별 페이지의 인라인 스타일 수정
3. Tailwind 클래스 활용 권장

---

**업데이트**: 2026-02-01  
**상태**: ✅ 정리 완료  
**버전**: v1.0
