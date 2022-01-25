// Import the functions you need from the SDKs you need.

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, setDoc, doc, Timestamp } from "firebase/firestore";

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
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

// Util Functions

const createUser = (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      const docObj = {
        email,
        username,
        avatar_url: "./defaultuser.png",
        creationDate: Date.now(),
      };
      setDoc(doc(firestore, "users", user.uid), docObj);
    })
    .then(() => {
      signInWithEmailAndPassword(auth, email, password);
    })
    .catch((err) => alert(err.message));
};

const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((err) =>
    alert(err.message)
  );
};

// Exports

export { auth, createUser, loginUser };
