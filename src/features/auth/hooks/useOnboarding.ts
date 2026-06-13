import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { completeProfileApi } from '@/api/auth';

type FormState = {
  firstName: string;
  lastName: string;
};

type Errors = Partial<FormState>;

export function useOnboarding() {
  const router = useRouter();
  const { user, accessToken, setSession } = useAuth();

  const [form, setForm] = useState<FormState>({ firstName: '', lastName: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError(null);
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Ingresa tu nombre';
    if (!form.lastName.trim()) newErrors.lastName = 'Ingresa tu apellido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleComplete() {
    if (!validate() || !user || !accessToken) return;
    setLoading(true);
    setApiError(null);
    try {
      await completeProfileApi({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      });
      await setSession(accessToken, { ...user, isOnboardingComplete: true });
      router.replace('/(client)/home');
    } catch {
      setApiError('No se pudo guardar tu perfil. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return { form, errors, loading, apiError, setField, handleComplete };
}
