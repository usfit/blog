import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

function Header({ isLog, clearAuth, user }) {
  const headerAuth = isLog ? (
    <>
      <Link to="/" className="Header__createArticle">
        <h6>Create Article </h6>
      </Link>
      <Link to="/profile" className="Header__profile">
        <h6> {user.username} </h6>
        <img className="avatar" src="#" alt="" />
      </Link>
      <Link to="/" className="Header__logOut" onClick={() => clearAuth()}>
        <h6>Log Out</h6>
      </Link>
    </>
  ) : (
    <>
      <Link to="/sign-in" className="Header__signIn">
        <h6>Sign In</h6>
      </Link>
      <Link to="/sign-up" className="Header__signUp">
        <h6>Sign Up</h6>
      </Link>
    </>
  );
  return (
    <header className="Header">
      <Link to="/">
        <h6>Realworld Blog</h6>
      </Link>
      <div className="Header__auth">{headerAuth}</div>
    </header>
  );
}

export default Header;
