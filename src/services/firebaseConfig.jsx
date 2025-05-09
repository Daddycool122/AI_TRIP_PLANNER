// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABxt6Z65hqXPoegsKgSxUwPD_veyVYay8",
  authDomain: "ai-trip-planner-2f4db.firebaseapp.com",
  projectId: "ai-trip-planner-2f4db",
  storageBucket: "ai-trip-planner-2f4db.appspot.com",
  messagingSenderId: "51764512447",
  appId: "1:51764512447:web:1c57681f5e8e1906dfe80a",
  measurementId: "G-XZ4EJHGBXB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
