import React from 'react';
import { useNews } from '../context/NewsContext';
import TrendChart from '../components/charts/TrendChart';
import HotKeywords from '../components/charts/HotKeywords';
import NewsList from '../components/news/NewsList';
import { TrendingUp, Clock, Eye, Flame } from 'lucide-react';

const TrendingPage: React.FC = () => {
  const { news, trendData, hotKeywords } = useNews();

  const trendingNews = [...news]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  const recentNews = [...news]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">热门趋势</h1>
        <p className="text-gray-600">了解AI领域的最新动态和热门话题</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">总资讯数</span>
            <TrendingUp className="w-5 h-5 text-primary-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{news.length}</div>
          <div className="text-sm text-green-600 mt-1">持续更新中</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">本周新增</span>
            <Clock className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-green-600 mt-1">+8% 较上周</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">总阅读量</span>
            <Eye className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {news.reduce((sum, item) => sum + item.viewCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-green-600 mt-1">+15% 较上周</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
              趋势分析
            </h2>
            <TrendChart data={trendData} height={350} />
          </div>
        </div>
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-500" />
              热门关键词
            </h2>
            <HotKeywords keywords={hotKeywords} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary-500" />
              热门阅读
            </h2>
            <NewsList news={trendingNews} variant="compact" />
          </div>
        </div>
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              最新发布
            </h2>
            <NewsList news={recentNews} variant="compact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
