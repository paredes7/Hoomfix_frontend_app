import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useApply } from '../hooks/useApply';
import { useServiceTypes } from '../hooks/useServiceTypes';
import { StepIndicator } from '../components/apply/StepIndicator';
import { StepOne } from '../components/apply/StepOne';
import { StepTwo } from '../components/apply/StepTwo';
import { StepThree } from '../components/apply/StepThree';

export default function ApplyScreen() {
    const router = useRouter();
    const { loading, error, handleApply } = useApply();
    const { serviceTypes, loading: loadingTypes } = useServiceTypes();

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [serviceTypeId, setServiceTypeId] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [countryIso, setCountryIso] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [bio, setBio] = useState('');

    const selectedType = serviceTypes.find(s => s.id === serviceTypeId);

    function goBack() {
        if (step === 1) router.back();
        else if (step === 2) setStep(1);
        else setStep(2);
    }

    async function onSubmit() {
        await handleApply({
            serviceTypeId,
            countryIso,
            commercialName: commercialName || undefined,
            contactEmail: contactEmail || undefined,
            bio: bio || undefined,
        });
    }

    return (
        <SafeAreaView className="flex-1 bg-[#060F1E]">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                <View className="flex-row items-center gap-3 px-4 pt-3 pb-2">
                    <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
                        <ChevronLeft size={24} color="#CBD5E1" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-bold flex-1">Crear Servicio</Text>
                </View>

                <StepIndicator current={step} total={3} />

                <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
                    {step === 1 && (
                        <StepOne
                            serviceTypes={serviceTypes}
                            loadingTypes={loadingTypes}
                            serviceTypeId={serviceTypeId}
                            onSelectType={setServiceTypeId}
                            commercialName={commercialName}
                            onChangeCommercialName={setCommercialName}
                            onNext={() => setStep(2)}
                        />
                    )}
                    {step === 2 && (
                        <StepTwo
                            countryIso={countryIso}
                            onChangeCountry={setCountryIso}
                            contactEmail={contactEmail}
                            onChangeContactEmail={setContactEmail}
                            onNext={() => setStep(3)}
                        />
                    )}
                    {step === 3 && (
                        <StepThree
                            serviceTypeName={selectedType?.name ?? '—'}
                            commercialName={commercialName}
                            countryIso={countryIso}
                            contactEmail={contactEmail}
                            bio={bio}
                            onChangeBio={setBio}
                            onSubmit={onSubmit}
                            loading={loading}
                            error={error}
                        />
                    )}
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
