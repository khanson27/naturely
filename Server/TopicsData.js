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
} from "firebase/firestore";

const createTopic = (TopicInfo) => {
  addDoc(collection(firestore, "topics"), TopicInfo)
    .then(() => {
      return null;
    })
    .catch((err) => alert(err.message));
};

const getTopics = () => {
  const TopicArray = [];
  return getDocs(collection(firestore, "topics"))
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        TopicArray.push({ ...docData, id: doc.id });
      });
      return TopicArray;
    })
    .catch((err) => alert(err.message));
};

export { createTopic, getTopics };
