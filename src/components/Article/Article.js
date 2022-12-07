import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';

import './Article.scss';

function Article({ setIsError }) {
  const slug = useParams().slug;
  const [article, setArticle] = useState(null);
  useEffect(() => {
    getResponse(`articles/${slug}`)
      .then((body) => setArticle(body.article))
      .catch((err) => setIsError({ error: true, message: err.message }));
  }, [slug]);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
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
