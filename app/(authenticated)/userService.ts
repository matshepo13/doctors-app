import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function checkIdInFirestore(idNumber: string): Promise<boolean> {
    const usersRef = collection(firestore, 'PatientList');
    const q = query(usersRef, where('idNumber', '==', idNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  export async function getUserDetails(idNumber: string) {
    const usersRef = collection(firestore, 'PatientList');
    const q = query(usersRef, where('idNumber', '==', idNumber));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      console.log('Fetched user data:', userData); // Add this line for debugging
      return userData;
    }
    return null;
  }