/**
 * MarPage.tsx
 * MAR (Medication Administration Record) tab with timeline view
 */

import { FC } from 'hono/jsx';

interface MarPageProps {
  encounterId: string;
  patientId?: string;
}

export const MarPage: FC<MarPageProps> = ({ encounterId, patientId }) => {
  const id = encounterId || patientId || 'unknown';
  const idType = encounterId ? 'encounter' : 'patient';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MAR - EMR</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            font-size: 13px;
            color: #2c3e50;
            background: #ecf0f1;
            padding: 20px;
          }
          
          .container {
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #2c3e50;
          }
          
          .back-link {
            color: #3498db;
            text-decoration: none;
            font-weight: 600;
          }
          
          .active-meds-section {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2c3e50;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            font-weight: 700;
            font-size: 12px;
            color: #2c3e50;
            border-bottom: 2px solid #dfe6e9;
          }
          
          td {
            padding: 12px;
            border-bottom: 1px solid #ecf0f1;
            font-size: 13px;
          }
          
          tr:hover {
            background: #f8f9fa;
          }
          
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
          }
          
          .status-running {
            background: #27ae60;
            color: white;
          }
          
          .status-scheduled {
            background: #3498db;
            color: white;
          }
          
          .status-held {
            background: #e67e22;
            color: white;
          }
          
          .timeline-section {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .timeline {
            position: relative;
            padding-left: 80px;
          }
          
          .timeline-item {
            position: relative;
            padding-bottom: 24px;
            margin-left: 20px;
            border-left: 2px solid #dfe6e9;
          }
          
          .timeline-item:last-child {
            border-left: none;
          }
          
          .timeline-time {
            position: absolute;
            left: -80px;
            width: 60px;
            text-align: right;
            font-weight: 700;
            color: #7f8c8d;
            font-size: 12px;
          }
          
          .timeline-dot {
            position: absolute;
            left: -26px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 2px #dfe6e9;
          }
          
          .timeline-dot.given {
            background: #27ae60;
            box-shadow: 0 0 0 2px #27ae60;
          }
          
          .timeline-dot.running {
            background: #3498db;
            box-shadow: 0 0 0 2px #3498db;
          }
          
          .timeline-dot.missed {
            background: #e74c3c;
            box-shadow: 0 0 0 2px #e74c3c;
          }
          
          .timeline-dot.scheduled {
            background: white;
            box-shadow: 0 0 0 2px #95a5a6;
          }
          
          .timeline-content {
            margin-left: 4px;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 3px solid #dfe6e9;
          }
          
          .timeline-content.given {
            border-left-color: #27ae60;
            background: #d5f4e6;
          }
          
          .timeline-content.running {
            border-left-color: #3498db;
            background: #d6eaf8;
          }
          
          .timeline-content.missed {
            border-left-color: #e74c3c;
            background: #fadbd8;
          }
          
          .timeline-med {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 4px;
          }
          
          .timeline-details {
            font-size: 11px;
            color: #7f8c8d;
          }
          
          .filter-toggle {
            padding: 8px 12px;
            background: white;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .filter-toggle.active {
            background: #3498db;
            color: white;
            border-color: #3498db;
          }
          
          .loading {
            text-align: center;
            padding: 40px;
            color: #7f8c8d;
          }
          
          .spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>
        <div id="app">
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading MAR data...</p>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{ __html: `
          const id = '${id}';
          const idType = '${idType}';
          let chartData = null;
          let showKeyMedsOnly = false;
          
          const keyMeds = ['Norepinephrine', 'Meropenem', 'Propofol', 'Fentanyl', 'Piperacillin-Tazobactam', 'Furosemide', 'Morphine'];
          
          async function loadMarData() {
            try {
              const endpoint = idType === 'encounter' 
                ? '/api/emr/encounters/' + id + '/chart'
                : '/api/emr/patients/' + id + '/chart';
              
              const response = await fetch(endpoint);
              if (!response.ok) throw new Error('Failed to load MAR data');
              
              chartData = await response.json();
              renderMar();
            } catch (error) {
              document.getElementById('app').innerHTML = \`
                <div class="container">
                  <div style="text-align: center; padding: 40px;">
                    <p style="color: #e74c3c; font-weight: 700; margin-bottom: 8px;">Error Loading MAR</p>
                    <p style="color: #7f8c8d;">\${error.message}</p>
                    <a href="/patients/\${id}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 4px;">
                      Back to Chart
                    </a>
                  </div>
                </div>
              \`;
            }
          }
          
          function toggleKeyMeds() {
            showKeyMedsOnly = !showKeyMedsOnly;
            renderMar();
          }
          
          function renderMar() {
            const { meds_active, mar_events } = chartData;
            
            const filteredEvents = showKeyMedsOnly 
              ? mar_events.filter(event => keyMeds.some(key => event.med.includes(key)))
              : mar_events;
            
            const sortedEvents = [...filteredEvents].sort((a, b) => {
              const timeA = a.time.padStart(5, '0');
              const timeB = b.time.padStart(5, '0');
              return timeB.localeCompare(timeA);
            });
            
            document.getElementById('app').innerHTML = \`
              <div class="container">
                <div class="header">
                  <h1>💊 투약 기록 (Medication Administration Record)</h1>
                  <a href="/patients/\${id}" class="back-link">← 차트로 돌아가기</a>
                </div>
                
                <div class="active-meds-section">
                  <div class="section-title">활성 투약 내역 (Active Medications)</div>
                  <table>
                    <thead>
                      <tr>
                        <th>약물명</th>
                        <th>경로</th>
                        <th>투여빈도</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${meds_active.map(med => \`
                        <tr>
                          <td style="font-weight: 600;">\${med.name}</td>
                          <td>\${med.route}</td>
                          <td>\${med.frequency || 'PRN'}</td>
                          <td>
                            <span class="status-badge status-\${med.status}">\${med.status.toUpperCase()}</span>
                          </td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                </div>
                
                <div class="timeline-section">
                  <div class="timeline-header">
                    <div class="section-title">📅 최근 24시간 타임라인</div>
                    <button class="filter-toggle \${showKeyMedsOnly ? 'active' : ''}" onclick="toggleKeyMeds()">
                      \${showKeyMedsOnly ? '✓ Key Meds' : 'Show Key Meds Only'}
                    </button>
                  </div>
                  
                  <div class="timeline">
                    \${sortedEvents.map(event => \`
                      <div class="timeline-item">
                        <div class="timeline-time">\${event.time}</div>
                        <div class="timeline-dot \${event.status}"></div>
                        <div class="timeline-content \${event.status}">
                          <div class="timeline-med">\${event.med}</div>
                          <div class="timeline-details">
                            \${event.dose ? \`<strong>Dose:</strong> \${event.dose} · \` : ''}
                            <strong>Route:</strong> \${event.route} · 
                            <strong>Status:</strong> \${event.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    \`).join('')}
                  </div>
                </div>
              </div>
            \`;
          }
          
          loadMarData();
        `}} />
      </body>
    </html>
  );
};
