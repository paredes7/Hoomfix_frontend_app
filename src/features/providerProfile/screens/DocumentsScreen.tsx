import { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ShieldCheck, FileX, Send } from 'lucide-react-native';
import { useDocuments } from '../hooks/useDocuments';
import { DocumentCard } from '../components/documents/DocumentCard';
import { DocumentUploadButton } from '../components/documents/DocumentUploadButton';
import { SubmitReviewModal } from '../components/documents/SubmitReviewModal';

export default function DocumentsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { documents, loading, uploading, submitting, error, handleUpload, handleDelete, handleSubmitReview } = useDocuments(id);
    const [modalVisible, setModalVisible] = useState(false);

    async function onConfirmSubmit() {
        const ok = await handleSubmitReview();
        if (ok) {
            setModalVisible(false);
            router.back();
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#060F1E]">

            <View className="flex-row items-center gap-3 px-4 pt-3 pb-4 border-b border-[#1E293B]">
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <ChevronLeft size={24} color="#CBD5E1" />
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className="text-white text-lg font-bold">Verificar servicio</Text>
                    <Text className="text-[#475569] text-xs mt-0.5">Sube tus documentos de identidad</Text>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                <View className="mx-4 mt-4 bg-[#0D1B30] rounded-2xl px-4 py-4 flex-row gap-3">
                    <ShieldCheck size={22} color="#2563EB" style={{ marginTop: 1 }} />
                    <View className="flex-1">
                        <Text className="text-white text-sm font-semibold mb-1">¿Qué documentos necesitas?</Text>
                        <Text className="text-[#475569] text-xs leading-5">
                            · Documento de identidad (CI o pasaporte){'\n'}
                            · Certificados o títulos relacionados{'\n'}
                            · Fotografías de trabajos anteriores (opcional)
                        </Text>
                    </View>
                </View>

                <View className="mx-4 mt-4 bg-[#0D1B30] rounded-2xl overflow-hidden mb-4">
                    <View className="px-4 py-3 border-b border-[#1E293B] flex-row items-center justify-between">
                        <Text className="text-[#94A3B8] text-xs font-semibold tracking-wide uppercase">
                            Documentos subidos
                        </Text>
                        <Text className="text-[#475569] text-xs">{documents.length} archivos</Text>
                    </View>

                    {loading && (
                        <View className="py-10 items-center">
                            <ActivityIndicator color="#2563EB" />
                        </View>
                    )}

                    {!loading && error && (
                        <View className="py-8 items-center px-4">
                            <Text className="text-[#EF4444] text-sm text-center">{error}</Text>
                        </View>
                    )}

                    {!loading && !error && documents.length === 0 && (
                        <View className="py-10 items-center gap-2">
                            <FileX size={32} color="#334155" />
                            <Text className="text-[#475569] text-sm">Ningún documento subido aún</Text>
                        </View>
                    )}

                    {!loading && documents.map((doc, index) => (
                        <View key={doc.id}>
                            {index > 0 && <View className="h-px bg-[#1E293B] mx-4" />}
                            <DocumentCard document={doc} onDelete={handleDelete} />
                        </View>
                    ))}
                </View>

            </ScrollView>

            <View className="px-4 pb-4 gap-3">
                <DocumentUploadButton uploading={uploading} onUpload={handleUpload} />

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    disabled={documents.length === 0 || loading}
                    activeOpacity={0.8}
                    className="rounded-xl py-3.5 flex-row items-center justify-center gap-2 border border-[#22C55E]"
                    style={{ opacity: documents.length === 0 || loading ? 0.4 : 1 }}
                >
                    <Send size={16} color="#22C55E" />
                    <Text className="text-[#22C55E] font-semibold text-sm">Mandar a revisión</Text>
                </TouchableOpacity>
            </View>

            <SubmitReviewModal
                visible={modalVisible}
                documentCount={documents.length}
                submitting={submitting}
                onConfirm={onConfirmSubmit}
                onClose={() => setModalVisible(false)}
            />

        </SafeAreaView>
    );
}
