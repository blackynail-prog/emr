/**
 * LabsPage.tsx
 * Labs tab with abnormal highlighting and trend chart
 */

import { FC } from 'hono/jsx';
import { SvgLineChart } from '../../components/charts/SvgLineChart';
import { formatTimeHHMM } from '../../utils/time';

interface LabResult {
  test: string;
  value: number;
  unit: string;
  flag: string;
  ref?: string;
  ts: string;
}

interface LabsPageProps {
  encounterId: string;
  patientId?: string;
}

export const LabsPage: FC<LabsPageProps> = ({ encounterId, patientId }) => {
  const id = encounterId || patientId || 'unknown';
  const idType = encounterId ? 'encounter' : 'patient';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Labs - EMR</title>
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
          
          .abnormal-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .abnormal-card {
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .abnormal-card.high {
            border-left: 4px solid #e74c3c;
            background: #fee;
          }
          
          .abnormal-card.low {
            border-left: 4px solid #3498db;
            background: #e3f2fd;
          }
          
          .card-test {
            font-size: 11px;
            color: #7f8c8d;
            margin-bottom: 4px;
          }
          
          .card-value {
            font-size: 20px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 2px;
          }
          
          .card-ref {
            font-size: 10px;
            color: #95a5a6;
          }
          
          .labs-table-container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            background: white;
          }
          
          thead {
            background: #37474f;
            color: white;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          
          th {
            padding: 12px 14px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #eceff1;
            font-size: 13px;
          }
          
          td.numeric {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 700;
          }
          
          tbody tr:nth-child(even) {
            background: #fafafa;
          }
          
          tbody tr:hover {
            background: #e3f2fd;
            cursor: pointer;
          }
          
          .flag-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 700;
          }
          
          .flag-H {
            background: #e74c3c;
            color: white;
          }
          
          .flag-L {
            background: #3498db;
            color: white;
          }
          
          .flag-N {
            background: #27ae60;
            color: white;
          }
          
          .trend-container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .trend-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .trend-title {
            font-size: 16px;
            font-weight: 700;
            color: #2c3e50;
          }
          
          select {
            padding: 8px 12px;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            font-size: 13px;
            background: white;
            cursor: pointer;
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
            <p>Loading labs data...</p>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{ __html: `
          const id = '${id}';
          const idType = '${idType}';
          let chartData = null;
          let selectedTest = null;
          
          async function loadLabsData() {
            try {
              const endpoint = idType === 'encounter' 
                ? '/api/emr/encounters/' + id + '/chart'
                : '/api/emr/patients/' + id + '/chart';
              
              const response = await fetch(endpoint);
              if (!response.ok) throw new Error('Failed to load labs data');
              
              chartData = await response.json();
              renderLabs();
            } catch (error) {
              document.getElementById('app').innerHTML = \`
                <div class="container">
                  <div style="text-align: center; padding: 40px;">
                    <p style="color: #e74c3c; font-weight: 700; margin-bottom: 8px;">Error Loading Labs</p>
                    <p style="color: #7f8c8d;">\${error.message}</p>
                    <a href="/patients/\${id}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 4px;">
                      Back to Chart
                    </a>
                  </div>
                </div>
              \`;
            }
          }
          
          function renderLabs() {
            const { labs_latest, labs_series } = chartData;
            const abnormalLabs = labs_latest.filter(lab => lab.flag === 'H' || lab.flag === 'L');
            const availableTests = Object.keys(labs_series);
            selectedTest = selectedTest || availableTests[0];
            
            document.getElementById('app').innerHTML = \`
              <div class="container">
                <div class="header">
                  <h1>🧪 검사 결과 (Laboratory Results)</h1>
                  <a href="/patients/\${id}" class="back-link">← 차트로 돌아가기</a>
                </div>
                
                \${abnormalLabs.length > 0 ? \`
                  <div class="abnormal-summary">
                    \${abnormalLabs.map(lab => \`
                      <div class="abnormal-card \${lab.flag === 'H' ? 'high' : 'low'}">
                        <div class="card-test">\${lab.test}</div>
                        <div class="card-value">\${lab.value} \${lab.unit}</div>
                        <div class="card-ref">Ref: \${lab.ref || 'N/A'} (\${lab.flag === 'H' ? 'HIGH' : 'LOW'})</div>
                      </div>
                    \`).join('')}
                  </div>
                \` : ''}
                
                <div class="labs-table-container">
                  <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">All Labs</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>시간</th>
                        <th>검사항목</th>
                        <th style="text-align: right;">결과값</th>
                        <th>단위</th>
                        <th>정상범위</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${labs_latest.map(lab => {
                        const time = lab.ts.split('T')[1]?.slice(0, 5) || '--:--';
                        return \`
                          <tr>
                            <td>\${time}</td>
                            <td style="font-weight: 600;">\${lab.test}</td>
                            <td class="numeric">\${lab.value}</td>
                            <td>\${lab.unit}</td>
                            <td style="color: #7f8c8d; font-size: 11px;">\${lab.ref || 'N/A'}</td>
                            <td>
                              \${lab.flag ? \`<span class="flag-badge flag-\${lab.flag}">\${lab.flag}</span>\` : '<span style="color: #95a5a6;">-</span>'}
                            </td>
                          </tr>
                        \`;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
                
                \${availableTests.length > 0 ? \`
                  <div class="trend-container">
                    <div class="trend-header">
                      <div class="trend-title">📈 Lab Trend</div>
                      <select id="test-selector" onchange="updateTrend(this.value)">
                        \${availableTests.map(test => \`
                          <option value="\${test}" \${test === selectedTest ? 'selected' : ''}>\${test}</option>
                        \`).join('')}
                      </select>
                    </div>
                    <div id="trend-chart"></div>
                  </div>
                \` : ''}
              </div>
            \`;
            
            if (availableTests.length > 0) {
              renderTrendChart(selectedTest);
            }
          }
          
          function updateTrend(test) {
            selectedTest = test;
            renderTrendChart(test);
          }
          
          function renderTrendChart(test) {
            const { labs_series } = chartData;
            const data = labs_series[test] || [];
            const container = document.getElementById('trend-chart');
            
            if (!container) return;
            
            if (data.length < 2) {
              container.innerHTML = '<div style="text-align: center; padding: 40px; color: #7f8c8d;">데이터 부족 (최소 2개 필요)</div>';
              return;
            }
            
            // Render SVG chart inline
            const width = 800;
            const height = 200;
            const padL = 50;
            const padR = 20;
            const padT = 20;
            const padB = 30;
            const plotW = width - padL - padR;
            const plotH = height - padT - padB;
            
            const values = data.map(d => d.value);
            const yMin = Math.min(...values) * 0.9;
            const yMax = Math.max(...values) * 1.1;
            const yRange = yMax - yMin || 1;
            
            const xScale = (i) => padL + (i / (data.length - 1)) * plotW;
            const yScale = (v) => padT + ((yMax - v) / yRange) * plotH;
            
            const pathData = data.map((d, i) => {
              const x = xScale(i);
              const y = yScale(d.value);
              return i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`;
            }).join(' ');
            
            let svg = \`<svg width="\${width}" height="\${height}" style="display: block; font-family: system-ui, sans-serif;">\`;
            
            // Grid
            for (let i = 0; i <= 4; i++) {
              const y = yScale(yMin + (i / 4) * yRange);
              svg += \`<line x1="\${padL}" y1="\${y}" x2="\${width - padR}" y2="\${y}" stroke="#e0e0e0" stroke-width="1" />\`;
            }
            
            // Axes
            svg += \`<line x1="\${padL}" y1="\${padT}" x2="\${padL}" y2="\${height - padB}" stroke="#333" stroke-width="2" />\`;
            svg += \`<line x1="\${padL}" y1="\${height - padB}" x2="\${width - padR}" y2="\${height - padB}" stroke="#333" stroke-width="2" />\`;
            
            // Y ticks and labels
            for (let i = 0; i <= 4; i++) {
              const tick = yMin + (i / 4) * yRange;
              const y = yScale(tick);
              svg += \`<line x1="\${padL - 5}" y1="\${y}" x2="\${padL}" y2="\${y}" stroke="#333" stroke-width="1" />\`;
              svg += \`<text x="\${padL - 10}" y="\${y}" text-anchor="end" dominant-baseline="middle" font-size="11" fill="#333">\${tick.toFixed(1)}</text>\`;
            }
            
            // X tick labels
            data.forEach((d, i) => {
              const x = xScale(i);
              const time = d.ts.split('T')[1]?.slice(0, 5) || d.ts.slice(-5);
              svg += \`<text x="\${x}" y="\${height - padB + 20}" text-anchor="middle" font-size="11" fill="#555">\${time}</text>\`;
            });
            
            // Line
            svg += \`<path d="\${pathData}" stroke="#3498db" stroke-width="3" fill="none" />\`;
            
            // Dots
            data.forEach((d, i) => {
              const cx = xScale(i);
              const cy = yScale(d.value);
              svg += \`<circle cx="\${cx}" cy="\${cy}" r="5" fill="#3498db" stroke="#fff" stroke-width="2" />\`;
            });
            
            svg += '</svg>';
            
            container.innerHTML = svg;
          }
          
          loadLabsData();
        `}} />
      </body>
    </html>
  );
};
