import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:process.env.React_app_firebase_key,
  authDomain: "motopickup-353120.firebaseapp.com",
  projectId: "motopickup-353120",
  storageBucket: "motopickup-353120.appspot.com",
  messagingSenderId: "641117441433",
  appId: "1:641117441433:web:ed237802ab6ab210d4d708",
  measurementId: "G-ESLT23JMY4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
