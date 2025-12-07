// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvpmZt6oA8WsGSdyuWiV6VmIXIRRf4Fv4",
  authDomain: "pbp-chat-95010.firebaseapp.com",
  projectId: "pbp-chat-95010",
  storageBucket: "pbp-chat-95010.firebasestorage.app",
  messagingSenderId: "162469179168",
  appId: "1:162469179168:web:318f9af03aab9c9d687145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
