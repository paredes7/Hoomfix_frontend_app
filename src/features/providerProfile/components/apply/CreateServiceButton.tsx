import { TouchableOpacity, View, Text } from 'react-native';
import { Plus } from 'lucide-react-native';

type Props = {
    onPress: () => void;
};

export function CreateServiceButton({ onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-3 gap-3"
        >
            <View className="w-12 h-12 rounded-full bg-[#1E293B] items-center justify-center">
                <Plus size={22} color="#CBD5E1" />
            </View>
            <Text className="text-[#CBD5E1] text-sm font-semibold">Crear Servicio</Text>
        </TouchableOpacity>
    );
}
