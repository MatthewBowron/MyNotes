import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* root */}
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="profile" />
      {/* auth */}
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="auth/sign-up" />
      {/* notes */}
      <Stack.Screen name="notes/[category]" />
      <Stack.Screen name="notes/new" />
    </Stack>
  );
}
