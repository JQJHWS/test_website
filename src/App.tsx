import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import NewsDetailPage from './pages/NewsDetailPage';
import SearchPage from './pages/SearchPage';
import TrendingPage from './pages/TrendingPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="trending" element={<TrendingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
