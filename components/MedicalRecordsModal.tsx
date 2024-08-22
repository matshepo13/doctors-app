import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';

interface MedicalRecord {
  date: string;
  name: string;
  position: string;
  practitionerName: string;
  type: string;
  url: string;
}

interface MedicalRecordsModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  records: MedicalRecord[]; // Use the MedicalRecord interface
}

const MedicalRecordsModal: React.FC<MedicalRecordsModalProps> = ({ visible, onClose, title, records }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            {records.map((record, index) => (
              <View key={index} style={mainStyles.medicalRecordItem}>
                <Image source={{ uri: record.url }} style={mainStyles.medicalRecordImage} />
                <Text style={mainStyles.medicalRecordTitle}>{record.name}</Text>
                <Text style={mainStyles.medicalRecordDate}>Uploaded on {record.date}</Text>
                <Text style={mainStyles.medicalRecordDate}>Practitioner: {record.practitionerName}</Text>
                <Text style={mainStyles.medicalRecordDate}>Position: {record.position}</Text>
              </View>
            ))}
          </ScrollView>
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
  scrollView: {
    maxHeight: '80%',
  },
});

export default MedicalRecordsModal;