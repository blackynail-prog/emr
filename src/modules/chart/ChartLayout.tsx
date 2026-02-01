/**
 * ChartLayout.tsx
 * Real Hospital EMR Layout - Epic/BestCare Style
 * 
 * Features:
 * - Fixed left sidebar (200px) with 7 menu items
 * - Sticky top patient banner with allergies/isolation badges
 * - Center content area for active tab
 * - Fixed right quick panel (280px) with vitals/labs/meds
 * - Compact medical UI design with gray/blue theme
 */

import { FC } from 'hono/jsx';
import type { Patient } from '../patients/PatientListPage';

interface ChartLayoutProps {
  patient: Patient;
  activeTab: string;
  children: any;
  latestVitals?: {
    temp: string;
    bp: string;
    pulse: string;
    rr: string;
    spo2: string;
    pain?: string;
    o2Device?: string;
    o2Flow?: string;
    recordedAt: string;
  };
  latestLabs?: Array<{
    name: string;
    value: string;
    flag?: string;
    abnormal: boolean;
  }>;
  activeMeds?: Array<{
    name: string;
    dose?: string;
    route?: string;
  }>;
  allergies?: string[];
  isolation?: string;
  fallRisk?: boolean;
  codeStatus?: 'Full' | 'DNR' | 'DNI' | 'DNR/DNI';
  npo?: boolean;
  devices?: string[];
  activeMedsCount?: number;
}

export const ChartLayout: FC<ChartLayoutProps> = ({
  patient,
  activeTab,
  children,
  latestVitals,
  latestLabs,
  activeMeds = [],
  allergies = [],
  isolation,
  fallRisk = false,
  codeStatus = 'Full',
  npo = false,
  devices = [],
  activeMedsCount = 0,
}) => {
  const menuItems = [
    { id: 'summary', label: 'Summary', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📝' },
    { id: 'labs', label: 'Labs', icon: '🧪' },
    { id: 'mar', label: 'MAR', icon: '💊' },
    { id: 'vitals', label: 'Vitals', icon: '❤️' },
    { id: 'notes', label: 'Notes', icon: '📋' },
    { id: 'handoff', label: 'Handoff', icon: '🔄' },
  ];

  // Helper: Classify vital sign severity
  const getVitalSeverity = (vital: string, value: string): 'critical' | 'warning' | 'normal' => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'normal';

    switch (vital) {
      case 'sbp':
        if (numValue < 90) return 'critical';
        if (numValue > 160) return 'warning';
        return 'normal';
      case 'spo2':
        if (numValue < 90) return 'critical';
        if (numValue < 95) return 'warning';
        return 'normal';
      case 'temp':
        if (numValue >= 38.5) return 'critical';
        if (numValue >= 38.0) return 'warning';
        if (numValue < 36.0) return 'warning';
        return 'normal';
      case 'hr':
        if (numValue >= 130) return 'critical';
        if (numValue >= 120 || numValue < 50) return 'warning';
        return 'normal';
      case 'rr':
        if (numValue >= 30 || numValue < 10) return 'critical';
        if (numValue >= 24 || numValue < 12) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  };

  // Helper: Prioritize abnormal labs
  const prioritizeLabs = (labs: Array<{ name: string; value: string; flag?: string; abnormal: boolean }>) => {
    const priorityOrder = ['Lactate', 'K', 'Potassium', 'Na', 'Sodium', 'Creatinine', 'Hgb', 'Hemoglobin', 
                           'WBC', 'Platelet', 'INR', 'Glucose', 'pH'];
    
    return labs
      .filter(lab => lab.abnormal || lab.flag === 'H' || lab.flag === 'L')
      .sort((a, b) => {
        const aIndex = priorityOrder.findIndex(p => a.name.includes(p));
        const bIndex = priorityOrder.findIndex(p => b.name.includes(p));
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
  };

  // Helper: Classify medications by category
  const classifyMed = (name: string): string | null => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('norepinephrine') || lowerName.includes('dopamine') || 
        lowerName.includes('vasopressin') || lowerName.includes('epinephrine')) {
      return 'vasopressor';
    }
    if (lowerName.includes('penem') || lowerName.includes('cef') || 
        lowerName.includes('piperacillin') || lowerName.includes('vancomycin') ||
        lowerName.includes('azithromycin') || lowerName.includes('levofloxacin')) {
      return 'antibiotic';
    }
    if (lowerName.includes('furosemide') || lowerName.includes('lasix') ||
        lowerName.includes('spironolactone')) {
      return 'diuretic';
    }
    if (lowerName.includes('heparin') || lowerName.includes('enoxaparin') ||
        lowerName.includes('warfarin')) {
      return 'anticoagulant';
    }
    return null;
  };

  // Process vitals for display
  const processedVitals = latestVitals ? {
    sbp: latestVitals.bp.split('/')[0],
    dbp: latestVitals.bp.split('/')[1] || '',
    hr: latestVitals.pulse,
    rr: latestVitals.rr,
    temp: latestVitals.temp,
    spo2: latestVitals.spo2,
    pain: latestVitals.pain || '-',
    o2Device: latestVitals.o2Device || (parseFloat(latestVitals.spo2) < 95 ? 'NC' : 'RA'),
    o2Flow: latestVitals.o2Flow || '',
    time: latestVitals.recordedAt.split(' ')[1] || latestVitals.recordedAt,
  } : null;

  // Process abnormal labs (top 3)
  const prioritizedLabs = latestLabs ? prioritizeLabs(latestLabs) : [];
  const topAbnormalLabs = prioritizedLabs.slice(0, 3);
  const abnormalCount = prioritizedLabs.length;

  // Process key medications
  const keyMeds = activeMeds.filter(med => classifyMed(med.name) !== null);
  const topKeyMeds = keyMeds.slice(0, 3);

  // Generate safety alerts
  const safetyAlerts: string[] = [];
  if (processedVitals) {
    const sbpNum = parseFloat(processedVitals.sbp);
    const spo2Num = parseFloat(processedVitals.spo2);
    const tempNum = parseFloat(processedVitals.temp);
    const hrNum = parseFloat(processedVitals.hr);

    if (!isNaN(sbpNum) && sbpNum < 90) {
      safetyAlerts.push(`저혈압 경고: SBP ${sbpNum}`);
    }
    if (!isNaN(spo2Num) && spo2Num < 90) {
      safetyAlerts.push(`저산소증 경고: SpO₂ ${spo2Num}%`);
    }
    if (!isNaN(tempNum) && tempNum >= 38.5) {
      safetyAlerts.push(`고열 경고: ${tempNum}°C`);
    }
    if (!isNaN(hrNum) && hrNum >= 130) {
      safetyAlerts.push(`빈맥 경고: HR ${hrNum}`);
    }
  }

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EMR - {patient.name}</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            font-size: 13px;
            line-height: 1.4;
            color: #2c3e50;
            background: #ecf0f1;
          }
          
          /* Flex Layout Container */
          .emr-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          
          /* Enhanced Patient Banner - Hospital EMR Header */
          .patient-banner {
            flex: 0 0 56px;
            background: #f5f7fa;
            border-bottom: 2px solid #cbd5e0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 16px;
            z-index: 10;
            position: sticky;
            top: 0;
          }
          
          /* Fixed Column Layout */
          .banner-col {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 6px 8px;
            border-right: 1px solid #e2e8f0;
            min-height: 44px;
          }
          
          .banner-col:last-child {
            border-right: none;
          }
          
          .banner-col-label {
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            color: #718096;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
          }
          
          .banner-col-value {
            font-size: 13px;
            font-weight: 600;
            color: #2d3748;
            line-height: 1.3;
          }
          
          /* Name Column */
          .col-name {
            flex: 0 0 220px;
            width: 220px;
          }
          
          .col-name .banner-col-value {
            font-size: 14px;
            font-weight: 700;
            color: #1a202c;
          }
          
          .patient-demographics {
            font-size: 11px;
            color: #4a5568;
            font-weight: 500;
            margin-top: 2px;
          }
          
          /* MRN Column */
          .col-mrn {
            flex: 0 0 140px;
            width: 140px;
          }
          
          .col-mrn .banner-col-value {
            font-family: 'Courier New', monospace;
            font-weight: 700;
            color: #2b6cb0;
          }
          
          /* Location Column */
          .col-location {
            flex: 0 0 160px;
            width: 160px;
          }
          
          /* Diagnosis Column (Flexible) */
          .col-diagnosis {
            flex: 1;
            min-width: 0;
          }
          
          .col-diagnosis .banner-col-value {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
          }
          
          /* Alerts Column */
          .col-alerts {
            flex: 0 0 260px;
            width: 260px;
            flex-wrap: wrap;
            gap: 4px;
            padding: 4px 8px;
          }
          
          .col-alerts .banner-col-label {
            width: 100%;
            margin-bottom: 4px;
          }
          
          .alerts-container {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            width: 100%;
          }
          
          /* Status Column */
          .col-status {
            flex: 0 0 260px;
            width: 260px;
            flex-wrap: wrap;
            gap: 4px;
            padding: 4px 8px;
          }
          
          .col-status .banner-col-label {
            width: 100%;
            margin-bottom: 4px;
          }
          
          .status-container {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            width: 100%;
          }
          
          /* Last Updated Column */
          .col-updated {
            flex: 0 0 120px;
            width: 120px;
            text-align: right;
            border-right: none;
          }
          
          .col-updated .banner-col-value {
            font-size: 11px;
            font-weight: 600;
            color: #4a5568;
          }
          
          /* Main Content Wrapper (Flex Row) */
          .content-wrapper {
            display: flex;
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }
          
          /* Left Sidebar */
          .sidebar {
            flex: 0 0 220px;
            width: 220px;
            background: #263238;
            border-right: 2px solid #1c2529;
            position: sticky;
            top: 0;
            height: calc(100vh - 56px);
            overflow-y: auto;
            z-index: 2;
          }
          
          /* Alert Badges */
          .alert-badge {
            display: inline-flex;
            align-items: center;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.3px;
            white-space: nowrap;
          }
          
          .alert-allergy {
            background: #fed7d7;
            color: #c53030;
            border: 1px solid #fc8181;
            animation: pulse 2s ease-in-out infinite;
          }
          
          .alert-isolation {
            background: #feebc8;
            color: #c05621;
            border: 1px solid #f6ad55;
          }
          
          .alert-fall {
            background: #e9d8fd;
            color: #6b46c1;
            border: 1px solid #b794f4;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.75; }
          }
          
          /* Status Chips */
          .status-chip {
            display: inline-flex;
            align-items: center;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.3px;
            white-space: nowrap;
          }
          
          .status-code-full {
            background: #c6f6d5;
            color: #22543d;
            border: 1px solid #9ae6b4;
          }
          
          .status-code-dnr {
            background: #e2e8f0;
            color: #2d3748;
            border: 1px solid #cbd5e0;
          }
          
          .status-npo {
            background: #feebc8;
            color: #c05621;
            border: 1px solid #f6ad55;
          }
          
          .status-device {
            background: #bee3f8;
            color: #2c5282;
            border: 1px solid #90cdf4;
          }
          
          .status-o2 {
            background: #b2f5ea;
            color: #234e52;
            border: 1px solid #81e6d9;
          }
          
          .sidebar-menu {
            list-style: none;
            padding: 12px 8px;
          }
          
          .sidebar-menu li {
            margin-bottom: 2px;
          }
          
          .sidebar-menu a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            color: #b0bec5;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.15s;
            font-size: 13px;
            font-weight: 500;
          }
          
          .sidebar-menu a:hover {
            background: rgba(66, 165, 245, 0.08);
            color: #e3f2fd;
          }
          
          .sidebar-menu a.active {
            background: rgba(66, 165, 245, 0.15);
            color: white;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .sidebar-menu a .icon {
            font-size: 14px;
            width: 18px;
            text-align: center;
          }
          
          /* Main Content Area */
          .main-content {
            flex: 1;
            min-width: 0;
            background: #f8f9fa;
            padding: 20px;
            overflow-y: auto;
            height: calc(100vh - 56px);
          }
          
          /* Right Quick Panel */
          .quick-panel {
            flex: 0 0 280px;
            width: 280px;
            background: #fafafa;
            border-left: 2px solid #e0e0e0;
            overflow-y: auto;
            padding: 16px 12px;
            height: calc(100vh - 56px);
          }
          
          .quick-panel-section {
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #ecf0f1;
          }
          
          .quick-panel-section:last-child {
            border-bottom: none;
          }
          
          .quick-panel-title {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: #7f8c8d;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .quick-panel-content {
            font-size: 11px;
          }
          
          .vital-row, .lab-row, .info-row {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
            border-bottom: 1px solid #f8f9fa;
          }
          
          .vital-row:last-child, .lab-row:last-child, .info-row:last-child {
            border-bottom: none;
          }
          
          .vital-label, .lab-label, .info-label {
            color: #7f8c8d;
            font-size: 10px;
          }
          
          .vital-value {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .lab-value {
            font-weight: 600;
          }
          
          .lab-value.abnormal {
            color: #e74c3c;
            font-weight: 700;
          }
          
          .info-value {
            font-weight: 600;
            color: #2c3e50;
          }
          
          .timestamp {
            font-size: 9px;
            color: #95a5a6;
            margin-top: 4px;
            font-style: italic;
          }
          
          .meds-count {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #3498db;
            color: white;
            font-weight: 700;
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 10px;
            min-width: 24px;
          }
          
          /* Clinical Decision Panel Styles */
          .vital-critical {
            color: #c53030;
            font-weight: 700;
            background: #fed7d7;
            padding: 2px 4px;
            border-radius: 3px;
          }
          
          .vital-warning {
            color: #c05621;
            font-weight: 700;
            background: #feebc8;
            padding: 2px 4px;
            border-radius: 3px;
          }
          
          .vital-normal {
            color: #2c3e50;
            font-weight: 600;
          }
          
          .lab-flag-badge {
            display: inline-block;
            padding: 1px 4px;
            border-radius: 2px;
            font-size: 9px;
            font-weight: 700;
            margin-left: 4px;
          }
          
          .lab-flag-H {
            background: #e74c3c;
            color: white;
          }
          
          .lab-flag-L {
            background: #3498db;
            color: white;
          }
          
          .abnormal-count-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #e74c3c;
            color: white;
            font-weight: 700;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 8px;
            margin-left: 6px;
          }
          
          .med-category {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 600;
            margin-left: 6px;
          }
          
          .med-vasopressor {
            background: #fed7d7;
            color: #c53030;
          }
          
          .med-antibiotic {
            background: #c6f6d5;
            color: #22543d;
          }
          
          .med-diuretic {
            background: #bee3f8;
            color: #2c5282;
          }
          
          .med-anticoagulant {
            background: #feebc8;
            color: #c05621;
          }
          
          .safety-alert {
            background: #fed7d7;
            border-left: 3px solid #e74c3c;
            padding: 6px 8px;
            margin: 4px 0;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            color: #c53030;
          }
          
          .safety-alert-icon {
            margin-right: 4px;
          }
          
          .empty-state {
            color: #95a5a6;
            font-size: 10px;
            font-style: italic;
            padding: 8px 0;
            text-align: center;
          }
          
          .o2-info {
            display: inline-block;
            background: #b2f5ea;
            color: #234e52;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            margin-left: 6px;
          }
          
          .alert-summary-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-bottom: 8px;
          }
          
          .alert-summary-badge {
            display: inline-flex;
            align-items: center;
            padding: 3px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.3px;
          }
          
          /* Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #ecf0f1;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #bdc3c7;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #95a5a6;
          }
          
          /* Responsive */
          @media (max-width: 1280px) {
            .quick-panel { 
              display: none; 
            }
          }
          
          @media (max-width: 768px) {
            .sidebar { 
              display: none; 
            }
            .main-content {
              padding: 12px;
            }
          }
        `}</style>
      </head>
      <body>
        <div class="emr-container">
          {/* Enhanced Patient Banner - Hospital EMR Header */}
          <div class="patient-banner">
            {/* Name/Sex/Age Column */}
            <div class="banner-col col-name">
              <div class="banner-col-label">환자명</div>
              <div class="banner-col-value">{patient.name}</div>
              <div class="patient-demographics">
                {patient.gender === 'M' ? '남' : '여'} / {patient.age}세
              </div>
            </div>

            {/* MRN Column */}
            <div class="banner-col col-mrn">
              <div class="banner-col-label">등록번호</div>
              <div class="banner-col-value">{patient.mrn}</div>
            </div>

            {/* Ward/Room/Bed Column */}
            <div class="banner-col col-location">
              <div class="banner-col-label">병동/병실</div>
              <div class="banner-col-value">
                {patient.room || 'N/A'}
              </div>
            </div>

            {/* Primary Diagnosis Column (Flexible) */}
            <div class="banner-col col-diagnosis">
              <div class="banner-col-label">주 진단</div>
              <div class="banner-col-value" title={patient.diagnosis}>
                {patient.diagnosis || '-'}
              </div>
            </div>

            {/* Alerts Column */}
            <div class="banner-col col-alerts">
              <div class="banner-col-label">경고</div>
              <div class="alerts-container">
                {allergies.length > 0 && (
                  <span class="alert-badge alert-allergy" title={allergies.join(', ')}>
                    알러지: {allergies[0]}{allergies.length > 1 ? ` +${allergies.length - 1}` : ''}
                  </span>
                )}
                {isolation && (
                  <span class="alert-badge alert-isolation">
                    격리: {isolation.toUpperCase()}
                  </span>
                )}
                {fallRisk && (
                  <span class="alert-badge alert-fall">낙상위험</span>
                )}
              </div>
            </div>

            {/* Status Column */}
            <div class="banner-col col-status">
              <div class="banner-col-label">상태</div>
              <div class="status-container">
                {/* Code Status */}
                <span class={`status-chip ${codeStatus === 'Full' ? 'status-code-full' : 'status-code-dnr'}`}>
                  {codeStatus.toUpperCase()}
                </span>
                
                {/* NPO Status - show if applicable */}
                {npo && (
                  <span class="status-chip status-npo">NPO</span>
                )}
                
                {/* Device Status - show each device */}
                {devices.map((device) => (
                  <span class="status-chip status-device">{device}</span>
                ))}
                
                {/* O2 Device - derive from vitals if available */}
                {latestVitals && latestVitals.spo2 && (
                  <span class="status-chip status-o2">
                    O₂: {parseInt(latestVitals.spo2) < 95 ? 'NC' : 'RA'}
                  </span>
                )}
              </div>
            </div>

            {/* Last Updated Column */}
            <div class="banner-col col-updated">
              <div class="banner-col-label">마지막 업데이트</div>
              <div class="banner-col-value">
                {latestVitals?.recordedAt 
                  ? latestVitals.recordedAt.split(' ')[1] || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                  : new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Content Wrapper (Sidebar + Main + Quick Panel) */}
          <div class="content-wrapper">
            {/* Left Sidebar */}
            <div class="sidebar">
            <ul class="sidebar-menu">
              {menuItems.map((item) => (
                <li>
                  <a
                    href={`/patients/${patient.id}?tab=${item.id}`}
                    class={item.id === activeTab ? 'active' : ''}
                  >
                    <span class="icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div class="main-content">
            {children}
          </div>

          {/* Clinical Decision Support Panel */}
          <div class="quick-panel">
            {/* A) 최신 활력징후 (Latest Vitals) */}
            {processedVitals && (
              <div class="quick-panel-section">
                <div class="quick-panel-title">
                  <span>❤️</span>
                  <span>최신 활력징후</span>
                </div>
                <div class="quick-panel-content">
                  <div class="vital-row">
                    <span class="vital-label">BP</span>
                    <span class={`vital-value ${
                      getVitalSeverity('sbp', processedVitals.sbp) === 'critical' ? 'vital-critical' :
                      getVitalSeverity('sbp', processedVitals.sbp) === 'warning' ? 'vital-warning' : 'vital-normal'
                    }`}>
                      {processedVitals.sbp}/{processedVitals.dbp}
                    </span>
                  </div>
                  <div class="vital-row">
                    <span class="vital-label">HR</span>
                    <span class={`vital-value ${
                      getVitalSeverity('hr', processedVitals.hr) === 'critical' ? 'vital-critical' :
                      getVitalSeverity('hr', processedVitals.hr) === 'warning' ? 'vital-warning' : 'vital-normal'
                    }`}>
                      {processedVitals.hr} bpm
                    </span>
                  </div>
                  <div class="vital-row">
                    <span class="vital-label">RR</span>
                    <span class={`vital-value ${
                      getVitalSeverity('rr', processedVitals.rr) === 'critical' ? 'vital-critical' :
                      getVitalSeverity('rr', processedVitals.rr) === 'warning' ? 'vital-warning' : 'vital-normal'
                    }`}>
                      {processedVitals.rr} /min
                    </span>
                  </div>
                  <div class="vital-row">
                    <span class="vital-label">Temp</span>
                    <span class={`vital-value ${
                      getVitalSeverity('temp', processedVitals.temp) === 'critical' ? 'vital-critical' :
                      getVitalSeverity('temp', processedVitals.temp) === 'warning' ? 'vital-warning' : 'vital-normal'
                    }`}>
                      {processedVitals.temp}°C
                    </span>
                  </div>
                  <div class="vital-row">
                    <span class="vital-label">SpO₂</span>
                    <span class={`vital-value ${
                      getVitalSeverity('spo2', processedVitals.spo2) === 'critical' ? 'vital-critical' :
                      getVitalSeverity('spo2', processedVitals.spo2) === 'warning' ? 'vital-warning' : 'vital-normal'
                    }`}>
                      {processedVitals.spo2}%
                      <span class="o2-info">
                        {processedVitals.o2Device}{processedVitals.o2Flow ? ` ${processedVitals.o2Flow}L` : ''}
                      </span>
                    </span>
                  </div>
                  <div class="vital-row">
                    <span class="vital-label">Pain</span>
                    <span class="vital-value vital-normal">{processedVitals.pain}/10</span>
                  </div>
                  <div class="timestamp">{processedVitals.time}</div>
                </div>
              </div>
            )}

            {/* B) 이상 검사 (Abnormal Labs) Top 3 */}
            {topAbnormalLabs.length > 0 && (
              <div class="quick-panel-section">
                <div class="quick-panel-title">
                  <span>🧪</span>
                  <span>이상 검사</span>
                  {abnormalCount > 0 && (
                    <span class="abnormal-count-badge">이상 {abnormalCount}</span>
                  )}
                </div>
                <div class="quick-panel-content">
                  {topAbnormalLabs.map((lab) => (
                    <div class="lab-row">
                      <span class="lab-label">{lab.name}</span>
                      <span class={`lab-value ${lab.abnormal ? 'abnormal' : ''}`}>
                        {lab.value}
                        {lab.flag && (
                          <span class={`lab-flag-badge lab-flag-${lab.flag}`}>{lab.flag}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C) Key Meds / Drips */}
            <div class="quick-panel-section">
              <div class="quick-panel-title">
                <span>💊</span>
                <span>주요 약제</span>
                <span class="meds-count">{keyMeds.length}</span>
              </div>
              <div class="quick-panel-content">
                {topKeyMeds.length > 0 ? (
                  topKeyMeds.map((med) => {
                    const category = classifyMed(med.name);
                    return (
                      <div class="lab-row">
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                          <div style="font-size: 11px; font-weight: 600; color: #2c3e50;">
                            {med.name}
                            {category && (
                              <span class={`med-category med-${category}`}>
                                {category === 'vasopressor' ? '승압제' :
                                 category === 'antibiotic' ? '항생제' :
                                 category === 'diuretic' ? '이뇨제' :
                                 category === 'anticoagulant' ? '항응고제' : category}
                              </span>
                            )}
                          </div>
                          {med.dose && med.route && (
                            <div style="font-size: 9px; color: #7f8c8d;">
                              {med.dose} {med.route}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div class="empty-state">중요 약제 없음</div>
                )}
              </div>
            </div>

            {/* D) Safety / Alerts Summary */}
            <div class="quick-panel-section">
              <div class="quick-panel-title">
                <span>⚠️</span>
                <span>안전 알림</span>
              </div>
              <div class="quick-panel-content">
                {/* Compact alert badges */}
                <div class="alert-summary-badges">
                  {allergies.length > 0 && (
                    <span class="alert-summary-badge alert-allergy" title={allergies.join(', ')}>
                      알러지 {allergies.length}
                    </span>
                  )}
                  {isolation && (
                    <span class="alert-summary-badge alert-isolation">
                      격리: {isolation}
                    </span>
                  )}
                  {fallRisk && (
                    <span class="alert-summary-badge alert-fall">낙상위험</span>
                  )}
                </div>
                
                {/* Critical vital alerts */}
                {safetyAlerts.length > 0 && (
                  <div style="margin-top: 8px;">
                    {safetyAlerts.map((alert) => (
                      <div class="safety-alert">
                        <span class="safety-alert-icon">🚨</span>
                        {alert}
                      </div>
                    ))}
                  </div>
                )}
                
                {safetyAlerts.length === 0 && allergies.length === 0 && !isolation && !fallRisk && (
                  <div class="empty-state">현재 경고 없음</div>
                )}
              </div>
            </div>
          </div>
          </div>
          {/* End Content Wrapper */}
        </div>
        {/* End EMR Container */}
      </body>
    </html>
  );
};
