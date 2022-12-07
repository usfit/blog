/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';

import './ArticleList.scss';

function ArticlesList({ setIsError, isError }) {
  const [articlesList, setArticlesList] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsError({ error: false });
    getResponse(`articles?limit=5&offset=${(page - 1) * 5}`)
      .then((body) => setArticlesList(body))
      .catch((err) => setIsError({ error: true, message: err.message }));
  }, [page]);
  const articlesCount = articlesList ? articlesList.articlesCount : 0;
  const articleItemList = articlesList
    ? articlesList.articles.map((article) => <ArticleListItem key={article.slug} article={article} />)
    : null;
  return (
    <div className="ArticlesList">
      {articleItemList}
      {!isError.error ? (
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
