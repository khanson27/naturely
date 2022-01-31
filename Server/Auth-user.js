// Import the functions you need from the SDKs you need.
import { app, auth, firestore } from "./firebase.js";
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

const createUser = async (email, password, username) => {
  const docObj = {
    email,
    avatar_url:
      "https://firebasestorage.googleapis.com/v0/b/naturely-3428a.appspot.com/o/defaultuser.png?alt=media&token=c380dc03-d0b1-4d03-8c63-2854828ad027",
    creationDate: Date.now(),
    // posts: [],
    // comments: [], no need for those every comment and post will have a username data entry
    followers: [],
    following: [],
    username: username,
  };
  try {
    const findUsername = await getDocs(
      query(collection(firestore, "users"), where("username", "==", username))
    );
    if (!findUsername.empty) throw { message: "username already exists" };
    await createUserWithEmailAndPassword(auth, email, password);
    docObj.userId = getAuth().currentUser.uid;
    setDoc(doc(firestore, "users", username), docObj);
  } catch (err) {
    alert(err.message);
  }
};

const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userData = await getDocs(
      query(collection(firestore, "users"), where("email", "==", email))
    );
    let user = {};
    userData.forEach((doc) => {
      user = doc.data();
    });
    return user;
  } catch (err) {
    alert(err.message);
  }
};

const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      alert("visit us again soon!");
    })
    .catch((err) => alert(err.message));
};

const editProfilePicture = (url, username) => {
  updateDoc(doc(firestore, "users", username), {
    avatar_url: url,
  }).catch((err) => alert(err.message));
};

const getUsers = async () => {
  const usersArray = [];
  return getDocs(collection(firestore, "users"))
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        usersArray.push({ ...docData });
      });
      return usersArray;
    })
    .catch((err) => {}); // alert(err.message));
};

const getUser = async (username) => {
  try {
    const user = await getDoc(doc(firestore, "users", username));
    return user.data();
  } catch (err) {
    alert(err.message);
  }
};

const getUsersFollow = async (users, follow) => {
  try {
    const users = await getDocs(
      query(
        collection(firestore, "users"),
        where(follow, "contains", user.username)
      )
    );
    const user = [];
    userData.forEach((doc) => {
      user.push(doc.data());
    });
    return user;
  } catch (err) {
    alert(err.message);
  }
};

export {
  auth,
  createUser,
  editProfilePicture,
  getUser,
  loginUser,
  onAuthStateChanged,
  signOutUser,
  getUsers,
};
