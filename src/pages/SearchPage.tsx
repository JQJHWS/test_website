import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import NewsList from '../components/news/NewsList';
import CategoryFilter from '../components/news/CategoryFilter';
import TagFilter from '../components/news/TagFilter';
import { SAMPLE_TAGS } from '../data/mockData';
import { CATEGORIES } from '../data/categories';
import { NewsCategory } from '../types';
import { Search, Filter, X } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { news, searchFilters, setSearchFilters, searchNews, loading } = useNews();
  const [results, setResults] = useState(news);
  const [showFilters, setShowFilters] = useState(false);

  const queryFromUrl = searchParams.get('q') || '';

  useEffect(() => {
    if (queryFromUrl) {
      setSearchFilters({ keyword: queryFromUrl });
      const filtered = news.filter(item =>
        item.title.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
        item.summary.toLowerCase().includes(queryFromUrl.toLowerCase())
      );
      setResults(filtered);
    }
  }, [queryFromUrl, news, setSearchFilters]);

  const handleSearch = (keyword: string) => {
    setSearchParams({ q: keyword });
    setSearchFilters({ keyword });
    searchNews();
    setResults(news.filter(item =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(keyword.toLowerCase())
    ));
  };

  const handleCategoryChange = (categories: NewsCategory[]) => {
    setSearchFilters({ categories });
    applyFilters({ ...searchFilters, categories });
  };

  const handleTagChange = (tags: string[]) => {
    setSearchFilters({ tags });
    applyFilters({ ...searchFilters, tags });
  };

  const applyFilters = (filters: typeof searchFilters) => {
    let filtered = [...news];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword)
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(item => filters.categories.includes(item.category));
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(item =>
        item.tags.some(tag => filters.tags.includes(tag.id))
      );
    }

    setResults(filtered);
  };

  const clearFilters = () => {
    setSearchFilters({
      keyword: '',
      categories: [],
      tags: [],
      dateRange: { start: '', end: '' },
      sortBy: 'date'
    });
    setSearchParams({});
    setResults(news);
  };

  const hasActiveFilters = searchFilters.keyword || searchFilters.categories.length > 0 || searchFilters.tags.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">搜索资讯</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              defaultValue={queryFromUrl}
              placeholder="输入关键词搜索..."
              className="input-field pl-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch((e.target as HTMLInputElement).value);
                }
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center justify-center ${showFilters ? 'bg-primary-50 border-primary-200' : ''}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </button>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-secondary flex items-center justify-center">
              <X className="w-4 h-4 mr-2" />
              清除筛选
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="card p-6 mb-8 animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">分类筛选</h3>
              <CategoryFilter
                categories={CATEGORIES.map(c => c.id)}
                selectedCategories={searchFilters.categories}
                onCategoryChange={handleCategoryChange}
                showAll={false}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">标签筛选</h3>
              <TagFilter
                tags={SAMPLE_TAGS}
                selectedTags={searchFilters.tags}
                onTagChange={handleTagChange}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-gray-600">
          {hasActiveFilters ? (
            <>
              找到 <span className="font-semibold text-gray-900">{results.length}</span> 条相关资讯
              {searchFilters.keyword && (
                <span>，关键词: "<span className="font-semibold">{searchFilters.keyword}</span>"</span>
              )}
            </>
          ) : (
            `共 ${news.length} 条资讯`
          )}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <NewsList news={results} columns={3} />
      )}
    </div>
  );
};

export default SearchPage;
