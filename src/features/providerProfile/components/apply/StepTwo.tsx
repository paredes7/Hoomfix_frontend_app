import { View, Text, TouchableOpacity } from 'react-native';
import { CountryPicker } from '@/components/ui/CountryPicker';
import { Input } from '@/components/ui/Input';

type Props = {
    countryIso: string;
    onChangeCountry: (iso: string) => void;
    contactEmail: string;
    onChangeContactEmail: (v: string) => void;
    onNext: () => void;
};

export function StepTwo({ countryIso, onChangeCountry, contactEmail, onChangeContactEmail, onNext }: Props) {
    return (
        <View className="px-4 pb-8">
            <Text className="text-white text-xl font-bold mb-1">¿Dónde trabajas?</Text>
            <Text className="text-[#475569] text-sm mb-6">
                Tu país define la moneda de tu billetera de ganancias.
            </Text>

            <View className="mb-4">
                <CountryPicker value={countryIso} onChange={onChangeCountry} />
            </View>

            <Input
                label="Correo de contacto (opcional)"
                placeholder="contacto@minegocio.com"
                value={contactEmail}
                onChangeText={onChangeContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                onPress={onNext}
                disabled={!countryIso}
                activeOpacity={0.8}
                className={`mt-6 rounded-xl py-3.5 items-center ${countryIso ? 'bg-[#2563EB]' : 'bg-[#1E293B]'}`}
            >
                <Text className={`font-semibold text-base ${countryIso ? 'text-white' : 'text-[#475569]'}`}>
                    Siguiente
                </Text>
            </TouchableOpacity>
        </View>
    );
}
