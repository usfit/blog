import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <header className="Header">
      <Link to="/">
        <h6>Realworld Blog</h6>
      </Link>
      <div className="Header__auth">
        <Link to="/sign-in" className="Header__signIn">
          <h6>Sign In</h6>
        </Link>
        <Link to="/sign-up" className="Header__signUp">
          <h6>Sign Up</h6>
        </Link>
      </div>
    </header>
  );
}

export default Header;
