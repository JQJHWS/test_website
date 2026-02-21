export type NewsCategory = 
  | 'natural-language-processing'
  | 'computer-vision'
  | 'machine-learning'
  | 'robotics'
  | 'industry-application'
  | 'policy-regulation'
  | 'academic-research'
  | 'product-release';

export interface CategoryInfo {
  id: NewsCategory;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt: string;
  category: NewsCategory;
  tags: Tag[];
  imageUrl?: string;
  keyPoints: string[];
  viewCount: number;
  isFeatured: boolean;
}

export interface SearchFilters {
  keyword: string;
  categories: NewsCategory[];
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'relevance' | 'date' | 'popularity';
}

export interface TrendData {
  date: string;
  count: number;
  category: NewsCategory;
}

export interface HotKeyword {
  keyword: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}
