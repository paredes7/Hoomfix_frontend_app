import { Image, Text, View } from 'react-native';

type Props = {
  tagline?: string;
};

export function Logo({ tagline = 'Técnicos verificados en minutos' }: Props) {
  return (
    <View className="mb-8 items-center">
      <Image
        source={{ uri: 'https://res.cloudinary.com/dcyx3nqj5/image/upload/v1781998732/ChatGPT_Image_20_jun_2026__19_35_40-removebg-preview_ba7t7j.png' }}
        style={{ width: 250, height: 100 }}
        resizeMode="contain"
      />
      {tagline && (
        <View className="flex-row items-center gap-2">
          <View className="h-[1px] w-8 bg-[#2563EB] opacity-60" />
          <Text className="text-[#94A3B8] text-xs text-center tracking-widest uppercase">
            {tagline}
          </Text>
          <View className="h-[1px] w-8 bg-[#F97316] opacity-60" />
        </View>
      )}
    </View>
  );
}
