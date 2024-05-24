import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider';

export const PageControls = () => {
  const { user, logOut } = useAuth();
  const loggedIn = user !== null;

  function handleLogout() {
    logOut();
  }

  return (
    <div className="content">
      {loggedIn ? (
        <>
        <button><Link to="/">Send Message</Link></button>
        <button><Link to="/profile">Profile</Link></button>
        <button onClick={() => handleLogout()}>Logout</button>
        </>
      ) :
      ( 
        <>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/signUp">Sign Up</Link></button>  
        </>
      )}
    </div>
  )
}
