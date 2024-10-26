import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { db as firestore } from '@/services/firebase';
import { collection, query, where, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore';
import SuccessPopup from '@/components/SuccessPopup';
import Navbar from '@/components/Navbar';
import LabResultsModal from '@/components/LabResultsModal'; // Added import

interface AppointmentDetails {
  appointmentDateTime: string;
  department: string;
  doctorName: string;
  reason: string;
  patientId: string;
  patientName?: string;
  medicalHistory?: string;
}

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Added state
  const [selectedPatientId, setSelectedPatientId] = useState(''); // Added state
  const router = useRouter();

  const handleDateSelect = async (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    try {
      const appointmentsRef = collection(firestore, 'Appointments_9510197649241');
      const q = query(
        appointmentsRef,
        where('appointmentDateTime', '>=', `${day.dateString}T00:00`),
        where('appointmentDateTime', '<=', `${day.dateString}T23:59`)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const appointmentsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => { // Renamed the parameter to docSnapshot
            const appointment = docSnapshot.data() as AppointmentDetails;
            const patientId = docSnapshot.ref.parent.id.split('_')[1];
            const patientRef = firestoreDoc(firestore, 'PatientList', patientId); // Renamed doc to firestoreDoc
            const patientDoc = await getDoc(patientRef);
            if (patientDoc.exists()) {
              const patientData = patientDoc.data() as { firstName: string; medicalHistory: string };
              return {
                ...appointment,
                patientFirstName: patientData.firstName,
                patientMedicalHistory: patientData.medicalHistory,
              };
            }
            console.log('No patient found for id:', appointment.patientId);
            return appointment;
          })
        );
        console.log('Appointments data with patient info:', appointmentsData);
        setAppointmentDetails(appointmentsData);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
      } else {
        console.log('No appointments found for the selected date.');
        setAppointmentDetails([]);
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 2000);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  const handleClose = () => { // Added function
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Appointments</Text>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate={'2024-01-01'}
        maxDate={'2024-12-31'}
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'hsl(186, 100%, 19%)' },
        }}
        theme={{
          selectedDayBackgroundColor: 'hsl(186, 100%, 19%)',
          todayTextColor: 'hsl(186, 100%, 19%)',
          arrowColor: 'hsl(186, 100%, 19%)',
          textSectionTitleColor: 'hsl(186, 100%, 19%)',
        }}
        style={styles.calendar}
      />
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        {appointmentDetails.length > 0 ? (
          appointmentDetails.map((appointment, index) => (
            <View key={index} style={styles.appointmentDetailsContainer}>
              <Text style={{ color: 'black' }}>Time: {appointment.appointmentDateTime}</Text>
              <Text style={{ color: 'black' }}>Doctor: {appointment.doctorName}</Text>
              <Text style={{ color: 'black' }}>Department: {appointment.department}</Text>
              <Text style={{ color: 'black' }}>Reason: {appointment.reason}</Text>
            </View>
          ))
        ) : (
          <Text>No appointments found for the selected date.</Text>
        )}
      </View>
      {showSuccessPopup && <SuccessPopup message="Appointment details pulled successfully!" />}
      {showErrorPopup && <SuccessPopup message="No appointment details found." />}
      <LabResultsModal visible={modalVisible} onClose={handleClose} patientId={selectedPatientId} />
    </View>
  );
};

export default AppointmentsPage;
