import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page when the app first opens
    router.replace('/(login)/login');
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="(login)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pages/appointments" options={{ headerTitle: 'Appointments' }} />
    </Stack>
  );
}