import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const firstName = user?.profile?.firstName ?? user?.username ?? 'Usuario';

  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]">
      <View className="bg-[#2563EB] px-6 pt-14 pb-10">
        <Text className="text-blue-200 text-sm">Bienvenido a</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          Hoom<Text className="text-[#F97316]">fix</Text>
        </Text>
        <Text className="text-white text-xl font-semibold mt-4">
          Hola, {firstName} 👋
        </Text>
        <Text className="text-blue-200 mt-1">
          Tu cuenta está lista. Pronto podrás solicitar técnicos verificados.
        </Text>
      </View>

      <View className="px-6 mt-8">
        <View className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <Text className="text-[#0F172A] font-bold text-lg mb-1">Estamos construyendo algo increíble</Text>
          <Text className="text-[#64748B] text-sm leading-5">
            La app está en desarrollo. Muy pronto podrás solicitar técnicos de plomería,
            electricidad, cerrajería y más — en minutos.
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-6 border border-[#E2E8F0] mt-4">
          <Text className="text-[#0F172A] font-semibold mb-3">Tu cuenta</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-[#64748B] text-sm">Usuario</Text>
            <Text className="text-[#0F172A] text-sm font-medium">@{user?.username}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[#64748B] text-sm">Email</Text>
            <Text className="text-[#0F172A] text-sm font-medium">{user?.email ?? '—'}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="mx-6 mt-8 mb-10" onPress={logout}>
        <Text className="text-center text-[#64748B] text-sm">Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
