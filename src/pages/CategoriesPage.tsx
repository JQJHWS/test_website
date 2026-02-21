import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';

const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">资讯分类</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          浏览不同AI领域的资讯内容，快速找到您感兴趣的技术方向
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map(category => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group card p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary-200 group-hover:to-purple-200 transition-colors">
              <span className="text-2xl">
                {category.icon === 'MessageSquare' && '💬'}
                {category.icon === 'Eye' && '👁️'}
                {category.icon === 'Brain' && '🧠'}
                {category.icon === 'Bot' && '🤖'}
                {category.icon === 'Building2' && '🏢'}
                {category.icon === 'Scale' && '⚖️'}
                {category.icon === 'GraduationCap' && '🎓'}
                {category.icon === 'Rocket' && '🚀'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{category.description}</p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              查看资讯
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
