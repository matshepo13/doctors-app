import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddConsultationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (consultation: any) => void;
}

const AddConsultationModal: React.FC<AddConsultationModalProps> = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTitle('');
      setDate(null);
      setTime(null);
      setNotes('');
      setAdditionalNotes('');
    }
  }, [visible]);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    const newConsultation = {
      id: Date.now(), // Generate a unique ID
      doctorName: 'Dr. Williams', // Replace with the logged-in doctor's name
      date: date || new Date(), // Ensure date is a Date object
      specialty: 'User Profession', // Replace with the logged-in user's profession
      type: title,
    };
    onSubmit(newConsultation);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Consultation</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Consultation Title</Text>
            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Consultation Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Date</Text>
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="hh:mm"
                value={time ? time.toTimeString().split(' ')[0] : 'hh:mm'}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Consultation Notes</Text>
            <TextInput
              style={styles.input}
              placeholder="Consultation Notes"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Additional Notes</Text>
            <TextInput
              style={styles.input}
              placeholder="Additional Notes"
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'hsl(182, 100%, 35%)',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputTitle: {
    color: 'black',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'hsl(182, 100%, 35%)',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddConsultationModal;