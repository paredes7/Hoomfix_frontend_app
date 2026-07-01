import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FileText, Image, File, Trash2 } from 'lucide-react-native';
import type { ProviderDocument } from '../../types/providerService.type';

type Props = {
    document: ProviderDocument;
    onDelete: (id: string) => void;
};

function getFileInfo(url: string, name: string | null) {
    const lower = (name ?? url).toLowerCase();
    if (lower.endsWith('.pdf')) return { icon: FileText, color: '#EF4444', bg: '#7F1D1D', label: 'PDF' };
    if (lower.match(/\.(jpg|jpeg|png|webp)$/)) return { icon: Image, color: '#60A5FA', bg: '#1E3A5F', label: 'Imagen' };
    return { icon: File, color: '#94A3B8', bg: '#1E293B', label: 'Archivo' };
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function DocumentCard({ document, onDelete }: Props) {
    const { icon: Icon, color, bg, label } = getFileInfo(document.url, document.name);
    const displayName = document.name ?? 'Documento sin nombre';

    function confirmDelete() {
        Alert.alert(
            'Eliminar documento',
            `¿Seguro que quieres eliminar "${displayName}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(document.id) },
            ]
        );
    }

    return (
        <View className="flex-row items-center gap-3 px-4 py-3">
            <View className="w-11 h-11 rounded-xl items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={20} color={color} />
            </View>

            <View className="flex-1">
                <Text className="text-white text-sm font-semibold" numberOfLines={1}>{displayName}</Text>
                <Text className="text-[#475569] text-xs mt-0.5">{label} · {formatDate(document.createdAt)}</Text>
            </View>

            <TouchableOpacity onPress={confirmDelete} activeOpacity={0.7} className="p-2">
                <Trash2 size={18} color="#475569" />
            </TouchableOpacity>
        </View>
    );
}
