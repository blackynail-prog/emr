/**
 * EMR Login Page
 * Simple authentication for EMR system access
 */

import { FC } from 'hono/jsx';

interface EmrLoginPageProps {
  error?: string;
}

export const EmrLoginPage: FC<EmrLoginPageProps> = ({ error }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EMR System - Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center px-4">
          <div class="max-w-md w-full">
            {/* Header */}
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <i class="fas fa-hospital-user text-2xl text-white"></i>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                EMR System
              </h1>
              <p class="text-gray-600">
                Electronic Medical Records for Nursing Education
              </p>
            </div>

            {/* Login Form */}
            <div class="bg-white rounded-lg shadow-md p-8">
              <form method="POST" action="/emr/auth/login">
                {error && (
                  <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {error}
                  </div>
                )}

                {/* Username */}
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                  />
                </div>

                {/* Password */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              </form>

              {/* Demo Credentials */}
              <div class="mt-6 pt-6 border-t border-gray-200">
                <p class="text-xs text-gray-500 text-center mb-2">
                  Demo Credentials:
                </p>
                <div class="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                  <p><strong>Username:</strong> student</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p class="text-center text-sm text-gray-500 mt-6">
              © 2026 Nursing Education EMR System
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};
