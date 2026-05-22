import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { registerClientApi } from "../api/authApi";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !phone || !password) return Alert.alert("Completa todos los campos");
    setLoading(true);
    try {
      const { access_token, user } = await registerClientApi({ name, email: email.trim(), phone, password });
      await setSession(access_token, user);
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message ?? "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-6 py-12">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</Text>
      <Text className="text-gray-500 mb-8">Accede a técnicos verificados 24/7</Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-6 text-gray-900"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-orange-500 rounded-xl py-4 items-center mb-4"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Crear cuenta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-center text-gray-500">
          ¿Ya tienes cuenta? <Text className="text-orange-500 font-semibold">Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
