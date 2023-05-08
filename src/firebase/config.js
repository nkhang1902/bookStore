// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefDQn_Q49454Cq5EwEpQ4VdqhFh41tbY",
  authDomain: "book-store-cd8fd.firebaseapp.com",
  databaseURL: "https://book-store-cd8fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "book-store-cd8fd",
  storageBucket: "book-store-cd8fd.appspot.com",
  messagingSenderId: "640132342498",
  appId: "1:640132342498:web:a176dd531d4520861b34bb",
  measurementId: "G-3GBR29P1MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
