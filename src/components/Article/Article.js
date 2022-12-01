import React, { useState, useEffect } from 'react';

import ArticleListItem from '../ArticleListItem';

function Article({ slug }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((body) => setArticle(body.article));
  }, []);
  const articleItem = article ? (
    <div>
      <ArticleListItem article={article} />
      test
    </div>
  ) : null;
  return { articleItem };
}

export default Article;
