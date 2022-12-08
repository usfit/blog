import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import likes from '../../images/Vector.svg';

import './ArticleListItem.scss';

function ArticleListItem({ article, isMine }) {
  const { title, description, createdAt, tagList, favoritesCount, author, slug } = article;
  const { username, image } = author;
  const tags = tagList.map((tag) => {
    const result = tag ? (
      <span key={uuidv4()} className="ArticleListItem__tag">
        {tag}
      </span>
    ) : null;
    return result;
  });
  const buttons = isMine ? (
    <div className="ArticleListItem__buttons">
      <Link to="/" className="button__delete">
        Delete
      </Link>
      <Link to={`/articles/${slug}/edit`} state={{ article }} className="button__submit">
        Edit
      </Link>
    </div>
  ) : null;
  return (
    <div className="ArticleListItem">
      <div className="ArticleListItem__Container">
        <div className="ArticleListItem__mainContent">
          <div className="ArticleListItem__header">
            <Link to={`/articles/${slug}`}>
              <h5 className="ArticleListItem__title">{title}</h5>
            </Link>
            <div className="ArticleListItem__likes">
              <img src={likes} alt="likes" />
              {favoritesCount}
            </div>
          </div>
          <div className="ArticleListItem__tags">{tags}</div>
        </div>
        <div className="ArticleListItem__user">
          <div className="ArticleListItem__userInfo">
            <h6>{username}</h6>
            <p className="ArticleListItem__userData">{format(new Date(createdAt), 'PP')}</p>
          </div>
          <img className="avatar" src={image} alt="" />
        </div>
      </div>
      <div className="ArticleListItem__content">
        {description} {buttons}
      </div>
    </div>
  );
}

export default ArticleListItem;
