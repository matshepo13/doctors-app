import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router'; // Add this import if Href is from expo-router
import { styles } from '@/assets/fonts/stylings/mainstyles';

const Navbar = () => {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(authenticated)/home' as Href<'/(authenticated)/home'>)}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/pages/appointments' as Href<'/pages/appointments'>)}>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="document-text-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="medkit-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;