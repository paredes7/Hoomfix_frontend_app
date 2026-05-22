import apiClient from '../../../api/client';
import type { AuthResponse } from '../types';

export async function loginApi(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
  return data;
}

export async function registerClientApi(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function registerTechnicianApi(payload: {
  name: string;
  email?: string;
  phone: string;
  password: string;
  category: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register/technician', payload);
  return data;
}

export async function forgotPasswordApi(email: string) {
  const { data } = await apiClient.post('/auth/forgot-password', { email });
  return data;
}

export async function resetPasswordApi(payload: {
  email: string;
  code: string;
  newPassword: string;
}) {
  const { data } = await apiClient.post('/auth/reset-password', payload);
  return data;
}

export async function loginWithGoogleApi(idToken: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/google', { idToken });
  return data;
}
