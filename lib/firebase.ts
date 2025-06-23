// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Проверяем, запущен ли сайт статически
const isStaticSite = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  if (isStaticSite) {
    console.log('Firebase initialized for static site - some features may be limited');
  } else {
    console.log('Firebase initialized successfully');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  if (isStaticSite) {
    console.log('Firebase initialization failed on static site - this is expected');
  }
}

export { auth, db, storage };
export default app; 