/**
 * Patient Summary Page
 * Quick overview of patient status
 */

import { FC } from 'hono/jsx';
import type { ChartBundle } from '../api/mockEmrService';

interface PatientSummaryPageProps {
  chart: ChartBundle;
}

export const PatientSummaryPage: FC<PatientSummaryPageProps> = ({ chart }) => {
  const { patient, vitals, medications, labs, diagnoses, procedures } = chart;
  const latestVital = vitals[0];

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{patient.name} - Summary - EMR System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white border-b border-gray-200">
          <div class="px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <a
                href={`/emr/patients/${patient.id}`}
                class="text-gray-600 hover:text-gray-900"
              >
                <i class="fas fa-arrow-left"></i>
              </a>
              <i class="fas fa-hospital-user text-xl text-blue-600"></i>
              <h1 class="text-lg font-bold text-gray-900">Patient Summary</h1>
            </div>
          </div>
        </header>

        {/* Patient Banner */}
        <div class="bg-blue-600 text-white px-4 py-3">
          <h2 class="text-xl font-bold">{patient.name}</h2>
          <p class="text-sm opacity-90">
            MRN: {patient.mrn} | {patient.age}y {patient.gender} | Room{' '}
            {patient.room}
          </p>
        </div>

        {/* Main Content */}
        <main class="p-4 max-w-4xl mx-auto space-y-4">
          {/* Demographics */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">
              Patient Demographics
            </h3>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-600">Name:</span>
                <span class="ml-2 font-medium">{patient.name}</span>
              </div>
              <div>
                <span class="text-gray-600">MRN:</span>
                <span class="ml-2 font-medium">{patient.mrn}</span>
              </div>
              <div>
                <span class="text-gray-600">Age:</span>
                <span class="ml-2 font-medium">{patient.age} years</span>
              </div>
              <div>
                <span class="text-gray-600">Gender:</span>
                <span class="ml-2 font-medium">
                  {patient.gender === 'M' ? 'Male' : 'Female'}
                </span>
              </div>
              <div>
                <span class="text-gray-600">Room:</span>
                <span class="ml-2 font-medium">{patient.room}</span>
              </div>
              <div>
                <span class="text-gray-600">Admission:</span>
                <span class="ml-2 font-medium">{patient.admissionDate}</span>
              </div>
            </div>
          </div>

          {/* Allergies Alert */}
          {patient.allergies.length > 0 && (
            <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
                <h3 class="font-bold text-red-900">ALLERGIES</h3>
              </div>
              <ul class="list-disc list-inside text-sm text-red-800">
                {patient.allergies.map((allergy) => (
                  <li>{allergy}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Diagnoses */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">Diagnoses</h3>
            <ul class="space-y-2">
              {diagnoses.map((diagnosis, idx) => (
                <li class="flex items-start gap-2 text-sm">
                  <span class="font-semibold text-gray-600">{idx + 1}.</span>
                  <span class="text-gray-700">{diagnosis}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Vitals */}
          {latestVital && (
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-bold text-gray-900 mb-3 text-lg">
                Latest Vital Signs
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">Temperature</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.temperature.toFixed(1)}°C
                  </p>
                </div>
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">Heart Rate</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.pulse} bpm
                  </p>
                </div>
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">Respiratory Rate</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.respiratoryRate} /min
                  </p>
                </div>
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">Blood Pressure</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.bloodPressureSystolic}/
                    {latestVital.bloodPressureDiastolic}
                  </p>
                </div>
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">SpO2</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.oxygenSaturation}%
                  </p>
                </div>
                <div class="border border-gray-200 rounded p-3">
                  <p class="text-xs text-gray-500 mb-1">Pain Score</p>
                  <p class="text-xl font-bold text-gray-900">
                    {latestVital.painScore}/10
                  </p>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-3">
                Recorded:{' '}
                {new Date(latestVital.timestamp).toLocaleString('ko-KR')}
              </p>
            </div>
          )}

          {/* Active Medications */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">
              Active Medications
            </h3>
            <div class="space-y-3">
              {medications
                .filter((med) => med.status === 'active')
                .map((med) => (
                  <div class="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">
                    <p class="font-semibold text-gray-900">{med.name}</p>
                    <p class="text-sm text-gray-700 mt-1">
                      {med.dose} - {med.route} - {med.frequency}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      Prescribed by {med.prescribedBy}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Critical Labs */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">
              Critical Lab Results
            </h3>
            <div class="space-y-2">
              {labs
                .filter((lab) => lab.flag === 'critical' || lab.flag === 'high')
                .map((lab) => (
                  <div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
                    <div>
                      <p class="font-semibold text-gray-900">{lab.test}</p>
                      <p class="text-sm text-gray-600">
                        Reference: {lab.referenceRange}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-bold text-red-600">
                        {lab.result} {lab.unit}
                      </p>
                      <p class="text-xs text-red-600 uppercase">
                        {lab.flag}
                      </p>
                    </div>
                  </div>
                ))}
              {labs.filter(
                (lab) => lab.flag === 'critical' || lab.flag === 'high'
              ).length === 0 && (
                <p class="text-sm text-gray-500">No critical results</p>
              )}
            </div>
          </div>

          {/* Procedures */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">Procedures</h3>
            <ul class="space-y-2">
              {procedures.map((procedure) => (
                <li class="flex items-center gap-2 text-sm">
                  <i class="fas fa-check-circle text-green-600"></i>
                  <span class="text-gray-700">{procedure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Status */}
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="font-bold text-gray-900 mb-3 text-lg">Code Status</h3>
            <p class="text-lg font-semibold text-gray-900">
              {patient.code_status}
            </p>
          </div>

          {/* Action Buttons */}
          <div class="flex gap-3">
            <a
              href={`/emr/patients/${patient.id}`}
              class="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Full Chart
            </a>
            <a
              href="/emr/patients"
              class="flex-1 bg-gray-200 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Patient List
            </a>
          </div>
        </main>
      </body>
    </html>
  );
};
