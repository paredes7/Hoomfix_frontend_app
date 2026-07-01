import apiClient from '@/api/client';
import type { ServiceType } from '../types/providerService.type';

export async function getServiceTypesApi(): Promise<ServiceType[]> {
    const { data } = await apiClient.get<ServiceType[]>('/service-types');
    return data;
}
