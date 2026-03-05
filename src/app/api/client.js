/**
 * ProfileX API client.
 * Set VITE_API_URL in .env to your backend base URL (e.g. http://localhost:8000).
 * Uses Bearer token (stored in localStorage) so auth works when frontend and backend are on different origins.
 */

const TOKEN_KEY = 'profilex_access_token';

const getBaseUrl = () => {
  const env = import.meta.env.VITE_API_URL;
  if (env && typeof env === 'string') return env.replace(/\/$/, '');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) return 'http://localhost:8000';
  // Production fallback when frontend and backend are separate (set VITE_API_URL in Vercel to override)
  return 'https://profilex-backend.onrender.com';
};

export const apiBase = getBaseUrl();

export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest(path, options = {}) {
  const url = `${apiBase}${path.startsWith('/') ? path : `/${path}`}`;
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  auth: {
    register: (body) => apiRequest('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => apiRequest('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    logout: () => apiRequest('/api/v1/auth/logout', { method: 'POST' }),
    refresh: () => apiRequest('/api/v1/auth/refresh', { method: 'POST', body: JSON.stringify({}) }),
  },
  vehicleCard: {
    create: (body) => apiRequest('/api/v1/vehicle-card', { method: 'POST', body: JSON.stringify(body) }),
    my: () => apiRequest('/api/v1/vehicle-card/my'),
    update: (id, body) => apiRequest(`/api/v1/vehicle-card/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id) => apiRequest(`/api/v1/vehicle-card/${id}`, { method: 'DELETE' }),
    download: (id) => apiRequest(`/api/v1/vehicle-card/download/${id}`),
  },
  businessCard: {
    create: (body) => apiRequest('/api/v1/business-card', { method: 'POST', body: JSON.stringify(body) }),
    my: () => apiRequest('/api/v1/business-card/my'),
    update: (id, body) => apiRequest(`/api/v1/business-card/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id) => apiRequest(`/api/v1/business-card/${id}`, { method: 'DELETE' }),
  },
  brandCard: {
    create: (body) => apiRequest('/api/v1/brand-card', { method: 'POST', body: JSON.stringify(body) }),
    my: () => apiRequest('/api/v1/brand-card/my'),
    update: (id, body) => apiRequest(`/api/v1/brand-card/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id) => apiRequest(`/api/v1/brand-card/${id}`, { method: 'DELETE' }),
  },
  analytics: {
    cards: () => apiRequest('/api/v1/analytics/cards'),
  },
};
