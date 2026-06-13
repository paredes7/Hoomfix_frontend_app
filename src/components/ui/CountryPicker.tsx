import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCountries } from '@/features/country/hooks/useCountries';
import type { Country } from '@/features/country/api/country.api';

// Derive flag emoji from ISO code (works on iOS/Android, not web)
function isoToFlag(iso: string): string {
  return iso
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

type Props = {
  value: string;
  onChange: (iso: string) => void;
  error?: string;
};

export function CountryPicker({ value, onChange, error }: Props) {
  const { countries, loading } = useCountries();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = countries.find((c) => c.iso === value);

  const filtered = search.trim()
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    : countries;

  function handleSelect(country: Country) {
    onChange(country.iso);
    setOpen(false);
    setSearch('');
  }

  return (
    <>
      <View className="mb-4">
        <Text className="text-[#0F172A] font-medium mb-1 text-sm">País</Text>

        <TouchableOpacity
          className={`flex-row items-center border rounded-xl px-4 py-3 bg-white ${error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'}`}
          onPress={() => setOpen(true)}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#64748B" />
          ) : selected ? (
            <Text className="flex-1 text-[#0F172A] text-base">
              {isoToFlag(selected.iso)}  {selected.name} ({selected.dialCode})
            </Text>
          ) : (
            <Text className="flex-1 text-[#CBD5E1] text-base">Selecciona tu país</Text>
          )}
          <Text className="text-[#64748B] text-sm">▾</Text>
        </TouchableOpacity>

        {error && (
          <Text className="text-[#EF4444] text-xs mt-1">{error}</Text>
        )}
      </View>

      <Modal visible={open} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-white pt-6 px-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-[#0F172A]">Selecciona tu país</Text>
            <TouchableOpacity onPress={() => { setOpen(false); setSearch(''); }}>
              <Text className="text-[#2563EB] font-semibold">Cerrar</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            className="border border-[#E2E8F0] rounded-xl px-4 py-3 mb-4 text-[#0F172A]"
            placeholder="Buscar país..."
            placeholderTextColor="#CBD5E1"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.iso}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`flex-row items-center py-3 border-b border-[#F1F5F9] ${item.iso === value ? 'bg-[#EFF6FF]' : ''}`}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <Text className="text-2xl mr-3">{isoToFlag(item.iso)}</Text>
                <View className="flex-1">
                  <Text className="text-[#0F172A] font-medium">{item.name}</Text>
                  <Text className="text-[#64748B] text-xs">{item.dialCode} · {item.currency}</Text>
                </View>
                {item.iso === value && (
                  <Text className="text-[#2563EB] font-bold">✓</Text>
                )}
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </>
  );
}
