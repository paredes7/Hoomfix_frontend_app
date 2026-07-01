import { Text, View } from 'react-native';

type Stat = { label: string; value: string };

type Props = {
  stats?: Stat[];
};

const DEFAULT_STATS: Stat[] = [
  { label: 'Solicitudes', value: '0' },
  { label: 'Completados', value: '0' },
  { label: 'Gasto',       value: 'Bs 0' },
];

export function ProfileStats({ stats = DEFAULT_STATS }: Props) {
  return (
    <View className="flex-row bg-[#0D1B30] mx-4 rounded-2xl mb-3 overflow-hidden">
      {stats.map((stat, i) => (
        <View
          key={stat.label}
          className="flex-1 items-center py-4"
          style={{ borderRightWidth: i < stats.length - 1 ? 1 : 0, borderRightColor: '#1E293B' }}
        >
          <Text className="text-white text-lg font-bold">{stat.value}</Text>
          <Text className="text-[#475569] text-xs mt-0.5">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
