// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIw-LRZJrN2JOgAeOoql6FDfeSpmWPnTU",
  authDomain: "retroratings.firebaseapp.com",
  projectId: "retroratings",
  storageBucket: "retroratings.appspot.com",
  messagingSenderId: "115218741776",
  appId: "1:115218741776:web:a970fc843e9e100cf6a895",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
