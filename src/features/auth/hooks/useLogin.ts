import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { loginApi } from '@/api/auth';

type FormState = {
  identifier: string;
  password: string;
};

type Errors = Partial<FormState>;

export function useLogin() {
  const router = useRouter();
  const { setSession } = useAuth();

  const [form, setForm] = useState<FormState>({ identifier: '', password: '' });
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
    if (!form.identifier.trim()) newErrors.identifier = 'Ingresa tu email, usuario o teléfono';
    if (!form.password.trim()) newErrors.password = 'Ingresa tu contraseña';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    try {
      const { access_token, user } = await loginApi({
        identifier: form.identifier.trim(),
        password: form.password,
      });
      await setSession(access_token, user);
      router.replace('/(client)/home');
    } catch {
      setApiError('Email, usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  }

  return { form, errors, loading, apiError, setField, handleLogin };
}
