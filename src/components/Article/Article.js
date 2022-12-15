/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleListItem from '../ArticleListItem';
import getResponse from '../../sevises/getResponse';
import * as actions from '../../redux/actions';

import './Article.scss';

function Article({ user, setIsError, setIsLoading }) {
  const slug = useParams().slug;
  const [article, setArticle] = useState(null);
  const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getResponse(`articles/${slug}`, 'GET', null, user.token)
      .then((body) => {
        setIsLoading(false);
        setIsMine(user.username === body.article.author.username);
        setArticle(body.article);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError({ error: true, message: err.message });
      });
  }, [setIsError, setIsLoading, slug, user.token, user.username]);
  return (
    <>
      {article ? (
        <div className="main-block Article">
          <ArticleListItem article={article} isMine={isMine} token={user.token} setIsError={setIsError} />
          <ReactMarkdown className="Article__body">{article.body}</ReactMarkdown>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  const { setIsError, setIsLoading } = bindActionCreators(actions, dispatch);
  return { setIsError, setIsLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
