import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

const CATEGORIES = [
  { id: "PLUMBING", label: "Plomería", emoji: "🔧" },
  { id: "ELECTRICITY", label: "Electricidad", emoji: "⚡" },
  { id: "LOCKSMITH", label: "Cerrajería", emoji: "🔑" },
  { id: "GAS", label: "Gas", emoji: "🔥" },
  { id: "NETWORK", label: "Internet / Redes", emoji: "📶" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-orange-500 px-6 pt-14 pb-8">
        <Text className="text-white text-sm">Hola, {user?.name} 👋</Text>
        <Text className="text-white text-2xl font-bold mt-1">¿Qué emergencia tienes?</Text>
      </View>

      <View className="px-6 mt-6">
        <Text className="text-gray-700 font-semibold text-base mb-4">Categorías</Text>
        <View className="flex-row flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className="bg-white rounded-2xl p-4 w-[47%] items-center shadow-sm border border-gray-100"
              onPress={() => router.push({ pathname: "/(client)/search", params: { category: cat.id } })}
            >
              <Text className="text-4xl mb-2">{cat.emoji}</Text>
              <Text className="text-gray-800 font-semibold text-sm">{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity className="mx-6 mt-8 mb-4" onPress={logout}>
        <Text className="text-center text-gray-400 text-sm">Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
