/**
 * KV 접근 추상화 레이어
 */

export interface AccessCodeData {
  hospital_id: string;
  hospital_name: string;
  hash: string;
}

export async function getAccessCode(
  hash: string, 
  kv: KVNamespace
): Promise<AccessCodeData | null> {
  // prefix 없이 직접 해시로 접근
  const data = await kv.get<AccessCodeData>(hash, 'json');
  return data;
}

export async function getRateLimitCount(
  ip: string, 
  kv: KVNamespace
): Promise<number> {
  const key = `ratelimit:${ip}`;
  const count = await kv.get(key);
  return count ? parseInt(count, 10) : 0;
}

export async function incrementRateLimit(
  ip: string, 
  kv: KVNamespace
): Promise<void> {
  const key = `ratelimit:${ip}`;
  const current = await getRateLimitCount(ip, kv);
  await kv.put(key, (current + 1).toString(), { expirationTtl: 60 });
}
