import { NewsSource, FetchResult, UpdateStatus, ContentVerification, RealTimeNews } from '../types/realtime';
import { NewsItem, NewsCategory, Tag } from '../types';

const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'arxiv',
    name: 'arXiv AI Papers',
    url: 'https://arxiv.org/list/cs.AI/recent',
    type: 'api',
    reliability: 'high',
    status: 'active'
  },
  {
    id: 'openai-blog',
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog',
    type: 'rss',
    reliability: 'high',
    status: 'active'
  },
  {
    id: 'deepmind',
    name: 'DeepMind',
    url: 'https://deepmind.com/blog',
    type: 'rss',
    reliability: 'high',
    status: 'active'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    url: 'https://huggingface.co/blog',
    type: 'rss',
    reliability: 'high',
    status: 'active'
  },
  {
    id: 'ai-news',
    name: 'AI News',
    url: 'https://artificialintelligence-news.com',
    type: 'rss',
    reliability: 'medium',
    status: 'active'
  },
  {
    id: 'techcrunch-ai',
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/',
    type: 'rss',
    reliability: 'medium',
    status: 'active'
  }
];

const STORAGE_KEYS = {
  NEWS: 'ai_news_realtime_data',
  LAST_UPDATE: 'ai_news_last_update',
  UPDATE_STATUS: 'ai_news_update_status'
};

class RealTimeNewsService {
  private updateInterval: number = 5 * 60 * 1000;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<(status: UpdateStatus) => void> = new Set();
  private newsListeners: Set<(news: NewsItem[]) => void> = new Set();

  getSources(): NewsSource[] {
    return NEWS_SOURCES;
  }

  getUpdateStatus(): UpdateStatus {
    const stored = localStorage.getItem(STORAGE_KEYS.UPDATE_STATUS);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      isUpdating: false,
      lastUpdate: null,
      nextUpdate: null,
      updateInterval: this.updateInterval,
      sourcesStatus: new Map()
    };
  }

  private setUpdateStatus(status: Partial<UpdateStatus>): void {
    const current = this.getUpdateStatus();
    const updated = { ...current, ...status };
    localStorage.setItem(STORAGE_KEYS.UPDATE_STATUS, JSON.stringify(updated));
    this.notifyStatusListeners(updated);
  }

  subscribeToStatus(callback: (status: UpdateStatus) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  subscribeToNews(callback: (news: NewsItem[]) => void): () => void {
    this.newsListeners.add(callback);
    return () => this.newsListeners.delete(callback);
  }

  private notifyStatusListeners(status: UpdateStatus): void {
    this.listeners.forEach(cb => cb(status));
  }

  private notifyNewsListeners(news: NewsItem[]): void {
    this.newsListeners.forEach(cb => cb(news));
  }

  async fetchFromSource(source: NewsSource): Promise<FetchResult> {
    const fetchedAt = new Date().toISOString();
    
    try {
      const response = await fetch(`/api/news/${source.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.items || [],
        source: source.id,
        fetchedAt
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        source: source.id,
        fetchedAt,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  verifyContent(news: Partial<RealTimeNews>): ContentVerification {
    const issues: string[] = [];
    
    if (!news.title || news.title.length < 10) {
      issues.push('标题过短或缺失');
    }
    
    if (!news.summary || news.summary.length < 20) {
      issues.push('摘要过短或缺失');
    }
    
    if (!news.sourceUrl || !this.isValidUrl(news.sourceUrl)) {
      issues.push('来源链接无效');
    }
    
    if (!news.publishedAt) {
      issues.push('缺少发布时间');
    } else {
      const publishedDate = new Date(news.publishedAt);
      const now = new Date();
      const daysDiff = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > 30) {
        issues.push('资讯发布时间超过30天，可能已过时');
      }
    }

    if (!news.source || !NEWS_SOURCES.find(s => s.id === news.source?.id)) {
      issues.push('信息来源未验证');
    }

    return {
      isValid: issues.length === 0,
      issues,
      verifiedAt: new Date().toISOString()
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async fetchAllSources(): Promise<FetchResult[]> {
    const activeSources = NEWS_SOURCES.filter(s => s.status === 'active');
    const results = await Promise.all(
      activeSources.map(source => this.fetchFromSource(source))
    );
    return results;
  }

  convertToNewsItem(realTimeNews: RealTimeNews, tags: Tag[]): NewsItem {
    return {
      id: realTimeNews.id,
      title: realTimeNews.title,
      summary: realTimeNews.summary,
      content: realTimeNews.content,
      source: realTimeNews.source.name,
      sourceUrl: realTimeNews.sourceUrl,
      publishedAt: realTimeNews.publishedAt,
      updatedAt: realTimeNews.fetchedAt,
      category: realTimeNews.category as NewsCategory,
      tags: realTimeNews.tags.map(tagId => {
        const existingTag = tags.find(t => t.id === tagId);
        return existingTag || { id: tagId, name: tagId, color: 'bg-gray-100 text-gray-700' };
      }),
      imageUrl: realTimeNews.imageUrl,
      keyPoints: [],
      viewCount: 0,
      isFeatured: false
    };
  }

  async refreshNews(): Promise<NewsItem[]> {
    this.setUpdateStatus({ isUpdating: true });

    const now = new Date();
    const nextUpdate = new Date(now.getTime() + this.updateInterval);

    try {
      const results = await this.fetchAllSources();
      const allNews: NewsItem[] = [];
      const sourcesStatus = new Map<string, 'success' | 'error' | 'pending'>();

      results.forEach(result => {
        sourcesStatus.set(result.source, result.success ? 'success' : 'error');
        if (result.success && result.data.length > 0) {
          result.data.forEach(item => {
            const verification = this.verifyContent(item);
            if (verification.isValid) {
              allNews.push(item as NewsItem);
            }
          });
        }
      });

      const sortedNews = allNews.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(sortedNews));
      localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, now.toISOString());

      this.setUpdateStatus({
        isUpdating: false,
        lastUpdate: now.toISOString(),
        nextUpdate: nextUpdate.toISOString(),
        sourcesStatus: Object.fromEntries(sourcesStatus) as any
      });

      this.notifyNewsListeners(sortedNews);
      return sortedNews;
    } catch (error) {
      this.setUpdateStatus({
        isUpdating: false,
        sourcesStatus: {} as any
      });
      throw error;
    }
  }

  startAutoRefresh(): void {
    if (this.intervalId) {
      this.stopAutoRefresh();
    }

    this.refreshNews();

    this.intervalId = setInterval(() => {
      this.refreshNews();
    }, this.updateInterval);

    const nextUpdate = new Date(Date.now() + this.updateInterval);
    this.setUpdateStatus({ nextUpdate: nextUpdate.toISOString() });
  }

  stopAutoRefresh(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.setUpdateStatus({ nextUpdate: null });
  }

  setUpdateInterval(minutes: number): void {
    this.updateInterval = minutes * 60 * 1000;
    if (this.intervalId) {
      this.stopAutoRefresh();
      this.startAutoRefresh();
    }
  }

  getStoredNews(): NewsItem[] {
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  }

  getLastUpdateTime(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_UPDATE);
  }

  formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    
    return date.toLocaleDateString('zh-CN');
  }

  isNewsOutdated(publishedAt: string, daysThreshold: number = 7): boolean {
    const published = new Date(publishedAt);
    const now = new Date();
    const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays > daysThreshold;
  }

  getNewsFreshness(publishedAt: string): 'fresh' | 'recent' | 'older' {
    const published = new Date(publishedAt);
    const now = new Date();
    const diffHours = (now.getTime() - published.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) return 'fresh';
    if (diffHours < 72) return 'recent';
    return 'older';
  }
}

export const realTimeNewsService = new RealTimeNewsService();
