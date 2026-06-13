import apiClient from '@/api/client';

export type Country = {
  iso: string;
  name: string;
  dialCode: string;
  currency: string;
};

export async function getCountriesApi(): Promise<Country[]> {
  const { data } = await apiClient.get<Country[]>('/countries');
  return data;
}
