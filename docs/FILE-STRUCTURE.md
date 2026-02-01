# EMR 프로젝트 파일 구조
Date: 2026-02-01  
Branch: genspark_ai_developer  
Commit: 10aa751

## 📁 프로젝트 루트 구조

```
webapp/
├── docs/                      # 📚 모든 프로젝트 문서
│   ├── README.md             # 문서 인덱스
│   ├── EMR-COMPLETE-UPGRADE.md   # EMR 업그레이드 전체 요약
│   ├── TABS-STATUS.md        # 탭 구현 상태
│   ├── UI-IMPROVEMENTS.md    # UI 개선사항
│   ├── VISUAL-SUMMARY.md     # 시각적 요약
│   └── archive/              # 이전 문서 보관
│       ├── EMR_CORE_SETUP.md
│       ├── EMR_PROJECT_SUMMARY.md
│       ├── EMR_VERIFICATION.md
│       ├── EPIC_STYLE_LAYOUT.md
│       └── test-results.md
│
├── src/                       # 💻 소스 코드
│   ├── index.tsx             # 메인 엔트리 포인트
│   ├── renderer.tsx          # SSR 렌더러
│   │
│   ├── components/           # 🧩 공용 컴포넌트
│   │   ├── charts/
│   │   │   └── SvgLineChart.tsx   # SVG 라인 차트 (의존성 제로)
│   │   ├── AuthComponents.tsx
│   │   ├── HomePage.tsx
│   │   ├── HospitalComponents.tsx
│   │   └── ... (기타 공용 컴포넌트)
│   │
│   ├── modules/              # 🏥 EMR 모듈
│   │   ├── api/
│   │   │   └── mockEmrService.ts    # Mock EMR 데이터 서비스 (1,200+ 줄)
│   │   │
│   │   ├── auth/                    # 인증 모듈
│   │   │   ├── EmrLoginPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── authService.ts
│   │   │
│   │   ├── centers/                 # 센터 선택 모듈
│   │   │   ├── CenterSelectPage.tsx
│   │   │   ├── SelectCenterPage.tsx
│   │   │   └── centersService.ts
│   │   │
│   │   ├── chart/                   # 📊 환자 차트 모듈
│   │   │   ├── ChartLayout.tsx      # 레이아웃 + Patient Banner + Quick Panel
│   │   │   ├── SummaryPageClient.tsx
│   │   │   ├── SummaryPage.tsx
│   │   │   ├── LabsPage.tsx         # 검사 탭 (Labs)
│   │   │   ├── MarPage.tsx          # 투약기록 탭 (MAR)
│   │   │   ├── NotesPage.tsx        # 간호기록 탭 (Notes)
│   │   │   └── PatientChartPage.tsx
│   │   │
│   │   └── patients/                # 환자 목록 모듈
│   │       ├── PatientListPage.tsx
│   │       ├── PatientSummaryPage.tsx
│   │       └── patientService.ts
│   │
│   ├── data/                 # 📄 정적 데이터
│   ├── utils/                # 🔧 유틸리티
│   └── worker/               # ⚙️ 워커 스크립트
│
├── public/                    # 🌐 정적 에셋
│   ├── images/               # 병원 로고 등
│   ├── protected/            # 보호된 리소스
│   └── static/               # CSS 등
│
├── scripts/                   # 🛠️ 빌드/배포 스크립트
│   ├── hash-code.mjs
│   ├── init-kv.cjs
│   └── seed-kv.cjs
│
├── README.md                  # 프로젝트 README
├── PROJECT-STRUCTURE.md       # 상세 구조 문서
├── CLEANUP-SUMMARY.md         # 정리 요약
│
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
├── vite.config.ts             # Vite 빌드 설정
├── wrangler.jsonc             # Cloudflare 배포 설정
├── ecosystem.config.cjs       # PM2 설정
└── .gitignore                 # Git 무시 파일 (node_modules, dist 포함)
```

## 🗂️ 핵심 파일 설명

### EMR 차트 시스템
- **ChartLayout.tsx** (1,100+ 줄)
  - Patient Banner: 7-column 고정 레이아웃, 한국어 라벨
  - Left Sidebar: 7개 탭 메뉴 (요약, 오더, 검사, 투약기록, 활력징후, 노트, 핸드오프)
  - Right Quick Panel: Clinical Decision Support (최신 V/S, 이상 검사, 중요 약제, 안전 경고)
  - Responsive: 모바일/태블릿 대응

- **LabsPage.tsx** (14,867 bytes)
  - Abnormal Summary Strip
  - Labs Table (sticky header, H/L 배지)
  - Trend Chart (SvgLineChart 사용)

- **MarPage.tsx** (11,976 bytes)
  - Active Meds Table
  - 24-hour Timeline
  - Safety Alerts (미투약, 승압제)

- **NotesPage.tsx** (15,988 bytes)
  - Evidence-based DAR Framework
  - No Auto-generation
  - Checkbox Evidence Picker

### 데이터 서비스
- **mockEmrService.ts** (1,200+ 줄)
  - 6개 환자 데이터 (E1001-E3002)
  - ChartBundle 인터페이스
  - labs_latest, labs_series, meds_active, mar_events
  - DarNote 인메모리 스토리지

### 차트 컴포넌트
- **SvgLineChart.tsx**
  - 의존성 제로 SVG 차트
  - Responsive
  - Trend line + latest value marker

## 📊 데이터 모델

### ChartBundle
```typescript
{
  patient: { name, sex, age, mrn }
  encounter: { ward, room, bed, admitAt }
  problemList: string[]
  alerts: { allergy, isolation, fallRisk }
  status: { code, npo, devices }
  vitals_series: VitalsPoint[]
  labs_latest: LabResult[]
  labs_series: Record<string, TimeValue[]>
  meds_active: ActiveMed[]
  mar_recent: MARRecord[]
  mar_events: MARRecord[]
}
```

## 🚀 라우팅

| URL | Component | Description |
|-----|-----------|-------------|
| `/patients` | PatientListPage | 재원환자 목록 |
| `/patients/:id` | SummaryPageClient | 환자 차트 요약 |
| `/patients/:id/labs` | LabsPage | 검사 탭 |
| `/patients/:id/mar` | MarPage | 투약기록 탭 |
| `/patients/:id/notes` | NotesPage | 간호기록 탭 |

## 📝 문서 구조

### 주요 문서 (docs/)
1. **README.md** - 문서 인덱스
2. **EMR-COMPLETE-UPGRADE.md** - 전체 업그레이드 요약 (18KB)
3. **TABS-STATUS.md** - 탭 구현 상태 (16KB)
4. **UI-IMPROVEMENTS.md** - UI 개선사항 (11KB)
5. **VISUAL-SUMMARY.md** - 시각적 요약 (8KB)

### 보관 문서 (docs/archive/)
- EMR_CORE_SETUP.md
- EMR_PROJECT_SUMMARY.md
- EMR_VERIFICATION.md
- EPIC_STYLE_LAYOUT.md
- test-results.md

## 🔧 개발 워크플로

### 로컬 개발
```bash
cd /home/user/webapp
npm run dev          # Vite 개발 서버 시작
npm run build        # 프로덕션 빌드
```

### Git 브랜치
- **main**: 프로덕션 브랜치
- **genspark_ai_developer**: 개발 브랜치 (현재)

### 커밋 규칙
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 변경
- refactor: 코드 리팩토링

## 📦 의존성

### 프로덕션
- React 18
- TypeScript
- Vite

### 개발
- No external UI libraries
- Pure CSS styling
- SVG charts (no Chart.js, D3, etc.)

## 🎯 프로젝트 상태

✅ **완료**
- Patient Banner (7-column, sticky)
- Clinical Decision Support Panel
- Labs Tab (table + trend chart)
- MAR Tab (timeline + safety alerts)
- Notes Tab (DAR framework, no auto-gen)
- 100% Korean localization
- 6 patient mock data
- Responsive layout
- Documentation system

⏸️ **보류**
- Vitals Tab (활력징후)
- Orders Tab (오더)
- Handoff Tab (핸드오프)
- Real API integration

## 🌐 배포

- **Live URL**: https://5173-ipzhumqze4z2rrgqyymtx-ad490db5.sandbox.novita.ai
- **Repository**: https://github.com/blackynail-prog/my-web
- **Branch**: genspark_ai_developer
- **Latest Commit**: 10aa751

## 📚 참고 문서

- 프로젝트 구조: `PROJECT-STRUCTURE.md`
- EMR 전체 업그레이드: `docs/EMR-COMPLETE-UPGRADE.md`
- 탭 상태: `docs/TABS-STATUS.md`
- 정리 요약: `CLEANUP-SUMMARY.md`

---

**마지막 업데이트**: 2026-02-01  
**상태**: ✅ 파일 구조 정리 완료  
**브랜치**: genspark_ai_developer  
**커밋**: 10aa751
