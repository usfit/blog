import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import ArticlesList from '../ArticlesList';
import Article from '../Article';
import FormSignUp from '../Forms/FormSignUp';
import FormSignIn from '../Forms/FormSignIn';
import FormProfile from '../Forms/FormProfile';
import NewArticle from '../Article/NewArticle';
import Header from '../Header';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';
import * as actions from '../../redux/actions';

import './Container.scss';

function Container({ isError, isLoading, setUser, user, setLog, isLog, deleteUser }) {
  const userLocal = useMemo(() => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}), []);

  useEffect(() => {
    setUser({ ...userLocal });
    setLog(!!userLocal.token);
  }, [setLog, setUser, userLocal]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const clearAuth = () => {
    deleteUser();
    setLog(false);
    localStorage.removeItem('user');
  };
  const spinner = isLoading ? <Spinner /> : null;
  const errorMessage = isError.error ? <ErrorMessage message={isError.message} /> : null;
  return (
    <div className="Container">
      <Header isLog={isLog} clearAuth={clearAuth} user={user} />
      {spinner}
      {errorMessage}
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-up" element={!isLog ? <FormSignUp /> : <ArticlesList />} />
        <Route path="/sign-in" element={!isLog ? <FormSignIn setLog={setLog} /> : <ArticlesList />} />
        <Route path="/profile" element={isLog ? <FormProfile /> : <FormSignIn />} />
        <Route path="/new-article" element={isLog ? <NewArticle /> : <FormSignIn />} />
        <Route path="/articles/:slug/edit" element={isLog ? <NewArticle /> : <FormSignIn />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isError, isLoading, user, isLog } = state;
  return { isError, isLoading, user, isLog };
};

const mapDispatchToProps = (dispatch) => {
  const { setIsError, setIsLoading, setUser, setLog, deleteUser } = bindActionCreators(actions, dispatch);
  return { setIsError, setIsLoading, setUser, setLog, deleteUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
