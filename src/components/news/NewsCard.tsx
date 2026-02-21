import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, Shield } from 'lucide-react';
import { NewsItem } from '../../types';
import { getCategoryName } from '../../data/categories';
import { realTimeNewsService } from '../../services/realTimeNewsService';

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'featured' | 'compact';
  showVerification?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, variant = 'default', showVerification = false }) => {
  const freshness = realTimeNewsService.getNewsFreshness(news.publishedAt);
  const timeAgo = realTimeNewsService.formatTimeAgo(news.publishedAt);
  const isOutdated = realTimeNewsService.isNewsOutdated(news.publishedAt, 7);

  const getFreshnessIndicator = () => {
    if (freshness === 'fresh') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
          最新
        </span>
      );
    }
    if (freshness === 'recent') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
          近期
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
        较早
      </span>
    );
  };

  if (variant === 'featured') {
    return (
      <Link to={`/news/${news.id}`} className="group block">
        <article className="card overflow-hidden hover:shadow-lg transition-all duration-300">
          {news.imageUrl && (
            <div className="relative h-64 overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {getFreshnessIndicator()}
                {news.isFeatured && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium rounded-full">
                    精选
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full mb-2">
                  {getCategoryName(news.category)}
                </span>
                <h2 className="text-xl font-bold text-white line-clamp-2 group-hover:text-primary-200 transition-colors">
                  {news.title}
                </h2>
              </div>
            </div>
          )}
          <div className="p-4">
            <p className="text-gray-600 line-clamp-2 mb-3">{news.summary}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {timeAgo}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {news.viewCount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-gray-400">
                  <Shield className="w-3 h-3 mr-1" />
                  {news.source}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/news/${news.id}`} className="group flex items-start space-x-3 py-3">
        {news.imageUrl && (
          <div className="relative">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            {freshness === 'fresh' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getFreshnessIndicator()}
            {isOutdated && (
              <span className="text-xs text-amber-600">可能过时</span>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {news.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
            <span className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              {news.source}
            </span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${news.id}`} className="group block">
      <article className={`card overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 ${
        isOutdated ? 'border-amber-200' : ''
      }`}>
        {news.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 flex items-center gap-2">
              {getFreshnessIndicator()}
            </div>
            {news.isFeatured && (
              <span className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-xs font-medium rounded">
                精选
              </span>
            )}
          </div>
        )}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
              {getCategoryName(news.category)}
            </span>
            {showVerification && (
              <span className="flex items-center text-xs text-green-600">
                <Shield className="w-3 h-3 mr-1" />
                已验证
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{news.summary}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {news.tags.slice(0, 3).map(tag => (
              <span key={tag.id} className={`tag text-xs ${tag.color}`}>
                {tag.name}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {timeAgo}
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {news.viewCount.toLocaleString()}
              </span>
            </div>
            <span className="flex items-center text-gray-400 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              {news.source}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
