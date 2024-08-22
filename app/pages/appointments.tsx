import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SuccessPopup from '@/components/SuccessPopup';

interface AppointmentDetails {
  appointmentDateTime: string;
  department: string;
  doctorName: string;
  reason: string;
}

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const router = useRouter();

  const handleDateSelect = async (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    try {
      const appointmentsRef = collection(firestore, 'Appointments_6307189765234081');
      const q = query(
        appointmentsRef,
        where('appointmentDateTime', '>=', `${day.dateString}T00:00`),
        where('appointmentDateTime', '<=', `${day.dateString}T23:59`)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const appointmentData = querySnapshot.docs[0].data() as AppointmentDetails;
        setAppointmentDetails(appointmentData);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
      } else {
        setAppointmentDetails(null);
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 2000);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>Selected Date: {selectedDate}</Text>
        {appointmentDetails && (
          <View>
            <Text style={{ color: 'black' }}>Time: {appointmentDetails.appointmentDateTime}</Text>
            <Text style={{ color: 'black' }}>Doctor: {appointmentDetails.doctorName}</Text>
            <Text style={{ color: 'black' }}>Department: {appointmentDetails.department}</Text>
            <Text style={{ color: 'black' }}>Reason: {appointmentDetails.reason}</Text>
          </View>
        )}
      </View>
      {showSuccessPopup && <SuccessPopup message="Appointment details pulled successfully!" />}
      {showErrorPopup && <SuccessPopup message="No appointment details found." />}
    </View>
  );
};

export default AppointmentsPage;