import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleListItem from '../ArticleListItem';

import './Article.scss';

function Article() {
  const slug = useParams().slug;
  console.log('params', slug);
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((body) => setArticle(body.article));
  }, []);
  return article ? (
    <div className="Article">
      <ArticleListItem article={article} />
      <ReactMarkdown className="Article__body">{article.body}</ReactMarkdown>
    </div>
  ) : null;
}

export default Article;
