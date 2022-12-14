/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';

import './ArticleList.scss';

function ArticlesList({ setIsError, token, setIsLoading }) {
  const [articlesList, setArticlesList] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    setIsError({ error: false });
    getResponse(`articles?limit=5&offset=${(page - 1) * 5}`, 'GET', null, token)
      .then((body) => {
        setIsLoading(false);
        setArticlesList(body);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError({ error: true, message: err.message });
      });
  }, [page, setIsError, setIsLoading, token]);
  const articlesCount = articlesList ? articlesList.articlesCount : 0;
  const articleItemList = articlesList
    ? articlesList.articles.map((article) => (
        <ArticleListItem key={article.slug} article={article} setIsError={setIsError} token={token} />
      ))
    : null;
  return (
    <div className="ArticlesList">
      {articleItemList}
      {articlesList ? (
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
