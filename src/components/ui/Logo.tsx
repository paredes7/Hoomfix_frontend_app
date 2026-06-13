import { Text, View } from 'react-native';

type Props = {
  tagline?: string;
};

export function Logo({ tagline = 'Técnicos verificados en minutos' }: Props) {
  return (
    <View className="mb-8">
      <Text className="text-4xl font-bold">
        <Text className="text-[#2563EB]">Hoom</Text>
        <Text className="text-[#F97316]">fix</Text>
      </Text>
      {tagline && (
        <Text className="text-[#64748B] mt-1 text-sm">{tagline}</Text>
      )}
    </View>
  );
}
