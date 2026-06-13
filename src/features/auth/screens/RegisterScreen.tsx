import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { CountryPicker } from '@/components/ui/CountryPicker';

export default function RegisterScreen() {
  const router = useRouter();
  const { form, errors, loading, apiError, usernameSuggestions, setField, handleRegister } =
    useRegister();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F8FAFC]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16 pb-10">
          <Logo tagline="Crea tu cuenta gratis" />

          <Text className="text-2xl font-bold text-[#0F172A] mb-2">Crear cuenta</Text>
          <Text className="text-[#64748B] mb-8">Accede a técnicos verificados 24/7</Text>

          <Input
            label="Email"
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChangeText={(v) => setField('email', v)}
            error={errors.email}
            keyboardType="email-address"
          />

          <Input
            label="Nombre de usuario"
            placeholder="@tunombre"
            value={form.username}
            onChangeText={(v) => setField('username', v)}
            error={errors.username}
          />

          {usernameSuggestions.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-4 -mt-2">
              <Text className="text-[#64748B] text-xs w-full">Prueba con:</Text>
              {usernameSuggestions.map((s) => (
                <Text
                  key={s}
                  className="text-[#2563EB] text-sm font-medium border border-[#2563EB] rounded-lg px-3 py-1"
                  onPress={() => setField('username', s)}
                >
                  {s}
                </Text>
              ))}
            </View>
          )}

          <CountryPicker
            value={form.countryIso}
            onChange={(iso) => setField('countryIso', iso)}
            error={errors.countryIso}
          />

          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChangeText={(v) => setField('password', v)}
            error={errors.password}
            isPassword
          />

          {apiError && (
            <Text className="text-[#EF4444] text-sm mb-4 text-center">{apiError}</Text>
          )}

          <Button label="Crear cuenta" onPress={handleRegister} loading={loading} />

          <View className="flex-row justify-center mt-6">
            <Text className="text-[#64748B]">¿Ya tienes cuenta? </Text>
            <Text
              className="text-[#2563EB] font-semibold"
              onPress={() => router.push('/(auth)/login')}
            >
              Inicia sesión
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
