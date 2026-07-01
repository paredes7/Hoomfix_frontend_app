import { View, Text } from 'react-native';
import type { ProviderProfileStatus } from '../../types/enums.types';

type Props = {
    status: ProviderProfileStatus;
};

const config: Record<ProviderProfileStatus, { label: string; dot: string; text: string; bg: string }> = {
    PENDING:  { label: 'No verificado', dot: 'bg-[#F97316]', text: 'text-[#F97316]', bg: 'bg-[#431407]' },
    APPROVED: { label: 'Verificado',    dot: 'bg-[#22C55E]', text: 'text-[#22C55E]', bg: 'bg-[#14532D]' },
    REJECTED: { label: 'No verificado', dot: 'bg-[#EF4444]', text: 'text-[#EF4444]', bg: 'bg-[#7F1D1D]' },
};

export function ServiceStatusBadge({ status }: Props) {
    const { label, dot, text, bg } = config[status];

    return (
        <View className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
            <View className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            <Text className={`text-xs font-semibold ${text}`}>{label}</Text>
        </View>
    );
}
