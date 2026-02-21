import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import NewsList from '../components/news/NewsList';
import CategoryFilter from '../components/news/CategoryFilter';
import { getCategoryById, CATEGORIES } from '../data/categories';
import { NewsCategory } from '../types';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { news, getNewsByCategory, searchFilters, setSearchFilters, searchNews } = useNews();
  const [filteredNews, setFilteredNews] = useState(news);

  const category = categoryId ? getCategoryById(categoryId as NewsCategory) : null;

  useEffect(() => {
    if (categoryId) {
      const categoryNews = getNewsByCategory(categoryId as NewsCategory);
      setFilteredNews(categoryNews);
    } else {
      setFilteredNews(news);
    }
  }, [categoryId, news, getNewsByCategory]);

  const handleCategoryChange = (categories: NewsCategory[]) => {
    setSearchFilters({ categories });
    searchNews();
  };

  if (categoryId && !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">分类不存在</h1>
          <Link to="/categories" className="text-primary-600 hover:text-primary-700">
            返回分类列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/categories" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回分类列表
        </Link>
        
        {category && (
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="text-3xl mb-2">
              {category.icon === 'MessageSquare' && '💬'}
              {category.icon === 'Eye' && '👁️'}
              {category.icon === 'Brain' && '🧠'}
              {category.icon === 'Bot' && '🤖'}
              {category.icon === 'Building2' && '🏢'}
              {category.icon === 'Scale' && '⚖️'}
              {category.icon === 'GraduationCap' && '🎓'}
              {category.icon === 'Rocket' && '🚀'}
            </div>
            <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
            <p className="text-primary-100">{category.description}</p>
            <div className="mt-4 text-sm text-primary-100">
              共 {filteredNews.length} 条资讯
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={CATEGORIES.map(c => c.id)}
          selectedCategories={categoryId ? [categoryId as NewsCategory] : searchFilters.categories}
          onCategoryChange={handleCategoryChange}
          showAll={!categoryId}
        />
      </div>

      <NewsList news={filteredNews} columns={3} />
    </div>
  );
};

export default CategoryPage;
