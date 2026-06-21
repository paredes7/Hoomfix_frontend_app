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
import { ChevronDown, Search, X, Check } from 'lucide-react-native';
import { useCountries } from '@/features/country/hooks/useCountries';
import type { Country } from '@/features/country/api/country.api';

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
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search),
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
        <Text className="text-[#94A3B8] font-medium mb-1.5 text-sm tracking-wide">País</Text>

        <TouchableOpacity
          onPress={() => setOpen(true)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#1E293B',
            borderWidth: 1,
            borderColor: error ? '#EF4444' : '#1E3A5F',
            borderRadius: 12,
            paddingHorizontal: 16,
            minHeight: 52,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#475569" style={{ flex: 1 }} />
          ) : selected ? (
            <Text style={{ flex: 1, color: '#fff', fontSize: 15 }}>
              {isoToFlag(selected.iso)}  {selected.name}
              <Text style={{ color: '#475569' }}> · {selected.dialCode}</Text>
            </Text>
          ) : (
            <Text style={{ flex: 1, color: '#475569', fontSize: 15 }}>Selecciona tu país</Text>
          )}
          <ChevronDown size={18} color="#475569" />
        </TouchableOpacity>

        {error && (
          <Text className="text-[#EF4444] text-xs mt-1.5 ml-1">{error}</Text>
        )}
      </View>

      <Modal visible={open} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: '#0B1929', paddingTop: 24 }}>

          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>Selecciona tu país</Text>
            <TouchableOpacity
              onPress={() => { setOpen(false); setSearch(''); }}
              style={{ backgroundColor: '#1E293B', borderRadius: 20, padding: 6 }}
              activeOpacity={0.7}
            >
              <X size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Buscador */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#1E293B',
            borderWidth: 1,
            borderColor: '#1E3A5F',
            borderRadius: 12,
            marginHorizontal: 20,
            paddingHorizontal: 14,
            marginBottom: 16,
          }}>
            <Search size={16} color="#475569" />
            <TextInput
              style={{ flex: 1, color: '#fff', fontSize: 15, paddingVertical: 13, marginLeft: 10 }}
              placeholder="Buscar país o código..."
              placeholderTextColor="#475569"
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoFocus
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.7}>
                <X size={15} color="#475569" />
              </TouchableOpacity>
            )}
          </View>

          {/* Lista */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.iso}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            renderItem={({ item }) => {
              const active = item.iso === value;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 13,
                    borderBottomWidth: 1,
                    borderBottomColor: '#1E293B',
                    backgroundColor: active ? '#1E3A5F' : 'transparent',
                    borderRadius: active ? 10 : 0,
                    paddingHorizontal: active ? 10 : 0,
                    marginBottom: active ? 2 : 0,
                  }}
                >
                  <Text style={{ fontSize: 26, marginRight: 12 }}>{isoToFlag(item.iso)}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: active ? '#fff' : '#CBD5E1', fontWeight: active ? '600' : '400', fontSize: 15 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>
                      {item.dialCode} · {item.currency}
                    </Text>
                  </View>
                  {active && <Check size={18} color="#2563EB" />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
}
