import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function User() {
  const [user] = useAuthState(auth);

  return (
    <div className='User'>
      <div className="logo">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="logo" />
        ) : (
          <div className="placeholder-avatar">👤</div>
        )}
      </div>
      <div className='info'>
        <p>{user?.displayName || "Guest"}</p>
        <a href="#" onClick={() => auth.signOut()}>Logout</a>
      </div>
    </div>
  );
}

export default User;