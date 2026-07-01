import { useCallback, useEffect, useState } from 'react';
import { getDocumentsApi, uploadDocumentApi, deleteDocumentApi, submitForReviewApi } from '../api/providerDocuments.api';
import type { ProviderDocument } from '../types/providerService.type';

export function useDocuments(providerServiceId: string) {
    const [documents, setDocuments] = useState<ProviderDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDocumentsApi(providerServiceId);
            setDocuments(data);
        } catch {
            setError('No se pudieron cargar los documentos');
        } finally {
            setLoading(false);
        }
    }, [providerServiceId]);

    useEffect(() => { fetch(); }, [fetch]);

    async function handleUpload(file: { uri: string; name: string; type: string }, name?: string) {
        setUploading(true);
        setError(null);
        try {
            const doc = await uploadDocumentApi(providerServiceId, file, name);
            setDocuments((prev) => [doc, ...prev]);
        } catch (err: any) {
            const msg = err?.response?.data?.message ?? err?.message ?? 'Error desconocido';
            console.error('[uploadDocument]', msg, err);
            setError(`Error al subir el documento: ${msg}`);
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(docId: string) {
        try {
            await deleteDocumentApi(docId);
            setDocuments((prev) => prev.filter((d) => d.id !== docId));
        } catch {
            setError('Error al eliminar el documento');
        }
    }

    async function handleSubmitReview(): Promise<boolean> {
        setSubmitting(true);
        setError(null);
        try {
            await submitForReviewApi(providerServiceId);
            return true;
        } catch {
            setError('No se pudo enviar a revisión. Inténtalo de nuevo.');
            return false;
        } finally {
            setSubmitting(false);
        }
    }

    return { documents, loading, uploading, submitting, error, handleUpload, handleDelete, handleSubmitReview, refresh: fetch };
}
