// src/data/simple-hospitals.ts
// 병원별 상세 안내 데이터

export interface HospitalDetail {
  id: string;
  name: string;
  description: string;
  
  // 오늘 꼭 확인
  todayChecklist: string[];
  
  // 상세 섹션
  sections: {
    schedule: {
      title: string;
      items: string[];
    };
    location: {
      title: string;
      items: string[];
    };
    dressCode: {
      title: string;
      items: string[];
    };
    warnings: {
      title: string;
      items: string[];
    };
    faq: {
      question: string;
      answer: string;
    }[];
  };
  
  // 문의 안내
  contact: {
    message: string;
    phone?: string;
    email?: string;
  };
}

export const HOSPITAL_DETAILS: Record<string, HospitalDetail> = {
  UJB: {
    id: 'UJB',
    name: '가톨릭대학교 의정부성모병원',
    description: '2026학년도 1학기 실습 안내',
    
    todayChecklist: [
      '✅ OT 일시: 2026.03.03 (월) 09:00',
      '✅ 장소: 본관 3층 간호교육실',
      '✅ 복장: 학교 지정 실습복 + 흰색 운동화',
      '✅ 준비물: 학생증, 실습 동의서, 필기구'
    ],
    
    sections: {
      schedule: {
        title: 'OT 일정 및 시간',
        items: [
          '날짜: 2026년 3월 3일 (월요일)',
          '시간: 09:00 ~ 12:00 (3시간)',
          '집합: 08:50까지 본관 1층 로비',
          '프로그램: 병원 소개 → 실습 안내 → 시설 투어 → Q&A'
        ]
      },
      location: {
        title: '출근 및 집합 장소',
        items: [
          '주소: 경기도 의정부시 천보로 271',
          '대중교통: 1호선 의정부역 2번 출구 → 버스 10분',
          '집합 장소: 본관 1층 중앙 로비',
          '이동: 직원 안내에 따라 3층 간호교육실로 이동'
        ]
      },
      dressCode: {
        title: '복장 및 준비물',
        items: [
          '학교 지정 실습복 착용 (깨끗한 상태)',
          '명찰 착용 (학년, 이름 명시)',
          '흰색 운동화 (굽 없는 신발)',
          '머리 단정 (긴 머리는 묶기)',
          '액세서리 최소화 (시계, 작은 귀걸이만 허용)'
        ]
      },
      warnings: {
        title: '유의사항 및 금지사항',
        items: [
          '⚠️ 시간 엄수 (지각 시 입장 제한)',
          '⚠️ 휴대폰 사용 금지 (실습 중)',
          '⚠️ 사진/동영상 촬영 절대 금지',
          '⚠️ 환자 개인정보 보호 엄수',
          '⚠️ 복장 미준수 시 실습 참여 제한'
        ]
      },
      faq: [
        {
          question: 'OT에 불참하면 어떻게 되나요?',
          answer: 'OT는 필수 참석 사항입니다. 불참 시 실습 참여가 제한될 수 있으니, 부득이한 사정이 있을 경우 반드시 사전에 산학협력처로 연락 바랍니다.'
        },
        {
          question: '주차는 가능한가요?',
          answer: '학생 주차는 원칙적으로 불가합니다. 대중교통 이용을 권장하며, 부득이한 경우 인근 공영주차장을 이용해주세요.'
        },
        {
          question: '실습 동의서를 깜빡했어요.',
          answer: 'OT 당일 현장에서 작성 가능하나, 가능한 한 사전에 출력하여 지참해주시기 바랍니다.'
        }
      ]
    },
    
    contact: {
      message: '추가 문의사항은 현장 OT에서 안내 예정입니다.',
      phone: '031-820-3114',
      email: 'nursing@cmcujb.or.kr'
    }
  },
  
  NHIS: {
    id: 'NHIS',
    name: '국민건강보험공단 일산병원',
    description: '2026학년도 1학기 실습 안내',
    
    todayChecklist: [
      '✅ OT 일시: 2026.03.04 (화) 14:00',
      '✅ 장소: 교육관 2층 대강당',
      '✅ 복장: 학교 지정 실습복 + 흰색 운동화',
      '✅ 준비물: 학생증, 실습 동의서, 필기구'
    ],
    
    sections: {
      schedule: {
        title: 'OT 일정 및 시간',
        items: [
          '날짜: 2026년 3월 4일 (화요일)',
          '시간: 14:00 ~ 17:00 (3시간)',
          '집합: 13:50까지 교육관 1층 로비',
          '프로그램: 병원 소개 → 실습 안내 → 시설 투어 → Q&A'
        ]
      },
      location: {
        title: '출근 및 집합 장소',
        items: [
          '주소: 경기도 고양시 일산동구 일산로 100',
          '대중교통: 3호선 마두역 1번 출구 → 도보 10분',
          '집합 장소: 교육관 1층 중앙 로비',
          '이동: 직원 안내에 따라 2층 대강당으로 이동'
        ]
      },
      dressCode: {
        title: '복장 및 준비물',
        items: [
          '학교 지정 실습복 착용 (깨끗한 상태)',
          '명찰 착용 (학년, 이름 명시)',
          '흰색 운동화 (굽 없는 신발)',
          '머리 단정 (긴 머리는 묶기)',
          '액세서리 최소화 (시계, 작은 귀걸이만 허용)'
        ]
      },
      warnings: {
        title: '유의사항 및 금지사항',
        items: [
          '⚠️ 시간 엄수 (지각 시 입장 제한)',
          '⚠️ 휴대폰 사용 금지 (실습 중)',
          '⚠️ 사진/동영상 촬영 절대 금지',
          '⚠️ 환자 개인정보 보호 엄수',
          '⚠️ 복장 미준수 시 실습 참여 제한'
        ]
      },
      faq: [
        {
          question: 'OT에 불참하면 어떻게 되나요?',
          answer: 'OT는 필수 참석 사항입니다. 불참 시 실습 참여가 제한될 수 있으니, 부득이한 사정이 있을 경우 반드시 사전에 산학협력처로 연락 바랍니다.'
        },
        {
          question: '주차는 가능한가요?',
          answer: '학생 주차는 원칙적으로 불가합니다. 대중교통 이용을 권장하며, 부득이한 경우 인근 공영주차장을 이용해주세요.'
        },
        {
          question: '실습비는 얼마인가요?',
          answer: '실습비는 학교에서 일괄 납부하며, 개인 부담은 없습니다.'
        }
      ]
    },
    
    contact: {
      message: '추가 문의사항은 현장 OT에서 안내 예정입니다.',
      phone: '031-900-0114',
      email: 'edu@nhimc.or.kr'
    }
  },
  
  KHU: {
    id: 'KHU',
    name: '강동경희대병원',
    description: '2026학년도 1학기 실습 안내',
    
    todayChecklist: [
      '✅ OT 일시: 2026.03.05 (수) 10:00',
      '✅ 장소: 별관 5층 세미나실',
      '✅ 복장: 학교 지정 실습복 + 흰색 운동화',
      '✅ 준비물: 학생증, 실습 동의서, 필기구'
    ],
    
    sections: {
      schedule: {
        title: 'OT 일정 및 시간',
        items: [
          '날짜: 2026년 3월 5일 (수요일)',
          '시간: 10:00 ~ 13:00 (3시간)',
          '집합: 09:50까지 본관 1층 안내데스크',
          '프로그램: 병원 소개 → 실습 안내 → 시설 투어 → Q&A'
        ]
      },
      location: {
        title: '출근 및 집합 장소',
        items: [
          '주소: 서울시 강동구 동남로 892',
          '대중교통: 5호선 둔촌동역 4번 출구 → 도보 5분',
          '집합 장소: 본관 1층 안내데스크 앞',
          '이동: 직원 안내에 따라 별관 5층 세미나실로 이동'
        ]
      },
      dressCode: {
        title: '복장 및 준비물',
        items: [
          '학교 지정 실습복 착용 (깨끗한 상태)',
          '명찰 착용 (학년, 이름 명시)',
          '흰색 운동화 (굽 없는 신발)',
          '머리 단정 (긴 머리는 묶기)',
          '액세서리 최소화 (시계, 작은 귀걸이만 허용)'
        ]
      },
      warnings: {
        title: '유의사항 및 금지사항',
        items: [
          '⚠️ 시간 엄수 (지각 시 입장 제한)',
          '⚠️ 휴대폰 사용 금지 (실습 중)',
          '⚠️ 사진/동영상 촬영 절대 금지',
          '⚠️ 환자 개인정보 보호 엄수',
          '⚠️ 복장 미준수 시 실습 참여 제한'
        ]
      },
      faq: [
        {
          question: 'OT에 불참하면 어떻게 되나요?',
          answer: 'OT는 필수 참석 사항입니다. 불참 시 실습 참여가 제한될 수 있으니, 부득이한 사정이 있을 경우 반드시 사전에 산학협력처로 연락 바랍니다.'
        },
        {
          question: '주차는 가능한가요?',
          answer: '학생 주차는 원칙적으로 불가합니다. 대중교통 이용을 권장하며, 부득이한 경우 인근 공영주차장을 이용해주세요.'
        },
        {
          question: '실습복은 언제까지 준비해야 하나요?',
          answer: 'OT 당일부터 실습복 착용이 필요하므로, 반드시 사전에 준비해주시기 바랍니다.'
        }
      ]
    },
    
    contact: {
      message: '추가 문의사항은 현장 OT에서 안내 예정입니다.',
      phone: '02-440-6114',
      email: 'nursing@khnmc.or.kr'
    }
  }
};

// 병원 정보 가져오기
export function getHospitalDetail(hospitalId: string): HospitalDetail | null {
  return HOSPITAL_DETAILS[hospitalId] || null;
}
