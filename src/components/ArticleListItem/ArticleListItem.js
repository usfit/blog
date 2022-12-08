/* eslint-disable indent */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import getResponse from '../../sevises/getResponse';
import DeleteModal from '../DeleteModal';
import like from '../../images/Like.svg';
import likeTrue from '../../images/LikeTrue.svg';

import './ArticleListItem.scss';

function ArticleListItem({ article, isMine, token, setIsError }) {
  const [nowArticle, setNowArticle] = useState(article);
  const [isHide, setIsHide] = useState(true);
  const { title, description, createdAt, tagList, favoritesCount, author, slug, favorited } = nowArticle;
  const { username, image } = author;
  const [isLiked, setIsLiked] = useState(favorited);
  const response = isLiked
    ? () =>
        getResponse(`/articles/${slug}/favorite`, 'DELETE', '', token)
          .then((res) => {
            setIsLiked(() => false);
            setNowArticle(() => res.article);
          })
          .catch((err) => setIsError({ error: true, message: err.message }))
    : () =>
        getResponse(`/articles/${slug}/favorite`, 'POST', '', token)
          .then((res) => {
            setIsLiked(() => true);
            setNowArticle(() => res.article);
          })
          .catch((err) => setIsError({ error: true, message: err.message }));
  const handleClickLike = () => {
    response();
  };
  const likeImage = isLiked ? likeTrue : like;

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
      <input className="button__delete" type="button" value="Delete" onClick={() => setIsHide(false)} />
      <Link to={`/articles/${slug}/edit`} state={{ article }} className="button__submit">
        Edit
      </Link>
      <DeleteModal isHide={isHide} setIsHide={setIsHide} slug={slug} token={token} setIsError={setIsError} />
    </div>
  ) : null;
  return (
    <div className="main-block ArticleListItem">
      <div className="ArticleListItem__Container">
        <div className="ArticleListItem__mainContent">
          <div className="ArticleListItem__header">
            <Link to={`/articles/${slug}`}>
              <h5 className="ArticleListItem__title">{title}</h5>
            </Link>
            <div className="ArticleListItem__likes">
              <input className="liked" type="image" src={likeImage} alt="likes" onClick={() => handleClickLike()} />
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
        <p>{description}</p> {buttons}
      </div>
    </div>
  );
}

export default ArticleListItem;
