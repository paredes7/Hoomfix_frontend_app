import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Upload } from 'lucide-react-native';

type Props = {
    uploading: boolean;
    onUpload: (file: { uri: string; name: string; type: string }) => void;
};

function resolveMimeType(mimeType: string | null | undefined, name: string): string {
    if (mimeType && mimeType !== 'application/octet-stream') return mimeType;
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'application/pdf';
    if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
    if (ext === 'png') return 'image/png';
    if (ext === 'webp') return 'image/webp';
    return mimeType ?? 'application/octet-stream';
}

export function DocumentUploadButton({ uploading, onUpload }: Props) {
    async function pick() {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/*'],
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        onUpload({
            uri: asset.uri,
            name: asset.name,
            type: resolveMimeType(asset.mimeType, asset.name),
        });
    }

    return (
        <TouchableOpacity
            onPress={pick}
            disabled={uploading}
            activeOpacity={0.8}
            className="mx-4 mb-6 rounded-xl py-3.5 flex-row items-center justify-center gap-2"
            style={{ backgroundColor: uploading ? '#1E293B' : '#2563EB' }}
        >
            {uploading ? (
                <>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text className="text-white font-semibold text-sm">Subiendo...</Text>
                </>
            ) : (
                <>
                    <Upload size={18} color="#fff" />
                    <Text className="text-white font-semibold text-sm">Subir documento</Text>
                </>
            )}
        </TouchableOpacity>
    );
}
