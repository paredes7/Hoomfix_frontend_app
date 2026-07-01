import { useState } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity,
    ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useProviderProfile } from '../hooks/useProviderProfile';
import { useMyServices } from '../hooks/useMyServices';
import { Input } from '@/components/ui/Input';
import { EditAvatarSection } from '../components/edit/EditAvatarSection';
import { EditFormSection } from '../components/edit/EditFormSection';

export default function EditServiceProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { services, refresh } = useMyServices();
    const service = services.find(s => s.id === id);
    const { saving, photoUploading, error, handleSaveProfile, handlePickAndUploadPhoto } = useProviderProfile(id);

    const [bio, setBio] = useState(service?.profile?.bio ?? '');
    const [commercialName, setCommercialName] = useState(service?.profile?.commercialName ?? '');
    const [customServiceName, setCustomServiceName] = useState(service?.profile?.customServiceName ?? '');
    const [experience, setExperience] = useState(service?.profile?.experience?.toString() ?? '');
    const [coverageRadius, setCoverageRadius] = useState(service?.profile?.coverageRadius?.toString() ?? '');

    const name = service?.profile?.commercialName || service?.serviceType.name || '';

    return (
        <SafeAreaView className="flex-1 bg-[#060F1E]">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View className="flex-row items-center justify-between px-4 pt-2 pb-4 border-b border-[#1E293B]">
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="p-1">
                        <ChevronLeft size={24} color="#CBD5E1" />
                    </TouchableOpacity>

                    <Text className="text-white text-base font-bold">Editar perfil</Text>

                    <TouchableOpacity
                        onPress={() => handleSaveProfile(
                            {
                                bio: bio || undefined,
                                commercialName: commercialName || undefined,
                                customServiceName: customServiceName || undefined,
                                experience: experience ? parseInt(experience) : undefined,
                                coverageRadius: coverageRadius ? parseFloat(coverageRadius) : undefined,
                            },
                            () => { refresh(); router.back(); },
                        )}
                        disabled={saving}
                        activeOpacity={0.7}
                        className="px-3 py-1.5 rounded-lg bg-[#2563EB]"
                        style={{ opacity: saving ? 0.6 : 1 }}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-white text-sm font-semibold">Guardar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 32 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {service && (
                        <EditAvatarSection
                            photoUrl={service.profile?.servicePhoto}
                            name={name}
                            serviceTypeName={service.serviceType.name}
                            uploading={photoUploading}
                            onPickPhoto={() => handlePickAndUploadPhoto(refresh)}
                        />
                    )}

                    <EditFormSection title="Presentación">
                        <Input
                            label="Nombre de tu negocio o marca"
                            hint="Con este nombre te reconocerán tus clientes en tu perfil"
                            placeholder="Ej: Plomería Ramírez, Electricidad Pro..."
                            value={commercialName}
                            onChangeText={setCommercialName}
                        />
                        <Input
                            label="Título de tu anuncio"
                            hint="Describe brevemente qué ofreces — aparece en los resultados de búsqueda"
                            placeholder="Ej: Instalaciones eléctricas para hogar y empresa"
                            value={customServiceName}
                            onChangeText={setCustomServiceName}
                        />
                        <Input
                            label="Sobre ti"
                            hint="Habla de tu experiencia, especialidad y qué te diferencia de otros"
                            placeholder="Ej: Electricista certificado con 8 años de experiencia, especializado en..."
                            value={bio}
                            onChangeText={setBio}
                            multiline
                        />
                    </EditFormSection>

                    <EditFormSection title="Detalles profesionales">
                        <Input
                            label="Años de experiencia"
                            hint="¿Cuántos años llevas trabajando en este oficio?"
                            placeholder="Ej: 5"
                            value={experience}
                            onChangeText={setExperience}
                            keyboardType="numeric"
                        />
                        <Input
                            label="Radio de cobertura (km)"
                            hint="Distancia máxima a la que te desplazas para trabajar"
                            placeholder="Ej: 15"
                            value={coverageRadius}
                            onChangeText={setCoverageRadius}
                            keyboardType="numeric"
                        />
                    </EditFormSection>

                    {error && (
                        <View className="mx-4 mt-4 bg-[#7F1D1D] rounded-xl px-4 py-3">
                            <Text className="text-[#EF4444] text-sm">{error}</Text>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
