import React from 'react';

import ArticleListItem from '../ArticleListItem';

import classes from './ArticlesList.module.scss';

function ArticlesList() {
  return (
    <div className={classes.ArticlesList}>
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
    </div>
  );
}

export default ArticlesList;
