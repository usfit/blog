import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticlesList from '../ArticlesList';
import Article from '../Article';

import './Container.scss';

function Container() {
  return (
    <div className="Container">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
      </Routes>
    </div>
  );
}

export default Container;
