import React from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../../types';

interface NewsListProps {
  news: NewsItem[];
  variant?: 'default' | 'featured' | 'compact';
  columns?: 1 | 2 | 3 | 4;
  showEmpty?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({
  news,
  variant = 'default',
  columns = 3,
  showEmpty = true
}) => {
  if (news.length === 0 && showEmpty) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">暂无资讯</h3>
        <p className="text-gray-500">没有找到符合条件的资讯内容</p>
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  if (variant === 'compact') {
    return (
      <div className="divide-y divide-gray-100">
        {news.map((item, index) => (
          <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <NewsCard news={item} variant="compact" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {news.map((item, index) => (
        <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <NewsCard news={item} variant={variant} />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
