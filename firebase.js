// Import the functions you need from the SDKs you need.

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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
} from 'firebase/firestore';
import { UserContext } from './context/userContext';
import { useContext } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBR6WfETWzoCP_9vg_2rhe2L51tbu1fz2E',
  authDomain: 'naturely-3428a.firebaseapp.com',
  databaseURL:
    'https://naturely-3428a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'naturely-3428a',
  storageBucket: 'naturely-3428a.appspot.com',
  messagingSenderId: '171617270088',
  appId: '1:171617270088:web:9c3ca9ce62ca771d69db7d',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

// Util Functions

const createUser = (email, password, username) => {
  const docObj = {
    email,
    avatar_url:
      'https://firebasestorage.googleapis.com/v0/b/naturely-3428a.appspot.com/o/defaultuser.png?alt=media&token=c380dc03-d0b1-4d03-8c63-2854828ad027',
    creationDate: Date.now(),
    posts: [],
    comments: [],
  };

  getDocs(collection(firestore, 'users'))
    .then((userArr) => {
      userArr.forEach((user) => {
        if (user.id === username) {
          throw { message: 'username already exists' };
        }
      });
    })
    .then(() => {
      return setDoc(doc(firestore, 'users', username), docObj);
    })
    .then(() => {
      return createUserWithEmailAndPassword(auth, email, password);
    })
    .then(({ user }) => {
      setDoc(
        doc(firestore, 'users', username),
        {
          auth_id: user.uid,
        },
        {
          merge: true,
        }
      );
    })
    .catch((err) => {
      alert(err.message);
    });
};
//uid = docs._firestore._authCredentials.currentUser.uid
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return getDocs(collection(firestore, 'users'));
    })
    .then((docs) => {
      let username = '';
      docs.forEach((doc) => {
        if (doc.data().email === email) username = doc.id;
      });
      return username;
    })
    .catch((err) => alert(err.message));
};

const editProfilePicture = (url, username) => {
  updateDoc(doc(firestore, 'users', username), {
    avatar_url: url,
  }).catch((err) => alert(err.message));
};

const createPost = (description, picUrl, username, tags, location) => {
  addDoc(collection(firestore, 'posts'), {
    description,
    picUrl,
    username,
    tags,
    location,
  }).then((post) => {
    updateDoc(doc(firestore, 'users', username), {
      posts: arrayUnion(post.id),
    }).catch((err) => alert(err.message));
  });
};

const getPosts = () => {
  getDocs(collection(firestore, 'posts')).then((postArr) => {
    console.log(postArr.data(), '****');
    // postArr.forEach((doc) => {
    //   const docData = doc.data();
    //   let postArray = []

    // });
  });
};

// Exports

export {
  auth,
  createUser,
  loginUser,
  editProfilePicture,
  createPost,
  getPosts,
};
