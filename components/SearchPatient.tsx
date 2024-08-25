import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { getPatientDetails } from '@/services/patientServices';

const SearchPatient = () => {
  const [idNumber, setIdNumber] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const patientDetails = await getPatientDetails(idNumber);
      if (patientDetails) {
        router.push({
          pathname: '/(authenticated)/patient-details/[id]',
          params: { id: idNumber }
        });
      } else {
        Alert.alert('Error', 'Patient not found. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient ID Number"
        value={idNumber}
        onChangeText={setIdNumber}
        onSubmitEditing={handleSearch}
      />
      
    </View>
  );
};

export default SearchPatient;