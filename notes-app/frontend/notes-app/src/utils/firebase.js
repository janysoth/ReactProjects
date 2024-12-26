import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALRMa4vL-FWu8_3uW9pqU2XKRKpmSlP6I",
  authDomain: "todo-app-v3-246ea.firebaseapp.com",
  projectId: "todo-app-v3-246ea",
  storageBucket: "todo-app-v3-246ea.firebasestorage.app",
  messagingSenderId: "796441704773",
  appId: "1:796441704773:web:956010e70a7d593e6aa62c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Force re-authentication to allow switching accounts
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken(); // Get the Firebase ID token
    return { token, user: result.user };
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
};