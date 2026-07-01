import { View, Text, TouchableOpacity } from 'react-native';
import { Settings, Pencil } from 'lucide-react-native';

type Props = {
    onManage?: () => void;
    onEdit?: () => void;
};

export function ServiceActionButtons({ onManage, onEdit }: Props) {
    return (
        <View className="flex-row gap-2 mt-3">
            <TouchableOpacity
                onPress={onManage}
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center gap-2 bg-[#2563EB] rounded-lg py-2.5"
            >
                <Settings size={16} color="#fff" />
                <Text className="text-white text-sm font-semibold">Gestionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onEdit}
                activeOpacity={0.8}
                className="flex-1 flex-row items-center justify-center gap-2 bg-[#1E293B] rounded-lg py-2.5"
            >
                <Pencil size={16} color="#CBD5E1" />
                <Text className="text-[#CBD5E1] text-sm font-semibold">Editar perfil</Text>
            </TouchableOpacity>
        </View>
    );
}
