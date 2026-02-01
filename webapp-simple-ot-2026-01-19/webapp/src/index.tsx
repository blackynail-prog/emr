// src/index-simple.tsx
// 단순화된 실습 OT 안내 웹앱
import { Hono } from 'hono';
import { HomePage } from './components/HomePage';
import { AuthGate } from './components/AuthGate';
import { HospitalDetail } from './components/HospitalDetail';
import { validateAccessCode } from './data/access-codes';
import { hasAccess, grantAccess } from './utils/access';

const app = new Hono();

// 홈 페이지
app.get('/', (c) => {
  return c.html(<HomePage />);
});

// 인증 페이지 (GET)
app.get('/auth/:hospitalId', (c) => {
  const hospitalId = c.req.param('hospitalId');
  const error = c.req.query('error') === 'true';
  
  return c.html(<AuthGate hospitalId={hospitalId} error={error} />);
});

// 인증 처리 (POST)
app.post('/auth/:hospitalId', async (c) => {
  const hospitalId = c.req.param('hospitalId');
  const formData = await c.req.parseBody();
  const code = formData.code as string;
  
  // 코드 검증
  if (validateAccessCode(hospitalId, code)) {
    // 인증 성공 - localStorage에 저장하는 스크립트 반환
    return c.html(
      <html>
        <head>
          <title>인증 중...</title>
        </head>
        <body>
          <div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
            <div style="text-align:center;">
              <div style="margin-bottom:20px;font-size:48px;">✅</div>
              <h2>인증 성공!</h2>
              <p>병원 안내 페이지로 이동합니다...</p>
            </div>
          </div>
          <script dangerouslySetInnerHTML={{__html: `
            localStorage.setItem('access:${hospitalId}', 'true');
            setTimeout(function() {
              window.location.href = '/hospital/${hospitalId}';
            }, 1000);
          `}} />
        </body>
      </html>
    );
  }
  
  // 인증 실패
  return c.redirect(`/auth/${hospitalId}?error=true`);
});

// 병원 상세 페이지
app.get('/hospital/:hospitalId', (c) => {
  const hospitalId = c.req.param('hospitalId');
  
  // 클라이언트 측에서 권한 체크하는 스크립트 포함
  return c.html(
    <html>
      <head>
        <title>권한 확인 중...</title>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{__html: `
          const hasAccess = localStorage.getItem('access:${hospitalId}') === 'true';
          
          if (!hasAccess) {
            // 권한 없음 - 인증 페이지로 리다이렉트
            window.location.href = '/auth/${hospitalId}';
          } else {
            // 권한 있음 - 실제 페이지 로드
            window.location.href = '/hospital/${hospitalId}/view';
          }
        `}} />
      </body>
    </html>
  );
});

// 병원 상세 페이지 (실제 컨텐츠)
app.get('/hospital/:hospitalId/view', (c) => {
  const hospitalId = c.req.param('hospitalId');
  return c.html(<HospitalDetail hospitalId={hospitalId} />);
});

// 404
app.notFound((c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>페이지를 찾을 수 없습니다</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center px-4">
          <div class="text-center">
            <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">페이지를 찾을 수 없습니다</h2>
            <p class="text-gray-600 mb-6">요청하신 페이지가 존재하지 않습니다.</p>
            <a href="/" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </body>
    </html>
  );
});

export default app;
