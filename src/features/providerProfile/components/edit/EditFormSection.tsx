import { View, Text } from 'react-native';

type Props = {
    title: string;
    children: React.ReactNode;
};

export function EditFormSection({ title, children }: Props) {
    return (
        <View className="mx-4 mt-4 bg-[#0D1B30] rounded-2xl overflow-hidden">
            <View className="px-4 py-3 border-b border-[#1E293B]">
                <Text className="text-[#94A3B8] text-xs font-semibold tracking-wide uppercase">
                    {title}
                </Text>
            </View>
            <View className="px-4 py-4 gap-4">
                {children}
            </View>
        </View>
    );
}
