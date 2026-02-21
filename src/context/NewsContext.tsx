import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { NewsItem, SearchFilters, NewsCategory, TrendData, HotKeyword } from '../types';
import { newsService } from '../services/newsService';
import { realTimeNewsService } from '../services/realTimeNewsService';
import { UpdateStatus } from '../types/realtime';

interface NewsContextType {
  news: NewsItem[];
  featuredNews: NewsItem[];
  currentNews: NewsItem | null;
  searchFilters: SearchFilters;
  trendData: TrendData[];
  hotKeywords: HotKeyword[];
  loading: boolean;
  isRealTimeMode: boolean;
  updateStatus: UpdateStatus;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  searchNews: () => void;
  getNewsById: (id: string) => NewsItem | undefined;
  getNewsByCategory: (category: NewsCategory) => NewsItem[];
  getRelatedNews: (id: string) => NewsItem[];
  incrementViewCount: (id: string) => void;
  refreshNews: () => Promise<void>;
  toggleRealTimeMode: () => void;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
}

const defaultFilters: SearchFilters = {
  keyword: '',
  categories: [],
  tags: [],
  dateRange: { start: '', end: '' },
  sortBy: 'date'
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(newsService.getAllNews());
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>(newsService.getFeaturedNews());
  const [currentNews] = useState<NewsItem | null>(null);
  const [searchFilters, setSearchFiltersState] = useState<SearchFilters>(defaultFilters);
  const [trendData] = useState<TrendData[]>(newsService.getTrendData());
  const [hotKeywords] = useState<HotKeyword[]>(newsService.getHotKeywords());
  const [loading, setLoading] = useState(false);
  const [isRealTimeMode, setIsRealTimeMode] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(realTimeNewsService.getUpdateStatus());

  useEffect(() => {
    const unsubscribeStatus = realTimeNewsService.subscribeToStatus(setUpdateStatus);
    
    const unsubscribeNews = realTimeNewsService.subscribeToNews((updatedNews) => {
      if (isRealTimeMode) {
        setNews(updatedNews);
        setFeaturedNews(updatedNews.filter(item => item.isFeatured).slice(0, 5));
      }
    });

    return () => {
      unsubscribeStatus();
      unsubscribeNews();
    };
  }, [isRealTimeMode]);

  const setSearchFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchFiltersState(prev => ({ ...prev, ...filters }));
  }, []);

  const searchNews = useCallback(() => {
    setLoading(true);
    const results = newsService.searchNews(searchFilters);
    setNews(results);
    setLoading(false);
  }, [searchFilters]);

  const getNewsById = useCallback((id: string) => {
    return newsService.getNewsById(id);
  }, []);

  const getNewsByCategory = useCallback((category: NewsCategory) => {
    return newsService.getNewsByCategory(category);
  }, []);

  const getRelatedNews = useCallback((id: string) => {
    return newsService.getRelatedNews(id);
  }, []);

  const incrementViewCount = useCallback((id: string) => {
    newsService.incrementViewCount(id);
  }, []);

  const refreshNews = useCallback(async () => {
    setLoading(true);
    
    if (isRealTimeMode) {
      try {
        const freshNews = await realTimeNewsService.refreshNews();
        setNews(freshNews);
        setFeaturedNews(freshNews.filter(item => item.isFeatured).slice(0, 5));
      } catch (error) {
        console.error('Failed to refresh real-time news:', error);
        setNews(newsService.getAllNews());
        setFeaturedNews(newsService.getFeaturedNews());
      }
    } else {
      setNews(newsService.getAllNews());
      setFeaturedNews(newsService.getFeaturedNews());
    }
    
    setLoading(false);
  }, [isRealTimeMode]);

  const toggleRealTimeMode = useCallback(() => {
    setIsRealTimeMode(prev => !prev);
  }, []);

  const startAutoRefresh = useCallback(() => {
    realTimeNewsService.startAutoRefresh();
    setIsRealTimeMode(true);
  }, []);

  const stopAutoRefresh = useCallback(() => {
    realTimeNewsService.stopAutoRefresh();
  }, []);

  const value: NewsContextType = {
    news,
    featuredNews,
    currentNews,
    searchFilters,
    trendData,
    hotKeywords,
    loading,
    isRealTimeMode,
    updateStatus,
    setSearchFilters,
    searchNews,
    getNewsById,
    getNewsByCategory,
    getRelatedNews,
    incrementViewCount,
    refreshNews,
    toggleRealTimeMode,
    startAutoRefresh,
    stopAutoRefresh
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
