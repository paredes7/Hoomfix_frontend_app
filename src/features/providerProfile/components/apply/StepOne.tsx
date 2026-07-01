import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Modal } from 'react-native';
import { useState } from 'react';
import { ChevronRight, Check, X, Wrench } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import type { ServiceType } from '../../types/providerService.type';

type Props = {
    serviceTypes: ServiceType[];
    loadingTypes: boolean;
    serviceTypeId: string;
    onSelectType: (id: string) => void;
    commercialName: string;
    onChangeCommercialName: (v: string) => void;
    onNext: () => void;
};

export function StepOne({ serviceTypes, loadingTypes, serviceTypeId, onSelectType, commercialName, onChangeCommercialName, onNext }: Props) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const selected = serviceTypes.find(s => s.id === serviceTypeId);
    const initials = selected ? selected.name.slice(0, 2).toUpperCase() : null;

    return (
        <View className="px-4 pb-8">
            <Text className="text-white text-xl font-bold mb-1">¿Qué servicio ofreces?</Text>
            <Text className="text-[#475569] text-sm mb-6">
                Elige el tipo de servicio y el nombre de tu negocio.
            </Text>

            <View className="mb-4">
                <Text className="text-[#94A3B8] text-sm font-medium mb-2">
                    Tipo de servicio <Text className="text-[#EF4444]">*</Text>
                </Text>

                {loadingTypes ? (
                    <View className="bg-[#0D1B30] rounded-2xl px-4 py-4 items-center">
                        <ActivityIndicator color="#2563EB" />
                    </View>
                ) : selected ? (
                    <TouchableOpacity
                        onPress={() => setPickerOpen(true)}
                        activeOpacity={0.8}
                        className="bg-[#0D1B30] rounded-2xl px-4 py-4 flex-row items-center gap-3"
                        style={{ borderWidth: 1.5, borderColor: '#2563EB' }}
                    >
                        <View className="w-12 h-12 rounded-full bg-[#1E3A5F] items-center justify-center">
                            <Text className="text-white text-base font-bold">{initials}</Text>
                        </View>

                        <View className="flex-1">
                            <Text className="text-[#94A3B8] text-xs mb-0.5">Tipo de servicio</Text>
                            <Text className="text-white text-base font-semibold">{selected.name}</Text>
                        </View>

                        <View className="items-center gap-1">
                            <Check size={16} color="#2563EB" />
                            <Text className="text-[#2563EB] text-[10px] font-semibold">Cambiar</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => setPickerOpen(true)}
                        activeOpacity={0.8}
                        className="bg-[#0D1B30] rounded-2xl px-4 py-4 flex-row items-center gap-3"
                        style={{ borderWidth: 1, borderColor: '#1E293B' }}
                    >
                        <View className="w-12 h-12 rounded-full bg-[#1E293B] items-center justify-center">
                            <Wrench size={22} color="#475569" />
                        </View>

                        <View className="flex-1">
                            <Text className="text-[#475569] text-xs mb-0.5">Tipo de servicio</Text>
                            <Text className="text-[#334155] text-base font-medium">Selecciona una opción</Text>
                        </View>

                        <ChevronRight size={18} color="#475569" />
                    </TouchableOpacity>
                )}
            </View>

            <Input
                label="Nombre del negocio (opcional)"
                placeholder="Ej: Plomería Express"
                value={commercialName}
                onChangeText={onChangeCommercialName}
            />

            <TouchableOpacity
                onPress={onNext}
                disabled={!serviceTypeId}
                activeOpacity={0.8}
                className={`mt-6 rounded-xl py-3.5 items-center ${serviceTypeId ? 'bg-[#2563EB]' : 'bg-[#1E293B]'}`}
            >
                <Text className={`font-semibold text-base ${serviceTypeId ? 'text-white' : 'text-[#475569]'}`}>
                    Siguiente
                </Text>
            </TouchableOpacity>

            <Modal visible={pickerOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setPickerOpen(false)}>
                <View className="flex-1 bg-[#0B1929]" style={{ paddingTop: 24 }}>
                    <View className="flex-row items-center justify-between px-5 mb-4">
                        <Text className="text-white text-lg font-bold">Tipo de servicio</Text>
                        <TouchableOpacity
                            onPress={() => setPickerOpen(false)}
                            className="bg-[#1E293B] rounded-full p-1.5"
                            activeOpacity={0.7}
                        >
                            <X size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={serviceTypes}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                        renderItem={({ item }) => {
                            const active = item.id === serviceTypeId;
                            const abbrev = item.name.slice(0, 2).toUpperCase();
                            return (
                                <TouchableOpacity
                                    onPress={() => { onSelectType(item.id); setPickerOpen(false); }}
                                    activeOpacity={0.7}
                                    className="flex-row items-center gap-3 py-3"
                                    style={{ borderBottomWidth: 1, borderBottomColor: '#1E293B' }}
                                >
                                    <View
                                        className="w-10 h-10 rounded-full items-center justify-center"
                                        style={{ backgroundColor: active ? '#1E3A5F' : '#1E293B' }}
                                    >
                                        <Text className="text-white text-sm font-bold">{abbrev}</Text>
                                    </View>
                                    <Text
                                        className="flex-1 text-[15px]"
                                        style={{ color: active ? '#fff' : '#CBD5E1', fontWeight: active ? '600' : '400' }}
                                    >
                                        {item.name}
                                    </Text>
                                    {active && (
                                        <View className="w-6 h-6 rounded-full bg-[#2563EB] items-center justify-center">
                                            <Check size={13} color="#fff" strokeWidth={3} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
}
