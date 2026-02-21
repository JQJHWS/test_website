import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { NewsProvider } from '../../context/NewsContext';

const Layout: React.FC = () => {
  return (
    <NewsProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </NewsProvider>
  );
};

export default Layout;
