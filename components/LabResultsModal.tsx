import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/assets/fonts/stylings/mainstyles';
import { useRouter } from 'expo-router';

interface LabResultsModalProps {
  visible: boolean;
  onClose: () => void;
  patientId: string; // Add patientId prop
}

const LabResultsModal: React.FC<LabResultsModalProps> = ({ visible, onClose, patientId }) => {
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

  const handleViewSection = () => {
    console.log('MRI Scan button pressed'); // Debugging statement
    onClose();
    router.push({
      pathname: '/(authenticated)/resultsdisplay', // Use single backslash
      params: { id: patientId }, // Use the patientId prop
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewSection}>
            <Text style={styles.buttonText}>MRI Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewSection}>
            <Text style={styles.buttonText}>X-ray</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewSection}>
            <Text style={styles.buttonText}>Ultrasound</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewSection}>
            <Text style={styles.buttonText}>Blood test</Text>
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
    position: 'absolute',
    bottom: 8,
    left: 10,
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

export default LabResultsModal;