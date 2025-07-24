import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBQCWYUC7kRYS28-Q3MS5XZUWaDEbM1mBo",
  authDomain: "job-finder-32r-daa96.firebaseapp.com",
  projectId: "job-finder-32r-daa96",
  storageBucket: "job-finder-32r-daa96.firebasestorage.app",
  messagingSenderId: "1036661735425",
  appId: "1:1036661735425:web:1fdb0e048ed3165fd24000",
  measurementId: "G-J05DTMW4QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication=getAuth(app)
export const db=getFirestore(app)