import React, { useState, useEffect } from 'react';

import ArticleListItem from '../ArticleListItem';

import classes from './ArticlesList.module.scss';

function ArticlesList() {
  const page = 1;
  const [articlesList, setArticlesList] = useState(null);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`)
      .then((res) => res.json())
      .then((body) => setArticlesList(body));
  }, [page]);
  const articleItemList = articlesList ? <ArticleListItem article={articlesList.articles[0]} /> : null;
  return (
    <div className={classes.ArticlesList}>
      {articleItemList}
    </div>
  );
}

export default ArticlesList;
