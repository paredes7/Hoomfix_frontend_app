import { useCallback, useEffect, useState } from 'react';
import { getMyServicesApi } from '../api/providerService.api';
import type { ProviderService } from '../types/providerService.type';

export function useMyServices() {
    const [services, setServices] = useState<ProviderService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyServicesApi();
            setServices(data);
        } catch {
            setError('No se pudieron cargar tus especialidades');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { services, loading, error, refresh: fetch };
}
