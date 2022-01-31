// Import the functions you need from the SDKs you need.
import { app } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const SaveStorage = async (image, path) => {
  if (image == "default") return "";
  const spaceRef = ref(storage, path);
  const response = await fetch(image);
  const blob = await response.blob();
  const downloadURL = await uploadBytes(spaceRef, blob);
  const url = getDownloadURL(spaceRef, path);
  return url;
};

const uploadImage = async ({ image, path }) => {
  return await SaveStorage(image, path);
};

export { uploadImage };
