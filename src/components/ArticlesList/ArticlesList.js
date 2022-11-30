import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import ArticleListItem from '../ArticleListItem';

import './style.scss';

function ArticlesList() {
  const [articlesList, setArticlesList] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`)
      .then((res) => res.json())
      .then((body) => setArticlesList(body));
  }, [page]);
  const articleItemList = articlesList
    ? articlesList.articles.map((article) => <ArticleListItem key={article.slug} article={article} />)
    : null;
  const articlesCount = articlesList ? articlesList.articlesCount : 0;
  return (
    <div className="ArticlesList">
      {articleItemList}
      <Pagination
        total={articlesCount}
        current={page}
        pageSize={5}
        showSizeChanger={false}
        onChange={(e) => setPage(e)}
      />
    </div>
  );
}

export default ArticlesList;
