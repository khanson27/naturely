import { firestore } from "./firebase.js";
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
  limit,
  startAt,
  endAt,
  orderBy,
  startAfter,
} from "firebase/firestore";

const createPost = (postInfo) => {
  addDoc(collection(firestore, "posts"), postInfo)
    .then((post) => {
      console.log(post);
      return post;
    })
    .catch((err) => alert(err.message));
};

const getPosts = (page) => {
  const postArray = [];
  return getDocs(
    query(
      collection(firestore, "posts"),
      orderBy("createdDate"),
      startAfter(page),
      limit(9)
    )
  )
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        postArray.push({ ...docData, id: doc.id });
      });

      console.log("page: ", page);
      return postArray;
    })
    .catch((err) => alert(err.message));
};

export { createPost, getPosts };
