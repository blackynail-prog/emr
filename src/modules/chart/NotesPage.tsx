/**
 * NotesPage.tsx
 * Notes tab with Evidence-based DAR writing
 */

import { FC } from 'hono/jsx';

interface NotesPageProps {
  encounterId: string;
  patientId?: string;
}

export const NotesPage: FC<NotesPageProps> = ({ encounterId, patientId }) => {
  const id = encounterId || patientId || 'unknown';
  const idType = encounterId ? 'encounter' : 'patient';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notes - EMR</title>
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
            max-width: 1600px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 20px;
          }
          
          .header {
            grid-column: 1 / -1;
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
          
          .notes-list {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-height: calc(100vh - 140px);
            overflow-y: auto;
          }
          
          .note-item {
            padding: 12px;
            border-left: 4px solid #3498db;
            background: #f8f9fa;
            margin-bottom: 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .note-item:hover {
            background: #e3f2fd;
            transform: translateX(4px);
          }
          
          .note-author {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 4px;
          }
          
          .note-time {
            font-size: 11px;
            color: #7f8c8d;
            margin-bottom: 4px;
          }
          
          .note-preview {
            font-size: 12px;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .editor-section {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #2c3e50;
          }
          
          .evidence-picker {
            margin-bottom: 24px;
          }
          
          .evidence-group {
            margin-bottom: 16px;
          }
          
          .evidence-group-title {
            font-size: 13px;
            font-weight: 700;
            color: #7f8c8d;
            margin-bottom: 8px;
          }
          
          .evidence-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            margin-bottom: 6px;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .evidence-item:hover {
            background: #f8f9fa;
          }
          
          .evidence-item input {
            margin-right: 8px;
          }
          
          .evidence-label {
            flex: 1;
            font-size: 12px;
          }
          
          .selected-evidence {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
          }
          
          .evidence-tag {
            padding: 6px 12px;
            background: #3498db;
            color: white;
            border-radius: 16px;
            font-size: 11px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .evidence-tag button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 14px;
          }
          
          .dar-section {
            margin-bottom: 20px;
          }
          
          .dar-label {
            font-size: 14px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
          }
          
          textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            font-family: inherit;
            font-size: 13px;
            resize: vertical;
          }
          
          textarea:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
          }
          
          .button-group {
            display: flex;
            gap: 12px;
          }
          
          button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .btn-primary {
            background: #3498db;
            color: white;
          }
          
          .btn-primary:hover {
            background: #2980b9;
          }
          
          .btn-secondary {
            background: #ecf0f1;
            color: #2c3e50;
          }
          
          .btn-secondary:hover {
            background: #bdc3c7;
          }
          
          .loading {
            text-align: center;
            padding: 40px;
            color: #7f8c8d;
          }
          
          .success-message {
            padding: 12px;
            background: #d5f4e6;
            border: 1px solid #27ae60;
            border-radius: 4px;
            color: #27ae60;
            margin-bottom: 16px;
            font-weight: 600;
          }
        `}</style>
      </head>
      <body>
        <div id="app">
          <div class="loading">
            <p>Loading notes...</p>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{ __html: `
          const id = '${id}';
          const idType = '${idType}';
          let chartData = null;
          let selectedEvidence = [];
          let showSuccess = false;
          
          async function loadData() {
            try {
              const endpoint = idType === 'encounter' 
                ? '/api/emr/encounters/' + id + '/chart'
                : '/api/emr/patients/' + id + '/chart';
              
              const response = await fetch(endpoint);
              if (!response.ok) throw new Error('Failed to load data');
              
              chartData = await response.json();
              render();
            } catch (error) {
              document.getElementById('app').innerHTML = \`
                <div style="text-align: center; padding: 40px;">
                  <p style="color: #e74c3c; font-weight: 700; margin-bottom: 8px;">Error Loading Data</p>
                  <p style="color: #7f8c8d;">\${error.message}</p>
                  <a href="/patients/\${id}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 4px;">
                    Back to Chart
                  </a>
                </div>
              \`;
            }
          }
          
          function toggleEvidence(evidenceId) {
            const index = selectedEvidence.indexOf(evidenceId);
            if (index > -1) {
              selectedEvidence.splice(index, 1);
            } else {
              selectedEvidence.push(evidenceId);
            }
            render();
          }
          
          function removeEvidence(evidenceId) {
            selectedEvidence = selectedEvidence.filter(id => id !== evidenceId);
            render();
          }
          
          async function saveNote() {
            const assessment = document.getElementById('assessment').value;
            const response = document.getElementById('response').value;
            
            if (!assessment || !response) {
              alert('Please fill in both Assessment and Response/Plan fields');
              return;
            }
            
            try {
              const result = await fetch('/api/emr/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  encounterId: id,
                  author: 'Nursing Student',
                  evidenceIds: selectedEvidence,
                  assessment,
                  response
                })
              });
              
              if (!result.ok) throw new Error('Failed to save note');
              
              showSuccess = true;
              selectedEvidence = [];
              document.getElementById('assessment').value = '';
              document.getElementById('response').value = '';
              
              setTimeout(() => {
                showSuccess = false;
                render();
              }, 3000);
              
              render();
            } catch (error) {
              alert('Error saving note: ' + error.message);
            }
          }
          
          function render() {
            const { vitals_series, labs_latest, meds_active } = chartData;
            const latestVitals = vitals_series[vitals_series.length - 1] || {};
            const abnormalLabs = labs_latest.filter(lab => lab.flag === 'H' || lab.flag === 'L');
            
            const evidenceOptions = [
              { id: 'vital-bp', label: \`BP: \${latestVitals.sbp}/\${latestVitals.dbp} mmHg\`, group: 'vitals' },
              { id: 'vital-hr', label: \`HR: \${latestVitals.hr} bpm\`, group: 'vitals' },
              { id: 'vital-temp', label: \`Temp: \${latestVitals.temp}°C\`, group: 'vitals' },
              { id: 'vital-spo2', label: \`SpO2: \${latestVitals.spo2}%\`, group: 'vitals' },
              ...abnormalLabs.map(lab => ({
                id: \`lab-\${lab.test}\`,
                label: \`\${lab.test}: \${lab.value} \${lab.unit} (\${lab.flag})\`,
                group: 'labs'
              })),
              ...meds_active.slice(0, 5).map((med, i) => ({
                id: \`med-\${i}\`,
                label: \`\${med.name} \${med.route}\`,
                group: 'meds'
              }))
            ];
            
            const vitalEvidence = evidenceOptions.filter(e => e.group === 'vitals');
            const labEvidence = evidenceOptions.filter(e => e.group === 'labs');
            const medEvidence = evidenceOptions.filter(e => e.group === 'meds');
            
            document.getElementById('app').innerHTML = \`
              <div class="header">
                <h1>📋 간호기록 (Nursing Notes - DAR)</h1>
                <a href="/patients/\${id}" class="back-link">← 차트로 돌아가기</a>
              </div>
              
              <div class="container">
                <div class="notes-list">
                  <div class="section-title">Recent Notes</div>
                  <p style="color: #7f8c8d; font-size: 12px;">No notes yet. Create your first DAR note!</p>
                </div>
                
                <div class="editor-section">
                  <div class="section-title">✍️ New DAR Note</div>
                  
                  \${showSuccess ? '<div class="success-message">✓ Note saved successfully!</div>' : ''}
                  
                  <div class="evidence-picker">
                    <div style="font-weight: 700; margin-bottom: 12px;">Select Evidence (Data)</div>
                    
                    \${selectedEvidence.length > 0 ? \`
                      <div class="selected-evidence">
                        \${selectedEvidence.map(evidenceId => {
                          const evidence = evidenceOptions.find(e => e.id === evidenceId);
                          return evidence ? \`
                            <div class="evidence-tag">
                              \${evidence.label}
                              <button onclick="removeEvidence('\${evidenceId}')">×</button>
                            </div>
                          \` : '';
                        }).join('')}
                      </div>
                    \` : ''}
                    
                    <div class="evidence-group">
                      <div class="evidence-group-title">Latest Vitals</div>
                      \${vitalEvidence.map(e => \`
                        <div class="evidence-item" onclick="toggleEvidence('\${e.id}')">
                          <input type="checkbox" \${selectedEvidence.includes(e.id) ? 'checked' : ''} />
                          <span class="evidence-label">\${e.label}</span>
                        </div>
                      \`).join('')}
                    </div>
                    
                    \${labEvidence.length > 0 ? \`
                      <div class="evidence-group">
                        <div class="evidence-group-title">Abnormal Labs</div>
                        \${labEvidence.map(e => \`
                          <div class="evidence-item" onclick="toggleEvidence('\${e.id}')">
                            <input type="checkbox" \${selectedEvidence.includes(e.id) ? 'checked' : ''} />
                            <span class="evidence-label">\${e.label}</span>
                          </div>
                        \`).join('')}
                      </div>
                    \` : ''}
                    
                    \${medEvidence.length > 0 ? \`
                      <div class="evidence-group">
                        <div class="evidence-group-title">Active Medications</div>
                        \${medEvidence.map(e => \`
                          <div class="evidence-item" onclick="toggleEvidence('\${e.id}')">
                            <input type="checkbox" \${selectedEvidence.includes(e.id) ? 'checked' : ''} />
                            <span class="evidence-label">\${e.label}</span>
                          </div>
                        \`).join('')}
                      </div>
                    \` : ''}
                  </div>
                  
                  <div class="dar-section">
                    <div class="dar-label">Assessment (사정)</div>
                    <textarea id="assessment" rows="4" placeholder="Based on the selected evidence, describe your assessment of the patient's condition..."></textarea>
                  </div>
                  
                  <div class="dar-section">
                    <div class="dar-label">Response / Plan (반응 및 계획)</div>
                    <textarea id="response" rows="4" placeholder="Describe interventions performed and the patient's response, or the plan for care..."></textarea>
                  </div>
                  
                  <div class="button-group">
                    <button class="btn-primary" onclick="saveNote()">Save Note</button>
                    <button class="btn-secondary" onclick="location.reload()">Clear</button>
                  </div>
                </div>
              </div>
            \`;
          }
          
          loadData();
        `}} />
      </body>
    </html>
  );
};
