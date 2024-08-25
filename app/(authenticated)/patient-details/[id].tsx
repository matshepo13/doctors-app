import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPatientDetails } from '@/services/patientServices';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';
import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PatientDetails {
  firstName: string;
  surname: string;
  contactNumber: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  medicalHistory: string;
}

const PatientDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const details = await getPatientDetails(id as string) as PatientDetails;
        setPatientDetails(details);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        setError('Failed to load patient details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={mainStyles.container}>
        <AppBar title="Patient Details" />
        <View style={mainStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        <Navbar />
      </View>
    );
  }

  if (error) {
    return (
      <View style={mainStyles.container}>
        <AppBar title="Patient Details" />
        <Text>{error}</Text>
        <Navbar />
      </View>
    );
  }

  if (!patientDetails) {
    return (
      <View style={mainStyles.container}>
        <AppBar title="Patient Details" />
        <Text>Patient not found</Text>
        <Navbar />
      </View>
    );
  }

  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.sectionContainer}>
        <Text style={mainStyles.sectionTitle}>Patient Details</Text>
        <Text>Name: {patientDetails.firstName}</Text>
        <Text>Surname: {patientDetails.surname}</Text>
        <Text>Contact Number: {patientDetails.contactNumber}</Text>
        <Text>Date of Birth: {patientDetails.dateOfBirth}</Text>
        <Text>Gender: {patientDetails.gender}</Text>
        <Text>Medical Condition: {patientDetails.medicalHistory}</Text>
      </View>

      <View style={mainStyles.sectionContainer}>
        <Text style={mainStyles.sectionTitle}>Vitals</Text>
        <View style={mainStyles.vitalGrid}>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="blood-bag" size={24} color="hsl(182, 100%, 35%)" style={mainStyles.vitalIcon} />
            <Text style={mainStyles.vitalText}>Recent BP: 134.2</Text>
          </View>
          <View style={mainStyles.vitalItem}>
            <FontAwesome name="heartbeat" size={24} color="hsl(182, 100%, 35%)" style={mainStyles.vitalIcon} />
            <Text style={mainStyles.vitalText}>Heart Rate: 83</Text>
          </View>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="human" size={24} color="hsl(182, 100%, 35%)" style={mainStyles.vitalIcon} />
            <Text style={mainStyles.vitalText}>BMI: 34</Text>
          </View>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="dumbbell" size={24} color="hsl(182, 100%, 35%)" style={mainStyles.vitalIcon} />
            <Text style={mainStyles.vitalText}>Weight: 103</Text>
          </View>
        </View>
      </View>
      <Navbar />
    </View>
  );
};

export default PatientDetailsScreen;