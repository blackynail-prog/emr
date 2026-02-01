/**
 * SummaryPage.tsx
 * Patient Chart Summary Page
 * Shows: Patient info, Latest vitals, Abnormal labs, Active medications
 */

import { FC } from 'hono/jsx';
import { ChartLayout } from './ChartLayout';
import type { Patient } from '../patients/PatientListPage';

export interface ChartData {
  patient: Patient;
  vitals: {
    temp: string;
    bp: string;
    pulse: string;
    rr: string;
    spo2: string;
    recordedAt: string;
  };
  labs: Array<{
    name: string;
    value: string;
    unit: string;
    reference: string;
    abnormal: boolean;
  }>;
  medications: Array<{
    name: string;
    dose: string;
    route: string;
    frequency: string;
  }>;
  allergies: string[];
}

interface SummaryPageProps {
  chartData: ChartData;
}

export const SummaryPage: FC<SummaryPageProps> = ({ chartData }) => {
  const { patient, vitals, labs, medications, allergies } = chartData;

  const abnormalLabs = labs.filter((lab) => lab.abnormal);
  const latestVitals = {
    temp: vitals.temp,
    bp: vitals.bp,
    pulse: vitals.pulse,
    rr: vitals.rr,
    spo2: vitals.spo2,
    recordedAt: vitals.recordedAt,
  };
  const latestLabsQuick = abnormalLabs.slice(0, 5).map((lab) => ({
    name: lab.name,
    value: `${lab.value} ${lab.unit}`,
    abnormal: lab.abnormal,
  }));

  return (
    <ChartLayout
      patient={patient}
      activeTab="summary"
      latestVitals={latestVitals}
      latestLabs={latestLabsQuick}
      allergies={allergies}
      activeMedsCount={medications.length}
    >
      {/* Summary Content */}
      <div class="space-y-6">
        {/* Page Header */}
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Chart Summary</h2>
          <p class="text-sm text-gray-600 mt-1">환자 차트 요약</p>
        </div>

        {/* Patient Info Card */}
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-4">환자 정보</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">이름</p>
              <p class="font-semibold text-gray-900">{patient.name}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">등록번호</p>
              <p class="font-semibold text-gray-900">{patient.mrn}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">나이/성별</p>
              <p class="font-semibold text-gray-900">
                {patient.age}세 / {patient.gender === 'M' ? '남성' : '여성'}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600">병실</p>
              <p class="font-semibold text-gray-900">{patient.room}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-600">진단명</p>
              <p class="font-semibold text-gray-900">{patient.diagnosis}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">입원일</p>
              <p class="font-semibold text-gray-900">{patient.admissionDate}</p>
            </div>
          </div>
        </div>

        {/* Allergies Alert */}
        {allergies.length > 0 && (
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-red-600 font-bold">⚠️ ALLERGIES</span>
            </div>
            <ul class="list-disc list-inside text-sm text-red-800">
              {allergies.map((allergy) => (
                <li>{allergy}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Latest Vitals */}
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg text-gray-900">최근 활력징후</h3>
            <span class="text-xs text-gray-500">{vitals.recordedAt}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="border border-gray-200 rounded p-3">
              <p class="text-xs text-gray-600 mb-1">체온</p>
              <p class="text-xl font-bold text-gray-900">{vitals.temp}°C</p>
            </div>
            <div class="border border-gray-200 rounded p-3">
              <p class="text-xs text-gray-600 mb-1">혈압</p>
              <p class="text-xl font-bold text-gray-900">{vitals.bp}</p>
            </div>
            <div class="border border-gray-200 rounded p-3">
              <p class="text-xs text-gray-600 mb-1">맥박</p>
              <p class="text-xl font-bold text-gray-900">{vitals.pulse}</p>
            </div>
            <div class="border border-gray-200 rounded p-3">
              <p class="text-xs text-gray-600 mb-1">호흡</p>
              <p class="text-xl font-bold text-gray-900">{vitals.rr}</p>
            </div>
            <div class="border border-gray-200 rounded p-3">
              <p class="text-xs text-gray-600 mb-1">SpO2</p>
              <p class="text-xl font-bold text-gray-900">{vitals.spo2}</p>
            </div>
          </div>
        </div>

        {/* Abnormal Labs */}
        {abnormalLabs.length > 0 && (
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="font-bold text-lg text-gray-900 mb-4">
              이상 검사 결과 ({abnormalLabs.length})
            </h3>
            <div class="space-y-3">
              {abnormalLabs.map((lab) => (
                <div class="flex justify-between items-center border-l-4 border-red-500 bg-red-50 p-3 rounded">
                  <div>
                    <p class="font-semibold text-gray-900">{lab.name}</p>
                    <p class="text-xs text-gray-600">
                      참고범위: {lab.reference}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-red-600">
                      {lab.value} {lab.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Medications */}
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-4">
            활성 처방 ({medications.length})
          </h3>
          <div class="space-y-3">
            {medications.map((med) => (
              <div class="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
                <p class="font-semibold text-gray-900">{med.name}</p>
                <p class="text-sm text-gray-700 mt-1">
                  {med.dose} - {med.route} - {med.frequency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartLayout>
  );
};
