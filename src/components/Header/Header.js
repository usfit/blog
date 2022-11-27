import React from 'react';

import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.Header}>
      <h6>Realworld Blog</h6>
      <div className={classes.Header__auth}>
        <button type="button" className={classes.Header__signIn}>
          <h6>Sign In</h6>
        </button>
        <button type="button" className={classes.Header__signUp}>
          <h6>Sign Up</h6>
        </button>
      </div>
    </header>
  );
}

export default Header;
