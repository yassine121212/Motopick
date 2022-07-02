 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.React_app_firebase_key,
  authDomain: "moto-b4cb8.firebaseapp.com",
  projectId: "moto-b4cb8",
  storageBucket: "moto-b4cb8.appspot.com",
  messagingSenderId: "818205108592",
  appId: "1:818205108592:web:a6bb02f382937cffb0c7b5"
};

 const app = initializeApp(firebaseConfig);
 export const auth =getAuth();