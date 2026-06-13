import apiClient from '@/api/client';
import type { AuthResponse } from '../types/auth.types';

export async function loginApi(payload: {
  identifier: string; // email, username o teléfono
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
}
