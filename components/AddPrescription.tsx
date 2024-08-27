import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/assets/fonts/stylings/mainstyles';

const AddPrescription = () => {
  const [prescriptionLines, setPrescriptionLines] = useState(['']);
  const [doctorDetails, setDoctorDetails] = useState('');
  const [initials, setInitials] = useState('');
  const router = useRouter();

  const handleAddLine = (index: number, text: string) => {
    const newLines = [...prescriptionLines];
    newLines[index] = text;
    if (index === prescriptionLines.length - 1 && text.trim() !== '') {
      newLines.push('');
    }
    setPrescriptionLines(newLines);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('@/assets/images/gauteng.png')} style={styles.headerImage} />
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>Leratong Hospital</Text>
        <Text style={styles.hospitalAddress}>1 ADCOCK ST Kagiso 1739 · 24 km</Text>
        <Text style={styles.hospitalPhone}>011 411 3500</Text>
      </View>
      <View style={styles.mainSection}>
        <Text style={styles.title}>RX</Text>
        {prescriptionLines.map((line, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`${index + 1}.`}
            value={line}
            onChangeText={(text) => handleAddLine(index, text)}
          />
        ))}
      </View>
      <View style={styles.doctorDetailsSection}>
        <TextInput
          style={styles.input}
          placeholder="Doctor's Details"
          value={doctorDetails}
          onChangeText={setDoctorDetails}
        />
        <TouchableOpacity style={styles.addStampButton}>
          <Text style={styles.addStampButtonText}>Add Stamp</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signSection}>
        <TextInput
          style={styles.input}
          placeholder="Sign (Initials)"
          value={initials}
          onChangeText={setInitials}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  hospitalInfo: {
    marginVertical: 20,
    alignItems: 'center',
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  hospitalAddress: {
    fontSize: 16,
    color: Colors.grayWeb,
  },
  hospitalPhone: {
    fontSize: 16,
    color: Colors.grayWeb,
  },
  mainSection: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grayWeb,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  doctorDetailsSection: {
    marginVertical: 20,
  },
  addStampButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Colors.verdigris,
    padding: 5,
    borderRadius: 5,
  },
  addStampButtonText: {
    color: Colors.white,
  },
  signSection: {
    marginVertical: 20,
  },
});

export default AddPrescription;