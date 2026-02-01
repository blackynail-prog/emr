/**
 * CenterSelectPage.tsx
 * Select hospital/center page
 */

import { FC } from 'hono/jsx';

export interface Center {
  id: string;
  name: string;
  location: string;
  bedCount: number;
}

interface CenterSelectPageProps {
  centers: Center[];
}

export const CenterSelectPage: FC<CenterSelectPageProps> = ({ centers }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Select Center - EMR</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100">
        {/* Header */}
        <div class="bg-white border-b">
          <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold text-gray-900">EMR System</h1>
            <a href="/logout" class="text-sm text-gray-600 hover:text-gray-900">
              Logout
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div class="max-w-5xl mx-auto px-4 py-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">병원 선택</h2>
            <p class="text-gray-600">진료를 확인할 병원을 선택하세요</p>
          </div>

          {/* Center Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center) => (
              <a
                href={`/patients?center=${center.id}`}
                class="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">
                    {center.name}
                  </h3>
                  <p class="text-sm text-gray-600 mb-3">{center.location}</p>
                  <div class="pt-3 border-t border-gray-100">
                    <span class="text-xs text-gray-500">병상수: </span>
                    <span class="text-sm font-semibold text-gray-900">
                      {center.bedCount}개
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
};
