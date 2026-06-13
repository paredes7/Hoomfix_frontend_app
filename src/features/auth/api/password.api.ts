import apiClient from '@/api/client';

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
