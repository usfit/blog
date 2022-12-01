/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import ArticleListItem from '../ArticleListItem';
import ErrorMessage from '../ErrorMessage';

import './ArticleList.scss';

function ArticlesList() {
  const [articlesList, setArticlesList] = useState(null);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка, статус ${res.status}`);
        }
        return res.json();
      })
      .then((body) => setArticlesList(body))
      .catch(() => setError(true));
  }, [page]);
  const articlesCount = articlesList ? articlesList.articlesCount : 0;
  const messageError = isError ? <ErrorMessage /> : null;
  const articleItemList = articlesList
    ? articlesList.articles.map((article) => <ArticleListItem key={article.slug} article={article} />)
    : null;
  return (
    <div className="ArticlesList">
      {messageError}
      {articleItemList}
      {!isError ? (
        <Pagination
          total={articlesCount}
          current={page}
          pageSize={5}
          showSizeChanger={false}
          onChange={(e) => setPage(e)}
        />
      ) : null}
    </div>
  );
}

export default ArticlesList;
