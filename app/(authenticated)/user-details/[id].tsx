import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { useLocalSearchParams } from 'expo-router';
import { getUserDetails } from '@/app/(authenticated)/userService';

import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { Ionicons } from '@expo/vector-icons';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const MedicalRecordItem = ({ title, imagePath, date }: { title: string; imagePath: any; date: string }) => (
    <View style={styles.medicalRecordItem}>
      <Image source={imagePath} style={styles.medicalRecordImage} />
      <Text style={styles.medicalRecordTitle}>{title}</Text>
      <Text style={styles.medicalRecordDate}>Uploaded on {date}</Text>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Images</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppBar title="Dashboard" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good Morning, {userDetails.firstName || 'User'}!</Text>
          <Text style={styles.subGreeting}>You have 2 upcoming appointments and 1 new health alert.</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Medical History</Text>
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
            />
            <MedicalRecordItem 
              title="MRI" 
              imagePath={require('@/assets/images/mrimachine.png')} 
              date="2023-09-25"
            />
            <MedicalRecordItem 
              title="Blood Tests" 
              imagePath={require('@/assets/images/BLOODTEST.png')} 
              date="2023-09-15"
            />
            <MedicalRecordItem 
              title="Ultrasound" 
              imagePath={require('@/assets/images/ultra.png')} 
              date="2023-09-20"
            />
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
}