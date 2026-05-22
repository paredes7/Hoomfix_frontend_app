import { View, Text, Switch } from "react-native";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const [available, setAvailable] = useState(false);

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-14">
      <Text className="text-2xl font-bold text-gray-900">Hola, {user?.name}</Text>
      <Text className="text-gray-500 mb-8">Panel del técnico</Text>

      <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-row items-center justify-between">
        <View>
          <Text className="font-semibold text-gray-800">Disponibilidad</Text>
          <Text className="text-gray-400 text-sm">{available ? "Activo — recibiendo solicitudes" : "Inactivo"}</Text>
        </View>
        <Switch
          value={available}
          onValueChange={setAvailable}
          trackColor={{ true: "#f97316" }}
        />
      </View>

      <Text
        className="text-center text-gray-400 text-sm mt-8"
        onPress={logout}
      >
        Cerrar sesión
      </Text>
    </View>
  );
}
