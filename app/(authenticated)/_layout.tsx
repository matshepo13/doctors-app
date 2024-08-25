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
      <Stack.Screen 
        name="patient-details/[id]" 
        options={{ 
          headerShown: false, // Hide the header
        }} 
      />
      <Stack.Screen 
        name="consultations/[id]" 
        options={{ 
          headerTitle: 'Consultations',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}