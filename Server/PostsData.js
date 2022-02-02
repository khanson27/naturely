import { firestore } from './firebase.js';
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
} from 'firebase/firestore';

const createPost = (postInfo) => {
<<<<<<< HEAD
  return addDoc(collection(firestore, "posts"), postInfo)
    .then(() => {
      return null;
=======
  addDoc(collection(firestore, 'posts'), postInfo)
    .then((post) => {
      return post;
>>>>>>> main
    })
    .catch((err) => alert(err.message));
};

const getPosts = ({ Page, Topics, Location, order }) => {
  const topicsArr = Topics || [];
  const postArray = [];
<<<<<<< HEAD
  console.log(Location);
  const filterSort = () => {
    if (topicsArr.length) {
      return query(
        collection(firestore, "posts"),
        where("topics", "array-contains-any", topics),
        orderBy("createdDate", "desc"),
        startAfter(Page),
        limit(10)
      );
    } else if (Location) {
      return query(
        collection(firestore, "posts"),
        where("locationName", "array-contains", Location),
        orderBy("createdDate", "desc"),
        startAfter(Page),
=======
  if (topicsArr.length) {
    return getDocs(
      query(
        collection(firestore, 'posts'),
        where('topics', 'array-contains-any', topics),
        orderBy('createdDate', 'desc'),
        startAfter(page),
        limit(10)
      )
    )
      .then((arr) => {
        arr.forEach((doc) => {
          const docData = doc.data();
          postArray.push({ ...docData, id: doc.id });
        });
        return postArray;
      })
      .catch((err) => console.log(err.message));
  } else {
    return getDocs(
      query(
        collection(firestore, 'posts'),
        orderBy('createdDate', 'desc'),
        startAfter(page),
>>>>>>> main
        limit(10)
      );
    } else {
      return query(
        query(
          collection(firestore, "posts"),
          orderBy("createdDate", "desc"),
          startAfter(Page),
          limit(10)
        )
      );
    }
  };
  return getDocs(filterSort())
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        postArray.push({ ...docData, id: doc.id });
      });
      return postArray;
    })
    .catch((err) => console.log(err.message));
};

const getUserPosts = (username) => {
  const postArr = [];
  return getDocs(
    query(
      collection(firestore, 'posts'),
      where('username', '==', username),
      orderBy('createdDate', 'desc')
    )
  )
    .then((arr) => {
      arr.forEach((doc) => {
        const docData = doc.data();
        postArr.push({ ...docData, id: doc.id });
      });

      return postArr;
    })
    .catch((err) => console.log(err.message));
};

const getSinglePost = (postId) => {
  return getDoc(doc(firestore, 'posts', postId))
    .then((post) => {
      return post.data();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const createComment = (postId, commentContent, username) => {
  return addDoc(collection(firestore, "comments"), commentContent)
    .then((comment) => {
      updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(comment.id),
      });
      updateDoc(doc(firestore, "users", username), {
        comments: arrayUnion(comment.id),
      });
      return comment;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getComments = (postId) => {
  const commentArr = [];
  return getDocs(
    query(
      collection(firestore, "comments"),
      where("postId", "==", postId),
      orderBy("createdDate")
    )
  )
    .then((comments) => {
      comments.forEach((comment) => {
        commentArr.push(comment.data());
      });

      return commentArr;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export {
  createPost,
  getPosts,
  getUserPosts,
  getSinglePost,
  createComment,
  getComments,
};
