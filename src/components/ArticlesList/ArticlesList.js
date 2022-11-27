import React, { useState, useEffect } from 'react';

import ArticleListItem from '../ArticleListItem';

import classes from './ArticlesList.module.scss';

function ArticlesList() {
  const page = 1;
  const [articles, setArticles] = useState({ articlesList: {} });
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`)
      .then((res) => res.json())
      .then((body) => setArticles(body));
  }, [page]);

  return (
    <div className={classes.ArticlesList}>
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
    </div>
  );
}

export default ArticlesList;
