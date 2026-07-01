import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { ServiceStatusBadge } from './ServiceStatusBadge';
import type { ProviderService } from '../types/providerService.type';

type Props = {
    service: ProviderService;
    onPress: () => void;
};

export function ServiceListItem({ service, onPress }: Props) {
    const photo = service.profile?.servicePhoto;
    const name = service.profile?.commercialName ?? service.serviceType.name;
    const initials = name.slice(0, 2).toUpperCase();

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-3 gap-3"
        >
            <View className="w-12 h-12 rounded-full bg-[#1E3A5F] items-center justify-center overflow-hidden">
                {photo ? (
                    <Image source={{ uri: photo }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <Text className="text-white text-base font-bold">{initials}</Text>
                )}
            </View>

            <View className="flex-1">
                <Text className="text-white text-sm font-semibold">{name}</Text>
                <Text className="text-[#475569] text-xs mt-0.5">{service.serviceType.name} · {service.country.name}</Text>
            </View>

            <View className="flex-row items-center gap-2">
                <ServiceStatusBadge status={service.status} />
                <ChevronRight size={16} color="#475569" />
            </View>
        </TouchableOpacity>
    );
}
