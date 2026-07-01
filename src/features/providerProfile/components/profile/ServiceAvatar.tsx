import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'lucide-react-native';

type Props = {
    photoUrl?: string | null;
    name: string;
    onEdit?: () => void;
};

export function ServiceAvatar({ photoUrl, name, onEdit }: Props) {
    const initials = name.slice(0, 2).toUpperCase();

    return (
        <View className="relative w-20 h-20">
            <View className="w-20 h-20 rounded-full bg-[#1E3A5F] items-center justify-center border-[3px] border-[#060F1E] overflow-hidden">
                {photoUrl ? (
                    <Image source={{ uri: photoUrl }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <Text className="text-white text-2xl font-bold">{initials}</Text>
                )}
            </View>
            {onEdit && (
                <TouchableOpacity
                    onPress={onEdit}
                    activeOpacity={0.8}
                    className="absolute bottom-0 right-0 bg-[#1E293B] rounded-full p-1.5 border border-[#060F1E]"
                >
                    <Camera size={12} color="#94A3B8" />
                </TouchableOpacity>
            )}
        </View>
    );
}
