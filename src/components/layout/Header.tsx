import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Brain, TrendingUp, Radio } from 'lucide-react';
import UpdateStatusIndicator from '../realtime/UpdateStatusIndicator';
import { useNews } from '../../context/NewsContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isRealTimeMode, refreshNews, startAutoRefresh, stopAutoRefresh } = useNews();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleRefresh = async () => {
    await refreshNews();
  };

  const toggleRealTime = () => {
    if (isRealTimeMode) {
      stopAutoRefresh();
    } else {
      startAutoRefresh();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">AI资讯中心</span>
              {isRealTimeMode && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full animate-pulse">
                  实时
                </span>
              )}
            </div>
          </Link>

          <div className="hidden lg:flex items-center">
            <UpdateStatusIndicator onRefresh={handleRefresh} showSettings />
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              首页
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary-600 transition-colors">
              分类
            </Link>
            <Link to="/trending" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              热门趋势
            </Link>
            <button
              onClick={toggleRealTime}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isRealTimeMode
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Radio className={`w-4 h-4 mr-1 ${isRealTimeMode ? 'animate-pulse' : ''}`} />
              {isRealTimeMode ? '实时模式' : '开启实时'}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索AI资讯..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="mb-4 lg:hidden">
              <UpdateStatusIndicator onRefresh={handleRefresh} showSettings />
            </div>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索AI资讯..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                to="/categories"
                className="text-gray-600 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                分类
              </Link>
              <Link
                to="/trending"
                className="text-gray-600 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                热门趋势
              </Link>
              <button
                onClick={() => {
                  toggleRealTime();
                  setIsMenuOpen(false);
                }}
                className={`text-left py-2 ${
                  isRealTimeMode ? 'text-green-600' : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {isRealTimeMode ? '🔴 实时模式已开启' : '开启实时模式'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
