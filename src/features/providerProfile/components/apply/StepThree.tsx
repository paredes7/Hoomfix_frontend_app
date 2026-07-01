import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MapPin, Mail, Briefcase, User } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';

type Props = {
    serviceTypeName: string;
    commercialName: string;
    countryIso: string;
    contactEmail: string;
    bio: string;
    onChangeBio: (v: string) => void;
    onSubmit: () => void;
    loading: boolean;
    error: string | null;
};

export function StepThree({ serviceTypeName, commercialName, countryIso, contactEmail, bio, onChangeBio, onSubmit, loading, error }: Props) {
    return (
        <View className="px-4 pb-8">
            <Text className="text-white text-xl font-bold mb-1">Todo listo</Text>
            <Text className="text-[#475569] text-sm mb-5">
                Revisa los datos antes de crear tu servicio.
            </Text>

            <View className="bg-[#0D1B30] rounded-2xl overflow-hidden mb-4">
                <View className="px-4 py-3 border-b border-[#1E293B]">
                    <Text className="text-[#94A3B8] text-xs font-semibold tracking-wide uppercase">
                        Resumen
                    </Text>
                </View>
                <SummaryRow icon={<Briefcase size={16} color="#2563EB" />} label="Tipo de servicio" value={serviceTypeName} />
                <SummaryRow icon={<User size={16} color="#2563EB" />} label="Nombre del negocio" value={commercialName || 'Sin nombre'} muted={!commercialName} />
                <SummaryRow icon={<MapPin size={16} color="#2563EB" />} label="País" value={countryIso} />
                <SummaryRow icon={<Mail size={16} color="#2563EB" />} label="Correo de contacto" value={contactEmail || 'Sin correo'} muted={!contactEmail} last />
            </View>

            <Input
                label="Descripción (opcional)"
                placeholder="Cuéntanos sobre tu experiencia, especialidades, años de trabajo..."
                value={bio}
                onChangeText={onChangeBio}
                multiline
            />

            {error && (
                <View className="mt-3 bg-[#7F1D1D] rounded-xl px-4 py-3">
                    <Text className="text-[#EF4444] text-sm">{error}</Text>
                </View>
            )}

            <TouchableOpacity
                onPress={onSubmit}
                disabled={loading}
                activeOpacity={0.8}
                className="mt-6 bg-[#2563EB] rounded-xl py-3.5 items-center"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-semibold text-base">Crear servicio</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

type SummaryRowProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    muted?: boolean;
    last?: boolean;
};

function SummaryRow({ icon, label, value, muted, last }: SummaryRowProps) {
    return (
        <View className={`flex-row items-center px-4 py-3 gap-3 ${!last ? 'border-b border-[#1E293B]' : ''}`}>
            <View className="w-8 h-8 rounded-full bg-[#1E3A5F] items-center justify-center">
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-[#475569] text-xs mb-0.5">{label}</Text>
                <Text className={`text-sm font-medium ${muted ? 'text-[#334155]' : 'text-white'}`}>{value}</Text>
            </View>
        </View>
    );
}
