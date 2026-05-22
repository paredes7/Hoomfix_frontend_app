import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginApi } from "../api/authApi";
import { useAuth } from "../../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert("Completa todos los campos");
    setLoading(true);
    try {
      const { access_token, user } = await loginApi(email.trim(), password);
      await setSession(access_token, user);
    } catch {
      Alert.alert("Error", "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Hoomfix</Text>
      <Text className="text-gray-500 mb-8">Técnicos verificados en minutos</Text>

      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-center text-gray-500">
          ¿No tienes cuenta? <Text className="text-orange-500 font-semibold">Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
