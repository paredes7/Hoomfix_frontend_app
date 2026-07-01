import { useState } from 'react';
import { useRouter } from 'expo-router';
import { applyProviderApi } from '../api/providerService.api';
import type { ApplyProviderDto } from '../types/dto.types';

export function useApply() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleApply(dto: ApplyProviderDto) {
        setLoading(true);
        setError(null);
        try {
            const service = await applyProviderApi(dto);
            router.back();
            return service;
        } catch (e: any) {
            const msg = e?.response?.data?.message;
            setError(typeof msg === 'string' ? msg : 'Error al registrar la especialidad');
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, handleApply };
}
