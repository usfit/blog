import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import FormSignUp from '../Forms/FormSignUp';
import FormSignIn from '../Forms/FormSignIn';
import FormProfile from '../Forms/FormProfile';
import ErrorMessage from '../ErrorMessage';
import NewArticle from '../Article/NewArticle';
import Spinner from '../Spinner';

import './Container.scss';

function Container() {
  const userLocal = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

  const [isError, setIsError] = useState({
    error: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
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
  const spinner = isLoading ? <Spinner /> : null;
  const errorMessage = isError.error ? <ErrorMessage message={isError.message} /> : null;
  return (
    <div className="Container">
      <Header isLog={isLog} clearAuth={clearAuth} user={user} />
      {spinner}
      {errorMessage}
      <Routes>
        <Route
          path="/"
          element={<ArticlesList token={user.token} setIsError={setIsError} setIsLoading={setIsLoading} />}
        />
        <Route
          path="/articles"
          element={<ArticlesList token={user.token} setIsError={setIsError} setIsLoading={setIsLoading} />}
        />
        <Route
          path="/articles/:slug"
          element={<Article user={user} setIsError={setIsError} setIsLoading={setIsLoading} />}
        />
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
        <Route
          path="/articles/:slug/edit"
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
