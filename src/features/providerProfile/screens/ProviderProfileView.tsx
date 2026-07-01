import { useState, useCallback } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { ChevronDown, Clock } from 'lucide-react-native';
import { ServiceCoverPhoto } from '../components/profile/ServiceCoverPhoto';
import { ServiceAvatar } from '../components/profile/ServiceAvatar';
import { ServiceStats } from '../components/profile/ServiceStats';
import { ServiceStatusBadge } from '../components/shared/ServiceStatusBadge';
import { ServiceActionButtons } from '../components/profile/ServiceActionButtons';
import { AvailabilitySwitch } from '../components/profile/AvailabilitySwitch';
import { ServiceSwitcherModal } from '../components/switcher/ServiceSwitcherModal';
import { useMyServices } from '../hooks/useMyServices';
import { useProviderProfile } from '../hooks/useProviderProfile';
import { useProfile } from '@/features/profile/hooks/useProfile';

type Props = {
    serviceId: string;
};

export function ProviderProfileView({ serviceId }: Props) {
    const router = useRouter();
    const { user, initials } = useProfile();
    const { services, loading, refresh } = useMyServices();
    const service = services.find(s => s.id === serviceId);
    const { saving: updating, handleToggleAvailability } = useProviderProfile(serviceId);
    const [available, setAvailable] = useState(service?.available ?? false);
    const [switcherOpen, setSwitcherOpen] = useState(false);

    useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

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
                <Text className="text-[#475569] text-sm text-center">Servicio no encontrado</Text>
            </View>
        );
    }

    const name = service.profile?.commercialName ?? service.serviceType.name;

    async function onToggle(value: boolean) {
        setAvailable(value);
        await handleToggleAvailability(value);
    }

    return (
        <>
            <ScrollView className="flex-1 bg-[#060F1E]">
                <ServiceCoverPhoto
                    coverUrl={null}
                    onEdit={service.status === 'APPROVED' ? () => router.push(`/provider-service/${serviceId}/edit` as any) : undefined}
                />

                <View className="px-4 pb-4 bg-[#060F1E]">
                    <View className="flex-row items-end justify-between -mt-10">
                        <ServiceAvatar
                            photoUrl={service.profile?.servicePhoto}
                            name={name}
                            onEdit={service.status === 'APPROVED' ? () => router.push(`/provider-service/${serviceId}/edit` as any) : undefined}
                        />
                        <View className="mb-1">
                            <ServiceStatusBadge status={service.status} />
                        </View>
                    </View>

                    <View className="flex-row items-center gap-2 mt-3">
                        <Text className="text-white text-xl font-bold">{name}</Text>
                        <TouchableOpacity
                            onPress={() => setSwitcherOpen(true)}
                            activeOpacity={0.7}
                            className="bg-[#1E293B] rounded-full p-1"
                        >
                            <ChevronDown size={16} color="#CBD5E1" />
                        </TouchableOpacity>
                    </View>

                    <Text className="text-[#475569] text-sm mt-0.5">{service.serviceType.name}</Text>

                    {service.profile?.bio && (
                        <Text className="text-[#94A3B8] text-sm mt-2">{service.profile.bio}</Text>
                    )}

                    <ServiceStats
                        rating={service.rating}
                        totalRatings={service.totalRatings}
                        serviceTypeName={service.serviceType.name}
                        countryName={service.country.name}
                    />

                    {service.status === 'APPROVED' && (
                        <ServiceActionButtons
                            onManage={() => router.push(`/provider-service/${serviceId}/documents` as any)}
                            onEdit={() => router.push(`/provider-service/${serviceId}/edit` as any)}
                        />
                    )}

                    {service.status === 'PENDING' && !service.submittedForReview && (
                        <TouchableOpacity
                            onPress={() => router.push(`/provider-service/${serviceId}/documents` as any)}
                            activeOpacity={0.8}
                            className="mt-3 bg-[#2563EB] rounded-xl px-4 py-3.5 items-center"
                        >
                            <Text className="text-white text-sm font-semibold">Verificar servicio</Text>
                        </TouchableOpacity>
                    )}

                    {service.status === 'PENDING' && service.submittedForReview && (
                        <View className="mt-3 bg-[#0D1B30] rounded-xl px-4 py-3.5 flex-row items-center gap-3">
                            <Clock size={18} color="#F59E0B" />
                            <View className="flex-1">
                                <Text className="text-[#F59E0B] text-sm font-semibold">En revisión</Text>
                                <Text className="text-[#475569] text-xs mt-0.5">Tu solicitud está siendo revisada (24–48 h)</Text>
                            </View>
                        </View>
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

            <ServiceSwitcherModal
                visible={switcherOpen}
                onClose={() => setSwitcherOpen(false)}
                username={user?.username ?? ''}
                initials={initials}
            />
        </>
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
