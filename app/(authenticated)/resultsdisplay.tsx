import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';

interface UltrasoundDocument {
  name: string;
  date: string;
  practitionerName: string;
  url: string;
}

const ResultsDisplay = () => {
  const { id } = useLocalSearchParams();
  const [ultrasoundDocuments, setUltrasoundDocuments] = useState<UltrasoundDocument[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUltrasoundDocuments = async () => {
      if (!id) {
        console.error('No ID provided');
        return;
      }
      try {
        const docRef = doc(db, 'PatientList', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUltrasoundDocuments(docSnap.data().ultrasoundsDocuments || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching ultrasound documents:', error);
      }
    };

    fetchUltrasoundDocuments();
  }, [id]);

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {ultrasoundDocuments.map((doc, index) => (
          <View key={index} style={styles.documentContainer}>
            <Text style={styles.documentTitle}>{doc.name}</Text>
            <Text style={styles.documentDate}>Date: {doc.date}</Text>
            <Text style={styles.documentPractitioner}>Practitioner: {doc.practitionerName}</Text>
            <Image source={{ uri: doc.url }} style={styles.documentImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: 'hsl(182, 100%, 35%)',
    borderRadius: 5,
    margin: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollView: {
    padding: 20,
  },
  documentContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  documentDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  documentPractitioner: {
    fontSize: 14,
    marginBottom: 10,
  },
  documentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ResultsDisplay;