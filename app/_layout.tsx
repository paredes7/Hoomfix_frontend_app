import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

function RootNavigator() {
  const { user, isHydrated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const inAuth = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "(auth)" && segments[1] === "onboarding";

    if (!user && !inAuth) {
      router.replace("/(auth)/login");
    } else if (user && !user.isOnboardingComplete && !inOnboarding) {
      router.replace("/(auth)/onboarding");
    } else if (user && user.isOnboardingComplete && inAuth) {
      router.replace("/(client)/home");
    }
  }, [user, isHydrated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(client)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AuthProvider>
  );
}
