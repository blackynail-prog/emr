/**
 * Select Center Page
 * Choose which hospital/center to access
 */

import { FC } from 'hono/jsx';
import type { Center } from '../api/mockEmrService';

interface SelectCenterPageProps {
  centers: Center[];
}

export const SelectCenterPage: FC<SelectCenterPageProps> = ({ centers }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Select Center - EMR System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body class="bg-gray-50">
        {/* Header */}
        <header class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <i class="fas fa-hospital-user text-2xl text-blue-600"></i>
              <h1 class="text-xl font-bold text-gray-900">EMR System</h1>
            </div>
            <a
              href="/emr/logout"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              <i class="fas fa-sign-out-alt mr-1"></i>
              Logout
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main class="max-w-4xl mx-auto px-4 py-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Select a Center
            </h2>
            <p class="text-gray-600">
              Choose the hospital or clinic to access patient records
            </p>
          </div>

          {/* Center Cards Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center) => (
              <a
                href={`/emr/patients?center=${center.id}`}
                class="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                {/* Icon */}
                <div class="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <i
                    class={`fas ${
                      center.type === 'hospital'
                        ? 'fa-hospital'
                        : 'fa-clinic-medical'
                    } text-2xl text-blue-600`}
                  ></i>
                </div>

                {/* Center Name */}
                <h3 class="text-lg font-bold text-gray-900 mb-2">
                  {center.name}
                </h3>

                {/* Location */}
                <p class="text-sm text-gray-600 mb-3 flex items-center">
                  <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                  {center.location}
                </p>

                {/* Stats */}
                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span class="text-xs text-gray-500">Bed Count</span>
                  <span class="text-sm font-semibold text-gray-900">
                    {center.bedCount}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
};
