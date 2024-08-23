import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { useLocalSearchParams } from 'expo-router';
import { getUserDetails } from '@/app/(authenticated)/userService';

import MedicalRecordsModal from '@/components/MedicalRecordsModal';
import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { Ionicons } from '@expo/vector-icons';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalRecords, setModalRecords] = useState<any[]>([]); // Update the type to any[]

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const details = await getUserDetails(id as string);
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  const fetchXRayRecords = async (userId: string) => {
    try {
        // Reference to the specific document for the logged-in user
        const userDocRef = doc(firestore, 'PatientList', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            console.log('Fetched user data:', userData);
            console.log('Available keys in userData:', Object.keys(userData));

            // Access the x-raysDocuments field if it exists
            let xRayRecords = userData["x-raysDocuments"];
            if (xRayRecords && Array.isArray(xRayRecords)) {
                console.log('Fetched X-ray records:', xRayRecords);
                setModalRecords(xRayRecords); // Display the X-ray records
            } else {
                console.log('No X-ray records found.');
                setModalRecords([]); // No records found
            }
        } else {
            console.log('No matching document found for user ID:', userId);
            setModalRecords([]); // Clear records if no document is found
        }
    } catch (error) {
        console.error('Error fetching X-ray records:', error);
    }
};





  

  if (loading) {
    return (
      <View style={styles.container}>
        <AppBar title="Dashboard" />
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
        <AppBar title="Dashboard" />
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
          fetchXRayRecords(id as string); // Pass the correct user ID here
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
              source={require('@/assets/images/gran.png')}
              style={styles.profileImage}
            />
            <View style={styles.greetingTextContainer}>
            <Text style={{...styles.greeting, fontSize: 14}}>Good Morning, {userDetails.firstName || 'User'}!</Text>
              <Text style={styles.subGreeting}>You have 2 upcoming appointments and 1 new health alert.</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={{...styles.sectionTitle, fontSize: 15}}>Medical History</Text>
          <View style={styles.conditionsContainer}>
            {userDetails.medicalHistory ? (
              <View style={styles.conditionItem}>
                <Ionicons name="heart-outline" size={24} color="#FF5733" />
                <Text style={styles.conditionText}>{userDetails.medicalHistory}</Text>
              </View>
            ) : (
              <Text>No medical history available</Text>
            )}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Medical Records</Text>
          <View style={styles.medicalRecordsContainer}>
            <MedicalRecordItem
              title="X-ray"
              imagePath={require('@/assets/images/xraymachine.png')}
              date="2023-10-01"
              type="xray"
            />
            <MedicalRecordItem
              title="MRI"
              imagePath={require('@/assets/images/mrimachine.png')}
              date="2023-09-25"
              type="mri"
            />
            <MedicalRecordItem
              title="Blood Tests"
              imagePath={require('@/assets/images/BLOODTEST.png')}
              date="2023-09-15"
              type="blood"
            />
            <MedicalRecordItem
              title="Ultrasound"
              imagePath={require('@/assets/images/ultra.png')}
              date="2023-09-20"
              type="ultrasound"
            />
          </View>
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