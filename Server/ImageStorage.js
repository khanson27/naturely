// Import the functions you need from the SDKs you need.
import { app } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const SaveStorage = async (image, path) => {
  if (image == "default") return "";
  const storage = getStorage();
  const spaceRef = ref(storage, path);
  const response = await fetch(image);
  const blob = await response.blob();
  const downloadURL = await uploadBytes(spaceRef, blob);
  return downloadURL;
};

const uploadImage = async ({ image, path, username, page }) => {
  let downloadURL = await SaveStorage(image, path);
  if (page === "user") {
    return `https://firebasestorage.googleapis.com/v0/b/${downloadURL.metadata.bucket}/o/user%2F${username}%2F${downloadURL.metadata.name}?alt=media`;
  } else if (page === "topic") {
    return `https://firebasestorage.googleapis.com/v0/b/${downloadURL.metadata.bucket}/o/topic%2F${downloadURL.metadata.name}?alt=media`;
  }
};

export { uploadImage };
