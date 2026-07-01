import { useEffect, useState } from 'react';
import { getServiceTypesApi } from '../api/serviceType.api';
import type { ServiceType } from '../types/providerService.type';

export function useServiceTypes() {
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServiceTypesApi()
            .then(setServiceTypes)
            .catch(() => setServiceTypes([]))
            .finally(() => setLoading(false));
    }, []);

    return { serviceTypes, loading };
}
