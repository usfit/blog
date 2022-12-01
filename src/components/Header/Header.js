import React from 'react';

import './Header.scss';

function Header() {
  return (
    <header className="Header">
      <h6>Realworld Blog</h6>
      <div className="Header__auth">
        <button type="button" className="Header__signIn">
          <h6>Sign In</h6>
        </button>
        <button type="button" className="Header__signUp">
          <h6>Sign Up</h6>
        </button>
      </div>
    </header>
  );
}

export default Header;
