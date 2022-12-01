import React, { useState, useEffect } from 'react';

import ArticleListItem from '../ArticleListItem';

function Article({ slug }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.json())
      .then((body) => setArticle(body));
  }, []);
  console.log(article);
  return (
    <div>
      {/* <ArticleListItem article={article} /> */}
      test
    </div>
  );
}

export default Article;
