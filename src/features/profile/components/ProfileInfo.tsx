import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, ChevronUp, Mail, MapPin, Phone, User } from 'lucide-react-native';
import { useInfo } from '@/features/profile/hooks/useInfo';

type Row = {
  icon: typeof Mail;
  label: string;
  value: string | null;
};

export function ProfileInfo() {
  const { email, username, phone, countryIso, isActive, pais } = useInfo();
  const [expanded, setExpanded] = useState(false);

  const rows: Row[] = [
    { icon: Mail,   label: 'Correo',   value: email },
    { icon: User,   label: 'Usuario',  value: username ? `@${username}` : null },
    { icon: Phone,  label: 'Telefono', value: phone },
    { icon: MapPin, label: 'Nombre del pais', value: pais },
  ];

  const visible = rows.filter(r => r.value);
  const shown = expanded ? visible : visible.slice(0, 2);

  return (
    <View className="mx-4 mb-3 rounded-2xl bg-[#0D1B30] overflow-hidden">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1E293B]">
        <Text className="text-[#94A3B8] text-sm font-semibold tracking-wide uppercase">
          Datos personales
        </Text>
        <View className={`flex-row items-center gap-1.5 px-2.5 py-1 rounded-full ${isActive ? 'bg-[#14532D]' : 'bg-[#7F1D1D]'}`}>
          <View className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
          <Text className={`text-xs font-semibold ${isActive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {isActive ? 'Activa' : 'Inactiva'}
          </Text>
        </View>
      </View>

      {shown.map(({ icon: Icon, label, value }) => (
        <View key={label} className="flex-row items-center px-4 py-2">
          <View className="w-8 h-8 rounded-xl bg-[#1E293B] items-center justify-center mr-3">
            <Icon size={15} color="#475569" />
          </View>
          <View className="flex-1">
            <Text className="text-[#CBD5E1] text-sm font-medium">{value}</Text>
          </View>
        </View>
      ))}

      {visible.length > 2 && (
        <TouchableOpacity
          onPress={() => setExpanded(v => !v)}
          activeOpacity={0.7}
          className="flex-row items-center gap-1.5 px-4 py-3"
        >
          {expanded ? <ChevronUp size={15} color="#2563EB" /> : <ChevronDown size={15} color="#2563EB" />}
          <Text className="text-[#2563EB] text-sm font-medium">
            {expanded ? 'Ver menos' : 'Ver mas detalles'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
