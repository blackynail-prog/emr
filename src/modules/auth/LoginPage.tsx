/**
 * LoginPage.tsx
 * EMR Login Page - Simple authentication for demo
 */

import { FC } from 'hono/jsx';

interface LoginPageProps {
  error?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EMR Login</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100">
        <div class="min-h-screen flex items-center justify-center">
          <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* Header */}
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold text-gray-900">EMR System</h1>
              <p class="text-gray-600 mt-2">Electronic Medical Records</p>
            </div>

            {/* Error Message */}
            {error && (
              <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form method="POST" action="/login">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              </div>

              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
              >
                Login
              </button>
            </form>

            {/* Demo Credentials */}
            <div class="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
              <p class="text-xs text-gray-600 font-semibold mb-2">Demo Credentials:</p>
              <p class="text-xs text-gray-700">Username: <code class="bg-white px-2 py-1 rounded">student</code></p>
              <p class="text-xs text-gray-700">Password: <code class="bg-white px-2 py-1 rounded">demo123</code></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
