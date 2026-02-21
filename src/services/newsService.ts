import { NewsItem, SearchFilters, NewsCategory, TrendData, HotKeyword } from '../types';
import { SAMPLE_NEWS, TREND_DATA, HOT_KEYWORDS } from '../data/mockData';

const STORAGE_KEY = 'ai_news_data';

export const newsService = {
  getAllNews: (): NewsItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return SAMPLE_NEWS;
  },

  getNewsById: (id: string): NewsItem | undefined => {
    const news = newsService.getAllNews();
    return news.find(item => item.id === id);
  },

  getFeaturedNews: (): NewsItem[] => {
    const news = newsService.getAllNews();
    return news.filter(item => item.isFeatured).slice(0, 5);
  },

  getNewsByCategory: (category: NewsCategory): NewsItem[] => {
    const news = newsService.getAllNews();
    return news.filter(item => item.category === category);
  },

  searchNews: (filters: SearchFilters): NewsItem[] => {
    let news = newsService.getAllNews();

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      news = news.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.name.toLowerCase().includes(keyword))
      );
    }

    if (filters.categories.length > 0) {
      news = news.filter(item => filters.categories.includes(item.category));
    }

    if (filters.tags.length > 0) {
      news = news.filter(item =>
        item.tags.some(tag => filters.tags.includes(tag.id))
      );
    }

    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      news = news.filter(item => new Date(item.publishedAt) >= startDate);
    }

    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      news = news.filter(item => new Date(item.publishedAt) <= endDate);
    }

    switch (filters.sortBy) {
      case 'date':
        news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'popularity':
        news.sort((a, b) => b.viewCount - a.viewCount);
        break;
      default:
        break;
    }

    return news;
  },

  getRelatedNews: (id: string, limit: number = 4): NewsItem[] => {
    const currentNews = newsService.getNewsById(id);
    if (!currentNews) return [];

    const news = newsService.getAllNews();
    return news
      .filter(item => item.id !== id && item.category === currentNews.category)
      .slice(0, limit);
  },

  incrementViewCount: (id: string): void => {
    const news = newsService.getAllNews();
    const index = news.findIndex(item => item.id === id);
    if (index !== -1) {
      news[index].viewCount += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
    }
  },

  getTrendData: (): TrendData[] => {
    return TREND_DATA;
  },

  getHotKeywords: (): HotKeyword[] => {
    return HOT_KEYWORDS;
  },

  getLatestNews: (limit: number = 10): NewsItem[] => {
    const news = newsService.getAllNews();
    return news
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  },

  getPopularNews: (limit: number = 10): NewsItem[] => {
    const news = newsService.getAllNews();
    return news
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }
};
