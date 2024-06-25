
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "capzapp-69fdd.firebaseapp.com",
  projectId: "capzapp-69fdd",
  storageBucket: "capzapp-69fdd.appspot.com",
  messagingSenderId: "715424400843",
  appId: "1:715424400843:web:b6c124795540e39789624e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
