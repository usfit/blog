import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';
import * as actions from '../../redux/actions';

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

const mapStateToProps = (state) => {
  const token = state.user.token;
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  const { setIsError, setIsLoading } = bindActionCreators(actions, dispatch);
  return { setIsError, setIsLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
