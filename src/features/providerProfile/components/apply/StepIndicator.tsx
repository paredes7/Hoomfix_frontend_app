import { View, Text } from 'react-native';

type Props = {
    current: number;
    total: number;
};

export function StepIndicator({ current, total }: Props) {
    return (
        <View className="flex-row items-center justify-center gap-2 py-4">
            {Array.from({ length: total }, (_, i) => {
                const step = i + 1;
                const done = step < current;
                const active = step === current;

                return (
                    <View key={step} className="flex-row items-center">
                        {/* Círculo */}
                        <View
                            className={`w-8 h-8 rounded-full items-center justify-center
                                ${active ? 'bg-[#2563EB]' : done ? 'bg-[#1D4ED8]' : 'bg-[#1E293B]'}`}
                        >
                            {done ? (
                                <Text className="text-white text-xs font-bold">✓</Text>
                            ) : (
                                <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-[#475569]'}`}>
                                    {step}
                                </Text>
                            )}
                        </View>

                        {/* Línea entre pasos */}
                        {step < total && (
                            <View className={`w-10 h-0.5 mx-1 ${done ? 'bg-[#1D4ED8]' : 'bg-[#1E293B]'}`} />
                        )}
                    </View>
                );
            })}
        </View>
    );
}
