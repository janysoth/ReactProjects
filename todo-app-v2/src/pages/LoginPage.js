import { signInWithPopup } from 'firebase/auth';
import React from 'react';

import { auth, provider } from "../firebase";

function LoginPage() {
  const signInUser = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider).catch((err) => alert(err.message));

  };

  return (
    <div className='LoginPage'>
      <div className='container'>
        <h1>My Todo App</h1>
        <button onClick={signInUser} className='button'>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;