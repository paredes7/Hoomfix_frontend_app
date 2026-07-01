import { View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'lucide-react-native';

type Props = {
    coverUrl?: string | null;
    onEdit?: () => void;
};

export function ServiceCoverPhoto({ coverUrl, onEdit }: Props) {
    return (
        <View className="h-[130px] bg-[#1E293B]">
            {coverUrl && (
                <Image source={{ uri: coverUrl }} className="w-full h-full" resizeMode="cover" />
            )}
            {onEdit && (
                <TouchableOpacity
                    onPress={onEdit}
                    activeOpacity={0.8}
                    className="absolute bottom-2 right-2 bg-[#1E293B] rounded-full p-2"
                >
                    <Camera size={16} color="#94A3B8" />
                </TouchableOpacity>
            )}
        </View>
    );
}
