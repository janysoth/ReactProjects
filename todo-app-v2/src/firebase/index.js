import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU_SR-vWQLAnH0WDOwpwmWsDtrEGJYLUQ",
  authDomain: "todo-app-v2-2e55e.firebaseapp.com",
  projectId: "todo-app-v2-2e55e",
  storageBucket: "todo-app-v2-2e55e.firebasestorage.app",
  messagingSenderId: "577768069569",
  appId: "1:577768069569:web:a7853108118c377e21f740"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
