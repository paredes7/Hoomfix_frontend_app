import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useMyServices } from '../hooks/useMyServices';
import { ServiceListItem } from '../components/shared/ServiceListItem';
import { CreateServiceButton } from '../components/apply/CreateServiceButton';
import { useRouter } from 'expo-router';

export default function MyServicesScreen() {
    const { services, loading, error } = useMyServices();
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-[#060F1E]">
            <View className="px-4 pt-5 pb-2">
                <Text className="text-white text-xl font-bold">Mis servicios</Text>
                <Text className="text-[#475569] text-sm mt-0.5">Gestiona tus especialidades</Text>
            </View>

            <View className="mx-4 rounded-2xl bg-[#0D1B30] overflow-hidden mt-3">
                <View className="px-4 py-3 border-b border-[#1E293B]">
                    <Text className="text-[#94A3B8] text-xs font-semibold tracking-wide uppercase">
                        Tus especialidades
                    </Text>
                </View>

                {loading && (
                    <View className="py-8 items-center">
                        <ActivityIndicator color="#2563EB" />
                    </View>
                )}

                {!loading && error && (
                    <View className="py-8 items-center px-4">
                        <Text className="text-[#EF4444] text-sm text-center">{error}</Text>
                    </View>
                )}

                {!loading && !error && services.map((service, index) => (
                    <View key={service.id}>
                        {index > 0 && <View className="h-px bg-[#1E293B] mx-4" />}
                        <ServiceListItem
                            service={service}
                            onPress={() => router.push(`/provider-service/${service.id}` as any)}
                        />
                    </View>
                ))}

                {!loading && !error && services.length === 0 && (
                    <View className="py-8 items-center px-4">
                        <Text className="text-[#475569] text-sm text-center">
                            Aún no tienes especialidades registradas
                        </Text>
                    </View>
                )}

                <View className="h-px bg-[#1E293B] mx-4" />
                <CreateServiceButton onPress={() => router.push('/provider-service/apply' as any)} />
            </View>
        </ScrollView>
    );
}
