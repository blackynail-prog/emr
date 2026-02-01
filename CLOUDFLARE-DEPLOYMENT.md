# 🚀 Cloudflare Pages 배포 가이드

**날짜**: 2026-02-01  
**프로젝트**: EMR 시스템  
**저장소**: https://github.com/blackynail-prog/emr

---

## ⚡ 빠른 시작

### 1. Cloudflare Dashboard 접속
https://dash.cloudflare.com/

### 2. Workers & Pages 선택
좌측 메뉴 → "Workers & Pages"

### 3. Create Application
- "Create application" 버튼 클릭
- "Pages" 탭 선택
- "Connect to Git" 클릭

### 4. GitHub 연결
- Repository: `blackynail-prog/emr`
- Branch: `main` (또는 `genspark_ai_developer`)

### 5. Build 설정

```
Project name:         emr
Production branch:    main
Framework preset:     None
Build command:        npm run build
Build output dir:     dist
Root directory:       (비워두기)
```

**Environment variables (선택)**:
```
NODE_VERSION: 18
```

### 6. Deploy!
"Save and Deploy" 클릭 → 완료! 🎉

---

## 📋 배포 설정 상세

### Build Command
```bash
npm run build
```
- `vite build` → Cloudflare Workers 번들 생성
- `cp -r public/* dist/` → 정적 파일 복사

### Output Structure
```
dist/
├── _worker.js        # Hono SSR 서버 번들
├── _routes.json      # 라우팅 설정
├── manifest.json     # PWA 매니페스트
├── images/           # 이미지 파일
├── protected/        # 보호된 리소스
└── static/           # CSS 등
```

---

## ✅ 배포 후 테스트

### 기본 URL
```
https://emr-xxx.pages.dev
```

### 테스트할 경로
- ✓ `/` - 홈페이지
- ✓ `/auth/CMC` - 병원 로그인
- ✓ `/emr/login` - EMR 로그인
- ✓ `/patients` - 환자 목록
- ✓ `/patients/E1001` - 환자 차트
- ✓ `/patients/E1001/labs` - 검사 탭
- ✓ `/patients/E1001/mar` - 투약기록 탭
- ✓ `/patients/E1001/notes` - 간호기록 탭

---

## 🔄 자동 배포

GitHub 연동 시:
- **main 브랜치** → 프로덕션 자동 배포
- **다른 브랜치** → 프리뷰 자동 배포
- **Pull Request** → 자동 프리뷰 URL

---

## 🐛 트러블슈팅

### 빌드 실패
- Node.js 버전 확인 (18+)
- `package-lock.json` 존재 확인
- 빌드 로그 에러 확인

### 404 에러
- Output directory: `dist` 확인
- `_worker.js` 파일 존재 확인
- `_routes.json` 파일 확인

### 페이지 로딩 안됨
- 브라우저 콘솔 확인
- 네트워크 탭 확인
- Cloudflare Functions 로그 확인

---

## 📝 Custom Domain (선택)

1. Pages 프로젝트 선택
2. "Custom domains" 탭
3. "Set up a custom domain"
4. 도메인 입력 (예: `emr.yourdomain.com`)
5. DNS 자동 설정
6. HTTPS 자동 활성화

---

## 📊 Cloudflare vs Vercel

|  | Cloudflare Pages | Vercel |
|---|---|---|
| **Hono SSR** | ✓ 완벽 지원 | ✗ 호환 안됨 |
| **이 프로젝트** | ✓ 완벽 호환 | ✗ 구조 변경 필요 |
| **무료 플랜** | 매우 관대 | 제한적 |
| **CDN** | 200+ 글로벌 | 70+ 글로벌 |

---

## 🎯 결론

✅ **Cloudflare Pages가 최적의 선택입니다!**

- 프로젝트가 Cloudflare용으로 설계됨
- Hono SSR 완벽 지원
- 간단한 설정
- 무료 플랜 충분
- 빠른 성능

---

**배포 준비 완료!** 🚀  
https://dash.cloudflare.com/

