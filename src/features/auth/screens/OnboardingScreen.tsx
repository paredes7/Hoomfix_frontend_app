import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useOnboarding } from '@/features/auth/hooks/useOnboarding';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

export default function OnboardingScreen() {
  const { form, errors, loading, apiError, setField, handleComplete } = useOnboarding();

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
          <Logo tagline="Cuéntanos sobre ti" />

          <Text className="text-2xl font-bold text-[#0F172A] mb-2">Un último paso</Text>
          <Text className="text-[#64748B] mb-8">
            Necesitamos tu nombre para personalizar tu experiencia
          </Text>

          <Input
            label="Nombre"
            placeholder="Ej: Juan"
            value={form.firstName}
            onChangeText={(v) => setField('firstName', v)}
            error={errors.firstName}
          />

          <Input
            label="Apellido"
            placeholder="Ej: Pérez"
            value={form.lastName}
            onChangeText={(v) => setField('lastName', v)}
            error={errors.lastName}
          />

          {apiError && (
            <Text className="text-[#EF4444] text-sm mb-4 text-center">{apiError}</Text>
          )}

          <Button label="Continuar" onPress={handleComplete} loading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
