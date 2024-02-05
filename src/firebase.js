import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy-Fk_IVWJ4-85VH7cAqlQAiuuuF9BxzI",
  authDomain: "authentication-react-eef6a.firebaseapp.com",
  projectId: "authentication-react-eef6a",
  storageBucket: "authentication-react-eef6a.appspot.com",
  messagingSenderId: "1041912111706",
  appId: "1:1041912111706:web:ed2537e621dab53186ae63",
  measurementId: "G-M8FB1WT10J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
