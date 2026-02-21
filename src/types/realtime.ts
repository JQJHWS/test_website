export interface NewsSource {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'api' | 'scraping';
  reliability: 'high' | 'medium' | 'low';
  lastFetch?: string;
  status: 'active' | 'inactive' | 'error';
}

export interface FetchResult {
  success: boolean;
  data: any[];
  source: string;
  fetchedAt: string;
  error?: string;
}

export interface UpdateStatus {
  isUpdating: boolean;
  lastUpdate: string | null;
  nextUpdate: string | null;
  updateInterval: number;
  sourcesStatus: Map<string, 'success' | 'error' | 'pending'>;
}

export interface ContentVerification {
  isValid: boolean;
  issues: string[];
  verifiedAt: string;
}

export interface RealTimeNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: NewsSource;
  sourceUrl: string;
  publishedAt: string;
  fetchedAt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  verification: ContentVerification;
  isRealTime: boolean;
}
