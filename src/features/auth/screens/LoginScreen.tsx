import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Phone, User } from 'lucide-react-native';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

type LoginMethod = 'email' | 'phone' | 'username';

const METHODS: { key: LoginMethod; label: string; icon: typeof Mail }[] = [
  { key: 'email', label: 'Gmail', icon: Mail },
  { key: 'phone', label: 'Teléfono', icon: Phone },
  { key: 'username', label: 'Usuario', icon: User },
];

export default function LoginScreen() {
  const router = useRouter();
  const { form, errors, loading, apiError, setField, handleLogin } = useLogin();
  const [method, setMethod] = useState<LoginMethod>('email');

  const placeholders: Record<LoginMethod, string> = {
    email: 'ejemplo@gmail.com',
    phone: '+591 70000000',
    username: '@tunombre',
  };

  const keyboards: Record<LoginMethod, 'email-address' | 'phone-pad' | 'default'> = {
    email: 'email-address',
    phone: 'phone-pad',
    username: 'default',
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: '#0B1929' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#0B1929' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20 pb-10">
          <Logo />

          <Text className="text-sm text-[#475569] mb-6 text-center tracking-wide">
            Elige tu método de acceso
          </Text>

          <View className="flex-row bg-[#1E293B] rounded-2xl p-1 mb-6">
            {METHODS.map(({ key, label, icon: Icon }) => {
              const active = method === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setMethod(key)}
                  activeOpacity={0.8}
                  className={`flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl ${
                    active ? 'bg-[#2563EB]' : ''
                  }`}
                >
                  <Icon size={15} color={active ? '#fff' : '#475569'} />
                  <Text
                    className={`text-xs font-semibold ${active ? 'text-white' : 'text-[#475569]'}`}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Input
            label={method === 'email' ? 'Correo electrónico' : method === 'phone' ? 'Número de teléfono' : 'Nombre de usuario'}
            placeholder={placeholders[method]}
            value={form.identifier}
            onChangeText={(v) => setField('identifier', v)}
            error={errors.identifier}
            keyboardType={keyboards[method]}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChangeText={(v) => setField('password', v)}
            error={errors.password}
            isPassword
          />

          {apiError && (
            <Text className="text-[#EF4444] text-sm mb-4 text-center">{apiError}</Text>
          )}

          <Button label="Iniciar sesión" onPress={handleLogin} loading={loading} />

          <View className="flex-row justify-center mt-6">
            <Text className="text-[#64748B]">¿No tienes cuenta? </Text>
            <Text
              className="text-[#2563EB] font-semibold"
              onPress={() => router.push('/(auth)/register')}
            >
              Regístrate
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
