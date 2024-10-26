import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router';
import { styles } from '@/assets/fonts/stylings/mainstyles';
// import QRCodeModal from './QRCodeModal'; // Ensure this import is present

const Navbar = () => {
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(authenticated)/home' as Href<'/(authenticated)/home'>)}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      
      
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="black" />
      </TouchableOpacity>
      {/* <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} /> */}
    </View>
  );
};

export default Navbar;