import { Modal, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Check, Plus, ChevronRight } from 'lucide-react-native';
import { useMyServices } from '../../hooks/useMyServices';
import { useActiveProfile } from '@/context/ActiveProfileContext';
import { useRouter } from 'expo-router';

const SHEET_HEIGHT = Dimensions.get('window').height * 0.55;

type Props = {
    visible: boolean;
    onClose: () => void;
    username: string;
    initials: string;
};

export function ServiceSwitcherModal({ visible, onClose, username, initials }: Props) {
    const { services } = useMyServices();
    const { activeServiceId, setActiveServiceId } = useActiveProfile();
    const router = useRouter();

    function selectPersonal() {
        setActiveServiceId(null);
        onClose();
    }

    function selectService(id: string) {
        setActiveServiceId(id);
        onClose();
    }

    function goToCreate() {
        onClose();
        router.push('/provider-service/apply' as any);
    }

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View className="flex-1 justify-end">

                <TouchableOpacity
                    className="absolute inset-0 bg-black/60"
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View className="bg-[#0D1B30] rounded-t-3xl" style={{ height: SHEET_HEIGHT }}>

                    <View className="items-center pt-3 pb-1">
                        <View className="w-10 h-1 rounded-full bg-[#334155]" />
                    </View>

                    <Text className="text-white text-base font-bold px-4 pt-2 pb-3">
                        Cambiar perfil
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <TouchableOpacity
                            onPress={selectPersonal}
                            activeOpacity={0.7}
                            className="flex-row items-center px-4 py-3 gap-3"
                        >
                            <AvatarWithIndicator
                                isActive={activeServiceId === null}
                                bgColor="#2563EB"
                                initials={initials}
                            />
                            <View className="flex-1">
                                <Text className="text-white text-[15px] font-semibold">{username}</Text>
                                <Text className="text-[#475569] text-[13px] mt-0.5">Perfil personal</Text>
                            </View>
                        </TouchableOpacity>

                        {services.map((service) => {
                            const photo = service.profile?.servicePhoto;
                            const name = service.profile?.commercialName ?? service.serviceType.name;
                            const isActive = activeServiceId === service.id;

                            return (
                                <TouchableOpacity
                                    key={service.id}
                                    onPress={() => selectService(service.id)}
                                    activeOpacity={0.7}
                                    className="flex-row items-center px-4 py-3 gap-3"
                                >
                                    <AvatarWithIndicator
                                        isActive={isActive}
                                        bgColor="#1E3A5F"
                                        initials={name.slice(0, 2).toUpperCase()}
                                        photoUrl={photo}
                                    />
                                    <View className="flex-1">
                                        <Text className="text-white text-[15px] font-semibold">{name}</Text>
                                        <Text className="text-[#475569] text-[13px] mt-0.5">{service.serviceType.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        <View className="h-px bg-[#1E293B] mx-4 my-1" />

                        <TouchableOpacity
                            onPress={goToCreate}
                            activeOpacity={0.7}
                            className="flex-row items-center px-4 py-3 gap-3 mb-6"
                        >
                            <View className="w-12 h-12 rounded-full bg-[#1E293B] items-center justify-center">
                                <Plus size={22} color="#94A3B8" />
                            </View>
                            <Text className="flex-1 text-[#CBD5E1] text-[15px] font-semibold">Crear Servicio</Text>
                            <ChevronRight size={18} color="#475569" />
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

type AvatarProps = {
    isActive: boolean;
    bgColor: string;
    initials: string;
    photoUrl?: string | null;
};

function AvatarWithIndicator({ isActive, bgColor, initials, photoUrl }: AvatarProps) {
    return (
        <View className="w-12 h-12">
            <View
                className="w-12 h-12 rounded-full items-center justify-center overflow-hidden"
                style={{
                    backgroundColor: bgColor,
                    borderWidth: isActive ? 2 : 0,
                    borderColor: '#2563EB',
                }}
            >
                {photoUrl ? (
                    <Image source={{ uri: photoUrl }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <Text className="text-white text-base font-bold">{initials}</Text>
                )}
            </View>

            {isActive && (
                <View className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-full bg-[#2563EB] items-center justify-center border-2 border-[#0D1B30]">
                    <Check size={10} color="#fff" strokeWidth={3} />
                </View>
            )}
        </View>
    );
}
