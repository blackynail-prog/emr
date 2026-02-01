/**
 * authService.ts
 * Mock authentication service
 */

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

/**
 * Mock login - validates credentials
 */
export const login = async (username: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Demo credentials
  if (username === 'student' && password === 'demo123') {
    return {
      id: 'usr-001',
      username: 'student',
      name: 'Student User',
      role: 'student',
    };
  }

  return null;
};

/**
 * Mock logout
 */
export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  // In real app, would clear server session
};

/**
 * Check if user is authenticated (client-side)
 */
export const isAuthenticated = (): boolean => {
  // This will be checked on client side using localStorage
  return false;
};
