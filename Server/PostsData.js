import { firestore } from "./firebase,js";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const createPost = (postInfo) => {
  addDoc(collection(firestore, "posts"), postInfo)
    .then((post) => {
      console.log(post);
      return post;
    })
    .catch((err) => alert(err.message));
};

const getPosts = () => {
  const postArray = [];
  return getDocs(collection(firestore, "posts"))
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        postArray.push({ ...docData, id: doc.id });
      });
      return postArray;
    })
    .catch((err) => alert(err.message));
};

export { createPost, getPosts };
