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
  return addDoc(collection(firestore, "posts"), postInfo)
    .then(() => {
      return null;
    })
    .catch((err) => alert(err.message));
};

const getPosts = ({
  Page,
  Topics,
  Location,
  order,
  extraLocations,
  LongitudeMax,
  LongitudeMin,
}) => {
  const postArray = [];
  //console.log(Topics);
  if (Topics.length > 1) Topics = Topics.filter((str) => str != "all");
  const filterSort = () => {
    if (Location) {
      console.log(extraLocations);
      console.log([
        ...Location.split(", "),
        ...extraLocations.filter((loc) => loc),
      ]);
      return query(
        collection(firestore, "posts"),
        where("locationName", "array-contains-any", [
          ...Location.split(", "),
          ...extraLocations.filter((loc) => loc),
        ]),
        orderBy("createdDate", "desc")
        // startAfter(Page),
        // limit(10)
      );
    }
    // } else if (LongitudeMax && LongitudeMin) {
    //   if (LongitudeMax < LongitudeMin) {
    //     [LongitudeMax, LongitudeMin] = [LongitudeMax, LongitudeMin];
    //   }
    //   return query(
    //     collection(firestore, "posts"),
    //     where("Longitude", "<", LongitudeMax),
    //     where("Longitude", ">", LongitudeMin),
    //     limit(100)
    //   );
    // }
    else {
      return query(
        collection(firestore, "posts"),
        where("topics", "array-contains-any", Topics),
        orderBy("createdDate", "desc")
        // startAfter(Page),
        // limit(10)
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
      collection(firestore, "posts"),
      where("author", "==", username),
      orderBy("createdDate", "desc")
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
  return getDoc(doc(firestore, "posts", postId))
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
