import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = { 
  apiKey: "AIzaSyDxVPCrJjMi6x2f5OpSkR4oP44FUr-yS8A",
  authDomain: "moto-b4cb8.firebaseapp.com",
  databaseURL: "https://moto-b4cb8-default-rtdb.firebaseio.com",
  projectId: "moto-b4cb8",
  storageBucket: "moto-b4cb8.appspot.com",
  messagingSenderId: "818205108592",
  appId: "1:818205108592:web:a6bb02f382937cffb0c7b5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
