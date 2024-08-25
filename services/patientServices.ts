import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getPatientDetails(idNumber: string) {
  const patientsRef = collection(firestore, 'PatientList');
  const q = query(patientsRef, where('idNumber', '==', idNumber));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
  return null;
}