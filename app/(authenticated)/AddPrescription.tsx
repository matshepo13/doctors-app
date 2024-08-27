import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/assets/fonts/stylings/mainstyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc, doc } from 'firebase/firestore';
// import { firestore } from '@/services/firebase';
import SuccessPopup from '@/components/SuccessPopup';
import { useLocalSearchParams } from 'expo-router';

const AddPrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState(['1. ']);
  const [doctorDetails, setDoctorDetails] = useState('');
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handlePrescriptionChange = (text: string, index: number) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index] = text;
    if (text.endsWith('\n')) {
      newPrescriptions[index] = text.trim();
      newPrescriptions.push(`${newPrescriptions.length + 1}. `);
    }
    setPrescriptions(newPrescriptions);
  };

  const handleAddStamp = () => {
    setDoctorDetails((prevDetails) => `${prevDetails}Dr Williams[Stamp]`);
  };

  const renderDoctorDetails = () => {
    const parts = doctorDetails.split('[Stamp]');
    return (
      <View style={styles.inlineContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={styles.doctorDetailsText}>{part}</Text>
            {index < parts.length - 1 && (
              <Image source={require('@/assets/images/stamp.png')} style={styles.inlineStampImage} />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    try {
      const prescriptionData = {
        prescriptions,
        doctorDetails,
        signature,
        date: date ? date.toISOString().split('T')[0] : null,
      };

      const patientDocRef = doc(firestore, 'PatientList', id as string);
      const prescriptionsRef = collection(patientDocRef, `Prescriptions_${id}`);
      await addDoc(prescriptionsRef, prescriptionData);

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
    } catch (error) {
      console.error('Error saving prescription:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('@/assets/images/gauteng.png')} style={styles.headerImage} />
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName}>Leratong Hospital</Text>
          <Text style={styles.hospitalAddress}>1 ADCOCK ST Kagiso 1739 · 24 km</Text>
          <Text style={styles.hospitalPhone}>011 411 3500</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="yyyy/mm/dd"
              value={date ? date.toISOString().split('T')[0] : 'yyyy/mm/dd'}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>RX</Text>
          <View style={styles.prescriptionContainer}>
            {prescriptions.map((prescription, index) => (
              <TextInput
                key={index}
                style={styles.prescriptionInput}
                value={prescription}
                onChangeText={(text) => handlePrescriptionChange(text, index)}
                multiline
              />
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Doctor's Details</Text>
          <View style={styles.doctorDetailsContainer}>
            <View style={styles.doctorDetailsInputContainer}>
              {renderDoctorDetails()}
            </View>
            <TouchableOpacity style={styles.addStampButton} onPress={handleAddStamp}>
              <Text style={styles.addStampButtonText}>Add Stamp</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Signature</Text>
          <TextInput
            style={styles.signatureInput}
            placeholder="Signature"
            value={signature}
            onChangeText={setSignature}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {showSuccessPopup && <SuccessPopup message="Prescription saved successfully!" />}
        {showErrorPopup && <SuccessPopup message="Error saving prescription. Please try again." />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderColor: Colors.midnightGreen,
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '70%',
    height: 90,
    resizeMode: 'contain',
  },
  hospitalInfo: {
    marginVertical: 20,
  },
  hospitalName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.midnightGreen,
  },
  hospitalAddress: {
    fontSize: 10,
    color: 'gray',
  },
  hospitalPhone: {
    fontSize: 10,
    color: 'gray',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  prescriptionContainer: {
    marginBottom: 20,
  },
  prescriptionInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.midnightGreen,
    fontSize: 11,
    paddingVertical: 10,
  },
  doctorDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorDetailsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.midnightGreen,
    paddingVertical: 10,
    flex: 1,
  },
  addStampButton: {
    marginLeft: 10,
    backgroundColor: Colors.midnightGreen,
    padding: 10,
    borderRadius: 5,
  },
  addStampButtonText: {
    color: 'white',
    fontSize: 11,
  },
  signatureInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.midnightGreen,
    fontSize: 11,
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: Colors.midnightGreen,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  doctorDetailsText: {
    fontSize: 10,
    color: 'black',
  },
  inlineStampImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  doctorDetailsDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
});

export default AddPrescriptionPage;