/**
 * Worker 전용 인증 로직
 */

import { getAccessCode } from './kv-handler';

interface Env {
  AUTH_KV: KVNamespace;
  JWT_SECRET: string;
  PEPPER: string;
}

// SHA-256 해싱
async function hashCode(code: string, pepper: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + pepper);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 접속코드 검증
export async function verifyAccessCode(
  code: string, 
  env: Env
): Promise<{ hospital_id: string; hospital_name: string } | null> {
  const hash = await hashCode(code, env.PEPPER);
  const data = await getAccessCode(hash, env.AUTH_KV);
  
  if (!data) return null;
  
  return {
    hospital_id: data.hospital_id,
    hospital_name: data.hospital_name
  };
}

// Base64URL 인코딩 (JWT 표준) - UTF-8 안전
function base64UrlEncode(str: string): string {
  // UTF-8 → Uint8Array → Base64
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  
  return btoa(binaryString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64URL 디코딩 - UTF-8 안전
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  
  // Base64 → Uint8Array → UTF-8
  const binaryString = atob(base64);
  const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

// JWT 생성 (12시간 만료)
export async function generateJWT(
  payload: { hospital_id: string; hospital_name: string },
  env: Env
): Promise<{ token: string; expires_at: string }> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 43200; // 12시간
  
  const header = { alg: 'HS256', typ: 'JWT' };
  const claims = {
    hospital_id: payload.hospital_id,
    hospital_name: payload.hospital_name,
    iat: now,
    exp: exp
  };
  
  const encoder = new TextEncoder();
  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const claimsB64 = base64UrlEncode(JSON.stringify(claims));
  const signatureInput = `${headerB64}.${claimsB64}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(signatureInput)
  );
  
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureB64 = base64UrlEncode(String.fromCharCode(...signatureArray));
  const token = `${signatureInput}.${signatureB64}`;
  
  return {
    token,
    expires_at: new Date(exp * 1000).toISOString()
  };
}

// JWT 검증
export async function verifyJWT(
  token: string, 
  env: Env
): Promise<{ hospital_id: string; hospital_name: string; exp: number } | null> {
  try {
    const [headerB64, claimsB64, signatureB64] = token.split('.');
    
    if (!headerB64 || !claimsB64 || !signatureB64) {
      return null;
    }
    
    // 서명 검증
    const encoder = new TextEncoder();
    const signatureInput = `${headerB64}.${claimsB64}`;
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(env.JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureStr = base64UrlDecode(signatureB64);
    const signatureBuffer = Uint8Array.from(signatureStr, c => c.charCodeAt(0));
    
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(signatureInput)
    );
    
    if (!valid) return null;
    
    // Claims 파싱
    const claims = JSON.parse(base64UrlDecode(claimsB64));
    
    // 만료 확인
    const now = Math.floor(Date.now() / 1000);
    if (claims.exp < now) return null;
    
    return {
      hospital_id: claims.hospital_id,
      hospital_name: claims.hospital_name,
      exp: claims.exp
    };
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
