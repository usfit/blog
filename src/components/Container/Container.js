import React from 'react';

import Header from '../Header';
import ArticlesList from '../ArticlesList';

import classes from './Container.module.scss';

function Container() {
  return (
    <div className={classes.Container}>
      <Header />
      <ArticlesList />
    </div>
  );
}

export default Container;
