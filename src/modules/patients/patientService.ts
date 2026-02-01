/**
 * patientService.ts
 * Mock patient service
 */

import type { Patient } from './PatientListPage';

const mockPatients: Patient[] = [
  {
    id: 'pt-001',
    mrn: '2024001',
    name: '김철수',
    age: 68,
    gender: 'M',
    room: '401A',
    diagnosis: 'Acute Myocardial Infarction',
    admissionDate: '2026-01-28',
  },
  {
    id: 'pt-002',
    mrn: '2024002',
    name: '이영희',
    age: 45,
    gender: 'F',
    room: '402B',
    diagnosis: 'Pneumonia',
    admissionDate: '2026-01-29',
  },
  {
    id: 'pt-003',
    mrn: '2024003',
    name: '박민수',
    age: 32,
    gender: 'M',
    room: '403A',
    diagnosis: 'Appendicitis (post-op)',
    admissionDate: '2026-01-30',
  },
  {
    id: 'pt-004',
    mrn: '2024004',
    name: '최순자',
    age: 72,
    gender: 'F',
    room: '404B',
    diagnosis: 'CHF Exacerbation',
    admissionDate: '2026-01-26',
  },
  {
    id: 'pt-005',
    mrn: '2024005',
    name: '정대한',
    age: 55,
    gender: 'M',
    room: '405A',
    diagnosis: 'Type 2 Diabetes',
    admissionDate: '2026-01-31',
  },
];

/**
 * Get all patients (optionally filtered by center)
 */
export const getPatients = async (centerId?: string): Promise<Patient[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  // In real app, would filter by center
  return mockPatients;
};

/**
 * Get patient by ID
 */
export const getPatientById = async (patientId: string): Promise<Patient | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockPatients.find((p) => p.id === patientId) || null;
};
