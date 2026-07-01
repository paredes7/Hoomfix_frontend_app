import { Text, TouchableOpacity, View } from 'react-native';
import { Bell, ChevronRight, LogOut, Settings, Shield } from 'lucide-react-native';

type Props = {
  onLogout: () => void;
};

export function ProfileMenu({ onLogout }: Props) {
  const menuItems = [
    { icon: Settings, label: 'Configuración',  onPress: () => {} },
    { icon: Bell,     label: 'Notificaciones', onPress: () => {} },
    { icon: Shield,   label: 'Privacidad',     onPress: () => {} },
  ];

  return (
    <>
      <View className="bg-[#0D1B30] mx-4 rounded-2xl mb-3">
        {menuItems.map(({ icon: Icon, label, onPress }, i) => (
          <TouchableOpacity
            key={label}
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4"
            style={{ borderBottomWidth: i < menuItems.length - 1 ? 1 : 0, borderBottomColor: '#1E293B' }}
          >
            <Icon size={18} color="#475569" />
            <Text className="text-[#CBD5E1] text-[15px] flex-1 ml-3">{label}</Text>
            <ChevronRight size={16} color="#334155" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={onLogout}
        activeOpacity={0.7}
        className="flex-row items-center bg-[#0D1B30] mx-4 rounded-2xl px-4 py-4 mb-8"
      >
        <LogOut size={18} color="#EF4444" />
        <Text className="text-[#EF4444] text-[15px] ml-3 font-semibold">Cerrar sesión</Text>
      </TouchableOpacity>
    </>
  );
}
