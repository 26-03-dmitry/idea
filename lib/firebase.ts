// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqpbCX85UlHdc5wY8KIi-67t01rgyON5o",
  authDomain: "dedamitsa.firebaseapp.com",
  projectId: "dedamitsa",
  storageBucket: "dedamitsa.firebasestorage.app",
  messagingSenderId: "686015008551",
  appId: "1:686015008551:web:5d357e62df0466f02c2302",
  measurementId: "G-RQWCT0NQNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 