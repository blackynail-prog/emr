// src/utils/auth.ts
const TOKEN_KEY = "ot_token";
const HOSPITAL_KEY = "ot_hospital_id";

export function setAuth(token: string, hospitalId: string) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(HOSPITAL_KEY, hospitalId);
}

export function getToken() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getHospitalId() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(HOSPITAL_KEY);
}

export function clearAuth() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(HOSPITAL_KEY);
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  // GET/HEAD에는 Content-Type 강제하지 않음(Blob 다운로드에 방해될 수 있음)
  const method = (init.method || "GET").toUpperCase();
  const isBodyMethod = method !== "GET" && method !== "HEAD";
  if (isBodyMethod && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(input, { ...init, headers });
}
