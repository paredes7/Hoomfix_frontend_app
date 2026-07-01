import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { toggleAvailabilityApi, updateProviderProfileApi, updateProviderPhotoApi } from '../api/providerService.api';
import type { ProviderService, ProviderServiceProfile } from '../types/providerService.type';
import type { UpdateProviderProfileDto } from '../types/dto.types';

export function useProviderProfile(providerServiceId: string) {
    const [saving, setSaving] = useState(false);
    const [photoUploading, setPhotoUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleToggleAvailability(
        available: boolean,
        onSuccess?: (updated: ProviderService) => void,
    ) {
        setSaving(true);
        setError(null);
        try {
            const updated = await toggleAvailabilityApi(providerServiceId, available);
            onSuccess?.(updated);
        } catch {
            setError('Error al cambiar disponibilidad');
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveProfile(
        dto: UpdateProviderProfileDto,
        onSuccess?: (updated: ProviderServiceProfile) => void,
    ) {
        setSaving(true);
        setError(null);
        try {
            const updated = await updateProviderProfileApi(providerServiceId, dto);
            onSuccess?.(updated);
        } catch {
            setError('Error al actualizar el perfil');
        } finally {
            setSaving(false);
        }
    }

    async function handlePickAndUploadPhoto(onSuccess?: () => void) {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/*'],
            copyToCacheDirectory: true,
        });
        if (result.canceled) return;

        const asset = result.assets[0];
        const mimeType = asset.mimeType ?? 'image/jpeg';

        setPhotoUploading(true);
        setError(null);
        try {
            await updateProviderPhotoApi(providerServiceId, {
                uri: asset.uri,
                name: asset.name,
                type: mimeType,
            });
            onSuccess?.();
        } catch {
            setError('Error al subir la foto');
        } finally {
            setPhotoUploading(false);
        }
    }

    return { saving, photoUploading, error, handleToggleAvailability, handleSaveProfile, handlePickAndUploadPhoto };
}
