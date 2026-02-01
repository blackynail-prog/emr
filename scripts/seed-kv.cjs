/**
 * KV 데이터 초기화 스크립트 (로컬 개발용)
 * wrangler pages dev 실행 시 자동으로 KV에 데이터를 시딩합니다
 */

const testData = require('./kv-test-data.json');

async function seedKV(env) {
  console.log('🌱 KV 데이터 시딩 시작...');
  
  for (const item of testData.codes) {
    try {
      // 기존 데이터 확인
      const existing = await env.AUTH_KV.get(item.hash);
      if (existing) {
        console.log(`✓ 이미 존재: ${item.code} (${item.hospital_id})`);
        continue;
      }
      
      // 새 데이터 저장
      const value = JSON.stringify({
        hospital_id: item.hospital_id,
        hospital_name: item.hospital_name
      });
      
      await env.AUTH_KV.put(item.hash, value);
      console.log(`✓ 저장 완료: ${item.code} (${item.hospital_id})`);
    } catch (err) {
      console.error(`✗ 실패: ${item.code}`, err.message);
    }
  }
  
  console.log('🌱 KV 데이터 시딩 완료!\n');
}

module.exports = { seedKV };
