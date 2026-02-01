/**
 * 간단한 인증 유틸리티
 * Cloudflare Workers 환경에서 쿠키 기반 인증 제공
 * + 프론트엔드용 localStorage 기반 토큰 관리
 */

import { Context } from 'hono';

const AUTH_COOKIE_NAME = 'hospital_auth';
const AUTH_EXPIRES_IN = 60 * 60 * 24 * 7; // 7일

// 프론트엔드 전용 상수
const TOKEN_STORAGE_KEY = 'auth_token';
const HOSPITAL_STORAGE_KEY = 'hospital_info';

export interface AuthPayload {
  hospitalSlug: string;
  hospitalName: string;
  accessCode: string;
  timestamp: number;
}

// 프론트엔드 전용 타입
export interface TokenData {
  token: string;
  hospital_id: string;
  hospital_name: string;
  expires_at: string;
}

export interface HospitalInfo {
  hospital_id: string;
  hospital_name: string;
  exp: number;
}

// ===== 프론트엔드 전용 함수 (localStorage 기반) =====

/**
 * 토큰 저장 (localStorage)
 */
export function setToken(tokenData: TokenData): void {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.setItem(TOKEN_STORAGE_KEY, tokenData.token);
  localStorage.setItem(HOSPITAL_STORAGE_KEY, JSON.stringify({
    hospital_id: tokenData.hospital_id,
    hospital_name: tokenData.hospital_name,
    expires_at: tokenData.expires_at
  }));
}

/**
 * 토큰 가져오기 (localStorage)
 */
export function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * 병원 정보 가져오기 (localStorage)
 */
export function getHospitalInfo(): HospitalInfo | null {
  if (typeof localStorage === 'undefined') return null;
  
  const data = localStorage.getItem(HOSPITAL_STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * 토큰 삭제 (localStorage)
 */
export function clearToken(): void {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(HOSPITAL_STORAGE_KEY);
}

/**
 * 토큰 만료 확인
 */
export function isTokenExpired(): boolean {
  const info = getHospitalInfo();
  if (!info) return true;
  
  const now = new Date().getTime();
  const expiresAt = new Date(info.expires_at).getTime();
  
  return now >= expiresAt;
}

/**
 * 인증된 fetch 요청 (자동으로 Bearer 토큰 추가)
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  // 만료 확인
  if (isTokenExpired()) {
    clearToken();
    throw new Error('Token expired');
  }
  
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  
  return fetch(url, {
    ...options,
    headers
  });
}

/**
 * 초기화 함수 (페이지 로드 시 호출)
 */
export function initAuth(): void {
  if (typeof window === 'undefined') return;
  
  // 만료된 토큰 자동 삭제
  if (isTokenExpired()) {
    clearToken();
  }
}

// ===== 서버 사이드 함수 (기존 유지) =====

/**
 * Base64 인코딩 (Cloudflare Workers 호환)
 */
function base64Encode(str: string): string {
  // TextEncoder를 사용하여 UTF-8 바이트로 변환
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  // 바이트 배열을 base64로 변환
  let binary = '';
  for (let i = 0; i < data.byteLength; i++) {
    binary += String.fromCharCode(data[i]);
  }
  
  // btoa 대신 수동 base64 인코딩
  const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let padding = '';
  
  for (let i = 0; i < binary.length; i += 3) {
    const byte1 = binary.charCodeAt(i);
    const byte2 = i + 1 < binary.length ? binary.charCodeAt(i + 1) : 0;
    const byte3 = i + 2 < binary.length ? binary.charCodeAt(i + 2) : 0;
    
    const encoded1 = byte1 >> 2;
    const encoded2 = ((byte1 & 3) << 4) | (byte2 >> 4);
    const encoded3 = ((byte2 & 15) << 2) | (byte3 >> 6);
    const encoded4 = byte3 & 63;
    
    result += base64chars[encoded1] + base64chars[encoded2];
    result += i + 1 < binary.length ? base64chars[encoded3] : '=';
    result += i + 2 < binary.length ? base64chars[encoded4] : '=';
  }
  
  return result;
}

/**
 * Base64 디코딩 (Cloudflare Workers 호환)
 */
function base64Decode(str: string): string {
  const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let binary = '';
  
  // 패딩 제거
  str = str.replace(/=/g, '');
  
  for (let i = 0; i < str.length; i += 4) {
    const encoded1 = base64chars.indexOf(str[i]);
    const encoded2 = base64chars.indexOf(str[i + 1]);
    const encoded3 = i + 2 < str.length ? base64chars.indexOf(str[i + 2]) : 0;
    const encoded4 = i + 3 < str.length ? base64chars.indexOf(str[i + 3]) : 0;
    
    const byte1 = (encoded1 << 2) | (encoded2 >> 4);
    const byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    const byte3 = ((encoded3 & 3) << 6) | encoded4;
    
    binary += String.fromCharCode(byte1);
    if (i + 2 < str.length) binary += String.fromCharCode(byte2);
    if (i + 3 < str.length) binary += String.fromCharCode(byte3);
  }
  
  // TextDecoder를 사용하여 UTF-8 문자열로 변환
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

/**
 * 인증 토큰 생성
 */
export async function createToken(payload: Omit<AuthPayload, 'timestamp'>): Promise<string> {
  const authData: AuthPayload = {
    ...payload,
    timestamp: Date.now()
  };
  
  const jsonString = JSON.stringify(authData);
  return base64Encode(jsonString);
}

/**
 * 인증 토큰 검증 및 디코딩
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const decoded = base64Decode(token);
    const authData: AuthPayload = JSON.parse(decoded);
    
    // 타임스탬프 검증 (7일 이내)
    const now = Date.now();
    const maxAge = AUTH_EXPIRES_IN * 1000;
    if (now - authData.timestamp > maxAge) {
      return null;
    }
    
    return authData;
  } catch (error) {
    return null;
  }
}

/**
 * 쿠키에서 인증 토큰 추출
 */
export function getTokenFromCookie(c: Context): string | null {
  const cookieHeader = c.req.header('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[AUTH_COOKIE_NAME] || null;
}

/**
 * 현재 로그인한 병원 정보 가져오기
 */
export async function getCurrentHospital(c: Context): Promise<AuthPayload | null> {
  const token = getTokenFromCookie(c);
  if (!token) return null;

  return await verifyToken(token);
}

/**
 * 인증 토큰을 쿠키에 설정하는 헤더 생성
 */
export function createAuthCookie(token: string): string {
  const maxAge = AUTH_EXPIRES_IN;
  return `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

/**
 * 로그아웃 쿠키 헤더 생성 (쿠키 삭제)
 */
export function createLogoutCookie(): string {
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/**
 * 인증 미들웨어
 * 특정 경로에 대한 접근 제한
 */
export async function authMiddleware(c: Context, requiredSlug?: string): Promise<Response | null> {
  const hospital = await getCurrentHospital(c);

  // 로그인하지 않은 경우
  if (!hospital) {
    return c.redirect('/login');
  }

  // 특정 병원 페이지 접근 제한
  if (requiredSlug && hospital.hospitalSlug !== requiredSlug) {
    // 다른 병원 페이지에 접근하려는 경우 자신의 병원 페이지로 리다이렉트
    return c.redirect(`/hospital/${hospital.hospitalSlug}`);
  }

  return null; // 인증 성공
}
