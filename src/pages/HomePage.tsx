import React, { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import NewsList from '../components/news/NewsList';
import NewsCard from '../components/news/NewsCard';
import TrendChart from '../components/charts/TrendChart';
import HotKeywords from '../components/charts/HotKeywords';
import { CATEGORIES } from '../data/categories';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Clock, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { featuredNews, news, trendData, hotKeywords, refreshNews } = useNews();

  useEffect(() => {
    refreshNews();
  }, [refreshNews]);

  const latestNews = [...news].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 6);

  const popularNews = [...news].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              AI资讯中心
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              聚合最新AI领域资讯与发展动态，为您提供全面、及时的AI行业信息
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{news.length}+</div>
              <div className="text-sm text-primary-100">精选资讯</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-300" />
              <div className="text-2xl font-bold">{CATEGORIES.length}</div>
              <div className="text-sm text-primary-100">技术分类</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm text-primary-100">实时更新</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Zap className="w-8 h-8 mx-auto mb-2 text-orange-300" />
              <div className="text-2xl font-bold">AI</div>
              <div className="text-sm text-primary-100">智能推荐</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">精选资讯</h2>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {featuredNews.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="lg:row-span-2">
                <NewsCard news={featuredNews[0]} variant="featured" />
              </div>
              <div className="space-y-4">
                {featuredNews.slice(1, 3).map(item => (
                  <NewsCard key={item.id} news={item} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最新资讯</h2>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
              更多资讯 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <NewsList news={latestNews} columns={3} />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">分类导航</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="text-2xl mb-2">
                  {category.icon === 'MessageSquare' && '💬'}
                  {category.icon === 'Eye' && '👁️'}
                  {category.icon === 'Brain' && '🧠'}
                  {category.icon === 'Bot' && '🤖'}
                  {category.icon === 'Building2' && '🏢'}
                  {category.icon === 'Scale' && '⚖️'}
                  {category.icon === 'GraduationCap' && '🎓'}
                  {category.icon === 'Rocket' && '🚀'}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">趋势分析</h2>
                <TrendChart data={trendData} height={300} />
              </div>
            </div>
            <div>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">热门关键词</h2>
                <HotKeywords keywords={hotKeywords} maxItems={8} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">热门阅读</h2>
          </div>
          <NewsList news={popularNews} variant="compact" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
