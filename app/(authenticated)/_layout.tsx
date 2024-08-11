import React from 'react';
import { Stack } from 'expo-router';

export default function AuthenticatedLayout() {
  return (
    <Stack>
      <Stack.Screen name="id-entry" options={{ headerShown: false }} />
      <Stack.Screen 
        name="user-details/[id]" 
        options={{ 
          headerTitle: 'Dashboard',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}