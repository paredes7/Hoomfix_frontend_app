import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Star, ChevronDown } from 'lucide-react-native';
import { ServiceSwitcherModal } from '@/features/providerProfile/components/switcher/ServiceSwitcherModal';

type Props = {
  fullName: string;
  username?: string;
  initials: string;
};

export function ProfileHeader({ fullName, username, initials }: Props) {
  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <>
      <View className="h-[120px] bg-[#1E293B]" />

      <View className="px-5 pb-5 bg-[#060F1E]">
        <View className="flex-row items-end justify-between -mt-10">
          <View className="w-20 h-20 rounded-full bg-[#2563EB] items-center justify-center border-[3px] border-[#060F1E]">
            <Text className="text-white text-[28px] font-bold">{initials}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#1E293B] rounded-lg px-4 py-2 mb-1"
          >
            <Text className="text-white text-sm font-semibold">Editar perfil</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2 mt-3">
          <Text className="text-white text-xl font-bold">{fullName}</Text>
          <TouchableOpacity
            onPress={() => setSwitcherOpen(true)}
            activeOpacity={0.7}
            className="bg-[#1E293B] rounded-full p-1"
          >
            <ChevronDown size={16} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {username && (
          <Text className="text-[#475569] text-sm mt-0.5">@{username}</Text>
        )}

        <View className="flex-row items-center gap-1.5 mt-1.5">
          <Star size={14} color="#F97316" fill="#F97316" />
          <Text className="text-[#F97316] text-sm font-semibold">4.8</Text>
          <Text className="text-[#334155] text-sm">·</Text>
          <Text className="text-[#475569] text-sm">Cliente</Text>
        </View>
      </View>

      <ServiceSwitcherModal
        visible={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        username={username ?? ''}
        initials={initials}
      />
    </>
  );
}
