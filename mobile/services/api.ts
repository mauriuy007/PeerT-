import { Platform } from 'react-native';

const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export interface AuthResponse {
  token: string;
  user: { id: number; email: string; name: string; lastName: string };
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? body.errors?.[0] ?? 'Error desconocido');
  return body as T;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, lastName: string, email: string, password: string) =>
    request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, lastName, email, password }),
    }),

  socialLogin: (provider: 'apple' | 'google', payload: {
    idToken: string;
    email?: string;
    name?: string;
    lastName?: string;
  }) =>
    request<AuthResponse>('/api/auth/social', {
      method: 'POST',
      body: JSON.stringify({ provider, ...payload }),
    }),
};
