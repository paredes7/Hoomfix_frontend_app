import apiClient from '@/api/client';
import type { AuthResponse, GooglePendingResponse } from '../types/auth.types';

// FUNCION API PARA REGISTRAR USUARIOS CON EMAIL O TELÉFONO
export async function registerApi(payload: {
  email?: string;
  phone?: string;
  username: string;
  countryIso: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  return data;
}

// FUNCION API PARA COMPLETAR PERFIL
export async function completeProfileApi(payload: {
  firstName: string;
  lastName: string;
  phones?: string[];
}): Promise<AuthResponse['user']> {
  const { data } = await apiClient.put('/profile/complete', payload);
  return data;
}

// FUNCION API PARA COMPLETAR EL REGISTRO DE USUARIO GOOGLE
export async function completeGoogleRegistrationApi(payload: {
  tempToken: string;
  username: string;
  countryIso: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/google/complete', payload);
  return data;
}

// FUNCION API PARA INICIAR SESIÓN CON GOOGLE
export async function loginWithGoogleApi(
  idToken: string,
): Promise<AuthResponse | GooglePendingResponse> {
  const { data } = await apiClient.post<AuthResponse | GooglePendingResponse>(
    '/auth/google',
    { idToken },
  );
  return data;
}
