import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import FormSignUp from '../Forms/FormSignUp';
import FormSignIn from '../Forms/FormSignIn';
import FormProfile from '../Forms/FormProfile';
import ErrorMessage from '../ErrorMessage';
import NewArticle from '../NewArticle/NewArticle';

import './Container.scss';

function Container() {
  const userLocal = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

  const [isError, setIsError] = useState({
    error: false,
    message: '',
  });
  const [user, setUser] = useState({ ...userLocal });
  const [isLog, setLog] = useState(!!userLocal.token);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const clearAuth = () => {
    localStorage.removeItem('user');
    setUser({});
    setLog(false);
  };
  return (
    <div className="Container">
      <Header isLog={isLog} clearAuth={clearAuth} user={user} />
      {isError.error ? <ErrorMessage message={isError.message} /> : null}
      <Routes>
        <Route path="/" element={<ArticlesList setIsError={setIsError} isError={isError} />} />
        <Route path="/articles" element={<ArticlesList setIsError={setIsError} isError={isError} />} />
        <Route path="/articles/:slug" element={<Article user={user} setIsError={setIsError} />} />
        <Route path="/sign-up" element={<FormSignUp setIsError={setIsError} />} />
        <Route path="/sign-in" element={<FormSignIn setLog={setLog} setIsError={setIsError} setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            isLog ? (
              <FormProfile user={user} setUser={setUser} setIsError={setIsError} />
            ) : (
              <FormSignIn setLog={setLog} setIsError={setIsError} setUser={setUser} />
            )
          }
        />
        <Route
          path="/new-article"
          element={
            isLog ? (
              <NewArticle token={user.token} setIsError={setIsError} />
            ) : (
              <FormSignIn setLog={setLog} setIsError={setIsError} setUser={setUser} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default Container;
