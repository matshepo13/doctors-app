import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';
import { getUserDetails } from '@/app/(authenticated)/userService';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ visible, onClose }) => {
  const { id } = useLocalSearchParams();
  const [userDetails, setUserDetails] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchDetails() {
      const details = await getUserDetails(id as string);
      setUserDetails(details);
      console.log('Firestore User Details:', details);
    }
    fetchDetails();
  }, [id]);

  const qrCodeValue = userDetails ? `http://192.168.1.100:19006/(authenticated)/user-details/${id}` : '';

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>User QR Code</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {userDetails && (
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={qrCodeValue}
                size={200}
                logo={require('@/assets/images/splash.png')} // Add your logo here
                logoSize={50}
                logoBackgroundColor="transparent"
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeModal;