import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Sentry from "@sentry/react-native";
import "../global.css";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

Sentry.init({
  dsn: "https://00e3ae8b4a022f8708fa2eff45002d80@o4511572849459200.ingest.us.sentry.io/4511572863352832",
  sendDefaultPii: true,
  enableLogs: true,
});

function RootNavigator() {
  const { user, isHydrated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const inAuth = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "(auth)" && (segments as string[])[1] === "onboarding";

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

function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AuthProvider>
  );
}

export default Sentry.wrap(RootLayout);
