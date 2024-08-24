import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, ActivityIndicator, TouchableOpacity, Text, TextInput } from 'react-native';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { useLocalSearchParams } from 'expo-router';
import { getUserDetails } from '@/app/(authenticated)/userService';

import MedicalRecordsModal from '@/components/MedicalRecordsModal';
import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalRecords, setModalRecords] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const details = await getUserDetails(id as string);
        console.log('Fetched user details:', details);
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    async function fetchAllAppointments() {
      try {
        if (!userDetails) {
          console.log('User details not available yet.');
          return;
        }

        const patientListRef = collection(firestore, 'PatientList');
        const patientSnapshot = await getDocs(patientListRef);
        const allAppointments: any[] = [];

        for (const patientDoc of patientSnapshot.docs) {
          const patientId = patientDoc.data().idNumber;
          const collectionName = `Appointments_${patientId}`;
          console.log('Fetching appointments from collection:', collectionName);

          const appointmentsRef = collection(firestore, collectionName);
          const querySnapshot = await getDocs(appointmentsRef);

          if (!querySnapshot.empty) {
            const appointmentsData = querySnapshot.docs
              .map(doc => doc.data())
              .filter(appointment => appointment.department.slice(0, 3).toLowerCase() === userDetails.profession.slice(0, 3).toLowerCase()); // Filter by first 3 letters of profession
            console.log(`Fetched appointments for patient ${patientId}:`, appointmentsData);
            allAppointments.push(...appointmentsData);
          } else {
            console.log(`No appointments found for patient ${patientId}.`);
          }
        }

        setAppointments(allAppointments);
      } catch (error) {
        console.error('Error fetching all appointments:', error);
      }
    }

    fetchAllAppointments();
  }, [userDetails]);

  const fetchXRayRecords = async (userId: string) => {
    try {
      const userDocRef = doc(firestore, 'PatientList', userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('Fetched user data:', userData);
        console.log('Available keys in userData:', Object.keys(userData));

        let xRayRecords = userData["x-raysDocuments"];
        if (xRayRecords && Array.isArray(xRayRecords)) {
          console.log('Fetched X-ray records:', xRayRecords);
          setModalRecords(xRayRecords);
        } else {
          console.log('No X-ray records found.');
          setModalRecords([]);
        }
      } else {
        console.log('No matching document found for user ID:', userId);
        setModalRecords([]);
      }
    } catch (error) {
      console.error('Error fetching X-ray records:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppBar title="User Details" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        <Navbar />
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <AppBar title="User Details" />
        <Text>User not found</Text>
        <Navbar />
      </View>
    );
  }

  const MedicalRecordItem = ({ title, imagePath, date, type }: { title: string; imagePath: any; date: string; type: string }) => (
    <View style={styles.medicalRecordItem}>
      <Image source={imagePath} style={styles.medicalRecordImage} />
      <Text style={styles.medicalRecordTitle}>{title}</Text>
      
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          setModalTitle(`${title}'s Records`);
          fetchXRayRecords(id as string);
          setModalVisible(true);
        }}
      >
        <Text style={styles.viewButtonText}>View Folder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.greetingContainer}>
          <View style={styles.greetingContent}>
            <Image
              source={require('@/assets/images/drtumi.png')}
              style={styles.profileImage}
            />
            <View style={styles.greetingTextContainer}>
              <Text style={{...styles.greeting, fontSize: 14}}>Good Morning, Dr. {userDetails.surname || 'User'}!</Text>
              <Text style={styles.subGreeting}>You have 2 upcoming appointments and 1 new health alert.</Text>
              <View style={styles.professionContainer}>
                <FontAwesome name="stethoscope" size={24} color="#FF5733" style={styles.professionIcon} />
                <Text style={styles.professionText}>{userDetails.profession || 'No profession available'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* New Find a Patient Section */}
        <View style={styles.findPatientContainer}>
          <View style={styles.findPatientHeader}>
            <Text style={styles.findPatientTitle}>Find a patient</Text>
            <TouchableOpacity>
              <Text style={styles.findPatientSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search patient"
            placeholderTextColor="#999"
          />
        </View>

        {/* New My Appointment Schedule Section */}
        <View style={styles.findPatientContainer}>
          <View style={styles.findPatientHeader}>
            <Text style={styles.findPatientTitle}>My Appointment Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.findPatientSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal>
            {appointments.map((appointment, index) => (
              <View key={index} style={styles.appointmentCard}>
                <Text style={styles.appointmentDate}>{new Date(appointment.appointmentDateTime).toLocaleDateString()}</Text>
                <Text style={styles.appointmentReason}>{appointment.reason}</Text>
                <Text style={styles.appointmentDepartment}>{appointment.department}</Text>
                <Text style={styles.appointmentPatient}>{appointment.patientName}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <Navbar />
      <MedicalRecordsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        records={modalRecords}
      />
    </View>
  );
}