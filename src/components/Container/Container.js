import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import FormSignUp from '../Forms/FormSignUp';
import FormSignIn from '../Forms/FormSignIn';

import './Container.scss';

function Container() {
  return (
    <div className="Container">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-up" element={<FormSignUp />} />
        <Route path="/sign-in" element={<FormSignIn />} />
      </Routes>
      <FormSignUp />
      <FormSignIn />
    </div>
  );
}

export default Container;
