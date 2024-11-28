import { signInWithPopup } from 'firebase/auth';
import React from 'react';

import { auth, provider } from "../firebase";

function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const signInUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='LoginPage'>
      <div className='container'>
        <h1>My Todo App</h1>
        <button onClick={signInUser} className='button'>
          Sign in with Google
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;