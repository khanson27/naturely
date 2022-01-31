// Import the functions you need from the SDKs you need.

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA0v6KAsqgW1pI3JOsejrWlZ7ZdjG3rKTQ",
  authDomain: "miniapp-12f4f.firebaseapp.com",
  databaseURL: "https://miniapp-12f4f-default-rtdb.firebaseio.com",
  projectId: "miniapp-12f4f",
  storageBucket: "miniapp-12f4f.appspot.com",
  messagingSenderId: "196893777154",
  appId: "1:196893777154:web:e9e643278f07289d70361b",
  measurementId: "G-GFZBJ2XJK4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

export { auth, app, firestore };
