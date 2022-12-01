import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleListItem from '../ArticleListItem';
import ErrorMessage from '../ErrorMessage';

import './Article.scss';

function Article() {
  const slug = useParams().slug;
  const [article, setArticle] = useState(null);
  const [isError, setError] = useState(false);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка, статус ${res.status}`);
        }
        return res.json();
      })
      .then((body) => setArticle(body.article))
      .catch(() => setError(true));
  }, []);
  return (
    <>
      {isError ? <ErrorMessage /> : null}
      {article ? (
        <div className="Article">
          <ArticleListItem article={article} />
          <ReactMarkdown className="Article__body">{article.body}</ReactMarkdown>
        </div>
      ) : null}
    </>
  );
}

export default Article;
