// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Add Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCXMWU7y8B87cRIlfL5iiTFQJfWhAvqVUM",
  authDomain: "test-website-638af.firebaseapp.com",
  projectId: "test-website-638af",
  storageBucket: "test-website-638af.appspot.com", // Fix typo: should be "appspot.com"
  messagingSenderId: "109097486454",
  appId: "1:109097486454:web:cf2565689e6d2c5debb757",
  measurementId: "G-MSWRYFFYPH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // <-- Initialize Firestore

export { auth, googleProvider, db };