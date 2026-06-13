import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

export default function LoginScreen() {
  const router = useRouter();
  const { form, errors, loading, apiError, setField, handleLogin } = useLogin();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F8FAFC]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20 pb-10">
          <Logo />

          <Text className="text-2xl font-bold text-[#0F172A] mb-2">Bienvenido</Text>
          <Text className="text-[#64748B] mb-8">Inicia sesión para continuar</Text>

          <Input
            label="Email, usuario o teléfono"
            placeholder="ejemplo@correo.com"
            value={form.identifier}
            onChangeText={(v) => setField('identifier', v)}
            error={errors.identifier}
            keyboardType="email-address"
          />

          <Input
            label="Contraseña"
            placeholder="••••••"
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
