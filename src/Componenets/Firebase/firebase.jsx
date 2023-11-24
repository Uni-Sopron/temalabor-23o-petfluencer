import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9MHJfL5j5Exhoz-AtHtoSOyVauEdlFeo",
  authDomain: "petfluencer-59b74.firebaseapp.com",
  projectId: "petfluencer-59b74",
  storageBucket: "petfluencer-59b74.appspot.com",
  messagingSenderId: "622813223570",
  appId: "1:622813223570:web:1cb4a41857f3b3bc95e44b",
  measurementId: "G-4HXD7JDZ04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };