
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCA19ZfnhGrkcqx5-_WUbXMhOpmtQSDcTI",
  authDomain: "estudos-672d5.firebaseapp.com",
  projectId: "estudos-672d5",
  storageBucket: "estudos-672d5.firebasestorage.app",
  messagingSenderId: "585490503857",
  appId: "1:585490503857:web:a2ddcd6c979f552e996a90"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
