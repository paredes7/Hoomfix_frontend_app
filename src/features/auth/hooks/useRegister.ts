import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { registerApi } from '@/api/auth';

type FormState = {
  email: string;
  username: string;
  countryIso: string;
  password: string;
};

type Errors = Partial<FormState>;

export function useRegister() {
  const router = useRouter();
  const { setSession } = useAuth();

  const [form, setForm] = useState<FormState>({
    email: '',
    username: '',
    countryIso: 'BO',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError(null);
    if (field === 'username') setUsernameSuggestions([]);
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    if (!form.email.trim()) newErrors.email = 'Ingresa tu email';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.username.trim()) newErrors.username = 'Elige un nombre de usuario';
    if (!form.countryIso.trim()) newErrors.countryIso = 'Selecciona tu país';
    if (!form.password.trim()) newErrors.password = 'Ingresa una contraseña';
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    setUsernameSuggestions([]);
    try {
      const { access_token, user } = await registerApi({
        email: form.email.trim(),
        username: form.username.trim(),
        countryIso: form.countryIso,
        password: form.password,
      });
      await setSession(access_token, user);
      if (!user.isOnboardingComplete) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(client)/home');
      }
    } catch (e: unknown) {
      const res = (e as { response?: { data?: { message?: string; suggestions?: string[] } } })
        ?.response?.data;
      if (res?.suggestions?.length) {
        setUsernameSuggestions(res.suggestions);
        setErrors((prev) => ({ ...prev, username: 'El username ya está en uso' }));
      } else {
        setApiError(res?.message ?? 'No se pudo crear la cuenta');
      }
    } finally {
      setLoading(false);
    }
  }

  return { form, errors, loading, apiError, usernameSuggestions, setField, handleRegister };
}
