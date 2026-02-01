# 📚 EMR 프로젝트 문서

## 주요 문서

### 📖 [프로젝트 개요](../README.md)
메인 README - 프로젝트 소개 및 시작 가이드

### 🏥 [완전한 EMR 업그레이드 요약](./EMR-COMPLETE-UPGRADE.md)
- 전체 기능 구현 상세 내역
- 한글 현지화 완료 내역
- 병원급 UI 개선 사항
- 6명의 환자 데이터 커버리지
- 교육적 영향 및 가치

### 📊 [차트 탭 구현 상태](./TABS-STATUS.md)
- Labs 탭 (검사 결과)
- MAR 탭 (투약 기록)
- Notes 탭 (간호 기록)
- 각 탭의 기능 및 데이터 모델

### 🎨 [UI 개선 가이드](./UI-IMPROVEMENTS.md)
- 환자 배너 디자인
- 사이드바 한글화
- Quick Panel 임상 의사결정 지원
- 반응형 레이아웃

### 📐 [시각적 요약](./VISUAL-SUMMARY.md)
- 병원급 환자 배너 레이아웃
- 색상 코딩 시스템
- 아키텍처 개요
- 데이터 흐름

---

## 아카이브 문서

과거 버전 및 개발 과정 문서는 [archive](./archive/) 폴더를 참조하세요.

---

## 빠른 링크

### 🚀 라이브 URL
- **Base**: https://5173-ipzhumqze4z2rrgqyymtx-ad490db5.sandbox.novita.ai
- **환자 목록**: /patients
- **환자 차트**: /patients/E1001
- **검사 결과**: /patients/E1001/labs
- **투약 기록**: /patients/E1001/mar
- **간호 기록**: /patients/E1001/notes

### 📦 주요 파일
- **라우팅**: `src/index.tsx`
- **차트 레이아웃**: `src/modules/chart/ChartLayout.tsx`
- **데이터 서비스**: `src/modules/api/mockEmrService.ts`
- **차트 컴포넌트**: `src/components/charts/SvgLineChart.tsx`

### 🎓 교육 기관
**서울여자간호대학** (Seoul Women's Nursing University)

---

**날짜**: 2026-02-01  
**상태**: ✅ 프로덕션 준비 완료  
**브랜치**: genspark_ai_developer
