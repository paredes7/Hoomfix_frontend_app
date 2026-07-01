import * as FileSystem from 'expo-file-system/legacy';
import apiClient from '@/api/client';
import { API_URL } from '@/config';
import { getAccessToken } from '@/storage/authStorage';
import type { ProviderService, ProviderServiceProfile } from '../types/providerService.type';
import type { ApplyProviderDto, UpdateProviderProfileDto } from '../types/dto.types';

// FUNCION API PARA APLICAR A SER PROVEEDOR
export async function applyProviderApi(dto: ApplyProviderDto): Promise<ProviderService> {
    const { data } = await apiClient.post<ProviderService>('/provider-service/apply', dto);
    return data;
}

// FUNCION API PARA OBTENER MIS ESPECIALIDADES
export async function getMyServicesApi(): Promise<ProviderService[]> {
    const { data } = await apiClient.get<ProviderService[]>('/provider-service/my-services');
    return data;
}

// FUNCION API PARA OBTENER UNA ESPECIALIDAD POR ID
export async function getServiceByIdApi(id: string): Promise<ProviderService> {
    const { data } = await apiClient.get<ProviderService>(`/provider-service/${id}`);
    return data;
}

// FUNCION API PARA ACTIVAR O DESACTIVAR DISPONIBILIDAD
export async function toggleAvailabilityApi(id: string, available: boolean): Promise<ProviderService> {
    const { data } = await apiClient.patch<ProviderService>(
        `/provider-service/${id}/toggle-availability`,
        { available },
    );
    return data;
}

// FUNCION API PARA ACTUALIZAR PERFIL DE ESPECIALIDAD
export async function updateProviderProfileApi(id: string, dto: UpdateProviderProfileDto): Promise<ProviderServiceProfile> {
    const { data } = await apiClient.patch<ProviderServiceProfile>(
        `/provider-service/${id}/profile`,
        dto,
    );
    return data;
}

// FUNCION API PARA ACTUALIZAR FOTO DE ESPECIALIDAD
export async function updateProviderPhotoApi(id: string, file: { uri: string; name: string; type: string }): Promise<ProviderServiceProfile> {
    const token = await getAccessToken();

    const result = await FileSystem.uploadAsync(
        `${API_URL}/provider-service/${id}/photo`,
        file.uri,
        {
            httpMethod: 'PATCH',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            mimeType: file.type,
            headers: { Authorization: `Bearer ${token ?? ''}` },
        },
    );

    if (result.status < 200 || result.status >= 300) {
        let message = `HTTP ${result.status}`;
        try { message = JSON.parse(result.body)?.message ?? message; } catch {}
        throw new Error(message);
    }

    return JSON.parse(result.body) as ProviderServiceProfile;
}
