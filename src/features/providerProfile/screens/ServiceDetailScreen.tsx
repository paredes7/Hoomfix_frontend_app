import { useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ServiceCoverPhoto } from '../components/profile/ServiceCoverPhoto';
import { ServiceAvatar } from '../components/profile/ServiceAvatar';
import { ServiceStats } from '../components/profile/ServiceStats';
import { ServiceStatusBadge } from '../components/shared/ServiceStatusBadge';
import { ServiceActionButtons } from '../components/profile/ServiceActionButtons';
import { AvailabilitySwitch } from '../components/profile/AvailabilitySwitch';
import { useProviderProfile } from '../hooks/useProviderProfile';
import { useMyServices } from '../hooks/useMyServices';

export default function ServiceDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { services, loading } = useMyServices();
    const service = services.find(s => s.id === id);
    const { loading: updating, handleToggleAvailability } = useProviderProfile(id);
    const [available, setAvailable] = useState(service?.available ?? false);

    if (loading) {
        return (
            <View className="flex-1 bg-[#060F1E] items-center justify-center">
                <ActivityIndicator color="#2563EB" />
            </View>
        );
    }

    if (!service) {
        return (
            <View className="flex-1 bg-[#060F1E] items-center justify-center px-8">
                <Text className="text-[#475569] text-sm text-center">Especialidad no encontrada</Text>
            </View>
        );
    }

    const name = service.profile?.commercialName ?? service.serviceType.name;

    async function onToggle(value: boolean) {
        setAvailable(value);
        await handleToggleAvailability(value);
    }

    return (
        <ScrollView className="flex-1 bg-[#060F1E]">
            <ServiceCoverPhoto />

            <View className="px-4 pb-4 bg-[#060F1E]">
                <View className="flex-row items-end justify-between -mt-10">
                    <ServiceAvatar
                        photoUrl={service.profile?.servicePhoto}
                        name={name}
                        onEdit={() => router.push(`/provider-service/${id}/edit` as any)}
                    />
                    <View className="mb-1">
                        <ServiceStatusBadge status={service.status} />
                    </View>
                </View>

                <Text className="text-white text-xl font-bold mt-3">{name}</Text>
                {service.profile?.bio && (
                    <Text className="text-[#475569] text-sm mt-1">{service.profile.bio}</Text>
                )}

                <ServiceStats
                    rating={service.rating}
                    totalRatings={service.totalRatings}
                    serviceTypeName={service.serviceType.name}
                    countryName={service.country.name}
                />

                {service.status === 'APPROVED' && (
                    <ServiceActionButtons
                        onManage={() => router.push(`/provider-service/${id}/documents` as any)}
                        onEdit={() => router.push(`/provider-service/${id}/edit` as any)}
                    />
                )}

                {service.status === 'PENDING' && (
                    <TouchableOpacity
                        onPress={() => router.push(`/provider-service/${id}/documents` as any)}
                        activeOpacity={0.8}
                        className="mt-3 bg-[#2563EB] rounded-xl px-4 py-3.5 items-center"
                    >
                        <Text className="text-white text-sm font-semibold">Verificar servicio</Text>
                    </TouchableOpacity>
                )}

                {service.status === 'REJECTED' && (
                    <View className="mt-3 bg-[#7F1D1D] rounded-xl px-4 py-3">
                        <Text className="text-[#EF4444] text-sm font-semibold">Postulación rechazada</Text>
                        <Text className="text-[#991B1B] text-xs mt-0.5">
                            Puedes volver a postularte con nuevos documentos.
                        </Text>
                    </View>
                )}
            </View>

            {service.status === 'APPROVED' && (
                <AvailabilitySwitch
                    available={available}
                    onChange={onToggle}
                    disabled={updating}
                />
            )}

            <View className="mx-4 rounded-2xl bg-[#0D1B30] overflow-hidden mb-6">
                <View className="px-4 py-3 border-b border-[#1E293B]">
                    <Text className="text-[#94A3B8] text-xs font-semibold tracking-wide uppercase">
                        Detalles
                    </Text>
                </View>
                <View className="px-4 py-3">
                    <Row label="Billetera" value={`${service.providerWallet?.currency ?? '—'} ${service.providerWallet?.balance.toFixed(2) ?? '0.00'}`} />
                    <Row label="Documentos" value={`${service.documents.length} subidos`} />
                    {service.profile?.experience != null && (
                        <Row label="Experiencia" value={`${service.profile.experience} años`} />
                    )}
                    {service.profile?.coverageRadius != null && (
                        <Row label="Radio de cobertura" value={`${service.profile.coverageRadius} km`} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between py-2">
            <Text className="text-[#475569] text-sm">{label}</Text>
            <Text className="text-[#CBD5E1] text-sm font-medium">{value}</Text>
        </View>
    );
}
