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

const createPost = (postInfo) => {
  addDoc(collection(firestore, "posts"), postInfo)
    .then((post) => {
      console.log(post);
      return post;
    })
    .catch((err) => alert(err.message));
};

const createPostOld = (
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
      return Promise.all([fetch(picUrl), post]);
    })
    .then((promise) => {
      const image = promise[0];
      const post = promise[1];
      return Promise.all([image.blob(), post]);
    })
    .then((promise) => {
      const file = promise[0];
      const post = promise[1];
      return Promise.all([uploadBytes(ref(storage, post.id), file), post]);
    })
    .then((promise) => {
      const post = promise[1];
      return Promise.all([getDownloadURL(ref(storage, post.id)), post]);
    })
    .then((promise) => {
      const url = promise[0];
      const post = promise[1];
      console.log(url);
      updateDoc(doc(firestore, "posts", post.id), {
        picUrl: url,
      });
      updateDoc(doc(firestore, "users", username), {
        posts: arrayUnion(post.id),
      }).catch((err) => alert(err.message));
    });
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
