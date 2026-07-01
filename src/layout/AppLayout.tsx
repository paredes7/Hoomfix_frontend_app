import { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Briefcase, Clapperboard, Home, MessageCircle, Search, User } from 'lucide-react-native';

type Tab = 'inicio' | 'buscar' | 'trabajos' | 'notificaciones' | 'perfil';

type Props = {
  children: (activeTab: Tab) => React.ReactNode;
};

const TABS: { key: Tab; icon: typeof Home }[] = [
  { key: 'inicio',         icon: Home },
  { key: 'buscar',         icon: Clapperboard },
  { key: 'trabajos',       icon: Briefcase },
  { key: 'notificaciones', icon: Bell },
  { key: 'perfil',         icon: User },
];

export function AppLayout({ children }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');

  return (
    <View style={{ flex: 1, backgroundColor: '#060F1E' }}>
      <StatusBar barStyle="light-content" backgroundColor="#060F1E" />
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#060F1E' }}>

      <View className="flex-row items-center justify-between px-4 py-2.5 border-b border-[#1E293B]">
        <Text className="text-[#2563EB] text-[22px] font-extrabold tracking-tight">
          Hoomfix
        </Text>
        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-[38px] h-[38px] bg-[#1E293B] rounded-full items-center justify-center"
          >
            <Search size={24} color="#CBD5E1" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-[38px] h-[38px] bg-[#1E293B] rounded-full items-center justify-center"
          >
            <MessageCircle size={24} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row border-b border-[#1E293B]">
        {TABS.map(({ key, icon: Icon }) => {
          const active = activeTab === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveTab(key)}
              activeOpacity={0.7}
              className="flex-1 items-center py-3"
              style={{ borderBottomWidth: 3, borderBottomColor: active ? '#2563EB' : 'transparent' }}
            >
              <Icon size={26} color={active ? '#2563EB' : '#475569'} />
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-1">
        {children(activeTab)}
      </View>
    </SafeAreaView>
    </View>
  );
}
