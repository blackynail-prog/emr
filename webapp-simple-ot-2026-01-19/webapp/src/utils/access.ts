// src/utils/access.ts
// localStorage 기반 병원 접근 권한 관리

const ACCESS_PREFIX = 'access:';

/**
 * 병원 접근 권한 부여
 */
export function grantAccess(hospitalId: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(`${ACCESS_PREFIX}${hospitalId}`, 'true');
}

/**
 * 병원 접근 권한 확인
 */
export function hasAccess(hospitalId: string): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(`${ACCESS_PREFIX}${hospitalId}`) === 'true';
}

/**
 * 병원 접근 권한 제거
 */
export function revokeAccess(hospitalId: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(`${ACCESS_PREFIX}${hospitalId}`);
}

/**
 * 모든 접근 권한 제거
 */
export function revokeAllAccess(): void {
  if (typeof localStorage === 'undefined') return;
  
  // localStorage에서 access: 로 시작하는 모든 키 제거
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(ACCESS_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * 접근 가능한 병원 ID 목록 가져오기
 */
export function getAccessibleHospitals(): string[] {
  if (typeof localStorage === 'undefined') return [];
  
  const accessible: string[] = [];
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith(ACCESS_PREFIX) && localStorage.getItem(key) === 'true') {
      const hospitalId = key.replace(ACCESS_PREFIX, '');
      accessible.push(hospitalId);
    }
  });
  
  return accessible;
}
