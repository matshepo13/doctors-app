import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPatientDetails } from '@/services/patientServices';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';
import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LabResultsModal from '@/components/LabResultsModal';

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
  const [searchText, setSearchText] = useState('');
  const [labResultsModalVisible, setLabResultsModalVisible] = useState(false);

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
      <View style={{...mainStyles.sectionContainer, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'hsl(182, 100%, 35%)', padding: 10, borderRadius: 10 }}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, color: 'white', fontSize: 16 }}
            placeholder="Search regarding patient"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </TouchableOpacity>
      </View>
      <View style={mainStyles.sectionContainer}>
        <Text style={mainStyles.sectionTitle}>Patient Details</Text>
        <Text>Name: {patientDetails.firstName}</Text>
        <Text>Surname: {patientDetails.surname}</Text>
        <Text>Contact Number: {patientDetails.contactNumber}</Text>
        <Text>Date of Birth: {patientDetails.dateOfBirth}</Text>
        <Text>Gender: {patientDetails.gender}</Text>
        <Text>Medical Condition: {patientDetails.medicalHistory}</Text>
      </View>

      <View style={{...mainStyles.sectionContainer, backgroundColor: 'hsl(182, 100%, 35%)'}}>
        <Text style={{...mainStyles.sectionTitle, color: 'white'}}>Vitals</Text>
        <View style={{ ...mainStyles.vitalGrid, justifyContent: 'space-between' }}>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="blood-bag" size={20} color="white" style={mainStyles.vitalIcon} />
            <Text style={{...mainStyles.vitalText, fontSize: 14, color: 'white'}}>BP:134/82 mmHg</Text>
          </View>
          <View style={{...mainStyles.vitalItem, marginRight: 0, marginLeft: 11}}>
            <FontAwesome name="heartbeat" size={18} color="white" style={mainStyles.vitalIcon} />
            <Text style={{...mainStyles.vitalText, color: 'white'}}>Heart : 83 bpm</Text>
          </View>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="human" size={20} color="white" style={mainStyles.vitalIcon} />
            <Text style={{...mainStyles.vitalText, fontSize: 14, color: 'white'}}>BMI:34 kg/m²</Text>
          </View>
          <View style={mainStyles.vitalItem}>
            <MaterialCommunityIcons name="dumbbell" size={22} color="white" style={mainStyles.vitalIcon} />
            <Text style={{...mainStyles.vitalText, fontSize: 16, color: 'white'}}>Weight: 103 kg</Text>
          </View>
        </View>
      </View>

      {/* New Patient Information Section */}
      <View style={{...mainStyles.sectionContainer, height: '31%'}}>
        <Text style={mainStyles.sectionTitle}>Patient Information</Text>
        <ScrollView horizontal>
          <View style={mainStyles.infoCard}>
            <ImageBackground source={require('@/assets/images/consult.png')} style={mainStyles.cardImage}>
              <View style={mainStyles.cardOverlay}>
                <Text style={mainStyles.cardTitle}>Consultations</Text>
                <Text style={mainStyles.cardDate}>20 August 2024</Text>
                <TouchableOpacity style={mainStyles.viewButton}>
                  <Text style={mainStyles.viewButtonText}>View Section</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={mainStyles.infoCard}>
            <ImageBackground source={require('@/assets/images/labtest.png')} style={mainStyles.cardImage}>
              <View style={mainStyles.cardOverlay}>
                <Text style={mainStyles.cardTitle}>Lab Results</Text>
                <Text style={mainStyles.cardDate}>12 June 2024</Text>
                <TouchableOpacity style={mainStyles.viewButton} onPress={() => setLabResultsModalVisible(true)}>
                  <Text style={mainStyles.viewButtonText}>View Section</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={mainStyles.infoCard}>
            <ImageBackground source={require('@/assets/images/docmeds.png')} style={mainStyles.cardImage}>
              <View style={mainStyles.cardOverlay}>
                <Text style={mainStyles.cardTitle}>Prescriptions</Text>
                <Text style={mainStyles.cardDate}>20 August 2024</Text>
                <TouchableOpacity style={mainStyles.viewButton}>
                  <Text style={mainStyles.viewButtonText}>View Section</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={mainStyles.infoCard}>
            <ImageBackground source={require('@/assets/images/medfile.png')} style={mainStyles.cardImage}>
              <View style={mainStyles.cardOverlay}>
                <Text style={mainStyles.cardTitle}>Medical Overview</Text>
                <TouchableOpacity style={mainStyles.viewButton}>
                  <Text style={mainStyles.viewButtonText}>View Section</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
      <LabResultsModal visible={labResultsModalVisible} onClose={() => setLabResultsModalVisible(false)} />
      <Navbar />
    </View>
  );
};

export default PatientDetailsScreen;