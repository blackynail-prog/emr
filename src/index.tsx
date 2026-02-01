// src/index-simple.tsx
// 단순화된 실습 OT 안내 웹앱 + EMR Simulation
import { Hono } from 'hono';
import { HomePage } from './components/HomePage';
import { AuthGate } from './components/AuthGate';
import { HospitalDetail } from './components/HospitalDetail';
import { validateAccessCode } from './data/access-codes';
import { hasAccess, grantAccess } from './utils/access';

// EMR Module Imports
import { LoginPage } from './modules/auth/LoginPage';
import { login } from './modules/auth/authService';
import { CenterSelectPage } from './modules/centers/CenterSelectPage';
import { PatientListPage } from './modules/patients/PatientListPage';
import { SummaryPage } from './modules/chart/SummaryPage';
import { SummaryPageClient } from './modules/chart/SummaryPageClient';
import { LabsPage } from './modules/chart/LabsPage';
import { MarPage } from './modules/chart/MarPage';
import { NotesPage } from './modules/chart/NotesPage';
import mockEmrService from './modules/api/mockEmrService';

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

// ===== EMR ROUTES =====

// EMR API endpoints for client-side fetching
app.get('/api/emr/encounters/:encounterId/chart', async (c) => {
  const encounterId = c.req.param('encounterId');
  
  try {
    const chartData = await mockEmrService.getChartBundle(encounterId);
    return c.json(chartData);
  } catch (error) {
    console.error(`[API] Chart bundle error for ${encounterId}:`, error);
    return c.json({ 
      error: 'Encounter not found', 
      encounterId,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 404);
  }
});

// Legacy support for patientId
app.get('/api/emr/patients/:patientId/chart', async (c) => {
  const patientId = c.req.param('patientId');
  
  try {
    const chartData = await mockEmrService.getChartData(patientId);
    return c.json(chartData);
  } catch (error) {
    console.error(`[API] Chart data error for ${patientId}:`, error);
    return c.json({ 
      error: 'Patient not found', 
      patientId,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 404);
  }
});

// 1️⃣ Login Page
app.get('/login', (c) => {
  const error = c.req.query('error');
  return c.html(<LoginPage error={error} />);
});

// Login POST
app.post('/login', async (c) => {
  const formData = await c.req.parseBody();
  const username = formData.username as string;
  const password = formData.password as string;

  const user = await login(username, password);
  
  if (user) {
    return c.html(
      <html>
        <head>
          <title>로그인 중...</title>
        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: `
            localStorage.setItem('emr_auth', 'true');
            localStorage.setItem('emr_user', '${user.username}');
            window.location.href = '/select-center';
          `}} />
        </body>
      </html>
    );
  }

  return c.redirect('/login?error=Invalid credentials');
});

// Logout
app.get('/logout', (c) => {
  return c.html(
    <html>
      <head>
        <title>로그아웃 중...</title>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{__html: `
          localStorage.removeItem('emr_auth');
          localStorage.removeItem('emr_user');
          window.location.href = '/login';
        `}} />
      </body>
    </html>
  );
});

// 2️⃣ Select Center
app.get('/select-center', async (c) => {
  const centers = await mockEmrService.getCenters();
  return c.html(<CenterSelectPage centers={centers} />);
});

// 3️⃣ Inpatient Census List
app.get('/patients', async (c) => {
  const centerId = c.req.query('center');
  const inpatients = await mockEmrService.getInpatients(centerId);
  const centers = await mockEmrService.getCenters();
  const center = centers.find((ctr) => ctr.id === centerId);
  
  return c.html(
    <PatientListPage 
      inpatients={inpatients} 
      centerName={center?.name}
    />
  );
});

// 4️⃣ Patient Chart (Client-side with loading state) - supports both encounterId and patientId
app.get('/patients/:id', async (c) => {
  const id = c.req.param('id');
  
  // Check if it's an encounterId (E1001, E2001, etc.) or legacy patientId (pt-001, etc.)
  // encounterIds start with 'E' followed by digits
  const isEncounterId = /^E\d{4}$/.test(id);
  
  // Return client-side version with real data fetching
  return c.html(<SummaryPageClient encounterId={isEncounterId ? id : null} patientId={!isEncounterId ? id : null} />);
});

// Labs tab route
app.get('/patients/:id/labs', async (c) => {
  const id = c.req.param('id');
  const isEncounterId = /^E\d{4}$/.test(id);
  
  return c.html(<LabsPage encounterId={isEncounterId ? id : undefined} patientId={!isEncounterId ? id : undefined} />);
});

// MAR tab route
app.get('/patients/:id/mar', async (c) => {
  const id = c.req.param('id');
  const isEncounterId = /^E\d{4}$/.test(id);
  
  return c.html(<MarPage encounterId={isEncounterId ? id : undefined} patientId={!isEncounterId ? id : undefined} />);
});

// Notes tab route
app.get('/patients/:id/notes', async (c) => {
  const id = c.req.param('id');
  const isEncounterId = /^E\d{4}$/.test(id);
  
  return c.html(<NotesPage encounterId={isEncounterId ? id : undefined} patientId={!isEncounterId ? id : undefined} />);
});

// Notes API - Save DAR note
app.post('/api/emr/notes', async (c) => {
  try {
    const body = await c.req.json();
    const note = await mockEmrService.saveDarNote(body.encounterId, body);
    return c.json({ success: true, note });
  } catch (error) {
    console.error('[API] Save note error:', error);
    return c.json({ error: 'Failed to save note' }, 500);
  }
});

// Notes API - Get notes for encounter
app.get('/api/emr/notes/:encounterId', async (c) => {
  try {
    const encounterId = c.req.param('encounterId');
    const notes = await mockEmrService.getNotes(encounterId);
    return c.json({ notes });
  } catch (error) {
    console.error('[API] Get notes error:', error);
    return c.json({ error: 'Failed to fetch notes' }, 500);
  }
});

// ===== END EMR ROUTES =====

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
