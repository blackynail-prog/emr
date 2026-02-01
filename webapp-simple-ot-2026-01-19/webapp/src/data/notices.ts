/**
 * 산학처 공지사항 데이터
 * 병원별 OT 데이터와 완전히 분리된 공통 공지
 */

export interface Notice {
  notice_id: string;
  title: string;
  department: string;
  content: string;
  created_at: string;
  view_count: number;
  original_link: string;
}

export const notices: Notice[] = [
  {
    notice_id: "2026-003",
    title: "2026-1학기 마스터플랜 공개 및 OT안내",
    department: "산학협력처",
    content: `
<div class="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
  <p class="text-gray-800 font-medium">
    <i class="fas fa-users text-blue-600 mr-2"></i>
    <strong>공지 대상:</strong> 2026년도 현장실습 대상자 (26년도 기준 3, 4학년)
  </p>
</div>

<p class="mb-6 text-gray-700 leading-relaxed">
  2026년도 1학기 마스터플랜 공개와 더불어 관련 안내드립니다.<br/>
  실습지 교환 안내, 전체 OT 일정, 고대구로병원 기관 OT 일정을 우선 공유드립니다.
</p>

<div class="mb-6 space-y-2">
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
    <p class="text-sm text-gray-800">
      <i class="fas fa-exclamation-circle text-yellow-600 mr-2"></i>
      <strong>고대구로병원</strong> OT일정: '3. 고대구로병원 기관 OT 일정'을 꼼꼼히 확인해주시기 바랍니다.
    </p>
  </div>
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
    <p class="text-sm text-gray-800">
      <i class="fas fa-file-alt text-yellow-600 mr-2"></i>
      <strong>이대목동병원</strong> 추가 서류 제출: 4번 확인 후 기한 내 제출바랍니다.
    </p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">1. 실습지 교환</h3>
<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
  <p class="text-lg font-bold text-red-700">
    <i class="far fa-calendar-alt mr-2"></i>
    2026. 1.16.(금) 오후 2시 30분 ~ 2026. 1.20.(화) 오전 10시
  </p>
</div>

<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">구분</th>
        <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">내용</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-3 font-medium text-gray-900">실습기관 변경 조건</td>
        <td class="border border-gray-300 px-4 py-3 text-gray-700">
          • 맞교환 대상 학생과 사전협의 후 쌍방향 변경요청의 경우에만 관리자 승인<br/>
          (상대학생이 변경허가 승인을 해주어야함)<br/>
          • 맞교환에 대한 협의가 되었더라도, 상대 학생이 포털에서 승인하지 않은 경우 변경불가<br/>
          • 변경하고자 하는 <strong>실습기관들의 면역서류가 모두 완료된 상태</strong>인 경우에만 승인
        </td>
      </tr>
      <tr>
        <td class="border border-gray-300 px-4 py-3 font-medium text-gray-900">변경 시 주의사항</td>
        <td class="border border-gray-300 px-4 py-3 text-gray-700">
          • 실습기관에서 요청하는 면역서류가 완료되지 않은 경우: 쌍방향 승인이 되어도 승인받지 못할 수 있음<br/>
          • <strong>서울아산병원, 삼성서울병원</strong> 배정의 경우 실습지 변경이 불가함<br/>
          • 실습지 변경은 개인 사유에 의한 경우, 대학에서 개별 변경해주지 않음<br/>
          • 실습지 배정에 대한 문의사항은 학생이 직접 진행
        </td>
      </tr>
      <tr>
        <td class="border border-gray-300 px-4 py-3 font-medium text-gray-900">학생이 신청하지<br/>않았는데 변경된 경우</td>
        <td class="border border-gray-300 px-4 py-3 text-gray-700">
          • 기관에서 배정 인원 축소를 요청한 경우<br/>
          • 실습지가 폐쇄되거나, 축소된 경우
        </td>
      </tr>
      <tr>
        <td class="border border-gray-300 px-4 py-3 font-medium text-gray-900">실습지 변경신청 방법</td>
        <td class="border border-gray-300 px-4 py-3 text-gray-700">
          ① 포털시스템 → 실습서비스 → 실습배정 조회 및 변경신청 메뉴에서 실습조회 및 변경신청 가능<br/>
          ② 변경하고자 하는 실습병원에서 신청서류를 클릭한 후 변경신청서 작성
        </td>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">2. 전체 OT 일정</h3>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">학년</th>
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">일시</th>
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">장소</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-3 text-center">3</td>
        <td class="border border-gray-300 px-4 py-3 text-center">2026. 2. 2.(일) 오후 1시 30분</td>
        <td class="border border-gray-300 px-4 py-3" rowspan="2">
          제 3 강의관 대강당
        </td>
      </tr>
      <tr>
        <td class="border border-gray-300 px-4 py-3 text-center">4</td>
        <td class="border border-gray-300 px-4 py-3 text-center">2026. 2. 2.(일) 오전 10시</td>
      </tr>
    </tbody>
  </table>
</div>

<p class="text-sm text-gray-600 mb-6">
  * 기관 학우스 OT 일정: <strong>2026. 1.20.(화) 마스터플랜 확정 시 공개 예정</strong><br/>
  (면역과수칙 확인 은으로, 기관에서 직접 진행하는 경우 제외입니다. 전체OT로 시작으로 진행될 예정입니다.)
</p>

<h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">3. 고대구로병원 기관 OT 일정</h3>
<div class="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
  <p class="font-bold text-red-700">
    <i class="fas fa-exclamation-triangle mr-2"></i>
    참고할 마감일시: 2026. 1.20.(화)
  </p>
</div>

<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">차시</th>
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">대상학생</th>
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">일시</th>
        <th class="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">장소</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 px-4 py-3 text-center">1</td>
        <td class="border border-gray-300 px-4 py-3 text-center">1~3회 배정학생</td>
        <td class="border border-gray-300 px-4 py-3 text-center">2026. 1.28.(수) 14:00 ~ 15:30</td>
        <td class="border border-gray-300 px-4 py-3" rowspan="2">
          고려대학교 구로병원<br/>
          새들뜸복합 대강당 (오프라인 오리엔테이션)<br/>
          * 사전 10분 전까지 도착
        </td>
      </tr>
      <tr>
        <td class="border border-gray-300 px-4 py-3 text-center">2</td>
        <td class="border border-gray-300 px-4 py-3 text-center">4~6회 배정학생</td>
        <td class="border border-gray-300 px-4 py-3 text-center">2026. 2. 4.(수) 14:00 ~ 15:30</td>
      </tr>
    </tbody>
  </table>
</div>

<p class="text-sm text-gray-600 mb-4">
  ① 고대구로병원 기관 학우스OT는 기관에서 날짜를 지정하여 진행됩니다.<br/>
  ② 각 차시에 교환된 인원을 배정에이하는 관계로, 인원된 나누어 배정하였습니다.<br/>
  ③ 공지된 일정에 참석이 불가한 경우 학교연락차 통해 일정 변경링크을 등록 바랍니다.
</p>

<h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">4. 추가 면역사항 학보 안내</h3>
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
  <p class="text-gray-800">
    <i class="fas fa-syringe text-yellow-600 mr-2"></i>
    이대목동병원 배정 학생은 <strong class="text-red-600">흉부 X-ray/혈 면역도</strong>, <strong class="text-red-600">결핵검사 답성서 시험에이합니다.</strong>
  </p>
</div>

<ul class="list-disc list-inside space-y-2 mb-6 text-gray-700 ml-4">
  <li>검사 출력: IGRA 또는 튜버큘린과 피부반응검사 중 1개 검사결과 제출 필요</li>
  <li>제출 마감: <strong class="text-red-600">2026. 1.30.(금)</strong></li>
</ul>

<h3 class="text-xl font-bold text-gray-900 mb-4 mt-8">5. 서약서 제출 세부사항 안내</h3>
<p class="text-gray-700 mb-4">
  마스터플랜 확정일(26. 1.20.(화))에 공지 예정
</p>

<div class="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
  <p class="text-sm text-gray-700">
    <i class="fas fa-download text-blue-600 mr-2"></i>
    <strong>첨부파일:</strong> 
    <a href="/2026-1-masterplan-ot.pdf" target="_blank" class="text-blue-600 hover:underline ml-2">
      2026_1 마스터플랜 공개 및 OT 안내_26.1.16_.pdf
    </a>
  </p>
</div>

<div class="mt-6">
  <h4 class="font-semibold text-gray-900 mb-2">문의처</h4>
  <p class="text-gray-700">
    <i class="fas fa-building text-blue-600 mr-2"></i>
    <strong>산학협력처</strong>
  </p>
  <p class="text-gray-700">
    <i class="fas fa-phone text-blue-600 mr-2"></i>
    전화: 02-2287-1775 / 1763
  </p>
  <p class="text-gray-700">
    <i class="fas fa-envelope text-blue-600 mr-2"></i>
    이메일: <a href="mailto:sanhak@snjc.ac.kr" class="text-blue-600 hover:underline">sanhak@snjc.ac.kr</a>
  </p>
</div>
    `,
    created_at: "2026.01.16 09:00",
    view_count: 0,
    original_link: "https://portal.snjc.ac.kr/main/?page=notice"
  }
];
