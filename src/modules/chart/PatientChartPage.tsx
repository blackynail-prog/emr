/**
 * Patient Chart Detail Page
 * Main EMR chart view with tabs for different sections
 */

import { FC } from 'hono/jsx';
import type { ChartBundle } from '../api/mockEmrService';

interface PatientChartPageProps {
  chart: ChartBundle;
}

export const PatientChartPage: FC<PatientChartPageProps> = ({ chart }) => {
  const { patient, vitals, medications, labs, notes } = chart;

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{patient.name} - Chart - EMR System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          .tab-content { display: none; }
          .tab-content.active { display: block; }
          .tab-button.active { 
            border-bottom: 3px solid #2563eb; 
            color: #2563eb; 
            font-weight: 600;
          }
        `}</style>
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div class="px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <a href="/emr/patients" class="text-gray-600 hover:text-gray-900">
                <i class="fas fa-arrow-left"></i>
              </a>
              <i class="fas fa-hospital-user text-xl text-blue-600"></i>
              <h1 class="text-lg font-bold text-gray-900">Patient Chart</h1>
            </div>
            <a
              href="/emr/logout"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </div>
        </header>

        {/* Patient Banner - Sticky */}
        <div class="bg-blue-600 text-white px-4 py-3 sticky top-14 z-10 shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div>
                <h2 class="text-xl font-bold">{patient.name}</h2>
                <p class="text-sm opacity-90">
                  MRN: {patient.mrn} | {patient.age}y {patient.gender} | Room{' '}
                  {patient.room}
                </p>
              </div>
            </div>
            <div class="text-right text-sm">
              <p>Admitted: {patient.admissionDate}</p>
              <p class="opacity-90">{patient.code_status}</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div class="bg-white border-b border-gray-200 sticky top-28 z-10">
          <div class="flex overflow-x-auto px-4">
            <button
              class="tab-button active px-4 py-3 text-sm whitespace-nowrap border-b-3 transition-colors"
              onclick="switchTab('summary')"
            >
              Summary
            </button>
            <button
              class="tab-button px-4 py-3 text-sm whitespace-nowrap border-b-3 transition-colors text-gray-600"
              onclick="switchTab('vitals')"
            >
              Vitals
            </button>
            <button
              class="tab-button px-4 py-3 text-sm whitespace-nowrap border-b-3 transition-colors text-gray-600"
              onclick="switchTab('medications')"
            >
              Medications
            </button>
            <button
              class="tab-button px-4 py-3 text-sm whitespace-nowrap border-b-3 transition-colors text-gray-600"
              onclick="switchTab('labs')"
            >
              Labs
            </button>
            <button
              class="tab-button px-4 py-3 text-sm whitespace-nowrap border-b-3 transition-colors text-gray-600"
              onclick="switchTab('notes')"
            >
              Notes
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main class="p-4 max-w-7xl mx-auto">
          {/* Summary Tab */}
          <div id="summary" class="tab-content active">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Patient Info Card */}
              <div class="bg-white rounded-lg shadow p-4">
                <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                  <i class="fas fa-user-circle mr-2 text-blue-600"></i>
                  Patient Information
                </h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Name:</span>
                    <span class="font-medium">{patient.name}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">MRN:</span>
                    <span class="font-medium">{patient.mrn}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Age/Gender:</span>
                    <span class="font-medium">
                      {patient.age}y {patient.gender}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Room:</span>
                    <span class="font-medium">{patient.room}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Admission:</span>
                    <span class="font-medium">{patient.admissionDate}</span>
                  </div>
                </div>
              </div>

              {/* Allergies Card */}
              <div class="bg-white rounded-lg shadow p-4">
                <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                  <i class="fas fa-exclamation-triangle mr-2 text-red-600"></i>
                  Allergies
                </h3>
                {patient.allergies.length > 0 ? (
                  <ul class="space-y-2">
                    {patient.allergies.map((allergy) => (
                      <li class="text-sm bg-red-50 border border-red-200 rounded px-3 py-2 text-red-800">
                        {allergy}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p class="text-sm text-gray-500">No known allergies</p>
                )}
              </div>

              {/* Diagnosis Card */}
              <div class="bg-white rounded-lg shadow p-4">
                <h3 class="font-bold text-gray-900 mb-3 flex items-center">
                  <i class="fas fa-notes-medical mr-2 text-blue-600"></i>
                  Primary Diagnosis
                </h3>
                <p class="text-sm text-gray-700">{patient.diagnosis}</p>
                <div class="mt-3 pt-3 border-t border-gray-200">
                  <p class="text-xs text-gray-500 mb-2">Code Status:</p>
                  <span class="text-sm font-semibold text-gray-900">
                    {patient.code_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Latest Vitals */}
            <div class="bg-white rounded-lg shadow p-4 mt-4">
              <h3 class="font-bold text-gray-900 mb-3">Latest Vital Signs</h3>
              {vitals.length > 0 && (
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">Temperature</p>
                    <p class="text-lg font-semibold">
                      {vitals[0].temperature.toFixed(1)}°C
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Pulse</p>
                    <p class="text-lg font-semibold">{vitals[0].pulse} bpm</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">BP</p>
                    <p class="text-lg font-semibold">
                      {vitals[0].bloodPressureSystolic}/
                      {vitals[0].bloodPressureDiastolic}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">SpO2</p>
                    <p class="text-lg font-semibold">
                      {vitals[0].oxygenSaturation}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vitals Tab */}
          <div id="vitals" class="tab-content">
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Time
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Temp
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pulse
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      RR
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      BP
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      SpO2
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pain
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {vitals.map((vital) => {
                    const time = new Date(vital.timestamp).toLocaleTimeString(
                      'ko-KR',
                      { hour: '2-digit', minute: '2-digit' }
                    );
                    return (
                      <tr>
                        <td class="px-4 py-3 text-sm">{time}</td>
                        <td class="px-4 py-3 text-sm">
                          {vital.temperature.toFixed(1)}°C
                        </td>
                        <td class="px-4 py-3 text-sm">{vital.pulse}</td>
                        <td class="px-4 py-3 text-sm">
                          {vital.respiratoryRate}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {vital.bloodPressureSystolic}/
                          {vital.bloodPressureDiastolic}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {vital.oxygenSaturation}%
                        </td>
                        <td class="px-4 py-3 text-sm">{vital.painScore}/10</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Medications Tab */}
          <div id="medications" class="tab-content">
            <div class="space-y-3">
              {medications.map((med) => (
                <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900">{med.name}</h4>
                      <p class="text-sm text-gray-600 mt-1">
                        {med.dose} - {med.route} - {med.frequency}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        Prescribed by {med.prescribedBy} on {med.startDate}
                      </p>
                    </div>
                    <span
                      class={`px-2 py-1 text-xs font-semibold rounded ${
                        med.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Labs Tab */}
          <div id="labs" class="tab-content">
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Test
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Result
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Reference Range
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Flag
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {labs.map((lab) => {
                    const flagColors = {
                      high: 'text-red-600',
                      low: 'text-yellow-600',
                      normal: 'text-green-600',
                      critical: 'text-red-800 font-bold',
                    };
                    return (
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium">
                          {lab.test}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          {lab.result} {lab.unit}
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">
                          {lab.referenceRange}
                        </td>
                        <td class={`px-4 py-3 text-sm ${flagColors[lab.flag]}`}>
                          {lab.flag.toUpperCase()}
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">
                          {lab.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes Tab */}
          <div id="notes" class="tab-content">
            <div class="space-y-4">
              {notes.map((note) => {
                const typeColors = {
                  nurse: 'bg-blue-50 border-blue-200',
                  physician: 'bg-purple-50 border-purple-200',
                  progress: 'bg-green-50 border-green-200',
                };
                const typeIcons = {
                  nurse: 'fa-user-nurse',
                  physician: 'fa-user-md',
                  progress: 'fa-clipboard-list',
                };
                return (
                  <div
                    class={`bg-white rounded-lg shadow p-4 border-l-4 ${typeColors[note.type]}`}
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <i class={`fas ${typeIcons[note.type]} text-gray-600`}></i>
                        <span class="font-semibold text-sm text-gray-900">
                          {note.author}
                        </span>
                        <span class="text-xs text-gray-500">
                          ({note.type})
                        </span>
                      </div>
                      <span class="text-xs text-gray-500">{note.timestamp}</span>
                    </div>
                    <p class="text-sm text-gray-700 leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Tab Switching Script */}
        <script>{`
          function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
              content.classList.remove('active');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.tab-button').forEach(button => {
              button.classList.remove('active');
              button.classList.add('text-gray-600');
            });
            
            // Show selected tab content
            document.getElementById(tabName).classList.add('active');
            
            // Activate clicked button
            event.target.classList.add('active');
            event.target.classList.remove('text-gray-600');
          }
        `}</script>
      </body>
    </html>
  );
};
