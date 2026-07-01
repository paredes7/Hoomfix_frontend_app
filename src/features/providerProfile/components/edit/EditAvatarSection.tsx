import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'lucide-react-native';

type Props = {
    photoUrl?: string | null;
    name: string;
    serviceTypeName: string;
    uploading: boolean;
    onPickPhoto: () => void;
};

export function EditAvatarSection({ photoUrl, name, serviceTypeName, uploading, onPickPhoto }: Props) {
    const initials = name.slice(0, 2).toUpperCase();

    return (
        <View className="items-center py-6 bg-[#0D1B30] mx-4 mt-4 rounded-2xl">
            <TouchableOpacity onPress={onPickPhoto} activeOpacity={0.8} disabled={uploading}>
                <View className="relative">
                    <View className="w-24 h-24 rounded-full bg-[#1E3A5F] items-center justify-center border-[3px] border-[#060F1E] overflow-hidden">
                        {photoUrl ? (
                            <Image source={{ uri: photoUrl }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <Text className="text-white text-3xl font-bold">{initials}</Text>
                        )}
                    </View>

                    <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2563EB] items-center justify-center border-2 border-[#0D1B30]">
                        {uploading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Camera size={14} color="#fff" />
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            <Text className="text-white text-base font-bold mt-3">{name}</Text>
            <Text className="text-[#475569] text-xs mt-0.5">{serviceTypeName}</Text>
            <Text className="text-[#2563EB] text-xs mt-2">Toca para cambiar la foto</Text>
        </View>
    );
}
