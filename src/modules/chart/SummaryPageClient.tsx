/**
 * SummaryPageClient.tsx
 * Client-side Patient Chart Summary with ChartBundle structure
 */

import { FC } from 'hono/jsx';
import { SvgLineChart } from '../../components/charts/SvgLineChart';

interface SummaryPageClientProps {
  encounterId?: string | null;
  patientId?: string | null;
}

export const SummaryPageClient: FC<SummaryPageClientProps> = ({ encounterId, patientId }) => {
  const id = encounterId || patientId || 'unknown';
  const idType = encounterId ? 'encounter' : 'patient';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Loading Chart...</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            font-size: 13px;
            color: #2c3e50;
            background: #ecf0f1;
          }
          
          .emr-container {
            display: grid;
            grid-template-columns: 200px 1fr 280px;
            grid-template-rows: 80px 1fr;
            grid-template-areas:
              "sidebar banner banner"
              "sidebar content quick";
            height: 100vh;
          }
          
          .patient-banner {
            grid-area: banner;
            background: linear-gradient(135deg, #1e3a5f 0%, #2c3e50 100%);
            color: white;
            padding: 12px 20px;
            border-bottom: 4px solid #2980b9;
            display: flex;
            align-items: center;
            gap: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          
          .patient-name { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
          .patient-meta { font-size: 12px; color: #bdc3c7; display: flex; gap: 16px; margin-top: 4px; }
          .patient-meta-item { display: flex; align-items: center; gap: 4px; }
          .patient-meta-label { color: #95a5a6; font-weight: 500; }
          .patient-meta-value { color: #ecf0f1; font-weight: 600; }
          .banner-section { display: flex; flex-direction: column; gap: 4px; }
          .banner-alerts { display: flex; gap: 8px; flex-wrap: wrap; }
          .banner-right { margin-left: auto; text-align: right; font-size: 10px; color: #95a5a6; }
          
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          
          .badge-allergy { background: #e74c3c; color: white; animation: pulse 2s ease-in-out infinite; }
          .badge-isolation { background: #f39c12; color: white; }
          .badge-fall { background: #9b59b6; color: white; }
          .badge-code { background: #27ae60; color: white; }
          .badge-dnr { background: #95a5a6; color: white; }
          .badge-npo { background: #e67e22; color: white; }
          .badge-device { background: #34495e; color: white; }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .sidebar {
            grid-area: sidebar;
            background: #263238;
            border-right: 1px solid #1c2529;
            padding: 12px 0;
            overflow-y: auto;
          }
          
          .sidebar-section {
            margin-bottom: 20px;
          }
          
          .sidebar-section-title {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #78909c;
            padding: 8px 16px 4px 16px;
            letter-spacing: 0.5px;
          }
          
          .sidebar-menu { list-style: none; padding: 0; }
          .sidebar-menu li { margin-bottom: 1px; position: relative; }
          .sidebar-menu a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px 10px 20px;
            color: #b0bec5;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.15s;
            position: relative;
          }
          .sidebar-menu a:hover { 
            background: rgba(66, 165, 245, 0.08);
            color: #e3f2fd;
          }
          .sidebar-menu a.active {
            background: rgba(66, 165, 245, 0.15);
            color: #ffffff;
            font-weight: 600;
          }
          .sidebar-menu a.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #42a5f5;
          }
          .menu-badge {
            margin-left: auto;
            background: rgba(255,255,255,0.1);
            color: #90caf9;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 10px;
            min-width: 18px;
            text-align: center;
          }
          .menu-badge.critical {
            background: #ef5350;
            color: white;
            animation: pulse 2s ease-in-out infinite;
          }
          
          .main-content {
            grid-area: content;
            background: #f8f9fa;
            padding: 16px;
            overflow-y: auto;
          }
          
          .quick-panel {
            grid-area: quick;
            background: #fafafa;
            border-left: 2px solid #e0e0e0;
            padding: 16px 12px;
            overflow-y: auto;
          }
          
          .panel-section {
            background: white;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }
          
          .panel-title {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: #546e7a;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 6px;
          }
          
          .vital-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 12px;
            border-bottom: 1px solid #f5f5f5;
          }
          .vital-row:last-child { border-bottom: none; }
          
          .vital-label { color: #78909c; font-weight: 500; }
          .vital-value { font-weight: 700; color: #37474f; font-family: 'Courier New', monospace; }
          .vital-critical { color: #d32f2f !important; }
          .vital-warning { color: #f57c00 !important; }
          
          .lab-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            font-size: 11px;
            border-bottom: 1px solid #f5f5f5;
          }
          .lab-row:last-child { border-bottom: none; }
          
          .lab-name { color: #546e7a; font-weight: 500; }
          .lab-value { font-weight: 700; font-family: 'Courier New', monospace; }
          .lab-flag-H { color: #d32f2f; font-weight: 700; }
          .lab-flag-L { color: #1976d2; font-weight: 700; }
          
          .count-badge {
            background: #ef5350;
            color: white;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 12px;
            margin-left: 8px;
          }
          
          .loading-spinner {
            border: 4px solid #ecf0f1;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* EMR Table Styles */
          .emr-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            background: white;
          }
          .emr-table thead {
            background: #37474f;
            color: white;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .emr-table th {
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .emr-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #eceff1;
          }
          .emr-table tbody tr:nth-child(even) {
            background: #fafafa;
          }
          .emr-table tbody tr:hover {
            background: #e3f2fd;
            cursor: pointer;
          }
          .emr-table td.numeric {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 600;
          }
          
          @media (max-width: 1280px) {
            .emr-container {
              grid-template-columns: 200px 1fr;
              grid-template-areas: "sidebar banner" "sidebar content";
            }
            .quick-panel { display: none; }
          }
          
          @media (max-width: 768px) {
            .emr-container {
              grid-template-columns: 1fr;
              grid-template-areas: "banner" "content";
            }
            .sidebar { display: none; }
          }
        `}</style>
      </head>
      <body>
        <div id="app">
          <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
            <div style="text-center;">
              <div class="loading-spinner"></div>
              <p style="margin-top: 16px; color: #7f8c8d;">Loading patient chart...</p>
            </div>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{__html: `
          const id = '${id}';
          const idType = '${idType}';
          let chartData = null;
          
          async function loadChartData() {
            try {
              const endpoint = idType === 'encounter' 
                ? '/api/emr/encounters/' + id + '/chart'
                : '/api/emr/patients/' + id + '/chart';
              
              console.log('[SummaryPage] Loading chart data for', idType, id, 'from', endpoint);
              
              const response = await fetch(endpoint);
              
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('[SummaryPage] Chart data load failed:', errorData);
                throw new Error(errorData.message || errorData.error || 'Failed to load chart data');
              }
              
              chartData = await response.json();
              console.log('[SummaryPage] Chart data loaded successfully:', chartData);
              renderChart();
            } catch (error) {
              console.error('[SummaryPage] Error loading chart for', idType, id, ':', error);
              document.getElementById('app').innerHTML = \`
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #ecf0f1;">
                  <div style="text-align: center; max-width: 600px; background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="color: #e74c3c; font-size: 48px; margin-bottom: 16px;">⚠️</div>
                    <p style="font-weight: 700; font-size: 18px; color: #2c3e50; margin-bottom: 8px;">Error Loading Chart</p>
                    <p style="color: #7f8c8d; margin-bottom: 16px;">\${error.message}</p>
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; margin-bottom: 16px; text-align: left;">
                      <p style="font-size: 12px; color: #7f8c8d; margin-bottom: 4px;"><strong>ID Type:</strong> \${idType}</p>
                      <p style="font-size: 12px; color: #7f8c8d; margin-bottom: 4px;"><strong>ID Value:</strong> \${id}</p>
                      <p style="font-size: 12px; color: #7f8c8d;"><strong>Endpoint:</strong> \${idType === 'encounter' ? '/api/emr/encounters/' + id + '/chart' : '/api/emr/patients/' + id + '/chart'}</p>
                    </div>
                    <a href="/patients" style="display: inline-block; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; font-weight: 600;">
                      ← Back to Patient List
                    </a>
                  </div>
                </div>
              \`;
            }
          }
          
          function renderChart() {
            const { patient, encounter, problemList, alerts, status, vitals_series, labs_latest, meds_active, mar_recent } = chartData;
            const latestVitals = vitals_series[vitals_series.length - 1] || {};
            const abnormalLabs = labs_latest.filter(lab => lab.flag === 'H' || lab.flag === 'L');
            
            // Pre-process device badges
            const deviceBadges = status.devices && status.devices.length > 0 
              ? status.devices.map(device => '<span class="badge badge-device">🔧 ' + device + '</span>').join('') 
              : '';
            
            document.getElementById('app').innerHTML = \`
              <div class="emr-container">
                <!-- Patient Banner -->
                <div class="patient-banner">
                  <div class="banner-section">
                    <div class="patient-name">\${patient.name}</div>
                    <div class="patient-meta">
                      <div class="patient-meta-item">
                        <span class="patient-meta-label">성별/나이:</span>
                        <span class="patient-meta-value">\${patient.sex === 'M' ? '남' : '여'} / \${patient.age}세</span>
                      </div>
                      <div class="patient-meta-item">
                        <span class="patient-meta-label">등록번호:</span>
                        <span class="patient-meta-value">\${patient.mrn}</span>
                      </div>
                      <div class="patient-meta-item">
                        <span class="patient-meta-label">병동:</span>
                        <span class="patient-meta-value">\${encounter.ward}</span>
                      </div>
                      <div class="patient-meta-item">
                        <span class="patient-meta-label">병실:</span>
                        <span class="patient-meta-value">\${encounter.room}-\${encounter.bed}</span>
                      </div>
                      <div class="patient-meta-item">
                        <span class="patient-meta-label">입원일:</span>
                        <span class="patient-meta-value">\${encounter.admitAt}</span>
                      </div>
                    </div>
                  </div>
                  <div class="banner-alerts">
                    \${alerts.allergy ? \`<span class="badge badge-allergy">🔴 알러지: \${alerts.allergy}</span>\` : ''}
                    \${alerts.isolation ? \`<span class="badge badge-isolation">⚠️ 격리: \${alerts.isolation}</span>\` : ''}
                    \${alerts.fallRisk ? \`<span class="badge badge-fall">⚡ 낙상위험</span>\` : ''}
                    <span class="badge \${status.code === 'Full' ? 'badge-code' : 'badge-dnr'}">\${status.code === 'Full' ? '💚' : '⚪'} \${status.code}</span>
                    \${status.npo ? \`<span class="badge badge-npo">🍴 NPO</span>\` : ''}
                    \${deviceBadges}
                  </div>
                  <div class="banner-right">
                    <div>최종 갱신</div>
                    <div style="font-weight: 600; color: #ecf0f1; margin-top: 2px;">\${new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
                
                <!-- Sidebar -->
                <div class="sidebar">
                  <div class="sidebar-section">
                    <div class="sidebar-section-title">환자정보</div>
                    <ul class="sidebar-menu">
                      <li><a href="/patients/\${id}?tab=summary" class="active"><span>📊</span><span>요약</span></a></li>
                    </ul>
                  </div>
                  
                  <div class="sidebar-section">
                    <div class="sidebar-section-title">처방·검사</div>
                    <ul class="sidebar-menu">
                      <li><a href="/patients/\${id}?tab=orders"><span>📝</span><span>처방</span></a></li>
                      <li><a href="/patients/\${id}/labs"><span>🧪</span><span>검사</span><span class="menu-badge \${labs_latest.filter(l => l.flag === 'H' || l.flag === 'L').length > 0 ? 'critical' : ''}">\${labs_latest.length}</span></a></li>
                    </ul>
                  </div>
                  
                  <div class="sidebar-section">
                    <div class="sidebar-section-title">투약</div>
                    <ul class="sidebar-menu">
                      <li><a href="/patients/\${id}/mar"><span>💊</span><span>투약기록(MAR)</span><span class="menu-badge">\${mar_recent.length}</span></a></li>
                      <li><a href="/patients/\${id}?tab=vitals"><span>❤️</span><span>활력징후</span></a></li>
                    </ul>
                  </div>
                  
                  <div class="sidebar-section">
                    <div class="sidebar-section-title">기록</div>
                    <ul class="sidebar-menu">
                      <li><a href="/patients/\${id}/notes"><span>📋</span><span>간호기록</span></a></li>
                      <li><a href="/patients/\${id}?tab=handoff"><span>🔄</span><span>인수인계</span></a></li>
                    </ul>
                  </div>
                </div>
                
                <!-- Main Content -->
                <div class="main-content">
                  <h2 style="font-size: 22px; font-weight: 700; color: #2c3e50; margin-bottom: 20px;">환자 차트 요약</h2>
                  
                  <!-- Problem List -->
                  <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #2c3e50;">문제 목록 (Problem List)</h3>
                    <ul style="list-style: none; padding: 0;">
                      \${problemList.map((prob, idx) => \`
                        <li style="padding: 8px; border-left: 4px solid #3498db; background: #e3f2fd; margin-bottom: 6px; font-size: 13px;">
                          <span style="font-weight: 600; color: #2c3e50;">\${idx + 1}. \${prob}</span>
                        </li>
                      \`).join('')}
                    </ul>
                  </div>
                  
                  <!-- Latest Vitals -->
                  <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <h3 style="font-weight: 700; font-size: 15px; color: #2c3e50;">Latest Vitals</h3>
                      <span style="font-size: 11px; color: #7f8c8d;">\${latestVitals.time || ''}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                      <div style="border: 1px solid #dfe6e9; border-radius: 4px; padding: 12px; text-align: center;">
                        <p style="font-size: 10px; color: #7f8c8d; margin-bottom: 4px;">BP</p>
                        <p style="font-size: 18px; font-weight: 700; color: #2c3e50;">\${latestVitals.sbp}/\${latestVitals.dbp}</p>
                      </div>
                      <div style="border: 1px solid #dfe6e9; border-radius: 4px; padding: 12px; text-align: center;">
                        <p style="font-size: 10px; color: #7f8c8d; margin-bottom: 4px;">HR</p>
                        <p style="font-size: 18px; font-weight: 700; color: #2c3e50;">\${latestVitals.hr}</p>
                      </div>
                      <div style="border: 1px solid #dfe6e9; border-radius: 4px; padding: 12px; text-align: center;">
                        <p style="font-size: 10px; color: #7f8c8d; margin-bottom: 4px;">Temp</p>
                        <p style="font-size: 18px; font-weight: 700; color: #2c3e50;">\${latestVitals.temp}°C</p>
                      </div>
                      <div style="border: 1px solid #dfe6e9; border-radius: 4px; padding: 12px; text-align: center;">
                        <p style="font-size: 10px; color: #7f8c8d; margin-bottom: 4px;">SpO2</p>
                        <p style="font-size: 18px; font-weight: 700; color: #2c3e50;">\${latestVitals.spo2}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Vitals Trend -->
                  <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #2c3e50;">Vitals Trend</h3>
                    <div style="overflow-x: auto;">
                      <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                        <thead style="background: #f8f9fa;">
                          <tr>
                            <th style="padding: 8px; text-align: left; border-bottom: 2px solid #dfe6e9;">Time</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 2px solid #dfe6e9;">BP</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 2px solid #dfe6e9;">HR</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 2px solid #dfe6e9;">RR</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 2px solid #dfe6e9;">Temp</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 2px solid #dfe6e9;">SpO2</th>
                          </tr>
                        </thead>
                        <tbody>
                          \${vitals_series.map(v => \`
                            <tr style="border-bottom: 1px solid #ecf0f1;">
                              <td style="padding: 8px;">\${v.time}</td>
                              <td style="padding: 8px; text-align: center; font-weight: 600;">\${v.sbp}/\${v.dbp}</td>
                              <td style="padding: 8px; text-align: center; font-weight: 600;">\${v.hr}</td>
                              <td style="padding: 8px; text-align: center; font-weight: 600;">\${v.rr}</td>
                              <td style="padding: 8px; text-align: center; font-weight: 600;">\${v.temp}</td>
                              <td style="padding: 8px; text-align: center; font-weight: 600;">\${v.spo2}%</td>
                            </tr>
                          \`).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <!-- Vitals Charts -->
                  <div id="vitals-charts-container" style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #2c3e50;">Vitals Trends (Graphical)</h3>
                    <div id="vitals-charts" style="display: grid; gap: 16px;">
                      <!-- Charts will be rendered here by client script -->
                      <div style="text-align: center; padding: 20px; color: #7f8c8d;">
                        Loading charts...
                      </div>
                    </div>
                  </div>
                  
                  <!-- Abnormal Labs -->
                  \${abnormalLabs.length > 0 ? \`
                    <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                      <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #2c3e50;">Abnormal Labs (\${abnormalLabs.length})</h3>
                      \${abnormalLabs.map(lab => \`
                        <div style="display: flex; justify-content: space-between; padding: 10px; border-left: 4px solid #e74c3c; background: #fee; margin-bottom: 8px; border-radius: 4px;">
                          <span style="font-weight: 600; color: #2c3e50;">\${lab.test}</span>
                          <span class="lab-flag-\${lab.flag}">\${lab.value} \${lab.unit} (\${lab.flag})</span>
                        </div>
                      \`).join('')}
                    </div>
                  \` : ''}
                  
                  <!-- Active Medications -->
                  <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #2c3e50;">Active Medications (\${meds_active.length})</h3>
                    \${meds_active.map(med => \`
                      <div style="padding: 10px; border-left: 4px solid #3498db; background: #e3f2fd; margin-bottom: 8px; border-radius: 4px;">
                        <div style="font-weight: 600; color: #2c3e50; margin-bottom: 4px;">\${med.name}</div>
                        <div style="font-size: 11px; color: #7f8c8d;">\${med.route} - \${med.status}</div>
                      </div>
                    \`).join('')}
                  </div>
                  
                  <!-- Recent MAR -->
                  <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #2c3e50;">Recent MAR</h3>
                    \${mar_recent.map(mar => \`
                      <div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #ecf0f1;">
                        <span style="font-size: 12px; color: #2c3e50;">\${mar.time} - \${mar.med}</span>
                        <span style="font-size: 11px; font-weight: 600; color: \${mar.status === 'given' ? '#27ae60' : '#f39c12'};">\${mar.status}</span>
                      </div>
                    \`).join('')}
                  </div>
                </div>
                
                <!-- Quick Panel -->
                <div class="quick-panel">
                  <!-- Latest Vitals -->
                  <div class="panel-section">
                    <div class="panel-title">❤️ 최신 활력징후</div>
                    <div class="vital-row">
                      <span class="vital-label">혈압</span>
                      <span class="vital-value \${(latestVitals.sbp < 90 || latestVitals.sbp > 160) ? 'vital-critical' : ''}">\${latestVitals.sbp}/\${latestVitals.dbp}</span>
                    </div>
                    <div class="vital-row">
                      <span class="vital-label">맥박</span>
                      <span class="vital-value \${(latestVitals.hr < 60 || latestVitals.hr > 100) ? 'vital-warning' : ''}">\${latestVitals.hr} bpm</span>
                    </div>
                    <div class="vital-row">
                      <span class="vital-label">체온</span>
                      <span class="vital-value \${(latestVitals.temp > 38 || latestVitals.temp < 36) ? 'vital-warning' : ''}">\${latestVitals.temp}°C</span>
                    </div>
                    <div class="vital-row">
                      <span class="vital-label">산소포화도</span>
                      <span class="vital-value \${latestVitals.spo2 < 95 ? 'vital-critical' : ''}">\${latestVitals.spo2}%</span>
                    </div>
                    <p style="font-size: 9px; color: #95a5a6; margin-top: 8px; text-align: right;">\${latestVitals.time || ''}</p>
                  </div>
                  
                  <!-- Abnormal Labs -->
                  \${abnormalLabs.length > 0 ? \`
                    <div class="panel-section">
                      <div class="panel-title">🧪 이상 검사<span class="count-badge">\${abnormalLabs.length}</span></div>
                      \${abnormalLabs.slice(0, 3).map(lab => \`
                        <div class="lab-row">
                          <span class="lab-name">\${lab.test}</span>
                          <span class="lab-value lab-flag-\${lab.flag}">\${lab.value} \${lab.unit}</span>
                        </div>
                      \`).join('')}
                      \${abnormalLabs.length > 3 ? \`<p style="font-size: 10px; color: #78909c; margin-top: 6px; text-align: center;">+\${abnormalLabs.length - 3}개 더보기</p>\` : ''}
                    </div>
                  \` : ''}
                  
                  <!-- Active Meds -->
                  <div class="panel-section">
                    <div class="panel-title">💊 투약 중</div>
                    <p style="font-size: 28px; font-weight: 700; color: #42a5f5; text-align: center; margin: 8px 0;">\${meds_active.length}</p>
                    <p style="font-size: 10px; color: #78909c; text-align: center;">진행 중인 약물</p>
                  </div>
                  
                  <!-- Alerts -->
                  <div class="panel-section">
                    <div class="panel-title">⚠️ 경고사항</div>
                    \${alerts.allergy ? \`<p style="font-size: 11px; color: #d32f2f; font-weight: 700; margin-bottom: 6px; padding: 6px; background: #ffebee; border-left: 3px solid #d32f2f;">알러지: \${alerts.allergy}</p>\` : ''}
                    \${alerts.isolation ? \`<p style="font-size: 11px; color: #f57c00; font-weight: 700; margin-bottom: 6px; padding: 6px; background: #fff3e0; border-left: 3px solid #f57c00;">격리: \${alerts.isolation}</p>\` : ''}
                    \${alerts.fallRisk ? \`<p style="font-size: 11px; color: #7b1fa2; font-weight: 700; padding: 6px; background: #f3e5f5; border-left: 3px solid #7b1fa2;">낙상 위험: 있음</p>\` : ''}
                  </div>
                </div>
              </div>
            \`;
            
            // Render vitals charts
            renderVitalsCharts();
          }
          
          function renderVitalsCharts() {
            const { vitals_series } = chartData;
            
            // Transform data for each chart
            const hrData = vitals_series
              .map(v => ({ ts: v.time, value: v.hr }))
              .filter(d => d.value !== undefined && d.value !== null);
            
            const sbpData = vitals_series
              .map(v => ({ ts: v.time, value: v.sbp }))
              .filter(d => d.value !== undefined && d.value !== null);
            
            const spo2Data = vitals_series
              .map(v => ({ ts: v.time, value: v.spo2 }))
              .filter(d => d.value !== undefined && d.value !== null);
            
            const chartsContainer = document.getElementById('vitals-charts');
            if (!chartsContainer) return;
            
            // Clear loading message
            chartsContainer.innerHTML = '';
            
            // Create chart wrappers
            const chartConfigs = [
              { data: hrData, label: 'HR', unit: 'bpm', yMin: 40, yMax: 160 },
              { data: sbpData, label: 'SBP', unit: 'mmHg', yMin: 60, yMax: 200 },
              { data: spo2Data, label: 'SpO2', unit: '%', yMin: 85, yMax: 100 }
            ];
            
            chartConfigs.forEach(config => {
              const chartWrapper = document.createElement('div');
              chartWrapper.style.cssText = 'border: 1px solid #dfe6e9; border-radius: 4px; padding: 12px; background: #f8f9fa;';
              
              const header = document.createElement('div');
              header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';
              
              const title = document.createElement('span');
              title.style.cssText = 'font-weight: 600; font-size: 13px; color: #2c3e50;';
              title.textContent = config.label + ' (' + config.unit + ')';
              
              const latest = config.data.length > 0 ? config.data[config.data.length - 1].value : '--';
              const latestValue = document.createElement('span');
              latestValue.style.cssText = 'font-weight: 700; font-size: 16px; color: #3498db;';
              latestValue.textContent = latest + ' ' + config.unit;
              
              header.appendChild(title);
              header.appendChild(latestValue);
              chartWrapper.appendChild(header);
              
              // Chart container
              const chartDiv = document.createElement('div');
              chartDiv.id = 'chart-' + config.label.toLowerCase();
              chartWrapper.appendChild(chartDiv);
              
              chartsContainer.appendChild(chartWrapper);
              
              // Render SVG chart
              renderSvgChart(chartDiv, config.data, config.yMin, config.yMax);
            });
          }
          
          function renderSvgChart(container, data, yMin, yMax) {
            // Empty state
            if (!data || data.length < 2) {
              container.innerHTML = '<div style="text-align: center; padding: 40px; color: #7f8c8d; font-size: 12px;">데이터 부족 (최소 2개 필요)</div>';
              return;
            }
            
            const width = 560;
            const height = 160;
            const padL = 36;
            const padR = 12;
            const padT = 12;
            const padB = 22;
            const plotW = width - padL - padR;
            const plotH = height - padT - padB;
            
            // Calculate Y range
            const values = data.map(d => d.value);
            const dataMin = Math.min(...values);
            const dataMax = Math.max(...values);
            const range = dataMax - dataMin || 1;
            const computedYMin = yMin !== undefined ? yMin : dataMin - range * 0.1;
            const computedYMax = yMax !== undefined ? yMax : dataMax + range * 0.1;
            const yRange = computedYMax - computedYMin || 1;
            
            // Scale functions
            const xScale = (i) => padL + (i / (data.length - 1)) * plotW;
            const yScale = (v) => padT + ((computedYMax - v) / yRange) * plotH;
            
            // Generate path
            const pathData = data.map((d, i) => {
              const x = xScale(i);
              const y = yScale(d.value);
              return i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`;
            }).join(' ');
            
            // Y ticks
            const yTicks = [];
            for (let i = 0; i <= 4; i++) {
              yTicks.push(computedYMin + (i / 4) * yRange);
            }
            
            // X tick indices
            const xTickIndices = [];
            const xStep = Math.max(1, Math.floor(data.length / 4));
            for (let i = 0; i < data.length; i += xStep) {
              xTickIndices.push(i);
            }
            
            // Build SVG
            let svg = \`<svg width="\${width}" height="\${height}" style="display: block; font-family: system-ui, sans-serif;">\`;
            
            // Grid
            yTicks.forEach(tick => {
              const y = yScale(tick);
              svg += \`<line x1="\${padL}" y1="\${y}" x2="\${width - padR}" y2="\${y}" stroke="#e0e0e0" stroke-width="1" />\`;
            });
            
            xTickIndices.forEach(idx => {
              const x = xScale(idx);
              svg += \`<line x1="\${x}" y1="\${padT}" x2="\${x}" y2="\${height - padB}" stroke="#e0e0e0" stroke-width="1" />\`;
            });
            
            // Axes
            svg += \`<line x1="\${padL}" y1="\${padT}" x2="\${padL}" y2="\${height - padB}" stroke="#333" stroke-width="1" />\`;
            svg += \`<line x1="\${padL}" y1="\${height - padB}" x2="\${width - padR}" y2="\${height - padB}" stroke="#333" stroke-width="1" />\`;
            
            // Y tick labels
            yTicks.forEach(tick => {
              const y = yScale(tick);
              svg += \`<line x1="\${padL - 4}" y1="\${y}" x2="\${padL}" y2="\${y}" stroke="#333" stroke-width="1" />\`;
              svg += \`<text x="\${padL - 8}" y="\${y}" text-anchor="end" dominant-baseline="middle" font-size="11" fill="#333">\${tick.toFixed(0)}</text>\`;
            });
            
            // X tick labels
            xTickIndices.forEach(idx => {
              const x = xScale(idx);
              const time = data[idx].ts.split('T')[1]?.slice(0, 5) || data[idx].ts.slice(-5);
              svg += \`<text x="\${x}" y="\${height - padB + 16}" text-anchor="middle" font-size="10" fill="#555">\${time}</text>\`;
            });
            
            // Line path
            svg += \`<path d="\${pathData}" stroke="#0066cc" stroke-width="2" fill="none" />\`;
            
            // Dots
            data.forEach((d, i) => {
              const cx = xScale(i);
              const cy = yScale(d.value);
              svg += \`<circle cx="\${cx}" cy="\${cy}" r="3" fill="#0066cc" stroke="#fff" stroke-width="1" />\`;
            });
            
            svg += '</svg>';
            
            container.innerHTML = svg;
          }
          
          loadChartData();
        `}} />
      </body>
    </html>
  );
};
