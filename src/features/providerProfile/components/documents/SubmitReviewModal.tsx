import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ShieldCheck, Clock, FileCheck, Bell } from 'lucide-react-native';

type Props = {
    visible: boolean;
    documentCount: number;
    submitting: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

export function SubmitReviewModal({ visible, documentCount, submitting, onConfirm, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View className="flex-1 bg-black/70 items-center justify-end pb-6 px-4">
                <View className="w-full bg-[#0D1B30] rounded-3xl overflow-hidden">

                    <View className="items-center pt-8 pb-6 px-6">
                        <View className="w-16 h-16 rounded-full bg-[#1E3A5F] items-center justify-center mb-4">
                            <ShieldCheck size={32} color="#2563EB" />
                        </View>
                        <Text className="text-white text-xl font-bold text-center">
                            Enviar a revisión
                        </Text>
                        <Text className="text-[#64748B] text-sm text-center mt-2 leading-5">
                            Nuestro equipo revisará tus documentos y te notificará cuando tu perfil esté aprobado.
                        </Text>
                    </View>

                    <View className="mx-5 mb-5 bg-[#060F1E] rounded-2xl px-4 py-1">
                        <InfoRow icon={<Clock size={15} color="#2563EB" />} label="Tiempo de revisión" value="24 a 48 horas hábiles" />
                        <View className="h-px bg-[#1E293B]" />
                        <InfoRow icon={<FileCheck size={15} color="#22C55E" />} label="Documentos listos" value={`${documentCount} archivo${documentCount !== 1 ? 's' : ''}`} />
                        <View className="h-px bg-[#1E293B]" />
                        <InfoRow icon={<Bell size={15} color="#F59E0B" />} label="Notificación" value="Recibirás una alerta con el resultado" />
                    </View>

                    <View className="flex-row gap-3 px-5 pb-6">
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={submitting}
                            activeOpacity={0.7}
                            className="flex-1 py-3.5 rounded-xl border border-[#1E293B] items-center"
                        >
                            <Text className="text-[#94A3B8] font-semibold text-sm">Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            disabled={submitting}
                            activeOpacity={0.8}
                            className="flex-1 py-3.5 rounded-xl items-center"
                            style={{ backgroundColor: submitting ? '#1E3A5F' : '#2563EB' }}
                        >
                            {submitting ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white font-semibold text-sm">Confirmar envío</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <View className="flex-row items-center gap-3 py-3.5">
            <View className="w-7 h-7 rounded-lg bg-[#0D1B30] items-center justify-center">
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-[#475569] text-xs">{label}</Text>
                <Text className="text-white text-sm font-medium mt-0.5">{value}</Text>
            </View>
        </View>
    );
}
