// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi9I3C2RsOJg0U84tG6bNNxVPpeHdJ9No",
  authDomain:"chat-app-2639f.firebaseapp.com",
  projectId: "chat-app-2639f",
  storageBucket: "chat-app-2639f.appspot.com",
  messagingSenderId: "278572311349",
  appId: "1:278572311349:web:8b5b3d28a727478726a27c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();