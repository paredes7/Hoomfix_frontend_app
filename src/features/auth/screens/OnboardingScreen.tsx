import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useOnboarding } from '@/features/auth/hooks/useOnboarding';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

export default function OnboardingScreen() {
  const router = useRouter();
  const { form, errors, loading, apiError, setField, handleComplete } = useOnboarding();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={{ backgroundColor: '#060F1E' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#060F1E' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-14 pb-10">
          <TouchableOpacity
            onPress={() => router.canGoBack() ? router.back() : router.replace('/(auth)/register')}
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#1E293B',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              alignSelf: 'flex-start',
            }}
          >
            <ArrowLeft size={20} color="#94A3B8" />
          </TouchableOpacity>

          <Logo tagline="Cuéntanos sobre ti" />

          <Text className="text-2xl font-bold text-[#060F1E] mb-2">Un último paso</Text>
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
