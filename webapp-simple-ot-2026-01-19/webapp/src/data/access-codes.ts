// src/data/access-codes.ts
// 병원별 인증코드 관리
// 관리자가 쉽게 변경 가능하도록 분리

export interface HospitalAccessCode {
  hospitalId: string;
  hospitalName: string;
  code: string;
  description: string;
}

export const ACCESS_CODES: HospitalAccessCode[] = [
  {
    hospitalId: 'UJB',
    hospitalName: '가톨릭대학교 의정부성모병원',
    code: 'UJB2026',
    description: '2026년 1학기 실습'
  },
  {
    hospitalId: 'NHIS',
    hospitalName: '국민건강보험공단 일산병원',
    code: 'NHIS2026',
    description: '2026년 1학기 실습'
  },
  {
    hospitalId: 'KHU',
    hospitalName: '강동경희대병원',
    code: 'KHU2026',
    description: '2026년 1학기 실습'
  }
];

// 헬퍼 함수: 병원 ID로 코드 찾기
export function getAccessCode(hospitalId: string): string | null {
  const hospital = ACCESS_CODES.find(h => h.hospitalId === hospitalId);
  return hospital ? hospital.code : null;
}

// 헬퍼 함수: 코드 검증
export function validateAccessCode(hospitalId: string, inputCode: string): boolean {
  const correctCode = getAccessCode(hospitalId);
  if (!correctCode) return false;
  
  // 대소문자 구분 없이, 공백 제거 후 비교
  const normalizedInput = inputCode.trim().toUpperCase();
  const normalizedCorrect = correctCode.trim().toUpperCase();
  
  return normalizedInput === normalizedCorrect;
}

// 헬퍼 함수: 병원 정보 가져오기
export function getHospitalInfo(hospitalId: string): HospitalAccessCode | null {
  return ACCESS_CODES.find(h => h.hospitalId === hospitalId) || null;
}
