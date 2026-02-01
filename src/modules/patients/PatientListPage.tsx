/**
 * PatientListPage.tsx
 * Realistic EMR Inpatient Census Table
 * Dense layout with search, filters, alerts, and last vitals time
 */

import { FC } from 'hono/jsx';
import type { InpatientListItem } from '../api/mockEmrService';

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  room: string;
  diagnosis: string;
  admissionDate: string;
}

interface PatientListPageProps {
  inpatients: InpatientListItem[];
  centerName?: string;
}

export const PatientListPage: FC<PatientListPageProps> = ({
  inpatients,
  centerName,
}) => {
  // Calculate stats
  const totalPatients = inpatients.length;
  const maleCount = inpatients.filter(p => p.gender === 'M').length;
  const femaleCount = inpatients.filter(p => p.gender === 'F').length;
  const avgAge = inpatients.length > 0 
    ? Math.round(inpatients.reduce((sum, p) => sum + p.age, 0) / inpatients.length)
    : 0;

  // Get unique wards for filter
  const wards = Array.from(new Set(inpatients.map(p => p.ward))).sort();

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>재원환자 목록 - EMR</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: #f5f7fa;
          }
          
          /* Dense table styling */
          .census-table {
            font-size: 12px;
            border-collapse: collapse;
          }
          
          .census-table thead {
            position: sticky;
            top: 0;
            z-index: 10;
            background: #2c3e50;
            color: white;
          }
          
          .census-table th {
            padding: 8px 12px;
            font-weight: 600;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-right: 1px solid #34495e;
          }
          
          .census-table th:last-child {
            border-right: none;
          }
          
          .census-table tbody tr {
            border-bottom: 1px solid #e1e8ed;
            transition: background-color 0.15s;
            cursor: pointer;
          }
          
          .census-table tbody tr:hover {
            background: #e3f2fd;
          }
          
          .census-table td {
            padding: 6px 12px;
            vertical-align: middle;
          }
          
          /* Alert badges */
          .alert-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            margin-right: 4px;
            letter-spacing: 0.3px;
          }
          
          .badge-allergy {
            background: #e74c3c;
            color: white;
          }
          
          .badge-isolation {
            background: #f39c12;
            color: white;
          }
          
          .badge-fall {
            background: #9b59b6;
            color: white;
          }
          
          .badge-dnr {
            background: #7f8c8d;
            color: white;
          }
          
          /* Search and filter bar */
          .filter-bar {
            background: white;
            padding: 12px 16px;
            border-bottom: 1px solid #dfe6e9;
            display: flex;
            gap: 12px;
            align-items: center;
          }
          
          .filter-bar input,
          .filter-bar select {
            padding: 6px 10px;
            border: 1px solid #dfe6e9;
            border-radius: 4px;
            font-size: 12px;
          }
          
          .filter-bar input {
            flex: 1;
            max-width: 300px;
          }
          
          .filter-bar select {
            min-width: 120px;
          }
          
          /* Ward/Room/Bed column */
          .room-cell {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .ward-badge {
            background: #3498db;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            margin-right: 4px;
          }
          
          /* Patient name styling */
          .patient-name {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 2px;
          }
          
          .patient-details {
            font-size: 11px;
            color: #7f8c8d;
          }
          
          /* Loading state */
          .loading-row {
            text-align: center;
            padding: 40px;
            color: #7f8c8d;
          }
          
          /* Empty state */
          .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #7f8c8d;
          }
          
          .empty-state-icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
        `}</style>
      </head>
      <body>
        {/* Header */}
        <div style="background: white; border-bottom: 2px solid #2c3e50;">
          <div style="max-width: 1600px; margin: 0 auto; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <a href="/select-center" style="color: #3498db; text-decoration: none; font-size: 13px;">
                ← 센터 변경
              </a>
              <div>
                <h1 style="font-size: 18px; font-weight: 700; color: #2c3e50;">재원환자 목록 (Inpatient Census)</h1>
                {centerName && (
                  <p style="font-size: 12px; color: #7f8c8d; margin-top: 2px;">{centerName}</p>
                )}
              </div>
            </div>
            <a href="/logout" style="color: #7f8c8d; text-decoration: none; font-size: 12px;">
              Logout
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div style="background: #2c3e50; color: white; padding: 12px 16px;">
          <div style="max-width: 1600px; margin: 0 auto; display: flex; gap: 32px; font-size: 12px;">
            <div>
              <span style="color: #bdc3c7; margin-right: 8px;">전체:</span>
              <span style="font-weight: 700; font-size: 16px;">{totalPatients}</span>
            </div>
            <div>
              <span style="color: #bdc3c7; margin-right: 8px;">남:</span>
              <span style="font-weight: 600;">{maleCount}</span>
            </div>
            <div>
              <span style="color: #bdc3c7; margin-right: 8px;">여:</span>
              <span style="font-weight: 600;">{femaleCount}</span>
            </div>
            <div>
              <span style="color: #bdc3c7; margin-right: 8px;">평균연령:</span>
              <span style="font-weight: 600;">{avgAge}세</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div class="filter-bar">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="🔍 환자명 또는 MRN 검색..." 
            onkeyup="filterTable()"
          />
          <select id="wardFilter" onchange="filterTable()">
            <option value="">전체 병동</option>
            {wards.map(ward => (
              <option value={ward}>{ward}</option>
            ))}
          </select>
          <select id="alertFilter" onchange="filterTable()">
            <option value="">전체 알림</option>
            <option value="allergy">알러지</option>
            <option value="isolation">격리</option>
            <option value="fall">낙상위험</option>
            <option value="dnr">DNR</option>
          </select>
          <button 
            onclick="clearFilters()" 
            style="padding: 6px 12px; background: #95a5a6; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;"
          >
            초기화
          </button>
        </div>

        {/* Census Table */}
        <div style="max-width: 1600px; margin: 0 auto; padding: 16px;">
          <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="max-height: calc(100vh - 300px); overflow-y: auto;">
              <table class="census-table" style="width: 100%;">
                <thead>
                  <tr>
                    <th style="width: 100px;">병동/호실/베드</th>
                    <th style="width: 150px;">환자</th>
                    <th style="width: 90px;">MRN</th>
                    <th style="width: 250px;">주진단</th>
                    <th style="width: 180px;">알림</th>
                    <th style="width: 120px;">최근 V/S</th>
                    <th style="width: 60px;">차트</th>
                  </tr>
                </thead>
                <tbody id="patientTableBody">
                  {inpatients.length === 0 ? (
                    <tr>
                      <td colspan="7" class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <div style="font-weight: 600; margin-bottom: 8px;">재원 중인 환자가 없습니다</div>
                        <div style="font-size: 11px;">선택한 센터에 입원 환자가 없습니다.</div>
                      </td>
                    </tr>
                  ) : (
                    inpatients.map((patient) => (
                      <tr 
                        class="patient-row"
                        data-name={patient.name.toLowerCase()}
                        data-mrn={patient.mrn}
                        data-ward={patient.ward}
                        data-allergy={patient.alerts.allergy ? 'true' : 'false'}
                        data-isolation={patient.alerts.isolation ? 'true' : 'false'}
                        data-fall={patient.alerts.fallRisk ? 'true' : 'false'}
                        data-dnr={patient.alerts.codeStatus === 'DNR' ? 'true' : 'false'}
                        onclick={`window.location.href='/patients/${patient.encounterId}'`}
                      >
                        {/* Ward/Room/Bed */}
                        <td class="room-cell">
                          <span class="ward-badge">{patient.ward}</span>
                          <span>{patient.room}{patient.bed}</span>
                        </td>
                        
                        {/* Patient Name + Age/Sex */}
                        <td>
                          <div class="patient-name">{patient.name}</div>
                          <div class="patient-details">
                            {patient.sex === 'M' ? '남' : '여'} / {patient.age}세
                          </div>
                        </td>
                        
                        {/* MRN */}
                        <td style="font-family: monospace; font-size: 11px; color: #34495e;">
                          {patient.mrn}
                        </td>
                        
                        {/* Primary Diagnosis */}
                        <td style="font-size: 11px; color: #2c3e50;">
                          {patient.dx}
                        </td>
                        
                        {/* Alerts */}
                        <td>
                          {patient.alerts.allergy && (
                            <span class="alert-badge badge-allergy">⚠️ {patient.alerts.allergy}</span>
                          )}
                          {patient.alerts.isolation && (
                            <span class="alert-badge badge-isolation">🛡️ {patient.alerts.isolation}</span>
                          )}
                          {patient.alerts.fallRisk && (
                            <span class="alert-badge badge-fall">⚡ 낙상</span>
                          )}
                        </td>
                        
                        {/* Last Vitals Time */}
                        <td style="font-size: 11px; color: #7f8c8d;">
                          {patient.lastVitalsAt}
                        </td>
                        
                        {/* Chart Link */}
                        <td>
                          <a
                            href={`/patients/${patient.encounterId}`}
                            style="color: #3498db; text-decoration: none; font-size: 11px; font-weight: 600;"
                            onclick="event.stopPropagation()"
                          >
                            차트 →
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filter Script */}
        <script dangerouslySetInnerHTML={{__html: `
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const wardFilter = document.getElementById('wardFilter').value;
            const alertFilter = document.getElementById('alertFilter').value;
            
            const rows = document.querySelectorAll('.patient-row');
            let visibleCount = 0;
            
            rows.forEach(row => {
              const name = row.dataset.name;
              const mrn = row.dataset.mrn;
              const ward = row.dataset.ward;
              
              // Search filter
              const matchesSearch = !searchInput || 
                name.includes(searchInput) || 
                mrn.includes(searchInput);
              
              // Ward filter
              const matchesWard = !wardFilter || ward === wardFilter;
              
              // Alert filter
              let matchesAlert = true;
              if (alertFilter) {
                matchesAlert = row.dataset[alertFilter] === 'true';
              }
              
              // Show/hide row
              if (matchesSearch && matchesWard && matchesAlert) {
                row.style.display = '';
                visibleCount++;
              } else {
                row.style.display = 'none';
              }
            });
            
            // Show empty state if no results
            const tbody = document.getElementById('patientTableBody');
            const emptyRow = tbody.querySelector('.empty-state');
            if (visibleCount === 0 && rows.length > 0) {
              if (!emptyRow) {
                const tr = document.createElement('tr');
                tr.innerHTML = \`
                  <td colspan="7" class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div style="font-weight: 600; margin-bottom: 8px;">검색 결과가 없습니다</div>
                    <div style="font-size: 11px;">다른 검색 조건을 시도해보세요.</div>
                  </td>
                \`;
                tbody.appendChild(tr);
              }
            } else if (emptyRow && visibleCount > 0) {
              emptyRow.parentElement.remove();
            }
          }
          
          function clearFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('wardFilter').value = '';
            document.getElementById('alertFilter').value = '';
            filterTable();
          }
        `}} />
      </body>
    </html>
  );
};
