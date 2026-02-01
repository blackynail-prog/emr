// 병원 OT 데이터 타입 정의

export interface DownloadFile {
  title: string;
  type: 'pdf' | 'ppt' | 'image' | 'etc';
  url: string;
  note?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HospitalSections {
  checklist: string[];
  dressCode: string[];
  flow: string[];
  comm: string[];
  safety: string[];
  assignment: string[];
  faq: FAQItem[];
  downloads: DownloadFile[];
}

export interface HospitalData {
  name: string;
  slug: string;
  period?: string;
  location?: string;
  updatedAt: string;
  highlight: string;
  sections: HospitalSections;
}

export interface HospitalDataMap {
  [key: string]: HospitalData;
}
