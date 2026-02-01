/**
 * KV 초기화 스크립트
 * 접속코드 해시를 KV에 저장합니다
 */

const crypto = require('crypto');

// PEPPER 값 (실제로는 환경변수에서 읽어야 함)
const PEPPER = process.env.PEPPER || 'super-secret-pepper-12345-change-me';

// 접속코드 목록
const ACCESS_CODES = [
  { code: 'SWCN_CMC2026', hospital_id: 'uijeongbu', hospital_name: '가톨릭대학교 의정부성모병원' },
  { code: 'SWCN_NHIS2026', hospital_id: 'ilsan', hospital_name: '국민건강보험공단 일산병원' },
  { code: 'SWCN_KHUH2026', hospital_id: 'gangdong', hospital_name: '강동경희대병원' },
];

// SHA-256 해싱 함수
function hashCode(code, pepper) {
  return crypto.createHash('sha256').update(code + pepper).digest('hex');
}

// KV 데이터 생성
function generateKVData() {
  console.log('=== KV 초기화 데이터 생성 ===\n');
  console.log(`PEPPER: ${PEPPER}\n`);
  
  const kvData = [];
  
  for (const item of ACCESS_CODES) {
    const hash = hashCode(item.code, PEPPER);
    const value = JSON.stringify({
      hospital_id: item.hospital_id,
      hospital_name: item.hospital_name
    });
    
    kvData.push({ key: hash, value });
    
    console.log(`코드: ${item.code}`);
    console.log(`병원: ${item.hospital_name} (${item.hospital_id})`);
    console.log(`해시: ${hash}`);
    console.log(`값: ${value}`);
    console.log('---');
  }
  
  return kvData;
}

// Wrangler CLI 명령어 생성
function generateWranglerCommands(kvData) {
  console.log('\n=== Wrangler 명령어 (로컬 개발용) ===\n');
  
  for (const { key, value } of kvData) {
    // KV에 값 저장하는 명령어는 wrangler pages dev 실행 시 메모리에서만 작동
    // 프로덕션 배포 시에는 wrangler kv:key put 명령 사용
    console.log(`# 해시: ${key.substring(0, 16)}...`);
    console.log(`npx wrangler kv:key put --binding=AUTH_KV "${key}" '${value}' --preview`);
    console.log('');
  }
  
  console.log('\n=== 프로덕션 배포용 명령어 ===\n');
  console.log('# 1. KV 네임스페이스 생성');
  console.log('npx wrangler kv:namespace create AUTH_KV\n');
  
  console.log('# 2. wrangler.jsonc에 네임스페이스 ID 추가\n');
  
  console.log('# 3. 각 해시 값 저장');
  for (const { key, value } of kvData) {
    console.log(`npx wrangler kv:key put --namespace-id=<YOUR_NAMESPACE_ID> "${key}" '${value}'`);
  }
  
  console.log('\n# 4. 환경 변수 설정');
  console.log('npx wrangler pages secret put JWT_SECRET');
  console.log('npx wrangler pages secret put PEPPER');
  console.log('npx wrangler pages secret put ALLOWED_ORIGIN');
}

// 수동 테스트용 JSON 파일 생성
function generateTestFile(kvData) {
  const fs = require('fs');
  const testData = {
    pepper: PEPPER,
    codes: ACCESS_CODES.map((item, idx) => ({
      code: item.code,
      hospital_id: item.hospital_id,
      hospital_name: item.hospital_name,
      hash: kvData[idx].key
    }))
  };
  
  fs.writeFileSync('scripts/kv-test-data.json', JSON.stringify(testData, null, 2));
  console.log('\n✅ 테스트 데이터 저장: scripts/kv-test-data.json\n');
}

// 실행
const kvData = generateKVData();
generateWranglerCommands(kvData);
generateTestFile(kvData);

console.log('\n=== 다음 단계 ===');
console.log('1. 로컬 개발: wrangler pages dev가 실행 중일 때 위 명령어는 작동하지 않습니다.');
console.log('   로컬 개발 시에는 메모리 KV를 사용하며, 재시작 시 데이터가 초기화됩니다.');
console.log('2. 프로덕션 배포 전: 위의 프로덕션 명령어를 실행하여 KV에 데이터를 저장하세요.');
console.log('3. scripts/kv-test-data.json 파일을 확인하여 해시 값을 테스트하세요.\n');
