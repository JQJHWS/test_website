import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import NewsList from '../components/news/NewsList';
import { getCategoryById } from '../data/categories';
import { Calendar, Eye, ExternalLink, Tag, ArrowLeft, Share2, Bookmark, Shield, Clock, AlertTriangle } from 'lucide-react';
import { realTimeNewsService } from '../services/realTimeNewsService';
import ContentFreshnessWarning, { ContentStatusBanner } from '../components/realtime/ContentFreshnessWarning';
import SourceVerificationBadge from '../components/realtime/SourceVerificationBadge';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getNewsById, getRelatedNews, incrementViewCount, isRealTimeMode } = useNews();

  const news = id ? getNewsById(id) : undefined;
  const relatedNews = id ? getRelatedNews(id) : [];

  useEffect(() => {
    if (id) {
      incrementViewCount(id);
    }
  }, [id, incrementViewCount]);

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">资讯不存在</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(news.category);
  const freshness = realTimeNewsService.getNewsFreshness(news.publishedAt);
  const timeAgo = realTimeNewsService.formatTimeAgo(news.publishedAt);
  const isOutdated = realTimeNewsService.isNewsOutdated(news.publishedAt, 7);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600">
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回首页
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <div className="card overflow-hidden">
            {news.imageUrl && (
              <div className="relative h-64 md:h-96">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {freshness === 'fresh' && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      最新资讯
                    </span>
                  )}
                  {freshness === 'recent' && (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                      近期资讯
                    </span>
                  )}
                  {isOutdated && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      可能过时
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              <ContentStatusBanner
                isRealTime={isRealTimeMode}
                lastUpdate={news.updatedAt}
                sourceVerified={true}
              />

              <ContentFreshnessWarning publishedAt={news.publishedAt} showDetails />

              <div className="flex items-center gap-3 mb-4">
                {category && (
                  <Link
                    to={`/category/${category.id}`}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full hover:bg-primary-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                )}
                {news.isFeatured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-medium rounded-full">
                    精选
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {news.title}
              </h1>

              <div className="mb-6">
                <SourceVerificationBadge
                  sourceName={news.source}
                  sourceUrl={news.sourceUrl}
                  publishedAt={news.publishedAt}
                  fetchedAt={news.updatedAt}
                  reliability="high"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  发布于 {timeAgo}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(news.publishedAt)}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {news.viewCount.toLocaleString()} 次阅读
                </span>
              </div>

              <div className="prose prose-gray max-w-none mb-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {news.summary}
                </p>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {news.content}
                </div>
              </div>

              {news.keyPoints.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">要点总结</h3>
                  <ul className="space-y-2">
                    {news.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                {news.tags.map(tag => (
                  <span key={tag.id} className={`tag ${tag.color}`}>
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  查看原文
                </a>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                    <Share2 className="w-5 h-5 mr-1" />
                    分享
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                    <Bookmark className="w-5 h-5 mr-1" />
                    收藏
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">相关资讯</h3>
              <NewsList news={relatedNews} variant="compact" />
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-500" />
                资讯信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">发布时间</dt>
                  <dd className="text-gray-900 font-medium">{formatDate(news.publishedAt)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">更新时间</dt>
                  <dd className="text-gray-900 font-medium">{formatDate(news.updatedAt)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">来源</dt>
                  <dd className="text-gray-900 font-medium flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-green-500" />
                    {news.source}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">阅读量</dt>
                  <dd className="text-gray-900 font-medium">{news.viewCount.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">时效性</dt>
                  <dd className={`font-medium ${
                    freshness === 'fresh' ? 'text-green-600' : 
                    freshness === 'recent' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {freshness === 'fresh' ? '🟢 最新' : 
                     freshness === 'recent' ? '🟡 近期' : '⚪ 较早'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">内容声明</h3>
              <p className="text-sm text-blue-700">
                本资讯来源于公开渠道，仅供参考。建议通过原文链接获取最新、最准确的信息。
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsDetailPage;
