import { firestore } from "../Server/firebase.js";
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

const createComment = (CommentInfo) => {
  addDoc(collection(firestore, "comments"), CommentInfo)
    .then((Comment) => {
      return Comment;
    })
    .catch((err) => alert(err.message));
};

const getComments = () => {
  const CommentArray = [];
  return getDocs(collection(firestore, "comments"))
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        CommentArray.push({ ...docData, id: doc.id });
      });
      return CommentArray;
    })
    .catch((err) => alert(err.message));
};

export { createComment, getComments };
