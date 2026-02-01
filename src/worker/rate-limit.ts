/**
 * 레이트리밋 미들웨어
 */

import { getRateLimitCount, incrementRateLimit } from './kv-handler';

interface Env {
  AUTH_KV: KVNamespace;
}

const RATE_LIMIT = 5; // 분당 5회

export async function checkRateLimit(
  request: Request, 
  env: Env
): Promise<{ allowed: boolean; retry_after?: number }> {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  
  const count = await getRateLimitCount(ip, env.AUTH_KV);
  
  if (count >= RATE_LIMIT) {
    return {
      allowed: false,
      retry_after: 60
    };
  }
  
  await incrementRateLimit(ip, env.AUTH_KV);
  return { allowed: true };
}
