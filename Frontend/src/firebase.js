// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGHE19T8O4bFqKR36VcwN9rJvtQh8uCVI",
  authDomain: "agrideals-62e82.firebaseapp.com",
  projectId: "agrideals-62e82",
  storageBucket: "agrideals-62e82.appspot.com",
  messagingSenderId: "877300729173",
  appId: "1:877300729173:web:5e58804100c8d8c6449bdc",
  measurementId: "G-5RTRC0546Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };