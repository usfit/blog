import React from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import likes from '../../images/Vector.svg';

import classes from './ArticleListItem.module.scss';

function ArticleListItem({ article }) {
  const { title, description, createdAt, tagList, favoritesCount, author } = article;
  const { username, image } = author;
  const tags = tagList.map((tag) => {
    const result = tag ? (
      <span key={uuidv4()} className={classes.ArticleListItem__tag}>
        {tag}
      </span>
    ) : null;
    return result;
  });
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
        <div className={classes.ArticleListItem__tags}>{tags}</div>
        <div className={classes.ArticleListItem__content}>{description}</div>
      </div>
      <div className={classes.ArticleListItem__user}>
        <div className={classes.ArticleListItem__userInfo}>
          <h6>{username}</h6>
          <p className={classes.ArticleListItem__userData}>{format(new Date(createdAt), 'PP')}</p>
        </div>
        <img className={classes.ArticleListItem__avatar} src={image} alt="" />
      </div>
    </div>
  );
}

export default ArticleListItem;
