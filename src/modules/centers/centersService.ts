/**
 * centersService.ts
 * Mock centers service
 */

import type { Center } from './CenterSelectPage';

const mockCenters: Center[] = [
  {
    id: 'center-001',
    name: '서울여자간호대학교병원',
    location: '서울특별시 서대문구',
    bedCount: 500,
  },
  {
    id: 'center-002',
    name: '가톨릭대학교 의정부성모병원',
    location: '경기도 의정부시',
    bedCount: 800,
  },
  {
    id: 'center-003',
    name: '일산병원',
    location: '경기도 고양시',
    bedCount: 650,
  },
];

/**
 * Get all centers
 */
export const getCenters = async (): Promise<Center[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCenters;
};

/**
 * Get center by ID
 */
export const getCenterById = async (centerId: string): Promise<Center | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCenters.find((c) => c.id === centerId) || null;
};
