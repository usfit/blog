import React from 'react';
import { format } from 'date-fns';

import likes from '../../images/Vector.svg';
import avatar from '../../images/avatar.png';

import classes from './ArticleListItem.module.scss';

function ArticleListItem({ article }) {
  const { title, description, createdAt, tagList, favoritesCount, author } = article;
  const {username, image} = author;
  console.log(username);
  return (
    <div className={classes.ArticleListItem}>
      <div className={classes.ArticleListItem__mainContent}>
        <div className={classes.ArticleListItem__header}>
          <h5 className={classes.ArticleListItem__title}>{title}</h5>
          <div className={classes.ArticleListItem__likes}>
            <img src={likes} alt="likes" />
            {favoritesCount}
          </div>
        </div>
        <div className={classes.ArticleListItem__tags}>
          <span className={classes.ArticleListItem__tag}>Tag1</span>
          <span className={classes.ArticleListItem__tag}>SomeTag</span>
        </div>
        <div className={classes.ArticleListItem__content}>
          <text>{description}</text>
        </div>
      </div>
      <div className={classes.ArticleListItem__user}>
        <div className={classes.ArticleListItem__userInfo}>
          <h6>John Doe</h6>
          <p className={classes.ArticleListItem__userData}>{format(new Date(createdAt), 'PP')}</p>
        </div>
        <div>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}

export default ArticleListItem;
