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
  getStorage,
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

const createUser = (email, password, username) => {
  const docObj = {
    email,
    avatar_url:
      "https://firebasestorage.googleapis.com/v0/b/naturely-3428a.appspot.com/o/defaultuser.png?alt=media&token=c380dc03-d0b1-4d03-8c63-2854828ad027",
    creationDate: Date.now(),
    posts: [],
    comments: [],
  };

  getDocs(collection(firestore, "users"))
    .then((userArr) => {
      userArr.forEach((user) => {
        if (user.id === username) {
          throw { message: "username already exists" };
        }
      });
    })
    .then(() => {
      return setDoc(doc(firestore, "users", username), docObj);
    })
    .then(() => {
      return createUserWithEmailAndPassword(auth, email, password);
    })
    .then(({ user }) => {
      setDoc(
        doc(firestore, "users", username),
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
  return signInWithEmailAndPassword(auth, email, password).then(() => {
    return getDocs(
      query(collection(firestore, "users"), where("email", "==", email))
    )
      .then((docs) => {
        let username = "";
        docs.forEach((doc) => {
          username = doc.id;
        });
        return username;
      })
      .catch((err) => alert(err.message));
  });
};

const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    })
    .catch((err) => alert(err.message));
};

const editProfilePicture = (url, username) => {
  updateDoc(doc(firestore, "users", username), {
    avatar_url: url,
  }).catch((err) => alert(err.message));
};

// img:  Object {
//   "height": 391.42857142857144,
//   "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fnaturely-6e84b6be-4eb7-45d6-b268-0cde07fef8d2/Camera/b4b26591-48df-48e9-84f4-b0c9e6f9d55c.jpg",
//   "width": 391.42857142857144,
// }
// postLocation  Object {
//   "latitude": 53.26977772507978,
//   "latitudeDelta": 0.011524782809331668,
//   "longitude": -2.461636047810316,
//   "longitudeDelta": 0.010262466967105865,
// }
// postLocationName  Lostock Gralam
// description  Stuff
// selectedTopics  Array [
//   "dog",
// ]

// LINES 140-150 UNCOMMENT

// const uploadImage = async (picUrl, postId) => {
//   const storageRef = ref(storage, postId);
//   fetch(picUrl)
//     .then((image) => {
//       return image.blob();
//     })
//     .then((file) => {
//       uploadBytes(storageRef, file).then((snapshot) => {
//         console.log(snapshot);
//       });
//     });

// const image = await fetch(picUrl);
// const file = image.blob();
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log("Uploaded a blob or file!");
// });
//};

const createPost = (
  description,
  picUrl,
  username,
  tags,
  location,
  locationName
) => {
  addDoc(collection(firestore, "posts"), {
    description,
    username,
    tags,
    location,
    locationName,
  })
    .then((post) => {
      uploadImage(picUrl, post.id);
      return post;
    })
    .then((post) => {
      updateDoc(doc(firestore, "users", username), {
        posts: arrayUnion(post.id),
      }).catch((err) => alert(err.message));
    });
};

const getPosts = () => {
  let postArray = [];
  return getDocs(collection(firestore, "posts"))
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        postArray.push({ ...docData, id: doc.id });
      });
      // console.log(postArray);
      return postArray;
    })
    .catch((err) => alert(err.message));
};

const getUser = (username) => {
  return getDoc(doc(firestore, "users", username))
    .then((user) => {
      return user.data();
    })
    .catch((err) => alert(err.message));
};

const getUsers = () => {
  let usersArray = [];
  return getDocs(collection(firestore, "users"))
    .then((arr) => {
      arr.forEach((user) => {
        const userData = user.data();
        if (usersArray.length < 3) {
          usersArray.push({ ...userData, id: user.userId });
        }
      });
      return usersArray;
    })
    .catch((err) => alert(err.message));
};

const searchFromBrowse = (selection, queryTerm) => {
  const searchArray = [];
  if (selection === "users") {
    return getDocs(
      query(collection(firestore, "users"), where("username", "==", queryTerm))
    )
      .then((users) => {
        users.forEach((user) => {
          const userData = user.data;
          searchArray.push({ ...userData, id: user.id });
        });
        console.log(searchArray);
        return searchArray;
      })
      .catch((err) => alert(err.message));
  } else if (selection === "topics") {
    return getDocs(
      query(collection(firestore, "posts"), where("topics(0)", "==", queryTerm))
    ) //Should it be posts/topics ? To access nested topics array.
      .then((posts) => {
        posts.forEach((post) => {
          const postData = post.data;
          searchArray.push({ ...postData, id: post.id });
        });
        console.log(searchArray);
        return searchArray;
      })
      .catch((err) => alert(err.message));
  }
};

// Exports

export {
  auth,
  createUser,
  createPost,
  editProfilePicture,
  getPosts,
  getUser,
  loginUser,
  onAuthStateChanged,
  signOutUser,
  getUsers,
  searchFromBrowse,
  firestore,
  app,
};
