/**
 * mockEmrService.ts
 * Comprehensive mock EMR data service - Updated with exact structure
 */

import type { Center } from '../centers/CenterSelectPage';

// ===== TYPE DEFINITIONS =====

export interface InpatientListItem {
  encounterId: string;
  centerId: string;
  ward: string;
  room: string;
  bed: string;
  name: string;
  sex: 'M' | 'F';
  age: number;
  mrn: string;
  dx: string;
  alerts: {
    allergy: string | null;
    isolation: string | null;
    fallRisk: boolean;
  };
  lastVitalsAt: string;
}

export interface VitalsPoint {
  time: string;
  sbp: number;
  dbp: number;
  hr: number;
  rr: number;
  temp: number;
  spo2: number;
  pain: number;
}

export interface LabResult {
  test: string;
  value: number;
  unit: string;
  flag: string; // 'H' | 'L' | 'N' (high/low/normal)
  ref?: string; // reference range
  ts: string; // timestamp
}

export interface ActiveMed {
  name: string;
  route: string;
  frequency?: string; // 'q4h', 'BID', 'TID', 'QD', 'continuous'
  status: string; // 'running' | 'scheduled' | 'held'
}

export interface MARRecord {
  time: string;
  med: string;
  status: string; // 'given' | 'running' | 'missed' | 'scheduled'
  dose?: string;
  route?: string;
}

export interface ChartBundle {
  patient: {
    name: string;
    sex: 'M' | 'F';
    age: number;
    mrn: string;
  };
  encounter: {
    ward: string;
    room: string;
    bed: string;
    admitAt: string;
  };
  problemList: string[];
  alerts: {
    allergy: string | null;
    isolation: string | null;
    fallRisk: boolean;
  };
  status: {
    code: 'Full' | 'DNR' | 'DNI' | 'DNR/DNI';
    npo: boolean;
    devices: string[]; // e.g., ['Foley', 'NG Tube', 'Drain', 'Central Line', 'A-Line']
  };
  vitals_series: VitalsPoint[];
  labs_latest: LabResult[];
  labs_series: Record<string, Array<{ ts: string; value: number }>>;
  meds_active: ActiveMed[];
  mar_recent: MARRecord[];
  mar_events: MARRecord[];
}

// ===== MOCK CENTERS =====
export const centers: Center[] = [
  { id: "swcn", name: "서울여자간호대학병원", bedCount: 500, location: "서울 서대문구" },
  { id: "ucmc", name: "가톨릭대학교 의정부성모병원", bedCount: 800, location: "경기 의정부시" },
  { id: "ilsan", name: "일산병원", bedCount: 650, location: "경기 고양시" }
];

// ===== MOCK INPATIENTS =====
export const inpatients: InpatientListItem[] = [
  {
    encounterId: "E1001",
    centerId: "swcn",
    ward: "ICU",
    room: "12",
    bed: "A",
    name: "김영수",
    sex: "M",
    age: 68,
    mrn: "S00021",
    dx: "Septic shock",
    alerts: { allergy: "Penicillin", isolation: "Contact", fallRisk: true },
    lastVitalsAt: "2026-02-02T10:20"
  },
  {
    encounterId: "E1002",
    centerId: "swcn",
    ward: "NS",
    room: "305",
    bed: "B",
    name: "박지현",
    sex: "F",
    age: 54,
    mrn: "S00022",
    dx: "Acute ischemic stroke",
    alerts: { allergy: null, isolation: null, fallRisk: true },
    lastVitalsAt: "2026-02-02T09:45"
  },
  {
    encounterId: "E2001",
    centerId: "ucmc",
    ward: "ER",
    room: "Trauma",
    bed: "3",
    name: "최민호",
    sex: "M",
    age: 34,
    mrn: "U00991",
    dx: "Pelvic fracture",
    alerts: { allergy: "NSAIDs", isolation: null, fallRisk: false },
    lastVitalsAt: "2026-02-02T10:30"
  },
  {
    encounterId: "E2002",
    centerId: "ucmc",
    ward: "IM",
    room: "602",
    bed: "A",
    name: "이은정",
    sex: "F",
    age: 72,
    mrn: "U00992",
    dx: "Heart failure exacerbation",
    alerts: { allergy: null, isolation: null, fallRisk: true },
    lastVitalsAt: "2026-02-02T10:10"
  },
  {
    encounterId: "E3001",
    centerId: "ilsan",
    ward: "GS",
    room: "411",
    bed: "B",
    name: "정수현",
    sex: "F",
    age: 45,
    mrn: "I00111",
    dx: "Post-op appendectomy",
    alerts: { allergy: null, isolation: null, fallRisk: false },
    lastVitalsAt: "2026-02-02T08:50"
  },
  {
    encounterId: "E3002",
    centerId: "ilsan",
    ward: "ICU",
    room: "9",
    bed: "A",
    name: "강동훈",
    sex: "M",
    age: 59,
    mrn: "I00112",
    dx: "ARDS",
    alerts: { allergy: "Latex", isolation: "Airborne", fallRisk: false },
    lastVitalsAt: "2026-02-02T10:25"
  }
];

// ===== MOCK CHART BUNDLES =====
export const chartBundles: Record<string, ChartBundle> = {
  E1001: {
    patient: { name: "김영수", sex: "M", age: 68, mrn: "S00021" },
    encounter: { ward: "ICU", room: "12", bed: "A", admitAt: "2026-02-01" },
    problemList: ["Septic shock", "AKI", "Mechanical ventilation"],
    alerts: { allergy: "Penicillin", isolation: "Contact", fallRisk: true },
    status: { code: "Full", npo: true, devices: ["Foley", "Central Line", "A-Line", "ETT"] },
    vitals_series: [
      { time: "08:00", sbp: 88, dbp: 54, hr: 118, rr: 26, temp: 38.4, spo2: 92, pain: 0 },
      { time: "09:00", sbp: 86, dbp: 50, hr: 122, rr: 28, temp: 38.6, spo2: 91, pain: 0 },
      { time: "10:00", sbp: 90, dbp: 56, hr: 110, rr: 24, temp: 38.2, spo2: 94, pain: 0 }
    ],
    labs_latest: [
      { test: "WBC", value: 19.5, unit: "K/µL", flag: "H", ref: "4-11", ts: "2026-02-02T10:00" },
      { test: "Lactate", value: 5.8, unit: "mmol/L", flag: "H", ref: "0.5-2.2", ts: "2026-02-02T10:00" },
      { test: "Creatinine", value: 2.1, unit: "mg/dL", flag: "H", ref: "0.6-1.2", ts: "2026-02-02T10:00" },
      { test: "Hemoglobin", value: 11.2, unit: "g/dL", flag: "L", ref: "13-17", ts: "2026-02-02T10:00" },
      { test: "Sodium", value: 138, unit: "mmol/L", flag: "N", ref: "135-145", ts: "2026-02-02T10:00" },
      { test: "Potassium", value: 4.5, unit: "mmol/L", flag: "N", ref: "3.5-5.0", ts: "2026-02-02T10:00" }
    ],
    labs_series: {
      "WBC": [
        { ts: "2026-02-02T06:00", value: 18.2 },
        { ts: "2026-02-02T08:00", value: 19.1 },
        { ts: "2026-02-02T10:00", value: 19.5 }
      ],
      "Lactate": [
        { ts: "2026-02-02T06:00", value: 6.8 },
        { ts: "2026-02-02T08:00", value: 6.2 },
        { ts: "2026-02-02T10:00", value: 5.8 }
      ],
      "Creatinine": [
        { ts: "2026-02-02T06:00", value: 2.3 },
        { ts: "2026-02-02T08:00", value: 2.2 },
        { ts: "2026-02-02T10:00", value: 2.1 }
      ],
      "Hemoglobin": [
        { ts: "2026-02-02T06:00", value: 11.5 },
        { ts: "2026-02-02T08:00", value: 11.3 },
        { ts: "2026-02-02T10:00", value: 11.2 }
      ]
    },
    meds_active: [
      { name: "Norepinephrine", route: "IV", frequency: "continuous", status: "running" },
      { name: "Meropenem", route: "IV", frequency: "q8h", status: "scheduled" }
    ],
    mar_recent: [
      { time: "09:00", med: "Meropenem", dose: "1g", route: "IV", status: "given" },
      { time: "10:00", med: "Norepinephrine", dose: "titrated", route: "IV", status: "running" }
    ],
    mar_events: [
      { time: "06:00", med: "Norepinephrine", dose: "titrated", route: "IV", status: "given" },
      { time: "09:00", med: "Meropenem", dose: "1g", route: "IV", status: "given" },
      { time: "10:00", med: "Norepinephrine", dose: "titrated", route: "IV", status: "running" },
      { time: "12:00", med: "Meropenem", dose: "1g", route: "IV", status: "scheduled" }
    ]
  },
  E1002: {
    patient: { name: "박지현", sex: "F", age: 54, mrn: "S00022" },
    encounter: { ward: "NS", room: "305", bed: "B", admitAt: "2026-02-01" },
    problemList: ["Acute ischemic stroke (L MCA)", "Hypertension", "Dysphagia"],
    alerts: { allergy: null, isolation: null, fallRisk: true },
    status: { code: "Full", npo: true, devices: ["NG Tube"] },
    vitals_series: [
      { time: "08:00", sbp: 152, dbp: 88, hr: 76, rr: 18, temp: 37.1, spo2: 98, pain: 2 },
      { time: "09:00", sbp: 148, dbp: 86, hr: 78, rr: 18, temp: 37.0, spo2: 98, pain: 2 },
      { time: "09:45", sbp: 150, dbp: 87, hr: 77, rr: 18, temp: 37.1, spo2: 98, pain: 2 }
    ],
    labs_latest: [
      { test: "INR", value: 1.8, unit: "", flag: "N", ref: "0.8-1.2", ts: "2026-02-02T09:00" },
      { test: "Glucose", value: 142, unit: "mg/dL", flag: "H", ref: "70-110", ts: "2026-02-02T09:00" },
      { test: "Cholesterol", value: 215, unit: "mg/dL", flag: "H", ref: "<200", ts: "2026-02-02T09:00" },
      { test: "Sodium", value: 141, unit: "mmol/L", flag: "N", ref: "135-145", ts: "2026-02-02T09:00" },
      { test: "Potassium", value: 3.9, unit: "mmol/L", flag: "N", ref: "3.5-5.0", ts: "2026-02-02T09:00" }
    ],
    labs_series: {
      "Glucose": [
        { ts: "2026-02-02T06:00", value: 156 },
        { ts: "2026-02-02T08:00", value: 148 },
        { ts: "2026-02-02T09:00", value: 142 }
      ],
      "Cholesterol": [
        { ts: "2026-02-01T08:00", value: 220 },
        { ts: "2026-02-02T09:00", value: 215 }
      ]
    },
    meds_active: [
      { name: "Aspirin", route: "PO", frequency: "QD", status: "scheduled" },
      { name: "Atorvastatin", route: "PO", frequency: "QHS", status: "scheduled" },
      { name: "Amlodipine", route: "PO", frequency: "QD", status: "scheduled" }
    ],
    mar_recent: [
      { time: "08:00", med: "Aspirin", dose: "100mg", route: "PO", status: "given" },
      { time: "08:00", med: "Atorvastatin", dose: "40mg", route: "PO", status: "given" }
    ],
    mar_events: [
      { time: "08:00", med: "Aspirin", dose: "100mg", route: "PO", status: "given" },
      { time: "08:00", med: "Atorvastatin", dose: "40mg", route: "PO", status: "given" },
      { time: "08:00", med: "Amlodipine", dose: "5mg", route: "PO", status: "given" },
      { time: "20:00", med: "Atorvastatin", dose: "40mg", route: "PO", status: "scheduled" }
    ]
  },
  E2001: {
    patient: { name: "최민호", sex: "M", age: 34, mrn: "U00991" },
    encounter: { ward: "ER", room: "Trauma", bed: "3", admitAt: "2026-02-02" },
    problemList: ["Pelvic fracture (unstable)", "Hemorrhagic shock"],
    alerts: { allergy: "NSAIDs", isolation: null, fallRisk: false },
    status: { code: "Full", npo: true, devices: ["Foley", "Pelvic Binder"] },
    vitals_series: [
      { time: "09:00", sbp: 98, dbp: 62, hr: 105, rr: 22, temp: 36.8, spo2: 96, pain: 8 },
      { time: "10:00", sbp: 102, dbp: 66, hr: 98, rr: 20, temp: 36.9, spo2: 97, pain: 7 },
      { time: "10:30", sbp: 106, dbp: 68, hr: 95, rr: 20, temp: 37.0, spo2: 97, pain: 6 }
    ],
    labs_latest: [
      { test: "Hb", value: 8.5, unit: "g/dL", flag: "L", ref: "13-17", ts: "2026-02-02T10:00" },
      { test: "Hct", value: 25, unit: "%", flag: "L", ref: "39-49", ts: "2026-02-02T10:00" },
      { test: "Platelets", value: 145, unit: "K/µL", flag: "N", ref: "150-400", ts: "2026-02-02T10:00" }
    ],
    labs_series: {
      "Hb": [
        { ts: "2026-02-02T09:00", value: 8.8 },
        { ts: "2026-02-02T10:00", value: 8.5 }
      ],
      "Hct": [
        { ts: "2026-02-02T09:00", value: 26 },
        { ts: "2026-02-02T10:00", value: 25 }
      ]
    },
    meds_active: [
      { name: "Morphine PCA", route: "IV", frequency: "continuous", status: "running" },
      { name: "Tranexamic acid", route: "IV", frequency: "STAT", status: "given" }
    ],
    mar_recent: [
      { time: "09:30", med: "Morphine", dose: "2mg", route: "IV", status: "given" },
      { time: "10:00", med: "Tranexamic acid", dose: "1g", route: "IV", status: "given" }
    ],
    mar_events: [
      { time: "09:00", med: "Morphine PCA", dose: "started", route: "IV", status: "given" },
      { time: "09:30", med: "Morphine", dose: "2mg", route: "IV", status: "given" },
      { time: "10:00", med: "Tranexamic acid", dose: "1g", route: "IV", status: "given" }
    ]
  },
  E2002: {
    patient: { name: "이은정", sex: "F", age: 72, mrn: "U00992" },
    encounter: { ward: "IM", room: "602", bed: "A", admitAt: "2026-01-30" },
    problemList: ["Heart failure (NYHA III)", "CKD stage 3", "Diabetes"],
    alerts: { allergy: null, isolation: null, fallRisk: true },
    status: { code: "DNR", npo: false, devices: ["Foley"] },
    vitals_series: [
      { time: "08:00", sbp: 102, dbp: 64, hr: 68, rr: 20, temp: 36.7, spo2: 94, pain: 1 },
      { time: "09:00", sbp: 98, dbp: 62, hr: 70, rr: 22, temp: 36.8, spo2: 93, pain: 1 },
      { time: "10:10", sbp: 100, dbp: 63, hr: 69, rr: 21, temp: 36.7, spo2: 94, pain: 1 }
    ],
    labs_latest: [
      { test: "BNP", value: 1250, unit: "pg/mL", flag: "H", ref: "<100", ts: "2026-02-02T10:00" },
      { test: "Creatinine", value: 1.8, unit: "mg/dL", flag: "H", ref: "0.6-1.2", ts: "2026-02-02T10:00" },
      { test: "Potassium", value: 4.8, unit: "mEq/L", flag: "N", ref: "3.5-5.0", ts: "2026-02-02T10:00" }
    ],
    labs_series: {
      "BNP": [
        { ts: "2026-02-01T08:00", value: 1380 },
        { ts: "2026-02-02T10:00", value: 1250 }
      ],
      "Creatinine": [
        { ts: "2026-02-01T08:00", value: 1.9 },
        { ts: "2026-02-02T10:00", value: 1.8 }
      ]
    },
    meds_active: [
      { name: "Furosemide", route: "IV", frequency: "BID", status: "scheduled" },
      { name: "Spironolactone", route: "PO", frequency: "QD", status: "scheduled" },
      { name: "Metformin", route: "PO", frequency: "BID", status: "scheduled" }
    ],
    mar_recent: [
      { time: "08:00", med: "Furosemide", dose: "40mg", route: "IV", status: "given" },
      { time: "08:00", med: "Metformin", dose: "500mg", route: "PO", status: "given" }
    ],
    mar_events: [
      { time: "08:00", med: "Furosemide", dose: "40mg", route: "IV", status: "given" },
      { time: "08:00", med: "Metformin", dose: "500mg", route: "PO", status: "given" },
      { time: "08:00", med: "Spironolactone", dose: "25mg", route: "PO", status: "given" },
      { time: "14:00", med: "Furosemide", dose: "40mg", route: "IV", status: "scheduled" },
      { time: "18:00", med: "Metformin", dose: "500mg", route: "PO", status: "scheduled" }
    ]
  },
  E3001: {
    patient: { name: "정수현", sex: "F", age: 45, mrn: "I00111" },
    encounter: { ward: "GS", room: "411", bed: "B", admitAt: "2026-02-01" },
    problemList: ["Post-op appendectomy (POD#1)", "Pain control"],
    alerts: { allergy: null, isolation: null, fallRisk: false },
    status: { code: "Full", npo: false, devices: ["JP Drain"] },
    vitals_series: [
      { time: "07:00", sbp: 118, dbp: 72, hr: 82, rr: 16, temp: 37.2, spo2: 98, pain: 4 },
      { time: "08:00", sbp: 120, dbp: 74, hr: 80, rr: 16, temp: 37.1, spo2: 98, pain: 3 },
      { time: "08:50", sbp: 122, dbp: 75, hr: 78, rr: 16, temp: 37.0, spo2: 99, pain: 3 }
    ],
    labs_latest: [
      { test: "WBC", value: 11.2, unit: "K/µL", flag: "H", ref: "4-11", ts: "2026-02-02T08:00" },
      { test: "Hb", value: 12.8, unit: "g/dL", flag: "N", ref: "12-16", ts: "2026-02-02T08:00" },
      { test: "CRP", value: 3.5, unit: "mg/L", flag: "H", ref: "<1.0", ts: "2026-02-02T08:00" }
    ],
    labs_series: {
      "WBC": [
        { ts: "2026-02-02T06:00", value: 11.8 },
        { ts: "2026-02-02T08:00", value: 11.2 }
      ],
      "CRP": [
        { ts: "2026-02-02T06:00", value: 4.2 },
        { ts: "2026-02-02T08:00", value: 3.5 }
      ]
    },
    meds_active: [
      { name: "Cefazolin", route: "IV", frequency: "q8h", status: "scheduled" },
      { name: "Ketorolac", route: "IV", frequency: "q6h", status: "scheduled" }
    ],
    mar_recent: [
      { time: "08:00", med: "Cefazolin", dose: "1g", route: "IV", status: "given" },
      { time: "08:00", med: "Ketorolac", dose: "30mg", route: "IV", status: "given" }
    ],
    mar_events: [
      { time: "08:00", med: "Cefazolin", dose: "1g", route: "IV", status: "given" },
      { time: "08:00", med: "Ketorolac", dose: "30mg", route: "IV", status: "given" },
      { time: "14:00", med: "Ketorolac", dose: "30mg", route: "IV", status: "scheduled" },
      { time: "16:00", med: "Cefazolin", dose: "1g", route: "IV", status: "scheduled" }
    ]
  },
  E3002: {
    patient: { name: "강동훈", sex: "M", age: 59, mrn: "I00112" },
    encounter: { ward: "ICU", room: "9", bed: "A", admitAt: "2026-01-31" },
    problemList: ["ARDS (severe)", "Mechanical ventilation", "Sepsis"],
    alerts: { allergy: "Latex", isolation: "Airborne", fallRisk: false },
    status: { code: "Full", npo: true, devices: ["ETT", "Foley", "A-Line", "Central Line"] },
    vitals_series: [
      { time: "09:00", sbp: 92, dbp: 58, hr: 115, rr: 28, temp: 38.8, spo2: 88, pain: 0 },
      { time: "10:00", sbp: 94, dbp: 60, hr: 110, rr: 26, temp: 38.5, spo2: 90, pain: 0 },
      { time: "10:25", sbp: 96, dbp: 62, hr: 108, rr: 25, temp: 38.3, spo2: 91, pain: 0 }
    ],
    labs_latest: [
      { test: "PaO2/FiO2", value: 120, unit: "", flag: "L", ref: ">200", ts: "2026-02-02T10:00" },
      { test: "Lactate", value: 4.2, unit: "mmol/L", flag: "H", ref: "0.5-2.2", ts: "2026-02-02T10:00" },
      { test: "WBC", value: 17.8, unit: "K/µL", flag: "H", ref: "4-11", ts: "2026-02-02T10:00" }
    ],
    labs_series: {
      "PaO2/FiO2": [
        { ts: "2026-02-02T08:00", value: 115 },
        { ts: "2026-02-02T09:00", value: 118 },
        { ts: "2026-02-02T10:00", value: 120 }
      ],
      "Lactate": [
        { ts: "2026-02-02T08:00", value: 4.8 },
        { ts: "2026-02-02T09:00", value: 4.5 },
        { ts: "2026-02-02T10:00", value: 4.2 }
      ],
      "WBC": [
        { ts: "2026-02-02T08:00", value: 18.2 },
        { ts: "2026-02-02T09:00", value: 18.0 },
        { ts: "2026-02-02T10:00", value: 17.8 }
      ]
    },
    meds_active: [
      { name: "Propofol", route: "IV", frequency: "continuous", status: "running" },
      { name: "Fentanyl", route: "IV", frequency: "continuous", status: "running" },
      { name: "Piperacillin-Tazobactam", route: "IV", frequency: "q6h", status: "scheduled" }
    ],
    mar_recent: [
      { time: "09:00", med: "Piperacillin-Tazobactam", dose: "4.5g", route: "IV", status: "given" },
      { time: "10:00", med: "Propofol", dose: "titrated", route: "IV", status: "running" }
    ],
    mar_events: [
      { time: "06:00", med: "Propofol", dose: "titrated", route: "IV", status: "given" },
      { time: "06:00", med: "Fentanyl", dose: "titrated", route: "IV", status: "given" },
      { time: "09:00", med: "Piperacillin-Tazobactam", dose: "4.5g", route: "IV", status: "given" },
      { time: "10:00", med: "Propofol", dose: "titrated", route: "IV", status: "running" },
      { time: "10:00", med: "Fentanyl", dose: "titrated", route: "IV", status: "running" },
      { time: "15:00", med: "Piperacillin-Tazobactam", dose: "4.5g", route: "IV", status: "scheduled" }
    ]
  }
};

// ===== SERVICE FUNCTIONS =====

/**
 * Get all centers
 */
export const getCenters = async (): Promise<Center[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return centers;
};

/**
 * Get inpatient list by center
 */
export const getInpatients = async (centerId?: string): Promise<InpatientListItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  if (centerId) {
    return inpatients.filter(ip => ip.centerId === centerId);
  }
  
  return inpatients;
};

/**
 * Get chart bundle by encounterId
 */
// ===== NOTES STORAGE =====

export interface DarNote {
  id: string;
  encounterId: string;
  author: string;
  timestamp: string;
  evidenceIds: string[];
  assessment: string;
  response: string;
}

const notesByEncounter: Record<string, DarNote[]> = {};

export const saveDarNote = async (encounterId: string, note: Omit<DarNote, 'id' | 'timestamp'>): Promise<DarNote> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const newNote: DarNote = {
    ...note,
    id: `note-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  
  if (!notesByEncounter[encounterId]) {
    notesByEncounter[encounterId] = [];
  }
  
  notesByEncounter[encounterId].unshift(newNote);
  return newNote;
};

export const getNotes = async (encounterId: string): Promise<DarNote[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return notesByEncounter[encounterId] || [];
};

// ===== CHART DATA RETRIEVAL =====

export const getChartBundle = async (encounterId: string): Promise<ChartBundle> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const bundle = chartBundles[encounterId];
  
  if (!bundle) {
    const availableKeys = Object.keys(chartBundles);
    throw new Error(
      `Chart bundle not found for encounterId: ${encounterId}. ` +
      `Available encounters: ${availableKeys.join(', ')}`
    );
  }
  
  return bundle;
};

/**
 * Legacy support for old patientId routes
 */
export const getChartData = async (patientId: string): Promise<ChartBundle> => {
  // Map old pt-001 style IDs to new encounter IDs
  const legacyMap: Record<string, string> = {
    'pt-001': 'E1001',
    'pt-002': 'E1002',
    'pt-003': 'E2001',
    'pt-004': 'E2002',
    'pt-005': 'E3001',
    'pt-006': 'E3002',
  };
  
  const encounterId = legacyMap[patientId];
  if (!encounterId) {
    const availableIds = Object.keys(legacyMap);
    throw new Error(
      `Invalid patientId: ${patientId}. ` +
      `Available legacy IDs: ${availableIds.join(', ')}`
    );
  }
  
  return getChartBundle(encounterId);
};

// Legacy functions for backward compatibility
export const getPatients = getInpatients;
export const getPatientById = async (patientId: string) => {
  const inpatient = inpatients.find(ip => ip.encounterId === patientId);
  return inpatient;
};

export default {
  getCenters,
  getInpatients,
  getChartBundle,
  getChartData,
  getPatients,
  getPatientById,
  saveDarNote,
  getNotes,
};
