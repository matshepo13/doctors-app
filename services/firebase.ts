// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHnyILPuE4844-tDYBbtAjn4l7tvPXXek",
    authDomain: "caresync-a013a.firebaseapp.com",
    projectId: "caresync-a013a",
    storageBucket: "caresync-a013a.appspot.com",
    messagingSenderId: "948454772859",
    appId: "1:948454772859:web:58f46b1a3833ca05b512de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore and Auth services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
