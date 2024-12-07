import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function User() {
  const [user] = useAuthState(auth);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      auth.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="User">
      <div className="logo">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" />
        ) : (
          <div className="placeholder-avatar" aria-label="Default User Avatar">
            👤
          </div>
        )}
      </div>
      <div className="info">
        <p className="display-name">{user?.displayName || "Guest"}</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;