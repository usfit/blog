import React from 'react';

import likes from '../../images/Vector.svg';

import classes from './ArticleListItem.module.scss';

function ArticleListItem() {
  return (
    <div className={classes.ArticleListItem__mainContent}>
      <div className={classes.ArticleListItem__header}>
        <h5 className={classes.ArticleListItem__title}>Some article title</h5>
        <div className={classes.ArticleListItem__likes}>
          <img src={likes} alt="likes" />
          12
        </div>
      </div>
      <div className={classes.ArticleListItem__tags}>
        <span className={classes.ArticleListItem__tag}>Tag1</span>
        <span className={classes.ArticleListItem__tag}>SomeTag</span>
      </div>
      <div className={classes.ArticleListItem__content}>
        <text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </text>
      </div>
    </div>
  );
}

export default ArticleListItem;