/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';

import './Article.scss';

function Article({ user, setIsError }) {
  const slug = useParams().slug;
  const [article, setArticle] = useState(null);
  const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    getResponse(`articles/${slug}`)
      .then((body) => {
        setIsMine(user.username === body.article.author.username);
        setArticle(body.article);
      })
      .catch((err) => setIsError({ error: true, message: err.message }));
  }, [setIsError, slug, user.username]);
  return (
    <>
      {article ? (
        <div className="main-block Article">
          <ArticleListItem article={article} isMine={isMine} token={user.token} setIsError={setIsError} />
          <ReactMarkdown className="Article__body">{article.body}</ReactMarkdown>
        </div>
      ) : null}
    </>
  );
}

export default Article;
