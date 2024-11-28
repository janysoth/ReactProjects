/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function User() {
  const [user] = useAuthState(auth);

  return (
    <div className='User'>
      <div className="logo">
        <img src={user?.photoURL} alt="logo" />
      </div>
      <div className='info'>
        <p>{user?.displayName}</p>
        <a href="#" onClick={() => auth.signOut()}>Logout</a>
      </div>
    </div>
  );
}

export default User;