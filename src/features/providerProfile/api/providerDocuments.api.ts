import * as FileSystem from 'expo-file-system/legacy';
import apiClient from '@/api/client';
import { API_URL } from '@/config';
import { getAccessToken } from '@/storage/authStorage';
import type { ProviderDocument } from '../types/providerService.type';

// FUNCION API PARA SUBIR UN DOCUMENTO
export async function uploadDocumentApi(
    id: string,
    file: { uri: string; name: string; type: string },
    name?: string,
): Promise<ProviderDocument> {
    const token = await getAccessToken();

    const result = await FileSystem.uploadAsync(
        `${API_URL}/provider-service/${id}/documents`,
        file.uri,
        {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            mimeType: file.type,
            headers: { Authorization: `Bearer ${token ?? ''}` },
            parameters: name ? { name } : {},
        },
    );

    if (result.status < 200 || result.status >= 300) {
        let message = `HTTP ${result.status}`;
        try { message = JSON.parse(result.body)?.message ?? message; } catch {}
        throw new Error(message);
    }

    return JSON.parse(result.body) as ProviderDocument;
}

// FUNCION API PARA OBTENER DOCUMENTOS DE UNA ESPECIALIDAD
export async function getDocumentsApi(id: string): Promise<ProviderDocument[]> {
    const { data } = await apiClient.get<ProviderDocument[]>(`/provider-service/${id}/documents`);
    return data;
}

// FUNCION API PARA ELIMINAR UN DOCUMENTO
export async function deleteDocumentApi(docId: string): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(
        `/provider-service/documents/${docId}`,
    );
    return data;
}

// FUNCION API PARA ENVIAR DOCUMENTOS A REVISION
export async function submitForReviewApi(id: string): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>(
        `/provider-service/${id}/submit-review`,
    );
    return data;
}
