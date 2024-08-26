import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';
import AddConsultationModal from '@/components/AddConsultationModal'; // Import the modal component

// Define the type for a consultation
type Consultation = {
  id: number;
  doctorName: string;
  date: string;
  specialty: string;
  type: string;
};

const ConsultationsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  const consultations: Consultation[] = [
    {
      id: 1,
      doctorName: 'Dr. John Smith',
      date: 'Apr 21, 2024',
      specialty: 'Orthopedist',
      type: 'Routine check',
    },
    {
      id: 2,
      doctorName: 'Dr. Emily Johnson',
      date: 'Apr 9, 2024',
      specialty: 'Rheumatologist',
      type: 'Review',
    },
    {
      id: 3,
      doctorName: 'Dr. Caron Wilson',
      date: 'Mar 22, 2024',
      specialty: 'Physical Therapist',
      type: 'Ultrasound',
    },
  ];

  const handleAddConsultation = (consultation: Consultation) => {
    // Handle the new consultation submission
    console.log('New Consultation:', consultation);
    setModalVisible(false);
  };

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Consultation</Text>
      </TouchableOpacity>
      <ScrollView>
        {consultations.map((consultation) => (
          <TouchableOpacity key={consultation.id} style={styles.consultationCard}>
            <Image source={require('@/assets/images/dr1.png')} style={styles.doctorImage} />
            <View style={styles.consultationDetails}>
              <Text style={styles.doctorName}>{consultation.doctorName}</Text>
              <Text style={styles.consultationDate}>{consultation.date}</Text>
              <Text style={styles.consultationSpecialty}>{consultation.specialty}</Text>
            </View>
            <TouchableOpacity style={styles.consultationTypeButton}>
              <Text style={styles.consultationTypeText}>{consultation.type}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <AddConsultationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddConsultation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'hsl(182, 100%, 35%)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  consultationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  consultationDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  consultationDate: {
    fontSize: 14,
    color: 'gray',
  },
  consultationSpecialty: {
    fontSize: 14,
    color: 'gray',
  },
  consultationTypeButton: {
    backgroundColor: 'hsl(182, 100%, 35%)',
    borderRadius: 10,
    padding: 5,
  },
  consultationTypeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default ConsultationsPage;