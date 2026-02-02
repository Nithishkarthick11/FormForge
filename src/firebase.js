
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDRGsb3npYFm8MmNyG4UWdlP1_Qzky8sXY",
  authDomain: "formforge-2d2b9.firebaseapp.com",
  projectId: "formforge-2d2b9",
  storageBucket: "formforge-2d2b9.firebasestorage.app",
  messagingSenderId: "947763834315",
  appId: "1:947763834315:web:319b7a96e5e0994ba25a4e",
  measurementId: "G-22NXRYDD5H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)