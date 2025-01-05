// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRdgoVJ20sYqYceuptaWqI4Q20yoiOu90",
    authDomain: "axandra-deen.firebaseapp.com",
    projectId: "axandra-deen",
    storageBucket: "axandra-deen.firebasestorage.app",
    messagingSenderId: "375206099261",
    appId: "1:375206099261:web:e321975461b73ef91bad54",
    measurementId: "G-PLL6LYLCV7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };
