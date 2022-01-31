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
  apiKey: "AIzaSyBR6WfETWzoCP_9vg_2rhe2L51tbu1fz2E",
  authDomain: "naturely-3428a.firebaseapp.com",
  databaseURL:
    "https://naturely-3428a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "naturely-3428a",
  storageBucket: "naturely-3428a.appspot.com",
  messagingSenderId: "171617270088",
  appId: "1:171617270088:web:9c3ca9ce62ca771d69db7d",
  measurementId: "G-ZYZ8CXCJYZ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

export { auth, app, firestore };
