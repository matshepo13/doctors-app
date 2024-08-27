import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/assets/fonts/stylings/mainstyles';

interface PrescriptionsModalProps {
  visible: boolean;
  onClose: () => void;
  patientId: string;
}

const PrescriptionsModal: React.FC<PrescriptionsModalProps> = ({ visible, onClose, patientId }) => {
  const translateY = new Animated.Value(300);
  const router = useRouter();

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleAddPrescription = () => {
    onClose();
    router.push({
      pathname: '/(authenticated)/AddPrescription',
      params: { id: patientId },
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAddPrescription}>
            <Text style={styles.buttonText}>Add Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>View Prescriptions</Text>
          </TouchableOpacity>
        </Animated.View>
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.midnightGreen,
  },
  button: {
    width: '90%',
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: 'hsl(182, 100%, 35%)',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.midnightGreen,
    fontSize: 16,
  },
});

export default PrescriptionsModal;