import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { AppLayout } from '@/layout/AppLayout';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const firstName = user?.profile?.firstName ?? user?.username ?? 'Usuario';

  return (
    <AppLayout>
      {(activeTab) => (
        <ScrollView style={{ flex: 1, backgroundColor: '#060F1E' }}>
          {activeTab === 'inicio' && (
            <View style={{ padding: 20 }}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 }}>
                Hola, {firstName} 👋
              </Text>
              <Text style={{ color: '#475569', fontSize: 14, marginBottom: 20 }}>
                ¿Qué necesitas arreglar hoy?
              </Text>

              <View style={{ backgroundColor: '#1E293B', borderRadius: 16, padding: 20, marginBottom: 12 }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 6 }}>
                  Estamos construyendo algo increíble
                </Text>
                <Text style={{ color: '#64748B', fontSize: 14, lineHeight: 22 }}>
                  Muy pronto podrás solicitar técnicos de plomería, electricidad, cerrajería y más.
                </Text>
              </View>

              <View style={{ backgroundColor: '#1E293B', borderRadius: 16, padding: 20 }}>
                <Text style={{ color: '#94A3B8', fontWeight: '600', marginBottom: 12 }}>Tu cuenta</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ color: '#475569', fontSize: 14 }}>Usuario</Text>
                  <Text style={{ color: '#CBD5E1', fontSize: 14 }}>@{user?.username}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#475569', fontSize: 14 }}>Email</Text>
                  <Text style={{ color: '#CBD5E1', fontSize: 14 }}>{user?.email ?? '—'}</Text>
                </View>
              </View>

              <TouchableOpacity style={{ marginTop: 32 }} onPress={logout}>
                <Text style={{ color: '#475569', textAlign: 'center', fontSize: 14 }}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'buscar' && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <Text style={{ color: '#475569', fontSize: 16 }}>Buscar técnicos</Text>
              <Text style={{ color: '#334155', fontSize: 13, marginTop: 8 }}>Próximamente</Text>
            </View>
          )}

          {activeTab === 'trabajos' && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <Text style={{ color: '#475569', fontSize: 16 }}>Mis solicitudes</Text>
              <Text style={{ color: '#334155', fontSize: 13, marginTop: 8 }}>Próximamente</Text>
            </View>
          )}

          {activeTab === 'notificaciones' && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <Text style={{ color: '#475569', fontSize: 16 }}>Notificaciones</Text>
              <Text style={{ color: '#334155', fontSize: 13, marginTop: 8 }}>Próximamente</Text>
            </View>
          )}

          {activeTab === 'perfil' && <ProfileScreen />}
        </ScrollView>
      )}
    </AppLayout>
  );
}
