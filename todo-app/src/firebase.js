// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBje9pRtTF9eJzsEtp9jXl39Isfj9xHKug",
  authDomain: "todo-app-64439.firebaseapp.com",
  projectId: "todo-app-64439",
  storageBucket: "todo-app-64439.appspot.com",
  messagingSenderId: "258029586902",
  appId: "1:258029586902:web:3286abe19d786ded07fc77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);