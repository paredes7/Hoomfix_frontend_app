import { View, Text, Switch } from 'react-native';

type Props = {
    available: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
};

export function AvailabilitySwitch({ available, onChange, disabled }: Props) {
    return (
        <View className="flex-row items-center justify-between px-4 py-3 bg-[#0D1B30] rounded-2xl mx-4 mb-3">
            <View>
                <Text className="text-white text-sm font-semibold">Disponible</Text>
                <Text className="text-[#475569] text-xs mt-0.5">
                    {available ? 'Visible para clientes' : 'No recibes trabajos ahora'}
                </Text>
            </View>
            <Switch
                value={available}
                onValueChange={onChange}
                disabled={disabled}
                trackColor={{ false: '#1E293B', true: '#1D4ED8' }}
                thumbColor={available ? '#2563EB' : '#475569'}
            />
        </View>
    );
}
